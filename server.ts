import express from "express";
import http from "http";
import path from "path";
import { createServer as createViteServer } from "vite";
import { WebSocketServer, WebSocket } from "ws";
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const PORT = 3000;

  app.use(express.json());

  // In-memory LRU cache for audio snippets (key -> base64 WAV)
  const ttsCache = new Map<string, string>();
  const MAX_CACHE_SIZE = 1000;

  // Lazy initialize Gemini AI client
  let aiClient: GoogleGenAI | null = null;
  function getAIClient(): GoogleGenAI {
    if (!aiClient) {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  function pcmToWav(pcmBuffer: Buffer, sampleRate: number = 24000): Buffer {
    const wavHeader = Buffer.alloc(44);
    const totalDataLen = pcmBuffer.length;
    const totalLen = totalDataLen + 36;
    const byteRate = sampleRate * 2;

    wavHeader.write("RIFF", 0);
    wavHeader.writeUInt32LE(totalLen, 4);
    wavHeader.write("WAVE", 8);
    wavHeader.write("fmt ", 12);
    wavHeader.writeUInt32LE(16, 16); // SubChunk1Size
    wavHeader.writeUInt16LE(1, 20);  // AudioFormat (1 = PCM)
    wavHeader.writeUInt16LE(1, 22);  // NumChannels (1 = Mono)
    wavHeader.writeUInt32LE(sampleRate, 24); // SampleRate
    wavHeader.writeUInt32LE(byteRate, 28);   // ByteRate
    wavHeader.writeUInt16LE(2, 32);  // BlockAlign
    wavHeader.writeUInt16LE(16, 34); // BitsPerSample
    wavHeader.write("data", 36);
    wavHeader.writeUInt32LE(totalDataLen, 40);

    return Buffer.concat([wavHeader, pcmBuffer]);
  }

  // Pre-clean German text for natural pronunciation
  function cleanGermanText(rawText: string): string {
    if (!rawText) return "";
    let text = rawText;
    text = text.replace(/\(\s*\+?\s*(?:Dat|Dativ|Akk|Akkusativ|Gen|Genitiv|Nom|Nominativ)\s*\)/gi, "");
    text = text.replace(/\+\s*(?:Dat|Dativ|Akk|Akkusativ|Gen|Genitiv|Nom|Nominativ)\b/gi, "");
    text = text.replace(/(?:jdn\.\s*\/\s*etw\.|jdn\/etw)/gi, "jemanden oder etwas");
    text = text.replace(/(?:jdm\.\s*\/\s*etw\.|jdm\/etw)/gi, "jemandem oder etwas");
    text = text.replace(/\bjdn(?:\.|\b)/gi, "jemanden");
    text = text.replace(/\bjdm(?:\.|\b)/gi, "jemandem");
    text = text.replace(/\bjds(?:\.|\b)/gi, "jemandes");
    text = text.replace(/\betw(?:\.|\b)/gi, "etwas");
    text = text.replace(/(?:z\.\s*B\.|z\.\s*B(?=\s|$)|z\.B\.)/gi, "zum Beispiel");
    text = text.replace(/(?:d\.\s*h\.|d\.\s*h(?=\s|$)|d\.h\.)/gi, "das heißt");
    text = text.replace(/\bbzw(?:\.|\b)/gi, "beziehungsweise");
    text = text.replace(/\busw(?:\.|\b)/gi, "und so weiter");
    text = text.replace(/\bca(?:\.|\b)/gi, "circa");
    text = text.replace(/\bevtl(?:\.|\b)/gi, "eventuell");
    text = text.replace(/(?:u\.\s*a\.|u\.\s*a(?=\s|$)|u\.a\.)/gi, "unter anderem");
    text = text.replace(/\bggf(?:\.|\b)/gi, "gegebenenfalls");
    text = text.replace(/\binkl(?:\.|\b)/gi, "inklusive");
    text = text.replace(/\bstr(?:\.|\b)/gi, "Straße");
    text = text.replace(/([a-zA-ZäöüÄÖÜß]+)\/([a-zA-ZäöüÄÖÜß]+)/g, "$1 oder $2");
    text = text.replace(/\(([^)]+)\)/g, (m, g) => (/^(?:Akk|Dat|Gen|Nom|ugs|Plural|Singular)\.?$/i.test(g.trim()) ? "" : g));
    text = text.replace(/[/*_+~^#]/g, " ");
    return text.replace(/\s+/g, " ").trim();
  }

  // High-fidelity German TTS endpoint
  app.post("/api/tts", async (req, res) => {
    try {
      const { text, slow } = req.body;
      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Missing text parameter" });
      }

      const cleanText = cleanGermanText(text);
      if (!cleanText) {
        return res.status(400).json({ error: "Empty sanitized text" });
      }

      const cacheKey = `${cleanText}_${slow ? "slow" : "normal"}`;
      if (ttsCache.has(cacheKey)) {
        return res.json({ audio: ttsCache.get(cacheKey), format: "audio/wav", cached: true });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({ error: "API key not configured" });
      }

      const promptText = slow
        ? `Bitte sprich das folgende deutsche Wort oder den Beispielsatz langsam, überaus deutlich, mit natürlicher deutscher Sprachmelodie und akzentfrei aus: "${cleanText}"`
        : `Sprich das folgende deutsche Wort oder den Beispielsatz in natürlichem, klarem und authentischem Deutsch aus: "${cleanText}"`;

      const ai = getAIClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: promptText }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Kore" }
            }
          }
        }
      });

      const rawBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!rawBase64) {
        return res.status(500).json({ error: "No audio generated from model" });
      }

      const pcmBuffer = Buffer.from(rawBase64, "base64");
      const wavBuffer = pcmToWav(pcmBuffer, 24000);
      const wavBase64 = wavBuffer.toString("base64");

      // Cache result
      if (ttsCache.size >= MAX_CACHE_SIZE) {
        const firstKey = ttsCache.keys().next().value;
        if (firstKey) ttsCache.delete(firstKey);
      }
      ttsCache.set(cacheKey, wavBase64);

      res.json({ audio: wavBase64, format: "audio/wav" });
    } catch (err: any) {
      console.error("[TTS API Error]:", err?.message || err);
      res.status(500).json({ error: "TTS generation failed", details: err?.message });
    }
  });

  // Setup WebSocket Server for raw audio streams
  const wss = new WebSocketServer({ noServer: true });

  // Handle server upgrade for Websocket
  server.on("upgrade", (request, socket, head) => {
    const pathname = request.url ? new URL(request.url, `http://${request.headers.host}`).pathname : '';
    if (pathname === "/api/live-ws" || pathname === "/live-ws") {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on("connection", async (clientWs: WebSocket) => {
    console.log("[WS] WebSocket client connected");
    let session: any = null;

    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not configured in the server environment.");
      }

      // Connect to Gemini Live session
      const ai = getAIClient();
      session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            // Using 'Zephyr' voice as defined in the skill guidelines
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: "You are a friendly, encouraging German language conversational partner and vocabulary coach. The user is practicing their German. Talk to them in simple, clear German (A1-B1 level depending on their preference). Ask them about their day, their favorite German words, or help them practice simple phrases. Give brief corrections or vocabulary tips, but keep the conversation highly interactive and natural. You can use English occasionally if they are stuck or ask for clarification.",
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onmessage: (message: LiveServerMessage) => {
            // Send audio content back to the client
            const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audio) {
              clientWs.send(JSON.stringify({ audio }));
            }

            // Send interruption event
            if (message.serverContent?.interrupted) {
              clientWs.send(JSON.stringify({ interrupted: true }));
            }

            // Extract transcriptions
            const serverContent = message.serverContent as any;
            // User turn transcription
            const userText = serverContent?.userTurn?.parts?.[0]?.text;
            // Model turn transcription
            const modelText = serverContent?.modelTurn?.parts?.[0]?.text;

            if (userText) {
              clientWs.send(JSON.stringify({ text: userText, isModel: false }));
            }
            if (modelText) {
              clientWs.send(JSON.stringify({ text: modelText, isModel: true }));
            }
          },
          onclose: () => {
            console.log("[WS] Gemini session closed");
            clientWs.send(JSON.stringify({ closed: true }));
            clientWs.close();
          },
          onerror: (err) => {
            console.error("[WS] Gemini session error:", err);
            clientWs.send(JSON.stringify({ error: err.message || "Gemini session error occurred." }));
          }
        },
      });

      console.log("[WS] Successfully connected to Gemini Live API");
      clientWs.send(JSON.stringify({ connected: true }));

    } catch (err: any) {
      console.error("[WS] Failed to connect to Gemini Live session:", err);
      clientWs.send(JSON.stringify({ error: err.message || "Failed to establish a real-time conversation session." }));
      clientWs.close();
      return;
    }

    // Handle messages from the browser (raw audio input)
    clientWs.on("message", (data) => {
      if (!session) return;
      try {
        const msg = JSON.parse(data.toString());
        if (msg.audio) {
          session.sendRealtimeInput({
            audio: { data: msg.audio, mimeType: "audio/pcm;rate=16000" },
          });
        } else if (msg.text) {
          session.sendRealtimeInput({
            text: msg.text
          });
        }
      } catch (err) {
        console.error("[WS] Error parsing or proxying client message:", err);
      }
    });

    clientWs.on("close", () => {
      console.log("[WS] WebSocket client disconnected");
      if (session) {
        try {
          session.close();
        } catch (e) {
          console.error("[WS] Error closing Gemini session:", e);
        }
      }
    });
  });

  // API Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV || "development" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer().catch((err) => {
  console.error("[Server] Critical startup failure:", err);
});
