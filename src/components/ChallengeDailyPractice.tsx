import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  ChallengeProgress, 
  ChallengeItem, 
  ChallengeDirection,
  PracticeQuestion, 
  DailySessionResult,
  GrammarTopic
} from "../types/challenge";
import { 
  getAdaptiveReviewItems, 
  buildPracticeQuestions, 
  applyDailySessionResults 
} from "../utils/challengeEngine";
import { getGrammarTopicForDay } from "../data/challenge_grammar";
import { speakGerman } from "../utils/speechService";
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCw, 
  Trophy, 
  BookOpen, 
  MessageSquare, 
  Check, 
  X, 
  Mic, 
  MicOff, 
  Award,
  Zap,
  HelpCircle,
  Clock,
  Layers,
  Target,
  AlertTriangle,
  FileText,
  ArrowLeftRight
} from "lucide-react";

interface ChallengeDailyPracticeProps {
  challenge: ChallengeProgress;
  dayNumber: number;
  onFinishSession: (updatedChallenge: ChallengeProgress, result: DailySessionResult) => void;
  onExit: () => void;
  onAddXP?: (xp: number) => void;
  onUpdateDirection?: (newDir: ChallengeDirection) => void;
}

type PracticeStage = "overview" | "grammar_lesson" | "new_vocab" | "new_phrases" | "review_spaced" | "practice" | "results";

