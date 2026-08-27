import { useState, useEffect, useRef } from "react";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Square, 
  Sparkles, 
  MessageSquare, 
  AlertTriangle, 
  Bot, 
  User, 
  RefreshCw,
  PhoneOff,
  VolumeX,
  Play,
  Languages,
  ArrowRight,
  BookOpen,
  X,
  Search,
  Compass,
  Tag,
  Lightbulb,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LessonContext } from "../types";
import { POPULAR_VOICE_TOPICS, ConversationTopic } from "../data/voiceTopics";
import { speakGerman } from "../utils/speechService";

interface ChatMessage {
  id: string;
  text: string;
  isModel: boolean;
  timestamp: Date;
}

interface VoiceConversationProps {
  selectedLevel?: string | null;
  activeLessonContext?: LessonContext | null;
  onClearLessonContext?: () => void;
  onSelectLevel?: (level: string) => void;
}

export default function VoiceConversation({ 
  selectedLevel,
  activeLessonContext,
  onClearLessonContext,
  onSelectLevel,
}: VoiceConversationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Topics filtering states
  const [topicLevelFilter, setTopicLevelFilter] = useState<string>(selectedLevel || "ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTopic, setActiveTopic] = useState<ConversationTopic | null>(null);

  // Synchronize external level prop if updated
  useEffect(() => {
    if (selectedLevel) {
      setTopicLevelFilter(selectedLevel);
    }
  }, [selectedLevel]);

  // Audio refs
  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const nextStartTimeRef = useRef<number>(0);

  // Auto scroll transcriptions ref
  const transcriptionsEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll helper
  useEffect(() => {
    transcriptionsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Clean up audio & connections on unmount
  useEffect(() => {
    return () => {
      disconnectSession();
    };
  }, []);

  // Web Speech API Preview for topic prompts with natural pitch and neural voice
  function speakGermanSentence(text: string) {
    speakGerman(text);
  }

  // PCM float32 to Int16 array conversion
  function float32ToInt16(buffer: Float32Array): Int16Array {
    let l = buffer.length;
    const buf = new Int16Array(l);
    while (l--) {
      const s = Math.max(-1, Math.min(1, buffer[l]));
      buf[l] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return buf;
  }

  // Convert Int16 buffer to Base64
  function pcmToBase64(float32Array: Float32Array): string {
    const int16Array = float32ToInt16(float32Array);
    const bytes = new Uint8Array(int16Array.buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  // Base64 Int16 PCM back to Float32 array for AudioContext
  function base64ToFloat32(base64: string): Float32Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const int16Array = new Int16Array(bytes.buffer);
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768.0;
    }
    return float32Array;
  }

  // Precise gapless Audio playback
  function playAudioChunk(base64: string) {
    try {
      if (!outputAudioCtxRef.current) {
        outputAudioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
      }
      const ctx = outputAudioCtxRef.current;
      
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const pcmData = base64ToFloat32(base64);
      const audioBuffer = ctx.createBuffer(1, pcmData.length, 24000);
      audioBuffer.getChannelData(0).set(pcmData);

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);

      const currentTime = ctx.currentTime;
      if (nextStartTimeRef.current < currentTime) {
        nextStartTimeRef.current = currentTime;
      }

      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += audioBuffer.duration;

      setIsAiSpeaking(true);
      activeSourcesRef.current.push(source);

      source.onended = () => {
        activeSourcesRef.current = activeSourcesRef.current.filter(s => s !== source);
        if (activeSourcesRef.current.length === 0) {
          setIsAiSpeaking(false);
        }
      };
    } catch (e) {
      console.error("Playback scheduling error:", e);
    }
  }

  // Interruption/stop cleanup
  function stopAllAudio() {
    activeSourcesRef.current.forEach(source => {
      try {
        source.stop();
      } catch (e) {}
    });
    activeSourcesRef.current = [];
    nextStartTimeRef.current = 0;
    setIsAiSpeaking(false);
  }

  // Connect to server-side websocket and initialize recording
  async function connectSession(customTopic?: ConversationTopic) {
    if (isConnected || isConnecting) return;

    const topicToUse = customTopic || activeTopic;

    setError(null);
    setIsConnecting(true);
    setMessages([]);

    try {
      // 1. Initialize microphone stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // 2. Establish WebSocket connection
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/api/live-ws`;
      
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connection established");
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          
          if (msg.connected) {
            setIsConnected(true);
            setIsConnecting(false);
            
            // Start recording audio processor
            startMicProcessor(ws);
            
            // Construct initial lesson or scenario topic context prompt
            let initialPrompt = "";
            let welcomeText = "";

            if (activeLessonContext) {
              initialPrompt = `Hallo! Ich lerne gerade das Modul "${activeLessonContext.unitTitle}" auf Niveau ${activeLessonContext.level}. Grammatik-Schwerpunkt: ${activeLessonContext.grammarFocus}. Bitte sprich auf Deutsch mit mir zu diesem Thema!`;
              welcomeText = `Hallo! Willkommen zur Sprechübung für "${activeLessonContext.unitTitle}" (${activeLessonContext.level})! Ich bin dein Deutsch-Coach. Spreche einfach los oder nutze die Lektionsphrasen oben!`;
            } else if (topicToUse) {
              initialPrompt = `Hallo! Ich möchte über das Thema "${topicToUse.title}" auf Niveau ${topicToUse.level} sprechen. Mein Startsatz lautet: "${topicToUse.german}". Bitte sprich auf Deutsch mit mir dazu und stelle mir eine passend einfache Frage!`;
              welcomeText = `Hallo! Ich bin dein Deutsch-Coach. Lass uns über "${topicToUse.title}" (${topicToUse.level}) sprechen! Ich habe deine Nachricht erhalten: "${topicToUse.german}". Spreche einfach los!`;
            } else {
              initialPrompt = `Hallo! Ich lerne Deutsch auf Niveau ${selectedLevel || "A1"}. Lass uns sprechen!`;
              welcomeText = `Hallo! Ich bin dein Deutsch-Coach für Niveau ${selectedLevel || "A1"}. Lass uns Deutsch sprechen! Worüber möchtest du heute sprechen?`;
            }

            try {
              ws.send(JSON.stringify({ text: initialPrompt }));
            } catch (e) {
              console.error("Failed to send initial lesson prompt:", e);
            }

            setMessages([{
              id: "welcome",
              text: welcomeText,
              isModel: true,
              timestamp: new Date()
            }]);
          }

          if (msg.audio) {
            playAudioChunk(msg.audio);
          }

          if (msg.interrupted) {
            stopAllAudio();
          }

          if (msg.text) {
            // Append or update real-time transcriptions
            setMessages(prev => {
              const last = prev[prev.length - 1];
              const isSameTurn = last && last.isModel === msg.isModel && (Date.now() - last.timestamp.getTime() < 5000);
              
              if (isSameTurn) {
                return [
                  ...prev.slice(0, -1),
                  { ...last, text: last.text + " " + msg.text }
                ];
              } else {
                return [
                  ...prev,
                  {
                    id: Math.random().toString(),
                    text: msg.text,
                    isModel: msg.isModel,
                    timestamp: new Date()
                  }
                ];
              }
            });
          }

          if (msg.error) {
            setError(msg.error);
            disconnectSession();
          }
        } catch (err) {
          console.error("Failed to parse websocket message:", err);
        }
      };

      ws.onerror = (e) => {
        console.error("WebSocket error:", e);
        setError("WebSocket connection failed. Please ensure the server is fully started.");
        disconnectSession();
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
        disconnectSession();
      };

    } catch (err: any) {
      console.error("Microphone or WebSocket initialization failed:", err);
      setError(err.message || "Failed to access microphone. Please grant microphone permissions and try again.");
      setIsConnecting(false);
      disconnectSession();
    }
  }

  // Mic capture processor
  function startMicProcessor(ws: WebSocket) {
    try {
      const stream = mediaStreamRef.current;
      if (!stream) return;

      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      inputAudioCtxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const processor = ctx.createScriptProcessor(2048, 1, 1);
      scriptProcessorRef.current = processor;

      source.connect(processor);
      processor.connect(ctx.destination);

      let silentCount = 0;
      processor.onaudioprocess = (e) => {
        const channelData = e.inputBuffer.getChannelData(0);
        
        let sum = 0;
        for (let i = 0; i < channelData.length; i++) {
          sum += channelData[i] * channelData[i];
        }
        const rms = Math.sqrt(sum / channelData.length);
        if (rms > 0.015) {
          setIsUserSpeaking(true);
          silentCount = 0;
        } else {
          silentCount++;
          if (silentCount > 15) {
            setIsUserSpeaking(false);
          }
        }

        const base64 = pcmToBase64(channelData);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ audio: base64 }));
        }
      };
    } catch (e) {
      console.error("Error starting mic processor:", e);
    }
  }

  // Disconnect & Cleanup
  function disconnectSession() {
    stopAllAudio();
    setIsConnected(false);
    setIsConnecting(false);
    setIsUserSpeaking(false);

    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close();
      inputAudioCtxRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close().catch(() => {});
      outputAudioCtxRef.current = null;
    }

    if (wsRef.current) {
      if (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING) {
        wsRef.current.close();
      }
      wsRef.current = null;
    }
  }

  // Send textual message / helper prompt
  function sendPromptText(text: string) {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ text }));
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          text,
          isModel: false,
          timestamp: new Date()
        }
      ]);
    }
  }

  // Handle starting a scenario topic directly
  function handleSelectTopic(topic: ConversationTopic) {
    setActiveTopic(topic);
    if (onSelectLevel) {
      onSelectLevel(topic.level);
    }
    if (isConnected) {
      sendPromptText(`Lass uns über das Thema "${topic.title}" (${topic.level}) sprechen. Mein erster Satz: "${topic.german}"`);
    } else {
      connectSession(topic);
    }
  }

  // Filter topics based on Level, Category, and Search Query
  const filteredTopics = POPULAR_VOICE_TOPICS.filter((t) => {
    // Level match
    if (topicLevelFilter !== "ALL" && t.level !== topicLevelFilter) {
      return false;
    }
    // Category match
    if (categoryFilter !== "ALL" && t.category !== categoryFilter) {
      return false;
    }
    // Search query match
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchGerman = t.german.toLowerCase().includes(q);
      const matchEnglish = t.english.toLowerCase().includes(q);
      const matchKeywords = t.keywords.some(k => k.toLowerCase().includes(q));
      return matchTitle || matchGerman || matchEnglish || matchKeywords;
    }
    return true;
  });

  const categoriesList = [
    "ALL",
    "Everyday Life",
    "Food & Dining",
    "Shopping",
    "Travel & Places",
    "Social & Culture",
    "Work & Study",
    "Health & Wellness",
    "Tech & Society"
  ];

  return (
    <div className="space-y-6">
      
      {/* HEADER CONTROLS BOX */}
      <div className="bg-gradient-to-br from-indigo-50 via-teal-50/20 to-emerald-50/30 p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3 h-3 animate-pulse" />
                Live API Powered
              </span>
              <span className="bg-[#e8fcd8] text-[#46a302] border border-[#58cc02] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                Real-Time Voice
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Interactive German Voice Assistant
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
              Practice speaking German fluently with a responsive Gemini Voice Assistant. Select a popular conversation scenario below or speak naturally!
            </p>
          </div>

          <div className="flex sm:flex-row flex-col gap-3 min-w-[200px]">
            {!isConnected ? (
              <button
                id="btn-connect-voice"
                disabled={isConnecting}
                onClick={() => connectSession()}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-extrabold text-sm transition-all shadow-[0_4px_12px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_16px_rgba(79,70,229,0.4)] hover:translate-y-[-1px] active:translate-y-[1px] cursor-pointer"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Connecting to Coach...
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    Start Conversation
                  </>
                )}
              </button>
            ) : (
              <button
                id="btn-disconnect-voice"
                onClick={disconnectSession}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm transition-all shadow-[0_4px_12px_rgba(220,38,38,0.3)] hover:shadow-[0_6px_16px_rgba(220,38,38,0.4)] hover:translate-y-[-1px] active:translate-y-[1px] cursor-pointer"
              >
                <PhoneOff className="w-5 h-5" />
                End Conversation
              </button>
            )}
          </div>
        </div>

        {/* STATUS VISUALIZATION AREA */}
        <AnimatePresence>
          {isConnected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-slate-700 text-sm font-bold">
                  Coach Session is Live &bull; Speak into your microphone in German!
                </span>
              </div>

              {/* Real-time Interactive Waveform Visualization */}
              <div className="flex items-center gap-1 bg-slate-100/80 px-4 py-2.5 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 font-bold mr-2">Voice State:</span>
                
                {isAiSpeaking ? (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-indigo-600 font-black animate-pulse mr-1">Coach speaking</span>
                    <div className="flex items-end gap-0.5 h-4">
                      <span className="w-1 bg-indigo-600 animate-[bounce_0.6s_infinite] h-3"></span>
                      <span className="w-1 bg-indigo-600 animate-[bounce_0.6s_infinite_0.15s] h-4"></span>
                      <span className="w-1 bg-indigo-600 animate-[bounce_0.6s_infinite_0.3s] h-2"></span>
                      <span className="w-1 bg-indigo-600 animate-[bounce_0.6s_infinite_0.45s] h-4"></span>
                    </div>
                  </div>
                ) : isUserSpeaking ? (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-emerald-600 font-black mr-1">Listening to you</span>
                    <div className="flex items-end gap-0.5 h-4">
                      <span className="w-1 bg-emerald-500 animate-[bounce_0.5s_infinite] h-2"></span>
                      <span className="w-1 bg-emerald-500 animate-[bounce_0.5s_infinite_0.1s] h-4"></span>
                      <span className="w-1 bg-emerald-500 animate-[bounce_0.5s_infinite_0.2s] h-3"></span>
                      <span className="w-1 bg-emerald-500 animate-[bounce_0.5s_infinite_0.3s] h-4"></span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-400 font-bold mr-1">Waiting</span>
                    <div className="flex items-center gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-700 flex items-start gap-2 text-xs font-bold shadow-xs">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p>{error}</p>
              <p className="text-[10px] font-normal text-red-500">Ensure that your server is running, your microphone is enabled in the browser frame settings, and your GEMINI_API_KEY is configured in Settings &gt; Secrets.</p>
            </div>
          </div>
        )}
      </div>

      {/* ACTIVE TOPIC SCENARIO BANNER */}
      {activeTopic && (
        <div className="bg-indigo-900 text-white p-5 rounded-3xl border-2 border-indigo-400 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-amber-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Compass className="w-3 h-3" />
                Active Conversation Scenario
              </span>
              <span className="bg-indigo-700 text-indigo-100 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border border-indigo-500">
                {activeTopic.level} Level
              </span>
            </div>
            <h3 className="text-lg font-black flex items-center gap-2">
              <span>{activeTopic.emoji}</span>
              <span>{activeTopic.title}</span>
            </h3>
            <p className="text-xs text-indigo-200 font-medium italic">
              &quot;{activeTopic.german}&quot;
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <button
              type="button"
              onClick={() => speakGermanSentence(activeTopic.german)}
              className="p-2.5 bg-indigo-800 hover:bg-indigo-700 text-indigo-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-indigo-700 cursor-pointer"
              title="Listen to German scenario sentence"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveTopic(null)}
              className="px-3 py-2 bg-indigo-950 hover:bg-indigo-800 text-indigo-300 hover:text-white rounded-xl text-xs font-bold transition-all border border-indigo-800 cursor-pointer flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Topic</span>
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE LEARNING PLAN LESSON BANNER */}
      {activeLessonContext && (
        <div className="bg-slate-900 text-white p-5 md:p-6 rounded-3xl border-2 border-indigo-500 shadow-lg space-y-4 animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-amber-400 text-amber-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3 h-3 fill-amber-950" />
                  Linked Learning Module
                </span>
                <span className="bg-indigo-600 text-indigo-100 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-indigo-400">
                  {activeLessonContext.level} Level
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-black tracking-tight">{activeLessonContext.unitTitle}</h3>
              <p className="text-xs text-indigo-200 font-medium mt-0.5">
                Grammar Focus: <strong className="text-amber-300 font-bold">{activeLessonContext.grammarFocus}</strong>
              </p>
            </div>

            {onClearLessonContext && (
              <button
                type="button"
                onClick={onClearLessonContext}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold border border-slate-700 transition-all shrink-0 cursor-pointer flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Exit Lesson Mode</span>
              </button>
            )}
          </div>

          {/* Key Phrases in this lesson module */}
          {activeLessonContext.keyPhrases && activeLessonContext.keyPhrases.length > 0 && (
            <div className="space-y-2">
              <span className="block text-[10px] font-black uppercase tracking-wider text-indigo-300">
                Lesson Vocabulary &amp; Sentences to Practice:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeLessonContext.keyPhrases.map((kp, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-2xl flex items-center justify-between gap-2 hover:border-indigo-400 transition-colors"
                  >
                    <div>
                      <span className="block text-xs font-black text-white">{kp.german}</span>
                      <span className="block text-[11px] font-medium text-slate-400">{kp.english}</span>
                    </div>
                    {isConnected && (
                      <button
                        type="button"
                        onClick={() => sendPromptText(`Lass uns folgenden Satz aus der Lektion üben: "${kp.german}"`)}
                        className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-amber-950 text-[10px] font-black rounded-lg transition-all shrink-0 cursor-pointer shadow-2xs"
                        title="Practice phrase with coach"
                      >
                        Practice
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isConnected && (
            <div className="pt-2 flex items-center justify-between gap-4 border-t border-slate-800">
              <p className="text-xs text-slate-300 font-medium">
                Ready to practice speaking for <strong className="text-white">{activeLessonContext.unitTitle}</strong>?
              </p>
              <button
                type="button"
                onClick={() => connectSession()}
                disabled={isConnecting}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
              >
                <Mic className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>Start Session</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* CONVERSATION TRANSCRIPTIONS CONTAINER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[480px]">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-600" />
            <h3 className="font-extrabold text-slate-900 text-sm">Real-time Transcription & Dialogue</h3>
          </div>
          {isConnected && (
            <button 
              onClick={stopAllAudio}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-600 text-xs font-bold transition-all border border-slate-200/60 cursor-pointer"
              title="Stop playback"
            >
              <VolumeX className="w-3.5 h-3.5" />
              Stop Playback
            </button>
          )}
        </div>

        {/* MESSAGES VIEWPORT */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar bg-slate-50/40">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                <Bot className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-sm">
                <p className="font-bold text-slate-700 text-sm">No Active Conversation</p>
                <p className="text-xs text-slate-400">Click &quot;Start Conversation&quot; or pick a popular topic below to connect with the Live Gemini API.</p>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[85%] ${msg.isModel ? "mr-auto" : "ml-auto flex-row-reverse"}`}
              >
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                  msg.isModel ? "bg-indigo-100 text-indigo-700" : "bg-emerald-100 text-emerald-700"
                }`}>
                  {msg.isModel ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className={`p-4 rounded-2xl border text-sm font-medium leading-relaxed shadow-xs ${
                  msg.isModel 
                    ? "bg-white text-slate-800 border-slate-200 rounded-tl-none" 
                    : "bg-indigo-600 text-white border-indigo-700 rounded-tr-none"
                }`}>
                  <p>{msg.text}</p>
                  <span className={`block text-[9px] mt-1.5 text-right font-semibold ${msg.isModel ? "text-slate-400" : "text-indigo-200"}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))
          )}
          <div ref={transcriptionsEndRef} />
        </div>
      </div>

      {/* POPULAR GERMAN CONVERSATION TOPICS (A1 - B2) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                <Languages className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base md:text-lg tracking-tight">
                  Popular Voice Conversation Topics (A1 - B2)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {POPULAR_VOICE_TOPICS.length} real-life dialogue scenarios tailored for all CEFR proficiency levels.
                </p>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics or keywords..."
              className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-2xl text-xs font-medium text-slate-800 placeholder-slate-400 outline-none transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Level Filter Switcher */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
              Filter by Level
            </span>
            <span className="text-xs font-extrabold text-slate-500">
              Showing {filteredTopics.length} of {POPULAR_VOICE_TOPICS.length} topics
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {[
              { id: "ALL", label: "All Levels", count: POPULAR_VOICE_TOPICS.length, activeBg: "bg-slate-900 text-white border-slate-900" },
              { id: "A1", label: "A1 Beginner", count: POPULAR_VOICE_TOPICS.filter(t => t.level === "A1").length, activeBg: "bg-emerald-600 text-white border-emerald-700" },
              { id: "A2", label: "A2 Elementary", count: POPULAR_VOICE_TOPICS.filter(t => t.level === "A2").length, activeBg: "bg-amber-500 text-white border-amber-600" },
              { id: "B1", label: "B1 Intermediate", count: POPULAR_VOICE_TOPICS.filter(t => t.level === "B1").length, activeBg: "bg-blue-600 text-white border-blue-700" },
              { id: "B2", label: "B2 Upper-Inter", count: POPULAR_VOICE_TOPICS.filter(t => t.level === "B2").length, activeBg: "bg-purple-600 text-white border-purple-700" }
            ].map((lvl) => {
              const isSelected = topicLevelFilter === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => {
                    setTopicLevelFilter(lvl.id);
                    if (onSelectLevel && lvl.id !== "ALL") {
                      onSelectLevel(lvl.id);
                    }
                  }}
                  className={`py-2.5 px-2 rounded-2xl text-[11px] font-black uppercase tracking-wider border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 shadow-2xs ${
                    isSelected
                      ? `${lvl.activeBg} shadow-sm translate-y-[-1px]`
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span>{lvl.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                  }`}>
                    {lvl.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mr-1.5 flex items-center gap-1">
            <Tag className="w-3 h-3" />
            Category:
          </span>
          {categoriesList.map((cat) => {
            const isSelected = categoryFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-700 shadow-2xs"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {cat === "ALL" ? "All Categories" : cat}
              </button>
            );
          })}
        </div>

        {/* TOPICS GRID DISPLAY */}
        {filteredTopics.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
            <p className="text-sm font-bold text-slate-700">No topics found matching your filter.</p>
            <p className="text-xs text-slate-400">Try adjusting your search query or selecting &quot;All Levels&quot;.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setTopicLevelFilter("ALL");
                setCategoryFilter("ALL");
              }}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-indigo-700 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTopics.map((topic) => {
              const levelBadgeStyle = 
                topic.level === "A1" ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
                topic.level === "A2" ? "bg-amber-100 text-amber-800 border-amber-200" :
                topic.level === "B1" ? "bg-blue-100 text-blue-800 border-blue-200" :
                "bg-purple-100 text-purple-800 border-purple-200";

              const isTopicActive = activeTopic?.id === topic.id;

              return (
                <div 
                  key={topic.id} 
                  className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between gap-4 group relative bg-white shadow-2xs ${
                    isTopicActive 
                      ? "border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/20 shadow-md" 
                      : "border-slate-200/90 hover:border-indigo-400 hover:shadow-sm"
                  }`}
                >
                  <div className="space-y-3">
                    
                    {/* Card Top Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl p-1.5 bg-slate-50 rounded-xl border border-slate-100 shrink-0">
                          {topic.emoji}
                        </span>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm tracking-tight group-hover:text-indigo-600 transition-colors">
                            {topic.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">
                            Category: {topic.category}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border shrink-0 ${levelBadgeStyle}`}>
                        {topic.level}
                      </span>
                    </div>

                    {/* German Prompt Quote Box */}
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/90 relative group/quote">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-slate-800 text-xs font-bold leading-relaxed pr-6 select-all font-sans">
                          &ldquo;{topic.german}&rdquo;
                        </p>
                        <button
                          type="button"
                          onClick={() => speakGermanSentence(topic.german)}
                          className="p-1.5 bg-white hover:bg-slate-200/80 text-slate-600 hover:text-indigo-600 rounded-lg border border-slate-200 shadow-2xs transition-all shrink-0 cursor-pointer"
                          title="Listen to German pronunciation"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-slate-500 text-[11px] font-medium italic mt-1 pt-1 border-t border-slate-200/50">
                        {topic.english}
                      </p>
                    </div>

                    {/* Keywords / Vocabulary Chips */}
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <Lightbulb className="w-3 h-3 text-amber-500" /> Key Vocabulary:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {topic.keywords.map((kw, i) => (
                          <span 
                            key={i}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-slate-200/70 transition-colors"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Trigger Button */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => speakGermanSentence(topic.german)}
                      className="text-slate-500 hover:text-slate-800 text-[11px] font-extrabold flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                      Listen Preview
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectTopic(topic)}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                        isTopicActive
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : isConnected
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-slate-900 hover:bg-slate-800 text-white"
                      }`}
                    >
                      {isConnected ? (
                        <>
                          <span>Send to Coach</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <Mic className="w-3.5 h-3.5 text-amber-300" />
                          <span>Start Scenario</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
}
