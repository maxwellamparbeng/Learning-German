/**
 * High-Fidelity German Audio Pronunciation Engine
 * 
 * Provides 100% authentic, native German speech across mobile and desktop devices.
 * 1. Primary: Studio-quality AI Native German Audio via `/api/tts` with instant client caching.
 * 2. Fallback: Calibrated browser Web Speech API with strict German voice enforcement
 *    (preventing mobile phones with English OS settings from pronouncing German words robotically).
 */

// Active audio and utterance references to prevent mobile GC issues
let currentAudio: HTMLAudioElement | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;
const audioCache = new Map<string, string>();
let cachedVoices: SpeechSynthesisVoice[] = [];
let voicesLoaded = false;

/**
 * Pre-cleans German text for speech synthesis so that abbreviations, grammatical markers,
 * brackets, and slashes are pronounced naturally rather than spelled out robotically.
 */
export function cleanGermanForAudio(rawText: string): string {
  if (!rawText) return "";

  let text = rawText;

  // 1. Remove dictionary grammar markers like "(+ Dat)", "(+ Akk)", "+ Dat", etc.
  text = text.replace(/\(\s*\+?\s*(?:Dat|Dativ|Akk|Akkusativ|Gen|Genitiv|Nom|Nominativ)\s*\)/gi, "");
  text = text.replace(/\+\s*(?:Dat|Dativ|Akk|Akkusativ|Gen|Genitiv|Nom|Nominativ)\b/gi, "");

  // 2. Expand common German dictionary abbreviations
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

  // 3. Clean slashes in pairs (e.g. "jemanden/etwas" -> "jemanden oder etwas")
  text = text.replace(/([a-zA-ZäöüÄÖÜß]+)\/([a-zA-ZäöüÄÖÜß]+)/g, (match, p1, p2) => {
    if (p1.toLowerCase() === "jemanden" && p2.toLowerCase() === "etwas") {
      return "jemanden oder etwas";
    }
    if (p1.toLowerCase() === "jemandem" && p2.toLowerCase() === "etwas") {
      return "jemandem oder etwas";
    }
    if (p1.toLowerCase() === "er" && (p2.toLowerCase() === "sie" || p2.toLowerCase() === "es")) {
      return `${p1}, ${p2}`;
    }
    return `${p1} oder ${p2}`;
  });

  // 4. Handle optional prefixes in brackets, e.g., "(he)rausfinden" -> "herausfinden"
  text = text.replace(/\(([^)]+)\)/g, (match, group) => {
    const trimmed = group.trim();
    if (/^(?:Akk|Dat|Gen|Nom|ugs|Plural|Singular|fig|iron|österr|schweiz)\.?$/i.test(trimmed)) {
      return "";
    }
    if (trimmed.length <= 4 && /^[a-zA-ZäöüÄÖÜß]+$/.test(trimmed)) {
      return trimmed;
    }
    return trimmed;
  });

  // 5. Clean up awkward punctuation symbols that cause TTS stutter
  text = text.replace(/[/*_+~^#]/g, " ");
  text = text.replace(/\s+/g, " ").trim();

  return text;
}

/**
 * Initialize and cache available browser voices
 */
function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return [];
  }

  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    cachedVoices = voices;
    voicesLoaded = true;
  }
  return cachedVoices;
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };
  }
}

/**
 * Strictly find authentic German voices for Web Speech API fallback.
 * Guarantees that an English-configured phone won't use an English voice for German.
 */