export const ChallengeDailyPractice: React.FC<ChallengeDailyPracticeProps> = ({
  challenge,
  dayNumber,
  onFinishSession,
  onExit,
  onAddXP,
  onUpdateDirection
}) => {
  const day = challenge.days[dayNumber] || {
    dayNumber,
    status: "available",
    newVocabIds: [],
    newPhraseIds: [],
    reviewIds: []
  };

  // Study Direction State (switchable on-the-fly)
  const [sessionDirection, setSessionDirection] = useState<ChallengeDirection>(challenge.direction || "de-to-en");

  // 1. Gather Day Grammar Topic (for A1, A2, B1, B2)
  const grammarTopic: GrammarTopic | undefined = useMemo(() => {
    if (challenge.contentType === "vocab" || challenge.contentType === "phrases") {
      return undefined;
    }
    return getGrammarTopicForDay(challenge.level, dayNumber);
  }, [challenge.level, challenge.contentType, dayNumber]);

  // 2. Gather Day Content
  const newVocabItems: ChallengeItem[] = useMemo(() => {
    return (day.newVocabIds || []).map(id => challenge.items[id]).filter(Boolean);
  }, [day, challenge]);

  const newPhraseItems: ChallengeItem[] = useMemo(() => {
    return (day.newPhraseIds || []).map(id => challenge.items[id]).filter(Boolean);
  }, [day, challenge]);

  const reviewItems: ChallengeItem[] = useMemo(() => {
    return getAdaptiveReviewItems(challenge, dayNumber);
  }, [challenge, dayNumber]);

  // 3. Build practice questions (including grammar drills & direction)
  const practiceQuestions: PracticeQuestion[] = useMemo(() => {
    const allItems = Object.values(challenge.items) as ChallengeItem[];
    return buildPracticeQuestions(
      [...newVocabItems, ...newPhraseItems],
      reviewItems,
      allItems,
      grammarTopic,
      sessionDirection
    );
  }, [newVocabItems, newPhraseItems, reviewItems, challenge, grammarTopic, sessionDirection]);

  // Flow State
  const [stage, setStage] = useState<PracticeStage>("overview");
  
  // Card step indices
  const [vocabIndex, setVocabIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Practice Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState<boolean | null>(null);
  
  // Audio Speech Recognition for Speaking Questions
  const [isListening, setIsListening] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  // Accumulated answers for recording results
  const [answers, setAnswers] = useState<{ itemId: string; correct: boolean }[]>([]);
  const [sessionResult, setSessionResult] = useState<DailySessionResult | null>(null);

  // Audio pronunciation helper
  const playAudio = (text: string, slow: boolean = false) => {
    speakGerman(text, { slow });
  };

  // Move between stages
  const startLearning = () => {
    if (grammarTopic) {
      setStage("grammar_lesson");
    } else if (newVocabItems.length > 0) {
      setStage("new_vocab");
    } else if (newPhraseItems.length > 0) {
      setStage("new_phrases");
    } else if (reviewItems.length > 0) {
      setStage("review_spaced");
    } else if (practiceQuestions.length > 0) {
      setStage("practice");
    } else {
      finishPractice([]);
    }
  };

  const handleFinishGrammarLesson = () => {
    if (newVocabItems.length > 0) {
      setStage("new_vocab");
    } else if (newPhraseItems.length > 0) {
      setStage("new_phrases");
    } else if (reviewItems.length > 0) {
      setStage("review_spaced");
    } else if (practiceQuestions.length > 0) {
      setStage("practice");
    } else {
      finishPractice([]);
    }
  };

  const handleNextVocab = (gotIt: boolean) => {
    const currentItem = newVocabItems[vocabIndex];
    if (currentItem) {
      setAnswers(prev => [...prev, { itemId: currentItem.id, correct: gotIt }]);
    }
    setIsCardFlipped(false);
    if (vocabIndex + 1 < newVocabItems.length) {
      setVocabIndex(prev => prev + 1);
    } else {
      if (newPhraseItems.length > 0) {
        setStage("new_phrases");
      } else if (reviewItems.length > 0) {
        setStage("review_spaced");
      } else if (practiceQuestions.length > 0) {
        setStage("practice");
      } else {
        finishPractice([...answers, { itemId: currentItem.id, correct: gotIt }]);
      }
    }
  };

  const handleNextPhrase = (gotIt: boolean) => {
    const currentItem = newPhraseItems[phraseIndex];
    if (currentItem) {
      setAnswers(prev => [...prev, { itemId: currentItem.id, correct: gotIt }]);
    }
    setIsCardFlipped(false);
    if (phraseIndex + 1 < newPhraseItems.length) {
      setPhraseIndex(prev => prev + 1);
    } else {
      if (reviewItems.length > 0) {
        setStage("review_spaced");
      } else if (practiceQuestions.length > 0) {
        setStage("practice");
      } else {
        finishPractice([...answers, { itemId: currentItem.id, correct: gotIt }]);
      }
    }
  };

  const handleNextReview = (gotIt: boolean) => {
    const currentItem = reviewItems[reviewIndex];
    if (currentItem) {
      setAnswers(prev => [...prev, { itemId: currentItem.id, correct: gotIt }]);
    }
    setIsCardFlipped(false);
    if (reviewIndex + 1 < reviewItems.length) {
      setReviewIndex(prev => prev + 1);
    } else {
      if (practiceQuestions.length > 0) {
        setStage("practice");
      } else {
        finishPractice([...answers, { itemId: currentItem.id, correct: gotIt }]);
      }
    }
  };

  // Practice Quiz Answer Handler
  const handleAnswerSelect = (option: string) => {
    if (isQuestionAnswered) return;
    const currentQ = practiceQuestions[quizIndex];
    if (!currentQ) return;

    setSelectedOption(option);
    setIsQuestionAnswered(true);

    const isCorrect = option.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();
    setIsCurrentCorrect(isCorrect);

    setAnswers(prev => [...prev, { itemId: currentQ.itemId, correct: isCorrect }]);
  };

  // Speech Recognition for Speaking Questions
  const startSpeechRecognition = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser. You can select an answer manually or proceed!");
      return;
    }

    try {
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRec();
      recognition.lang = "de-DE";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setSpokenTranscript("");
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSpokenTranscript(transcript);
        setIsListening(false);
        setIsQuestionAnswered(true);

        const currentQ = practiceQuestions[quizIndex];
        if (currentQ) {
          const target = currentQ.germanText.toLowerCase().replace(/[^a-zäöüß]/g, "");
          const spoken = transcript.toLowerCase().replace(/[^a-zäöüß]/g, "");
          const match = spoken.includes(target) || target.includes(spoken) || spoken.length >= 3;
          setIsCurrentCorrect(match);
          setAnswers(prev => [...prev, { itemId: currentQ.itemId, correct: match }]);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch {
      setIsListening(false);
    }
  };

  const handleNextQuizQuestion = () => {
    setSelectedOption(null);
    setIsQuestionAnswered(false);
    setIsCurrentCorrect(null);
    setSpokenTranscript("");

    if (quizIndex + 1 < practiceQuestions.length) {
      setQuizIndex(prev => prev + 1);
    } else {
      finishPractice(answers);
    }
  };

  const finishPractice = (finalAnswers: { itemId: string; correct: boolean }[]) => {
    const { updatedChallenge, result } = applyDailySessionResults(challenge, dayNumber, finalAnswers, true);
    updatedChallenge.direction = sessionDirection;
    setSessionResult(result);
    setStage("results");
    if (onAddXP && result.xpEarned) {
      onAddXP(result.xpEarned);
    }
    if (onUpdateDirection) {
      onUpdateDirection(sessionDirection);
    }
    onFinishSession(updatedChallenge, result);
  };

  // Clean speech listeners on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  // Compute Overall Progress percentage in practice
  const grammarStep = grammarTopic ? 1 : 0;
  const totalSteps = grammarStep + newVocabItems.length + newPhraseItems.length + reviewItems.length + practiceQuestions.length;
  const currentStepNum = 
    stage === "overview" ? 0 :
    stage === "grammar_lesson" ? 1 :
    stage === "new_vocab" ? grammarStep + vocabIndex + 1 :
    stage === "new_phrases" ? grammarStep + newVocabItems.length + phraseIndex + 1 :
    stage === "review_spaced" ? grammarStep + newVocabItems.length + newPhraseItems.length + reviewIndex + 1 :
    stage === "practice" ? grammarStep + newVocabItems.length + newPhraseItems.length + reviewItems.length + quizIndex + 1 :
    totalSteps;

  const progressPct = totalSteps > 0 ? Math.min(100, Math.round((currentStepNum / totalSteps) * 100)) : 100;

  // Resolved rules & tables & examples for grammarTopic
  const topicRules = grammarTopic?.rules || (grammarTopic?.ruleExplanation || []).map((r, i) => ({
    rule: `Rule ${i + 1}`,
    explanation: r,
    formula: grammarTopic?.formula
  }));

  const topicTables = grammarTopic?.tables || (grammarTopic?.table ? [grammarTopic.table] : []);

  const topicMistakes = grammarTopic?.commonMistakes || (grammarTopic?.commonMistake ? [{
    incorrect: grammarTopic.commonMistake.mistake,
    correct: grammarTopic.commonMistake.correction,
    explanation: grammarTopic.commonMistake.explanation
  }] : []);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      
      {/* Top Header & Progress Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={onExit}
              className="px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              ← Exit
            </button>
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">
              Day {dayNumber} of {challenge.durationDays}
            </span>
          </div>

          {/* Translation Direction Quick-Switch */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => {
                setSessionDirection("de-to-en");
                setIsCardFlipped(false);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                sessionDirection === "de-to-en" 
                  ? "bg-white text-[#1cb0f6] shadow-xs" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="German to English (Understand German prompts)"
            >
              🇩🇪 DE ➔ EN
            </button>
            <button
              type="button"
              onClick={() => {
                setSessionDirection("en-to-de");
                setIsCardFlipped(false);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                sessionDirection === "en-to-de" 
                  ? "bg-white text-emerald-600 shadow-xs" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="English to German (Active recall and spelling)"
            >
              🇬🇧 EN ➔ DE
            </button>
            <button
              type="button"
              onClick={() => {
                setSessionDirection("mixed");
                setIsCardFlipped(false);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                sessionDirection === "mixed" 
                  ? "bg-white text-purple-600 shadow-xs" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Mixed Direction (Alternating)"
            >
              🔀 Mixed
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{challenge.currentStreak}d Streak</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#1cb0f6] via-[#235390] to-[#58cc02] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* STAGE 1: OVERVIEW / BRIEFING */}
      {stage === "overview" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-[#ddf4ff] border-2 border-[#1cb0f6] flex items-center justify-center mx-auto text-[#1cb0f6] shadow-sm">
            <Target className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#1cb0f6] block mb-1">
              Ready for Day {dayNumber}?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Today&apos;s Learning Goal
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1 max-w-md mx-auto">
              Master your daily grammar blueprint, acquire new vocabulary &amp; expressions, reinforce difficult concepts, and practice interactively!
            </p>
          </div>

          {/* Direction Info Banner */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#1cb0f6] border border-slate-200 shadow-2xs">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                  Current Translation Mode
                </span>
                <span className="text-xs font-medium text-slate-600">
                  {sessionDirection === "de-to-en" 
                    ? "🇩🇪 German ➔ 🇬🇧 English (Comprehension)" 
                    : sessionDirection === "en-to-de" 
                    ? "🇬🇧 English ➔ 🇩🇪 German (Active Production)" 
                    : "🔀 Mixed Mode (Bi-directional Recall)"}
                </span>
              </div>
            </div>

            <span className="text-[11px] font-bold text-slate-400">
              Switch anytime at top
            </span>
          </div>

          {/* Goal Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
            {grammarTopic && (
              <div className="bg-purple-50/80 p-3.5 rounded-2xl border border-purple-200/80 col-span-2 sm:col-span-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 mb-1">
                  <Layers className="w-3.5 h-3.5 text-purple-600" />
                  <span>Daily Grammar Blueprint (Day {dayNumber})</span>
                </div>
                <strong className="text-base font-black text-purple-950 block">{grammarTopic.title}</strong>
                <span className="text-xs text-purple-700 font-medium block mt-0.5">{grammarTopic.englishTitle || grammarTopic.summary}</span>
              </div>
            )}

            {newVocabItems.length > 0 && (
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#1cb0f6]" />
                  <span>New Vocab</span>
                </div>
                <strong className="text-xl font-black text-slate-800">{newVocabItems.length} words</strong>
              </div>
            )}

            {newPhraseItems.length > 0 && (
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                  <span>New Phrases</span>
                </div>
                <strong className="text-xl font-black text-slate-800">{newPhraseItems.length} phrases</strong>
              </div>
            )}

            {reviewItems.length > 0 && (
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
                  <RotateCw className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Spaced Review</span>
                </div>
                <strong className="text-xl font-black text-slate-800">{reviewItems.length} items</strong>
              </div>
            )}

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 col-span-2 sm:col-span-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-600 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Interactive Drills &amp; Practice
                </span>
                <span className="font-black text-slate-800">{practiceQuestions.length} Questions</span>
              </div>
            </div>
          </div>

          <button
            onClick={startLearning}
            className="w-full py-4 rounded-2xl bg-[#58cc02] hover:bg-[#61e002] text-white font-black text-base uppercase tracking-wider shadow-lg border-b-4 border-[#46a302] active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Begin Day {dayNumber} Session</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* STAGE 1.5: DEDICATED GRAMMAR LESSON */}
      {stage === "grammar_lesson" && grammarTopic && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-200 shadow-md space-y-6">
            
            {/* Header */}
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Grammar Blueprint • Day {dayNumber} ({challenge.level})
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Topic {dayNumber} of 30
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {grammarTopic.title}
              </h2>
              {grammarTopic.englishTitle && (
                <p className="text-sm font-bold text-purple-700 mt-0.5">
                  {grammarTopic.englishTitle}
                </p>
              )}
              <p className="text-sm text-slate-600 font-medium mt-2 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
                {grammarTopic.summary}
              </p>
            </div>

            {/* Key Rules */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-700">
                <FileText className="w-4 h-4 text-purple-600" />
                <span>Essential Grammar Rules</span>
              </div>
              <div className="space-y-2.5">
                {topicRules.map((rule, rIdx) => (
                  <div key={rIdx} className="bg-purple-50/50 p-3.5 rounded-2xl border border-purple-100 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-800 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {rIdx + 1}
                      </span>
                      <div className="space-y-1">
                        <strong className="font-black text-slate-900 block text-xs">{rule.rule}</strong>
                        {rule.explanation && <p className="text-slate-600 font-medium">{rule.explanation}</p>}
                        {rule.formula && (
                          <div className="inline-block px-2.5 py-1 bg-white rounded-lg border border-purple-200 font-mono text-[11px] font-bold text-purple-900 mt-1">
                            📐 Formula: {rule.formula}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grammar Tables (if present) */}
            {topicTables.length > 0 && (
              <div className="space-y-4">
                {topicTables.map((table, tIdx) => (
                  <div key={tIdx} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 overflow-hidden space-y-2">
                    {table.title && (
                      <strong className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                        📊 {table.title}
                      </strong>
                    )}
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 bg-slate-100/80">
                            {table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-2.5 font-black text-slate-700 whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/60 bg-white">
                          {table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-purple-50/40 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className={`p-2.5 ${cIdx === 0 ? "font-bold text-slate-900" : "text-slate-700"}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Examples with audio */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-700">
                <Volume2 className="w-4 h-4 text-[#1cb0f6]" />
                <span>Illustrated Example Sentences</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {grammarTopic.examples.map((ex, eIdx) => {
                  const germanText = ex.german || ex.de;
                  const englishText = ex.english || ex.en;
                  return (
                    <div key={eIdx} className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-bold text-slate-900 leading-snug">
                          &ldquo;{germanText}&rdquo;
                        </p>
                        <button
                          onClick={() => playAudio(germanText)}
                          className="p-1.5 rounded-lg bg-[#ddf4ff] hover:bg-[#1cb0f6] text-[#1cb0f6] hover:text-white transition-colors shrink-0"
                          title="Listen"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        &ldquo;{englishText}&rdquo;
                      </p>
                      {ex.note && (
                        <span className="inline-block text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                          💡 {ex.note}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Common Mistakes Callout */}
            {topicMistakes.length > 0 && (
              <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Common Pitfalls to Avoid</span>
                </div>
                <div className="space-y-2 text-xs">
                  {topicMistakes.map((mis, mIdx) => (
                    <div key={mIdx} className="bg-white/80 p-2.5 rounded-xl border border-amber-200/60">
                      <div className="flex items-center gap-2 mb-1">
                        {mis.incorrect && <span className="text-red-600 font-bold line-through">❌ {mis.incorrect}</span>}
                        {mis.correct && <span className="text-emerald-700 font-black">✓ {mis.correct}</span>}
                      </div>
                      <p className="text-[11px] text-slate-600">{mis.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Continue CTA */}
            <button
              onClick={handleFinishGrammarLesson}
              className="w-full py-4 rounded-2xl bg-[#58cc02] hover:bg-[#61e002] text-white font-black text-sm uppercase tracking-wider shadow-lg border-b-4 border-[#46a302] active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>I Understand! Continue to Practice &amp; Drills</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: LEARN NEW VOCABULARY */}
      {stage === "new_vocab" && newVocabItems[vocabIndex] && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#1cb0f6] bg-[#ddf4ff] px-3 py-1 rounded-full">
              New Word ({vocabIndex + 1} of {newVocabItems.length})
            </span>
            <span className="text-xs font-bold text-slate-400">Flip card to test recall</span>
          </div>

          {/* 3D-feel Flashcard */}
          {(() => {
            const item = newVocabItems[vocabIndex];
            const isEnToDe = sessionDirection === "en-to-de" || (sessionDirection === "mixed" && vocabIndex % 2 === 1);
            return (
              <div 
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md min-h-[280px] flex flex-col justify-between cursor-pointer hover:border-[#1cb0f6] transition-all relative overflow-hidden group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-black uppercase px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
                      {item.type || "Vocabulary"}
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      isEnToDe ? "bg-emerald-100 text-emerald-700" : "bg-[#ddf4ff] text-[#1cb0f6]"
                    }`}>
                      {isEnToDe ? "🇬🇧 EN ➔ 🇩🇪 DE" : "🇩🇪 DE ➔ 🇬🇧 EN"}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(item.german);
                    }}
                    className="w-10 h-10 rounded-2xl bg-[#ddf4ff] hover:bg-[#1cb0f6] text-[#1cb0f6] hover:text-white flex items-center justify-center transition-colors shadow-xs"
                    title="Listen to German audio"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center my-6">
                  {!isEnToDe ? (
                    <>
                      <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
                        {item.german}
                      </h3>
                      {item.phonetic && (
                        <p className="text-xs font-bold text-[#1cb0f6] tracking-wide mb-3">
                          🗣️ &ldquo;{item.phonetic}&rdquo;
                        </p>
                      )}
                      {item.forms && (
                        <p className="text-xs font-medium text-slate-500 italic">
                          Forms: {item.forms}
                        </p>
                      )}

                      {/* Flipped Translation Content */}
                      {isCardFlipped ? (
                        <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in">
                          <p className="text-lg sm:text-xl font-black text-emerald-700">
                            {item.english}
                          </p>
                          {item.examples && item.examples[0] && (
                            <div className="mt-3 bg-slate-50 p-3 rounded-xl text-xs text-slate-700 border border-slate-200/60">
                              <p className="font-semibold italic">&ldquo;{item.examples[0].de}&rdquo;</p>
                              <p className="text-slate-500 mt-0.5">&ldquo;{item.examples[0].en}&rdquo;</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="mt-4 text-xs font-bold text-slate-400">
                          Tap to reveal English translation &amp; examples
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="text-[11px] font-extrabold uppercase text-slate-400 block mb-1">
                        Translate into German:
                      </span>
                      <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
                        {item.english}
                      </h3>
                      {item.type && (
                        <p className="text-xs font-semibold text-slate-500 mb-2">
                          Category: <span className="text-slate-700 font-bold">{item.type}</span>
                        </p>
                      )}

                      {isCardFlipped ? (
                        <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in">
                          <p className="text-2xl sm:text-3xl font-black text-emerald-700">
                            {item.german}
                          </p>
                          {item.phonetic && (
                            <p className="text-xs font-bold text-[#1cb0f6] tracking-wide mt-1">
                              🗣️ &ldquo;{item.phonetic}&rdquo;
                            </p>
                          )}
                          {item.forms && (
                            <p className="text-xs font-semibold text-slate-600 italic mt-1">
                              Forms: {item.forms}
                            </p>
                          )}
                          {item.examples && item.examples[0] && (
                            <div className="mt-3 bg-slate-50 p-3 rounded-xl text-xs text-slate-700 border border-slate-200/60">
                              <p className="font-semibold italic">&ldquo;{item.examples[0].de}&rdquo;</p>
                              <p className="text-slate-500 mt-0.5">&ldquo;{item.examples[0].en}&rdquo;</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="mt-4 text-xs font-bold text-slate-400">
                          Tap to reveal German spelling, gender article &amp; audio
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>{challenge.level} Level</span>
                  <span className="font-bold text-[#1cb0f6]">Click to Flip ↺</span>
                </div>
              </div>
            );
          })()}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleNextVocab(false)}
              className="py-3.5 rounded-2xl bg-white hover:bg-red-50 border-2 border-red-200 text-red-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <RotateCw className="w-4 h-4" />
              <span>Need Practice</span>
            </button>
            <button
              onClick={() => handleNextVocab(true)}
              className="py-3.5 rounded-2xl bg-[#58cc02] hover:bg-[#61e002] text-white font-black text-xs uppercase tracking-wider border-b-4 border-[#46a302] active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Check className="w-4 h-4 stroke-[3px]" />
              <span>Got It! Next</span>
            </button>
          </div>
        </div>
      )}

      {/* STAGE 3: LEARN NEW PHRASES */}
      {stage === "new_phrases" && newPhraseItems[phraseIndex] && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
              Key Phrase ({phraseIndex + 1} of {newPhraseItems.length})
            </span>
            <span className="text-xs font-bold text-slate-400">Flip for meaning</span>
          </div>

          {/* Phrase Card */}
          {(() => {
            const item = newPhraseItems[phraseIndex];
            const isEnToDe = sessionDirection === "en-to-de" || (sessionDirection === "mixed" && phraseIndex % 2 === 1);
            return (
              <div 
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md min-h-[280px] flex flex-col justify-between cursor-pointer hover:border-purple-400 transition-all relative"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-black uppercase px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg">
                      Common Expression
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      isEnToDe ? "bg-emerald-100 text-emerald-700" : "bg-purple-100 text-purple-700"
                    }`}>
                      {isEnToDe ? "🇬🇧 EN ➔ 🇩🇪 DE" : "🇩🇪 DE ➔ 🇬🇧 EN"}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(item.german);
                    }}
                    className="w-10 h-10 rounded-2xl bg-purple-100 hover:bg-purple-600 text-purple-700 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                    title="Listen"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center my-6">
                  {!isEnToDe ? (
                    <>
                      <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                        &ldquo;{item.german}&rdquo;
                      </h3>
                      {item.phonetic && (
                        <p className="text-xs font-bold text-purple-600 mb-3">
                          🗣️ {item.phonetic}
                        </p>
                      )}

                      {isCardFlipped ? (
                        <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in">
                          <p className="text-lg sm:text-xl font-black text-emerald-700">
                            &ldquo;{item.english}&rdquo;
                          </p>
                        </div>
                      ) : (
                        <div className="mt-4 text-xs font-bold text-slate-400">
                          Tap card to reveal English meaning
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="text-[11px] font-extrabold uppercase text-slate-400 block mb-1">
                        Translate phrase into German:
                      </span>
                      <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                        &ldquo;{item.english}&rdquo;
                      </h3>

                      {isCardFlipped ? (
                        <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in">
                          <p className="text-xl sm:text-2xl font-black text-emerald-700">
                            &ldquo;{item.german}&rdquo;
                          </p>
                          {item.phonetic && (
                            <p className="text-xs font-bold text-purple-600 mt-1">
                              🗣️ {item.phonetic}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="mt-4 text-xs font-bold text-slate-400">
                          Tap card to reveal German expression &amp; audio
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>{challenge.level} Phrase</span>
                  <span className="font-bold text-purple-600">Click to Flip ↺</span>
                </div>
              </div>
            );
          })()}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleNextPhrase(false)}
              className="py-3.5 rounded-2xl bg-white hover:bg-red-50 border-2 border-red-200 text-red-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <RotateCw className="w-4 h-4" />
              <span>Need Practice</span>
            </button>
            <button
              onClick={() => handleNextPhrase(true)}
              className="py-3.5 rounded-2xl bg-[#58cc02] hover:bg-[#61e002] text-white font-black text-xs uppercase tracking-wider border-b-4 border-[#46a302] active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Check className="w-4 h-4 stroke-[3px]" />
              <span>Got It! Next</span>
            </button>
          </div>
        </div>
      )}

      {/* STAGE 4: SPACED REPETITION REVIEW */}
      {stage === "review_spaced" && reviewItems[reviewIndex] && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
              <RotateCw className="w-3 h-3" />
              Spaced Review ({reviewIndex + 1} of {reviewItems.length})
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
              reviewItems[reviewIndex].learningState === "DIFFICULT" 
                ? "bg-red-100 text-red-700" 
                : "bg-blue-100 text-blue-700"
            }`}>
              {reviewItems[reviewIndex].learningState}
            </span>
          </div>

          {(() => {
            const item = reviewItems[reviewIndex];
            const isEnToDe = sessionDirection === "en-to-de" || (sessionDirection === "mixed" && reviewIndex % 2 === 1);
            return (
              <div 
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md min-h-[280px] flex flex-col justify-between cursor-pointer hover:border-emerald-500 transition-all relative"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-black uppercase px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
                      Prior Review
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      isEnToDe ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {isEnToDe ? "🇬🇧 EN ➔ 🇩🇪 DE" : "🇩🇪 DE ➔ 🇬🇧 EN"}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(item.german);
                    }}
                    className="w-10 h-10 rounded-2xl bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                    title="Listen"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center my-6">
                  {!isEnToDe ? (
                    <>
                      <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
                        {item.german}
                      </h3>
                      {item.phonetic && (
                        <p className="text-xs font-bold text-emerald-600 mb-3">
                          🗣️ &ldquo;{item.phonetic}&rdquo;
                        </p>
                      )}

                      {isCardFlipped ? (
                        <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in">
                          <p className="text-lg sm:text-xl font-black text-emerald-800">
                            {item.english}
                          </p>
                          {item.examples && item.examples[0] && (
                            <div className="mt-3 bg-slate-50 p-3 rounded-xl text-xs text-slate-700 border border-slate-200/60">
                              <p className="font-semibold italic">&ldquo;{item.examples[0].de}&rdquo;</p>
                              <p className="text-slate-500 mt-0.5">&ldquo;{item.examples[0].en}&rdquo;</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="mt-4 text-xs font-bold text-slate-400">
                          Tap to test your recall &amp; reveal translation
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="text-[11px] font-extrabold uppercase text-slate-400 block mb-1">
                        Recall German Word / Phrase:
                      </span>
                      <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
                        {item.english}
                      </h3>

                      {isCardFlipped ? (
                        <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in">
                          <p className="text-2xl sm:text-3xl font-black text-emerald-800">
                            {item.german}
                          </p>
                          {item.phonetic && (
                            <p className="text-xs font-bold text-emerald-600 mt-1">
                              🗣️ &ldquo;{item.phonetic}&rdquo;
                            </p>
                          )}
                          {item.forms && (
                            <p className="text-xs font-medium text-slate-500 italic mt-1">
                              Forms: {item.forms}
                            </p>
                          )}
                          {item.examples && item.examples[0] && (
                            <div className="mt-3 bg-slate-50 p-3 rounded-xl text-xs text-slate-700 border border-slate-200/60">
                              <p className="font-semibold italic">&ldquo;{item.examples[0].de}&rdquo;</p>
                              <p className="text-slate-500 mt-0.5">&ldquo;{item.examples[0].en}&rdquo;</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="mt-4 text-xs font-bold text-slate-400">
                          Tap to reveal German answer &amp; audio
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Seen {item.timesSeen} times</span>
                  <span className="font-bold text-emerald-600">Click to Flip ↺</span>
                </div>
              </div>
            );
          })()}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleNextReview(false)}
              className="py-3.5 rounded-2xl bg-white hover:bg-red-50 border-2 border-red-200 text-red-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <X className="w-4 h-4 stroke-[3px]" />
              <span>Forgot / Difficult</span>
            </button>
            <button
              onClick={() => handleNextReview(true)}
              className="py-3.5 rounded-2xl bg-[#58cc02] hover:bg-[#61e002] text-white font-black text-xs uppercase tracking-wider border-b-4 border-[#46a302] active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Check className="w-4 h-4 stroke-[3px]" />
              <span>Remembered!</span>
            </button>
          </div>
        </div>
      )}

      {/* STAGE 5: INTERACTIVE PRACTICE QUIZ */}
      {stage === "practice" && practiceQuestions[quizIndex] && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#1cb0f6] bg-[#ddf4ff] px-3 py-1 rounded-full">
              Question {quizIndex + 1} of {practiceQuestions.length}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {practiceQuestions[quizIndex].type === "speaking" ? "🎙️ Speaking" : (practiceQuestions[quizIndex].type === "grammar" || practiceQuestions[quizIndex].type === "grammar_drill") ? "📐 Grammar Drill" : "⚡ Practice"}
            </span>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            
            {/* Prompt & Target Card */}
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {practiceQuestions[quizIndex].prompt}
              </span>

              {practiceQuestions[quizIndex].type === "cloze" && practiceQuestions[quizIndex].clozeSentence ? (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 my-3">
                  <p className="text-base sm:text-xl font-bold text-slate-900 leading-relaxed">
                    &ldquo;{practiceQuestions[quizIndex].clozeSentence}&rdquo;
                  </p>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    Meaning: &ldquo;{practiceQuestions[quizIndex].exampleEn || practiceQuestions[quizIndex].englishTranslation}&rdquo;
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200/80 my-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      {practiceQuestions[quizIndex].type === "translation" 
                        ? practiceQuestions[quizIndex].englishTranslation 
                        : practiceQuestions[quizIndex].germanText}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {practiceQuestions[quizIndex].type === "translation" ? "English" : (practiceQuestions[quizIndex].type === "grammar" || practiceQuestions[quizIndex].type === "grammar_drill") ? "German Structure" : "German"}
                    </p>
                  </div>
                  <button
                    onClick={() => playAudio(practiceQuestions[quizIndex].germanText)}
                    className="w-10 h-10 rounded-2xl bg-white hover:bg-[#ddf4ff] text-[#1cb0f6] border border-slate-200 flex items-center justify-center transition-colors shadow-xs"
                    title="Audio"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* SPEAKING QUESTION MODE */}
            {practiceQuestions[quizIndex].type === "speaking" ? (
              <div className="text-center py-4 space-y-4">
                <div className="flex justify-center">
                  <button
                    onClick={startSpeechRecognition}
                    disabled={isListening || isQuestionAnswered}
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg cursor-pointer ${
                      isListening 
                        ? "bg-red-500 text-white animate-pulse ring-8 ring-red-200" 
                        : isQuestionAnswered
                        ? isCurrentCorrect 
                          ? "bg-emerald-500 text-white" 
                          : "bg-red-500 text-white"
                        : "bg-[#1cb0f6] hover:bg-[#0fa0e4] text-white hover:scale-105"
                    }`}
                  >
                    {isListening ? <Mic className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                  </button>
                </div>

                <p className="text-xs font-bold text-slate-500">
                  {isListening ? "Listening... Speak now!" : isQuestionAnswered ? "Answer evaluated" : "Tap microphone to speak"}
                </p>

                {spokenTranscript && (
                  <p className="text-xs font-semibold text-slate-700 bg-slate-100 p-2 rounded-xl">
                    Heard: &ldquo;{spokenTranscript}&rdquo;
                  </p>
                )}
              </div>
            ) : (
              /* MULTIPLE CHOICE / CLOZE / GRAMMAR OPTIONS */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(practiceQuestions[quizIndex].options || []).map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  const isCorrectAnswer = opt.trim().toLowerCase() === practiceQuestions[quizIndex].correctAnswer.trim().toLowerCase();
                  
                  let btnStyle = "border-slate-200 hover:border-slate-300 bg-white text-slate-800";
                  if (isQuestionAnswered) {
                    if (isCorrectAnswer) {
                      btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-black";
                    } else if (isSelected) {
                      btnStyle = "border-red-500 bg-red-50 text-red-900 font-black";
                    } else {
                      btnStyle = "opacity-40 border-slate-200 bg-white text-slate-600";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(opt)}
                      disabled={isQuestionAnswered}
                      className={`p-4 rounded-2xl border-2 text-left text-sm font-bold transition-all shadow-xs flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isQuestionAnswered && isCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      )}
                      {isQuestionAnswered && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Answer Feedback Banner */}
            {isQuestionAnswered && (
              <div className={`p-4 rounded-2xl animate-in fade-in ${
                isCurrentCorrect ? "bg-emerald-50 border border-emerald-200 text-emerald-900" : "bg-red-50 border border-red-200 text-red-900"
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {isCurrentCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <strong className="text-sm font-black">
                    {isCurrentCorrect ? "Ausgezeichnet! (Correct)" : "Leider falsch (Incorrect)"}
                  </strong>
                </div>
                
                <p className="text-xs text-slate-700 mt-1">
                  Correct Answer: <strong className="font-black text-slate-900">{practiceQuestions[quizIndex].correctAnswer}</strong>
                </p>

                {practiceQuestions[quizIndex].explanation && (
                  <p className="text-xs text-slate-500 mt-1 italic">
                    {practiceQuestions[quizIndex].explanation}
                  </p>
                )}
              </div>
            )}

            {/* Next Question CTA */}
            {isQuestionAnswered && (
              <button
                onClick={handleNextQuizQuestion}
                className="w-full py-3.5 rounded-2xl bg-[#58cc02] hover:bg-[#61e002] text-white font-black text-sm uppercase tracking-wider shadow-md border-b-4 border-[#46a302] active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{quizIndex + 1 < practiceQuestions.length ? "Next Question" : "Complete Day Session"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* STAGE 6: RESULTS & CELEBRATION */}
      {stage === "results" && sessionResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          
          <div className="w-20 h-20 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center mx-auto text-amber-500 shadow-md">
            <Trophy className="w-10 h-10 fill-amber-400 text-amber-600" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#58cc02] block mb-1">
              Goal Achieved!
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Day {dayNumber} Complete! 🎉
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              You showed up, mastered today&apos;s German grammar and vocabulary, and completed your session!
            </p>
          </div>

          {/* Results Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 block">Accuracy</span>
              <strong className="text-xl font-black text-slate-900">{sessionResult.accuracy}%</strong>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 block">XP Earned</span>
              <strong className="text-xl font-black text-[#58cc02]">+{sessionResult.xpEarned} XP</strong>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 block">Items &amp; Grammar</span>
              <strong className="text-xl font-black text-[#1cb0f6]">{sessionResult.newLearnedCount + (grammarTopic ? 1 : 0)} mastered</strong>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 block">Streak</span>
              <strong className="text-xl font-black text-amber-600 flex items-center gap-1">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                {challenge.currentStreak} Days
              </strong>
            </div>
          </div>

          {/* New Badges */}
          {sessionResult.newBadges && sessionResult.newBadges.length > 0 && (
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-left">
              <div className="flex items-center gap-2 text-amber-800 font-black text-xs uppercase tracking-wider mb-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>New Badges Unlocked!</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {sessionResult.newBadges.map((b, i) => (
                  <span key={i} className="px-3 py-1 bg-amber-200/60 text-amber-900 font-black text-xs rounded-xl border border-amber-300">
                    🏆 {b.replace("_", " ").toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onExit}
            className="w-full py-4 rounded-2xl bg-[#58cc02] hover:bg-[#61e002] text-white font-black text-base uppercase tracking-wider shadow-lg border-b-4 border-[#46a302] active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Back to Challenge Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

    </div>
  );
};