export function getBestGermanVoice(): SpeechSynthesisVoice | null {
  const voices = typeof window !== "undefined" && "speechSynthesis" in window
    ? window.speechSynthesis.getVoices()
    : cachedVoices;

  if (!voices || voices.length === 0) return null;

  // Filter ONLY German language voices (de-DE, de-AT, de-CH, or starting with de)
  const deVoices = voices.filter(v => {
    const lang = (v.lang || "").toLowerCase().replace("_", "-");
    return lang.startsWith("de") || lang.includes("de-de") || lang.includes("de-at") || lang.includes("de-ch");
  });

  if (deVoices.length === 0) {
    return null; // Return null so we never accidentally assign an English voice
  }

  // Rank candidate German voices
  const scored = deVoices.map(voice => {
    let score = 0;
    const name = voice.name.toLowerCase();
    const uri = (voice.voiceURI || "").toLowerCase();

    // Neural / Natural / High-definition identifiers
    if (name.includes("natural") || uri.includes("natural")) score += 60;
    if (name.includes("enhanced") || uri.includes("enhanced")) score += 55;
    if (name.includes("premium") || uri.includes("premium")) score += 50;
    if (name.includes("neural") || uri.includes("neural")) score += 50;
    if (name.includes("wavenet") || uri.includes("wavenet")) score += 50;
    if (name.includes("studio") || uri.includes("studio")) score += 45;

    // Apple / iOS high quality German voices
    if (name.includes("siri")) score += 45;
    if (name.includes("anna") && !name.includes("compact")) score += 40;
    if (name.includes("helena") && !name.includes("compact")) score += 40;
    if (name.includes("martin") && !name.includes("compact")) score += 35;
    if (name.includes("petra") && !name.includes("compact")) score += 35;
    if (name.includes("markus") && !name.includes("compact")) score += 35;

    // Google Android German voices
    if (name.includes("google") || uri.includes("google")) score += 40;
    if (uri.includes("network") || uri.includes("online")) score += 35;
    if (uri.includes("de-de-x-")) score += 30;

    // Microsoft Natural German voices
    if (name.includes("katja") || name.includes("conrad") || name.includes("amala") || name.includes("klarissa")) {
      score += 45;
    }

    if (voice.lang === "de-DE" || voice.lang === "de_DE") score += 10;
    if (voice.default) score += 5;

    // Penalize low-bitrate compact synthesizers
    if (name.includes("compact") || uri.includes("compact")) score -= 50;
    if (name.includes("pico") || uri.includes("pico")) score -= 80;
    if (name.includes("espeak") || uri.includes("espeak")) score -= 80;

    return { voice, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.voice || deVoices[0];
}

export interface SpeakOptions {
  slow?: boolean;
  rate?: number;
  pitch?: number;
  volume?: number;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

/**
 * Web Speech API fallback with strict German phonetics
 */
function speakWithWebSpeech(cleanText: string, options?: SpeakOptions): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "de-DE";

    const germanVoice = getBestGermanVoice();
    if (germanVoice) {
      utterance.voice = germanVoice;
    }

    if (options?.rate !== undefined) {
      utterance.rate = options.rate;
    } else if (options?.slow) {
      utterance.rate = 0.80;
    } else {
      utterance.rate = 0.93;
    }

    utterance.pitch = options?.pitch !== undefined ? options.pitch : 1.0;
    utterance.volume = options?.volume !== undefined ? options.volume : 1.0;

    currentUtterance = utterance;

    utterance.onend = () => {
      currentUtterance = null;
      if (options?.onEnd) options.onEnd();
    };

    utterance.onerror = (e) => {
      currentUtterance = null;
      if (options?.onError) options.onError(e);
    };

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn("[WebSpeech fallback notice]:", err);
  }
}

/**
 * Main Speak Function for German pronunciation across the app.
 * Uses studio-quality native German AI audio when connected,
 * and seamless calibrated German Web Speech API as fallback.
 */
export async function speakGerman(text: string, options?: SpeakOptions): Promise<void> {
  if (typeof window === "undefined") return;

  const cleanText = cleanGermanForAudio(text);
  if (!cleanText) return;

  // Stop any previously playing audio or speech synthesis
  stopSpeech();

  const cacheKey = `${cleanText}_${options?.slow ? "slow" : "normal"}`;

  // 1. If audio is already cached in memory, play immediately
  if (audioCache.has(cacheKey)) {
    try {
      const base64Wav = audioCache.get(cacheKey)!;
      const audioUrl = `data:audio/wav;base64,${base64Wav}`;
      const audio = new Audio(audioUrl);
      currentAudio = audio;

      if (options?.slow) {
        audio.playbackRate = 0.88;
      }

      audio.onended = () => {
        currentAudio = null;
        if (options?.onEnd) options.onEnd();
      };

      audio.onerror = () => {
        currentAudio = null;
        speakWithWebSpeech(cleanText, options);
      };

      await audio.play();
      return;
    } catch (err) {
      console.warn("[Cached Audio playback fallback]:", err);
    }
  }

  // 2. Fetch studio-quality German TTS from server
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout for mobile networks

    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: cleanText, slow: options?.slow }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.audio) {
        audioCache.set(cacheKey, data.audio);
        const audioUrl = `data:audio/wav;base64,${data.audio}`;
        const audio = new Audio(audioUrl);
        currentAudio = audio;

        if (options?.slow) {
          audio.playbackRate = 0.88;
        }

        audio.onended = () => {
          currentAudio = null;
          if (options?.onEnd) options.onEnd();
        };

        audio.onerror = () => {
          currentAudio = null;
          speakWithWebSpeech(cleanText, options);
        };

        await audio.play();
        return;
      }
    }
  } catch (err) {
    // Network error or timeout - gracefully fall back
  }

  // 3. Fallback to calibrated browser Web Speech API
  speakWithWebSpeech(cleanText, options);
}

/**
 * Stop any active audio or speech immediately
 */
export function stopSpeech(): void {
  if (typeof window === "undefined") return;

  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch (e) {
      // Ignore
    }
    currentAudio = null;
  }

  if ("speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // Ignore
    }
    currentUtterance = null;
  }
}

