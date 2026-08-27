/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from "react";
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  Volume2, 
  Download, 
  HelpCircle, 
  RefreshCw, 
  Bookmark, 
  ChevronRight,
  ChevronLeft,
  Award,
  Mic,
  ArrowLeft,
  ArrowRight,
  Check,
  Trophy,
  ShieldAlert,
  Flame,
  Heart,
  MessageSquare,
  GraduationCap,
  User as UserIcon,
  LogIn,
  LogOut,
  RotateCcw,
  RotateCw,
  Clock,
  CheckCheck,
  ListRestart
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { VOCABULARY_DATA, VocabularyEntry } from "./data/vocabulary";
import { PhraseEntry, loadPhrasesForLevel, loadPhrasesForLevels, savePhrasesForLevel, resetPhrasesForLevel } from "./data/phrases";
import { getGermanToEnglishPhonetic } from "./utils/pronunciation";
import { speakGerman } from "./utils/speechService";
import VoiceConversation from "./components/VoiceConversation";
import { LearningPlanView } from "./components/LearningPlanView";
import { AuthModal } from "./components/AuthModal";
import { AuthScreen } from "./components/AuthScreen";
import { StreakHeaderCounter } from "./components/StreakHeaderCounter";
import { ChallengeDashboard } from "./components/ChallengeDashboard";
import { ChallengeDailyPractice } from "./components/ChallengeDailyPractice";
import { ChallengeSetupModal } from "./components/ChallengeSetupModal";
import { ChallengeCompletionModal } from "./components/ChallengeCompletionModal";
import { 
  ChallengeProgress, 
  ChallengeLevel, 
  ChallengeContentType, 
  ChallengeDirection,
  DailySessionResult 
} from "./types/challenge";
import { 
  create30DayChallenge, 
  loadChallengeFromLocal, 
  saveChallengeToLocal, 
  removeChallengeFromLocal, 
  loadChallengeFromCloud, 
  saveChallengeToCloud 
} from "./utils/challengeEngine";
import { isStreakMilestone, playStreakCelebrationChime } from "./utils/streakEffects";
import { auth, onAuthStateChanged, User, getUserProgress, saveUserProgress } from "./lib/firebase";
import { LessonContext } from "./types";

// Clean and normalize German words for speech comparison
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "") // remove punctuation
    .replace(/\s+/g, " ") // normalize spacing
    .trim();
};

// Levenshtein distance for string similarity scoring
const getLevenshteinDistance = (a: string, b: string): number => {
  const matrix = Array.from({ length: b.length + 1 }, () => 
    Array(a.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j - 1][i] + 1, // deletion
        matrix[j][i - 1] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return matrix[b.length][a.length];
};

// Calculate match score between spoken text and target
const calculatePronunciationMatch = (
  targetWord: string, 
  spokenText: string
): { score: number; cleanTarget: string; cleanSpoken: string } => {
  const cleanSpoken = normalizeText(spokenText);
  const cleanTarget = normalizeText(targetWord);
  
  if (!cleanSpoken || !cleanTarget) {
    return { score: 0, cleanTarget, cleanSpoken };
  }

  // Exact match
  if (cleanSpoken === cleanTarget) {
    return { score: 100, cleanTarget, cleanSpoken };
  }

  // Remove common articles & helper prefixes (der, die, das, sich, ein, eine)
  const removeHelpers = (str: string) => {
    return str
      .replace(/^(der|die|das|sich|ein|eine)\s+/i, "")
      .trim();
  };

  const coreTarget = removeHelpers(cleanTarget);
  const coreSpoken = removeHelpers(cleanSpoken);

  if (coreSpoken === coreTarget && coreTarget.length > 0) {
    return { score: 100, cleanTarget: coreTarget, cleanSpoken: coreSpoken };
  }

  // Substring overlap
  if (coreTarget.includes(coreSpoken) || coreSpoken.includes(coreTarget)) {
    const overlapLen = Math.min(coreTarget.length, coreSpoken.length);
    const maxLen = Math.max(coreTarget.length, coreSpoken.length);
    const score = Math.round((overlapLen / maxLen) * 100);
    return { score: Math.max(score, 60), cleanTarget: coreTarget, cleanSpoken: coreSpoken };
  }

  // Levenshtein distance similarity
  const distance = getLevenshteinDistance(coreTarget, coreSpoken);
  const maxLength = Math.max(coreTarget.length, coreSpoken.length);
  const score = Math.max(0, Math.round(((maxLength - distance) / maxLength) * 100));

  return { score, cleanTarget: coreTarget, cleanSpoken: coreSpoken };
};

interface ThemeMetaData {
  name: string;
  emoji: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  accentBg: string;
  hoverBorder: string;
  description: string;
}

export function normalizeThemeName(theme: string | null | undefined): string {
  if (!theme) return "";
  const t = theme.trim().toLowerCase();
  
  // Food, Drink & Dining
  if (
    t.includes("essen") ||
    t.includes("trinken") ||
    t.includes("food") ||
    t.includes("dining") ||
    t.includes("gastronomie") ||
    t.includes("ernährung") ||
    t.includes("kulinarik") ||
    t.includes("nahrungsmittel") ||
    t.includes("lieblingsgerichte") ||
    t.includes("kochen") ||
    t.includes("restaurant")
  ) {
    return "Food, Drink & Dining (Essen & Trinken) 🍽️";
  }

  // Daily Routine, Leisure & Time
  if (
    t.includes("alltag") ||
    t.includes("freizeit") ||
    t.includes("tagesablauf") ||
    t.includes("uhrzeit") ||
    t.includes("leisure") ||
    t.includes("hobby") ||
    t.includes("routine") ||
    t.includes("tiere")
  ) {
    return "Daily Routine, Leisure & Time (Alltag, Freizeit & Tagesablauf) ⏰";
  }

  // Family, Friends & Relationships
  if (
    t.includes("familie") ||
    t.includes("freund") ||
    t.includes("beziehung") ||
    t.includes("soziales") ||
    t.includes("people") ||
    t.includes("relationship")
  ) {
    return "Family & Friends (Familie & Freunde) 👥";
  }

  // Housing & Living
  if (
    t.includes("wohnen") ||
    t.includes("haushalt") ||
    t.includes("architektur") ||
    t.includes("housing") ||
    t.includes("home") ||
    t.includes("living")
  ) {
    return "Housing & Living (Wohnen) 🏠";
  }

  // Health & Medical / Body / Psychology
  if (
    t.includes("gesundheit") ||
    t.includes("körper") ||
    t.includes("medizin") ||
    t.includes("psychologie") ||
    t.includes("prävention") ||
    t.includes("health") ||
    t.includes("medical") ||
    t.includes("arzt")
  ) {
    return "Health & Well-being (Gesundheit & Körper) 🏥";
  }

  // Shopping, Clothes & Money
  if (
    t.includes("einkaufen") ||
    t.includes("kleidung") ||
    t.includes("konsum") ||
    t.includes("verbraucher") ||
    t.includes("shopping") ||
    t.includes("clothes")
  ) {
    return "Shopping & Clothes (Einkaufen & Kleidung) 🛍️";
  }

  // Shopping, Money & Finance
  if (
    t.includes("wirtschaft") ||
    t.includes("finanz") ||
    t.includes("money")
  ) {
    return "Shopping, Money & Finance (Wirtschaft & Finanzen) 📈";
  }

  // Directions & Travel
  if (
    t.includes("reisen") ||
    t.includes("verkehr") ||
    t.includes("orientierung") ||
    t.includes("travel") ||
    t.includes("transport") ||
    t.includes("direction") ||
    t.includes("urlaub")
  ) {
    return "Directions & Travel (Orientierung & Reisen) 🗺️";
  }

  // Science & Education
  if (
    t.includes("wissenschaft") ||
    t.includes("forschung") ||
    t.includes("bildung") ||
    t.includes("lernen") ||
    t.includes("schule") ||
    t.includes("studium")
  ) {
    return "Science & Education (Wissenschaft & Bildung) 🎓";
  }

  // Work, Office & Career
  if (
    t.includes("arbeit") ||
    t.includes("beruf") ||
    t.includes("karriere") ||
    t.includes("work") ||
    t.includes("office") ||
    t.includes("career") ||
    t.includes("education")
  ) {
    return "Work & Office (Beruf & Arbeit) 💼";
  }

  // Tech, Media & Digitalization
  if (
    t.includes("technik") ||
    t.includes("medien") ||
    t.includes("digital") ||
    t.includes("tech") ||
    t.includes("communication") ||
    t.includes("online")
  ) {
    return "Tech & Communication (Medien & Technik) 💻";
  }

  // Nature, Environment & Sustainability
  if (
    t.includes("natur") ||
    t.includes("umwelt") ||
    t.includes("nachhaltig") ||
    t.includes("energie") ||
    t.includes("nature") ||
    t.includes("environment") ||
    t.includes("wetter")
  ) {
    return "Nature & Environment (Natur & Umwelt) 🌳";
  }

  // Society, Law, State, Politics & Admin
  if (
    t.includes("gesellschaft") ||
    t.includes("staat") ||
    t.includes("recht") ||
    t.includes("politik") ||
    t.includes("amt") ||
    t.includes("behörde") ||
    t.includes("verwaltung") ||
    t.includes("integration") ||
    t.includes("migration") ||
    t.includes("society") ||
    t.includes("law")
  ) {
    return "Society & Law (Gesellschaft & Staat) ⚖️";
  }

  // Culture, Art & Celebrations
  if (
    t.includes("kultur") ||
    t.includes("kunst") ||
    t.includes("ausgehen") ||
    t.includes("feste") ||
    t.includes("einladung") ||
    t.includes("geschichte") ||
    t.includes("art")
  ) {
    return "Culture & Art (Kultur & Kunst) 🎨";
  }

  // Feelings & Personality
  if (
    t.includes("gefühl") ||
    t.includes("persönlichkeit") ||
    t.includes("charakter") ||
    t.includes("meinung") ||
    t.includes("feeling")
  ) {
    return "Feelings & Personality (Gefühle & Persönlichkeit) 💭";
  }

  // Personal Details
  if (
    t.includes("vorstellen") ||
    t.includes("personal") ||
    t.includes("detail")
  ) {
    return "Personal Details (Sich vorstellen) 👤";
  }

  // Verbs & Actions
  if (
    t.includes("verb") ||
    t.includes("action") ||
    t.includes("handlung")
  ) {
    return "Verbs & Actions ⚡";
  }

  return theme;
}

// Custom theme metadata with playful, vibrant Duolingo color mappings and 3D card designs
const THEME_METRICS: Record<string, ThemeMetaData> = {
  "Personal Details (Sich vorstellen) 👤": {
    name: "Personal Details (Sich vorstellen)",
    emoji: "👤",
    bgGradient: "from-teal-50 to-teal-100/20",
    borderColor: "border-teal-200",
    hoverBorder: "hover:border-teal-500 hover:shadow-[0_4px_0_#0f766e]",
    textColor: "text-teal-800",
    accentBg: "bg-teal-600",
    description: "Greetings, introducing yourself, name, origin, age, and languages.",
  },
  "Family & Friends (Familie & Freunde) 👥": {
    name: "Family & Friends (Familie & Freunde)",
    emoji: "👥",
    bgGradient: "from-pink-50 to-pink-100/20",
    borderColor: "border-pink-200",
    hoverBorder: "hover:border-pink-500 hover:shadow-[0_4px_0_#be185d]",
    textColor: "text-pink-800",
    accentBg: "bg-pink-600",
    description: "Talking about family members, relatives, friends, and relationships.",
  },
  "Daily Routine, Leisure & Time (Alltag, Freizeit & Tagesablauf) ⏰": {
    name: "Daily Routine, Leisure & Time (Alltag, Freizeit & Tagesablauf)",
    emoji: "⏰",
    bgGradient: "from-orange-50 to-amber-100/20",
    borderColor: "border-orange-200",
    hoverBorder: "hover:border-orange-500 hover:shadow-[0_4px_0_#c2410c]",
    textColor: "text-orange-800",
    accentBg: "bg-orange-600",
    description: "Daily schedules, telling time, daily routines, hobbies, and leisure activities.",
  },
  "Housing & Living (Wohnen) 🏠": {
    name: "Housing & Living (Wohnen)",
    emoji: "🏠",
    bgGradient: "from-amber-50 to-orange-100/20",
    borderColor: "border-amber-200",
    hoverBorder: "hover:border-[#ff9600] hover:shadow-[0_4px_0_#e07b00]",
    textColor: "text-amber-800",
    accentBg: "bg-[#ff9600]",
    description: "Describing apartments, houses, furniture, rooms, and renting.",
  },
  "Health & Well-being (Gesundheit & Körper) 🏥": {
    name: "Health & Well-being (Gesundheit & Körper)",
    emoji: "🏥",
    bgGradient: "from-red-50 to-rose-100/20",
    borderColor: "border-red-200",
    hoverBorder: "hover:border-[#ff4b4b] hover:shadow-[0_4px_0_#ea2b2b]",
    textColor: "text-red-700",
    accentBg: "bg-[#ff4b4b]",
    description: "Body parts, describing physical feelings, illnesses, and doctors.",
  },
  "Food, Drink & Dining (Essen & Trinken) 🍽️": {
    name: "Food, Drink & Dining (Essen & Trinken)",
    emoji: "🍽️",
    bgGradient: "from-green-50 to-emerald-100/20",
    borderColor: "border-green-200",
    hoverBorder: "hover:border-[#58cc02] hover:shadow-[0_4px_0_#46a302]",
    textColor: "text-[#46a302]",
    accentBg: "bg-[#58cc02]",
    description: "Meals, ingredients, restaurants, drinks, and grocery vocabulary.",
  },
  "Shopping & Clothes (Einkaufen & Kleidung) 🛍️": {
    name: "Shopping & Clothes (Einkaufen & Kleidung)",
    emoji: "🛍️",
    bgGradient: "from-indigo-50 to-indigo-100/20",
    borderColor: "border-indigo-200",
    hoverBorder: "hover:border-indigo-500 hover:shadow-[0_4px_0_#4338ca]",
    textColor: "text-indigo-800",
    accentBg: "bg-indigo-600",
    description: "Buying things, names of clothes, shopping stores, and prices.",
  },
  "Directions & Travel (Orientierung & Reisen) 🗺️": {
    name: "Directions & Travel (Orientierung & Reisen)",
    emoji: "🗺️",
    bgGradient: "from-sky-50 to-blue-100/20",
    borderColor: "border-sky-200",
    hoverBorder: "hover:border-[#1cb0f6] hover:shadow-[0_4px_0_#1899d6]",
    textColor: "text-[#1899d6]",
    accentBg: "bg-[#1cb0f6]",
    description: "Transportation, finding your way, travel bookings, and weather.",
  },
  "Work & Office (Beruf & Arbeit) 💼": {
    name: "Work & Office (Beruf & Arbeit)",
    emoji: "💼",
    bgGradient: "from-purple-50 to-violet-100/20",
    borderColor: "border-purple-200",
    hoverBorder: "hover:border-[#b87cf8] hover:shadow-[0_4px_0_#894cc6]",
    textColor: "text-purple-700",
    accentBg: "bg-purple-500",
    description: "Everyday school, work, occupations, office routine, and learning.",
  },
  "Tech & Communication (Medien & Technik) 💻": {
    name: "Tech & Communication (Medien & Technik)",
    emoji: "💻",
    bgGradient: "from-cyan-50 to-cyan-100/20",
    borderColor: "border-cyan-200",
    hoverBorder: "hover:border-cyan-500 hover:shadow-[0_4px_0_#0e7490]",
    textColor: "text-cyan-800",
    accentBg: "bg-cyan-600",
    description: "Mobiles, computers, internet, software, and digital communication.",
  },
  "Nature & Environment (Natur & Umwelt) 🌳": {
    name: "Nature & Environment (Natur & Umwelt)",
    emoji: "🌳",
    bgGradient: "from-lime-50 to-lime-100/20",
    borderColor: "border-lime-200",
    hoverBorder: "hover:border-[#58cc02] hover:shadow-[0_4px_0_#46a302]",
    textColor: "text-emerald-800",
    accentBg: "bg-[#58cc02]",
    description: "Weather, animals, plants, climate protection, and sustainability.",
  },
  "Society & Law (Gesellschaft & Staat) ⚖️": {
    name: "Society & Law (Gesellschaft & Staat)",
    emoji: "⚖️",
    bgGradient: "from-slate-50 to-slate-100/20",
    borderColor: "border-slate-200",
    hoverBorder: "hover:border-slate-500 hover:shadow-[0_4px_0_#334155]",
    textColor: "text-slate-800",
    accentBg: "bg-slate-600",
    description: "Official procedures, politics, legal matters, and civic institutions.",
  },
  "Science & Education (Wissenschaft & Bildung) 🎓": {
    name: "Science & Education (Wissenschaft & Bildung)",
    emoji: "🎓",
    bgGradient: "from-blue-50 to-indigo-100/20",
    borderColor: "border-blue-200",
    hoverBorder: "hover:border-blue-500 hover:shadow-[0_4px_0_#1d4ed8]",
    textColor: "text-blue-800",
    accentBg: "bg-blue-600",
    description: "Academic studies, scientific research, learning strategies, and universities.",
  },
  "Culture & Art (Kultur & Kunst) 🎨": {
    name: "Culture & Art (Kultur & Kunst)",
    emoji: "🎨",
    bgGradient: "from-fuchsia-50 to-pink-100/20",
    borderColor: "border-fuchsia-200",
    hoverBorder: "hover:border-fuchsia-500 hover:shadow-[0_4px_0_#a21caf]",
    textColor: "text-fuchsia-800",
    accentBg: "bg-fuchsia-600",
    description: "Museums, literature, theatre, historic eras, and cultural celebrations.",
  },
  "Feelings & Personality (Gefühle & Persönlichkeit) 💭": {
    name: "Feelings & Personality (Gefühle & Persönlichkeit)",
    emoji: "💭",
    bgGradient: "from-rose-50 to-pink-100/20",
    borderColor: "border-rose-200",
    hoverBorder: "hover:border-rose-500 hover:shadow-[0_4px_0_#be123c]",
    textColor: "text-rose-800",
    accentBg: "bg-rose-600",
    description: "Character traits, nuanced emotions, opinions, and psychological health.",
  },
  "Shopping, Money & Finance (Wirtschaft & Finanzen) 📈": {
    name: "Shopping, Money & Finance (Wirtschaft & Finanzen)",
    emoji: "📈",
    bgGradient: "from-emerald-50 to-teal-100/20",
    borderColor: "border-emerald-200",
    hoverBorder: "hover:border-emerald-500 hover:shadow-[0_4px_0_#047857]",
    textColor: "text-emerald-800",
    accentBg: "bg-emerald-600",
    description: "Economy, investments, banking, inflation, and consumer protection.",
  },
  "Verbs & Actions ⚡": {
    name: "Verbs & Actions",
    emoji: "⚡",
    bgGradient: "from-orange-50 to-orange-100/20",
    borderColor: "border-orange-200",
    hoverBorder: "hover:border-[#ff9600] hover:shadow-[0_4px_0_#e07b00]",
    textColor: "text-orange-800",
    accentBg: "bg-[#ff9600]",
    description: "Daily motions, movements, status modifications, and key actions.",
  },
  "General & Abstract 💬": {
    name: "General & Abstract",
    emoji: "💬",
    bgGradient: "from-teal-50 to-teal-100/20",
    borderColor: "border-teal-200",
    hoverBorder: "hover:border-teal-500 hover:shadow-[0_4px_0_#0f766e]",
    textColor: "text-teal-800",
    accentBg: "bg-teal-600",
    description: "Essential grammar connectors, abstract nouns, and general phrases.",
  }
};

export default function App() {
  // Authentication state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Navigation tabs - defaulted to the user's requested practicing mode
  const [activeTab, setActiveTab] = useState<"practice" | "explore" | "flashcards" | "quiz" | "phrases" | "voice" | "plan" | "challenge">("practice");
  
  // 30-Day Challenge States
  const [activeChallenge, setActiveChallenge] = useState<ChallengeProgress | null>(() => {
    return loadChallengeFromLocal();
  });
  const [isChallengeSetupOpen, setIsChallengeSetupOpen] = useState(false);
  const [activeChallengePracticeDay, setActiveChallengePracticeDay] = useState<number | null>(null);
  const [isChallengeCompletionOpen, setIsChallengeCompletionOpen] = useState(false);

  // Challenge Start & Session Handlers
  const handleStartNewChallenge = (level: ChallengeLevel, contentType: ChallengeContentType, direction?: ChallengeDirection) => {
    const newChallenge = create30DayChallenge(level, contentType, currentUser?.uid, masteredWords, direction || "de-to-en");
    setActiveChallenge(newChallenge);
    setIsChallengeSetupOpen(false);
    setActiveChallengePracticeDay(null);
    if (currentUser) {
      saveChallengeToCloud(newChallenge).catch(err => console.error("Cloud challenge save failed:", err));
    }
  };

  const handleStartChallengeDay = (dayNum: number) => {
    setActiveChallengePracticeDay(dayNum);
  };

  const handleFinishChallengeSession = (updatedChallenge: ChallengeProgress, result: DailySessionResult) => {
    setActiveChallenge(updatedChallenge);
    if (currentUser) {
      saveChallengeToCloud(updatedChallenge).catch(err => console.error("Cloud challenge update failed:", err));
    }
    if (result.xpEarned) {
      setStreak(prev => Math.max(prev, updatedChallenge.currentStreak));
      setLongestStreak(prev => Math.max(prev, updatedChallenge.longestStreak));
    }
    if (updatedChallenge.status === "completed") {
      playStreakCelebrationChime();
      setIsChallengeCompletionOpen(true);
    }
  };

  const handleResetChallenge = () => {
    if (activeChallenge) {
      removeChallengeFromLocal(activeChallenge.level);
    }
    removeChallengeFromLocal();
    setActiveChallenge(null);
    setActiveChallengePracticeDay(null);
  };
  
  // PWA & Mobile Install states
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(() => {
    try {
      const dismissed = localStorage.getItem("german_pwa_dismissed");
      return dismissed !== "true";
    } catch {
      return true;
    }
  });
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showNativeGuide, setShowNativeGuide] = useState(false);

  useEffect(() => {
    // Check if running as standalone (installed PWA)
    const checkStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    setIsStandalone(checkStandalone);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const isIOSDevice = useMemo(() => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  }, []);

  const handleInstallApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          setIsStandalone(true);
        }
        setDeferredPrompt(null);
      });
    } else {
      setShowNativeGuide(true);
    }
  };

  const dismissInstallBanner = () => {
    setShowInstallBanner(false);
    try {
      localStorage.setItem("german_pwa_dismissed", "true");
    } catch (e) {}
  };

  
  // Search & filter states for dictionary explore
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [activeLessonContext, setActiveLessonContext] = useState<LessonContext | null>(null);
  
  // Multi-level selection state (e.g. ["A1", "A2"] allows studying 2 levels simultaneously, or [] for ALL)
  const [selectedLevels, setSelectedLevels] = useState<string[]>(() => {
    try {
      const savedArray = localStorage.getItem("german_selected_levels");
      if (savedArray) {
        const parsed = JSON.parse(savedArray);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter(l => ["A1", "A2", "B1", "B2"].includes(l));
        }
      }
      const oldSingle = localStorage.getItem("german_selected_level");
      if (oldSingle && ["A1", "A2", "B1", "B2"].includes(oldSingle)) {
        return [oldSingle];
      }
      return [];
    } catch {
      return [];
    }
  });

  // Single level value for components that expect single level
  const selectedLevel = selectedLevels.length === 1 ? selectedLevels[0] : null;

  // Toggle multi-level selection (e.g. clicking A1 and A2 activates both)
  const toggleLevel = (lvl: string) => {
    setSelectedLevels(prev => {
      if (lvl === "ALL") return [];
      if (prev.length === 0 || prev.length === 4) {
        return [lvl];
      }
      if (prev.includes(lvl)) {
        const next = prev.filter(l => l !== lvl);
        return next;
      }
      const order = ["A1", "A2", "B1", "B2"];
      return [...prev, lvl].sort((a, b) => order.indexOf(a) - order.indexOf(b));
    });
  };

  // Set single level or preset
  const setSelectedLevel = (level: string | null) => {
    if (!level || level === "ALL") {
      setSelectedLevels([]);
    } else if (level === "A1+A2") {
      setSelectedLevels(["A1", "A2"]);
    } else if (level === "B1+B2") {
      setSelectedLevels(["B1", "B2"]);
    } else {
      setSelectedLevels([level]);
    }
  };

  // Human-readable badge text for active levels
  const selectedLevelsBadgeText = useMemo(() => {
    if (selectedLevels.length === 0 || selectedLevels.length === 4) return "A1-B2";
    return selectedLevels.join(" + ");
  }, [selectedLevels]);

  // Save selectedLevels to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("german_selected_levels", JSON.stringify(selectedLevels));
      if (selectedLevels.length === 1) {
        localStorage.setItem("german_selected_level", selectedLevels[0]);
      } else {
        localStorage.removeItem("german_selected_level");
      }
    } catch (e) {}
  }, [selectedLevels]);

  // Translation Direction state (English to German vs German to English)
  const [translationDirection, setTranslationDirection] = useState<"en-to-de" | "de-to-en">(() => {
    try {
      return (localStorage.getItem("german_translation_direction") as "en-to-de" | "de-to-en") || "en-to-de";
    } catch {
      return "en-to-de";
    }
  });

  // Save translationDirection to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("german_translation_direction", translationDirection);
    } catch (e) {}
  }, [translationDirection]);
  
  // Bookmarks saved in localStorage
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("german_vocab_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Mastered words (pronounced correctly) persisted in localStorage
  const [masteredWords, setMasteredWords] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("german_vocab_mastered");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Unknown words (flagged to practice later) persisted in localStorage and cloud
  const [unknownWords, setUnknownWords] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("german_vocab_unknown_words");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter state to view unknown / needs practice words only
  const [showUnknownOnly, setShowUnknownOnly] = useState(false);

  // Flashcards persistent position & resume memory
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("german_vocab_flashcard_index");
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [lastStudiedCardWord, setLastStudiedCardWord] = useState<string>(() => {
    try {
      return localStorage.getItem("german_vocab_flashcard_word") || "";
    } catch {
      return "";
    }
  });

  // Streak state (number of consecutive days active)
  const [streak, setStreak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("german_vocab_streak");
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Longest all-time streak record
  const [longestStreak, setLongestStreak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("german_vocab_longest_streak");
      const streakSaved = localStorage.getItem("german_vocab_streak");
      const current = streakSaved ? parseInt(streakSaved, 10) : 0;
      const longest = saved ? parseInt(saved, 10) : 0;
      return Math.max(current, longest);
    } catch {
      return 0;
    }
  });

  const [lastActiveDate, setLastActiveDate] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("german_vocab_last_active");
      return saved || "";
    } catch {
      return "";
    }
  });

  const [showStreakCelebration, setShowStreakCelebration] = useState(false);
  const [isStreakMilestoneTriggered, setIsStreakMilestoneTriggered] = useState(false);
  const [streakMilestoneReason, setStreakMilestoneReason] = useState<string | null>(null);

  // Helper to trigger celebratory animation on the streak counter in header
  const triggerStreakAnimation = (newStreak: number) => {
    let reason = `🔥 ${newStreak} DAYS STREAK!`;
    if (newStreak > longestStreak && newStreak > 1) {
      setLongestStreak(newStreak);
      try {
        localStorage.setItem("german_vocab_longest_streak", newStreak.toString());
      } catch {}
      reason = `🔥 NEW RECORD: ${newStreak} DAYS!`;
    } else if (isStreakMilestone(newStreak)) {
      reason = `🎉 ${newStreak}-DAY MILESTONE!`;
    } else if (newStreak === 1) {
      reason = `🔥 STREAK IGNITED!`;
    }
    setStreakMilestoneReason(reason);
    setIsStreakMilestoneTriggered(true);
    playStreakCelebrationChime();
  };

  // Auth listener & sync progress from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const cloudProgress = await getUserProgress(user.uid);
          if (cloudProgress) {
            if (Array.isArray(cloudProgress.bookmarks) && cloudProgress.bookmarks.length > 0) {
              setBookmarks(cloudProgress.bookmarks);
            }
            if (Array.isArray(cloudProgress.masteredWords) && cloudProgress.masteredWords.length > 0) {
              setMasteredWords(cloudProgress.masteredWords);
            }
            if (Array.isArray(cloudProgress.unknownWords) && cloudProgress.unknownWords.length > 0) {
              setUnknownWords(cloudProgress.unknownWords);
            }
            if (typeof cloudProgress.streakDays === "number" && cloudProgress.streakDays > 0) {
              setStreak(cloudProgress.streakDays);
            }
            if (typeof cloudProgress.longestStreakDays === "number" && cloudProgress.longestStreakDays > 0) {
              setLongestStreak(prev => Math.max(prev, cloudProgress.longestStreakDays || 0));
            }
            if (typeof cloudProgress.lastFlashcardIndex === "number" && cloudProgress.lastFlashcardIndex >= 0) {
              setCurrentCardIndex(cloudProgress.lastFlashcardIndex);
            }
            if (cloudProgress.lastFlashcardWord) {
              setLastStudiedCardWord(cloudProgress.lastFlashcardWord);
            }
          }
          // Sync 30-Day Challenge from cloud
          const cloudChallenge = await loadChallengeFromCloud(user.uid);
          if (cloudChallenge) {
            setActiveChallenge(cloudChallenge);
            saveChallengeToLocal(cloudChallenge);
          }
        } catch (err) {
          console.error("Failed to sync progress from Firestore:", err);
        }
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sync progress changes to Firestore when user is logged in
  useEffect(() => {
    if (currentUser) {
      saveUserProgress(currentUser.uid, {
        bookmarks,
        masteredWords,
        unknownWords,
        lastFlashcardIndex: currentCardIndex,
        lastFlashcardWord: lastStudiedCardWord,
        totalXP: masteredWords.length * 10,
        streakDays: streak,
        longestStreakDays: Math.max(streak, longestStreak),
        updatedAt: new Date().toISOString()
      }).catch(err => console.error("Failed to save progress to Firestore:", err));
    }
  }, [currentUser, bookmarks, masteredWords, unknownWords, streak, longestStreak, currentCardIndex, lastStudiedCardWord]);

  // Synchronize streak, active date, bookmarks, masteredWords, unknownWords to localStorage for offline caching
  useEffect(() => {
    try {
      localStorage.setItem("german_vocab_bookmarks", JSON.stringify(bookmarks));
    } catch {}
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem("german_vocab_mastered", JSON.stringify(masteredWords));
    } catch {}
  }, [masteredWords]);

  useEffect(() => {
    try {
      localStorage.setItem("german_vocab_unknown_words", JSON.stringify(unknownWords));
    } catch {}
  }, [unknownWords]);

  useEffect(() => {
    try {
      localStorage.setItem("german_vocab_flashcard_index", currentCardIndex.toString());
      if (lastStudiedCardWord) {
        localStorage.setItem("german_vocab_flashcard_word", lastStudiedCardWord);
      }
    } catch {}
  }, [currentCardIndex, lastStudiedCardWord]);

  useEffect(() => {
    try {
      localStorage.setItem("german_vocab_streak", streak.toString());
      if (streak > longestStreak) {
        setLongestStreak(streak);
        localStorage.setItem("german_vocab_longest_streak", streak.toString());
      }
    } catch {}
  }, [streak, longestStreak]);

  useEffect(() => {
    try {
      localStorage.setItem("german_vocab_longest_streak", longestStreak.toString());
    } catch {}
  }, [longestStreak]);

  useEffect(() => {
    try {
      localStorage.setItem("german_vocab_last_active", lastActiveDate);
    } catch {}
  }, [lastActiveDate]);

  // Check on mount if streak is broken
  useEffect(() => {
    if (!lastActiveDate) return;
    
    const todayStr = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD
    if (lastActiveDate === todayStr) return; // Active today, so streak is perfectly intact
    
    const parseLocalDate = (dateStr: string) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day);
    };
    
    const lastActive = parseLocalDate(lastActiveDate);
    const today = parseLocalDate(todayStr);
    
    // Difference in days
    const diffTime = today.getTime() - lastActive.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) {
      // Streak broken!
      setStreak(0);
    }
  }, [lastActiveDate]);

  // Function to record a learning activity and update/maintain streak
  const recordActivity = () => {
    const todayStr = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD local time
    
    if (!lastActiveDate) {
      // First activity ever
      setStreak(1);
      setLastActiveDate(todayStr);
      triggerStreakAnimation(1);
      setShowStreakCelebration(true);
    } else if (lastActiveDate === todayStr) {
      // Already active today, streak is safe and stays the same
    } else {
      const parseLocalDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
      };
      
      const lastActive = parseLocalDate(lastActiveDate);
      const today = parseLocalDate(todayStr);
      const diffTime = today.getTime() - lastActive.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Consecutive day
        setStreak(prev => {
          const nextStreak = prev + 1;
          triggerStreakAnimation(nextStreak);
          setShowStreakCelebration(true);
          return nextStreak;
        });
        setLastActiveDate(todayStr);
      } else {
        // Streak was broken or skipped, restart at 1
        setStreak(1);
        setLastActiveDate(todayStr);
        triggerStreakAnimation(1);
        setShowStreakCelebration(true);
      }
    }
  };

  // Custom helper states
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [showPronunciationGuide, setShowPronunciationGuide] = useState(false);

  // Practice state
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedText, setRecordedText] = useState("");
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [micPermissionDenied, setMicPermissionDenied] = useState(false);
  const [isSentencePractice, setIsSentencePractice] = useState(false);
  const [practicingSentenceText, setPracticingSentenceText] = useState("");

  // Flashcards flip state
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcardPracticeMode, setFlashcardPracticeMode] = useState<"all" | "unknown" | "bookmarks">("all");

  // Phrases Tab States
  const [phraseLevel, setPhraseLevel] = useState<"A1" | "A2" | "B1" | "B2">("A1");
  const [phrasesList, setPhrasesList] = useState<PhraseEntry[]>(() => loadPhrasesForLevel("A1"));
  const [selectedPhraseTheme, setSelectedPhraseTheme] = useState<string | null>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phraseFlipped, setPhraseFlipped] = useState(false);
  const [showPhrasesCustomJsonPanel, setShowPhrasesCustomJsonPanel] = useState(false);
  const [phrasesCustomJsonInput, setPhrasesCustomJsonInput] = useState("");
  const [phrasesCustomJsonError, setPhrasesCustomJsonError] = useState<string | null>(null);

  // Phrases active practice evaluation states
  const [phraseRecording, setPhraseRecording] = useState(false);
  const [phraseRecordedText, setPhraseRecordedText] = useState("");
  const [phraseMatchScore, setPhraseMatchScore] = useState<number | null>(null);
  const [phraseSpeechError, setPhraseSpeechError] = useState<string | null>(null);

  // Available themes for current level phrases
  const availableThemesForLevel = useMemo(() => {
    const themesSet = new Set<string>();
    phrasesList.forEach((p) => {
      if (p.theme) {
        themesSet.add(p.theme);
      }
    });
    return Array.from(themesSet).sort();
  }, [phrasesList]);

  // Filtered phrases based on selected theme
  const filteredPhrases = useMemo(() => {
    if (!selectedPhraseTheme) return phrasesList;
    return phrasesList.filter((p) => p.theme === selectedPhraseTheme);
  }, [phrasesList, selectedPhraseTheme]);

  // Sync phrases list when selectedLevels or phraseLevel changes
  useEffect(() => {
    const validLevels = selectedLevels.filter(l => ["A1", "A2", "B1", "B2"].includes(l)) as ("A1" | "A2" | "B1" | "B2")[];
    if (validLevels.length > 0) {
      setPhrasesList(loadPhrasesForLevels(validLevels));
    } else {
      setPhrasesList(loadPhrasesForLevel(phraseLevel));
    }
    setSelectedPhraseTheme(null);
    setPhraseIndex(0);
    setPhraseFlipped(false);
    setPhraseRecordedText("");
    setPhraseMatchScore(null);
    setPhraseSpeechError(null);
    setPhraseRecording(false);
  }, [phraseLevel, selectedLevels]);

  // Reset indices and evaluations when phrase theme changes
  useEffect(() => {
    setPhraseIndex(0);
    setPhraseFlipped(false);
    setPhraseRecordedText("");
    setPhraseMatchScore(null);
    setPhraseSpeechError(null);
    setPhraseRecording(false);
  }, [selectedPhraseTheme]);

  // Reset flip when phrase index changes
  useEffect(() => {
    setPhraseFlipped(false);
  }, [phraseIndex]);

  // Speech Recognition for Phrases Tab
  const startPhraseSpeechRecognition = (targetText: string) => {
    setPhraseSpeechError(null);
    
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      setPhraseSpeechError("Speech recognition is not fully supported in this browser. Please use Google Chrome, Safari, or Microsoft Edge.");
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.lang = "de-DE";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setPhraseRecording(true);
        setPhraseRecordedText("");
        setPhraseMatchScore(null);
      };

      recognition.onerror = (event: any) => {
        console.error("Phrase Speech Recognition Error", event);
        setPhraseRecording(false);
        if (event.error === "not-allowed") {
          setMicPermissionDenied(true);
          setPhraseSpeechError("Microphone permission was denied. If using inside a frame preview, please click 'Open in New Tab' on the top-right to authorize your microphone.");
        } else if (event.error === "no-speech") {
          setPhraseSpeechError("No voice was detected. Please speak closer and clearly to your microphone.");
        } else {
          setPhraseSpeechError(`Microphone issue detected (${event.error}). Please try again.`);
        }
      };

      recognition.onend = () => {
        setPhraseRecording(false);
      };

      recognition.onresult = (event: any) => {
        const transcriptText = event.results[0][0].transcript;
        setPhraseRecordedText(transcriptText);

        const evaluation = calculatePronunciationMatch(targetText, transcriptText);
        setPhraseMatchScore(evaluation.score);
        recordActivity();
      };

      recognition.start();
    } catch (err: any) {
      setPhraseSpeechError(`Error initializing microphone: ${err.message || err}`);
      setPhraseRecording(false);
    }
  };

  // Quiz states
  const [quizScore, setQuizScore] = useState(0);
  const [quizQuestionsAnswered, setQuizQuestionsAnswered] = useState(0);
  const [currentQuizWord, setCurrentQuizQuizWord] = useState<VocabularyEntry | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [quizExampleSentence, setQuizExampleSentence] = useState("");
  const [quizFullSentence, setQuizFullSentence] = useState("");
  const [quizExampleTranslation, setQuizExampleTranslation] = useState("");

  // Speak function for TTS with natural human pitch and mobile neural voice matching
  const speakWord = (text: string, slow: boolean = false) => {
    speakGerman(text, { slow });
    recordActivity();
  };

  // Sync bookmarks & mastered words to localStorage
  useEffect(() => {
    localStorage.setItem("german_vocab_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("german_vocab_mastered", JSON.stringify(masteredWords));
  }, [masteredWords]);

  // Handle bookmark toggle
  const toggleBookmark = (word: string) => {
    setBookmarks(prev => 
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
    recordActivity();
  };

  // Toggle word mastery
  const toggleMastered = (word: string) => {
    setMasteredWords(prev =>
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
    recordActivity();
  };

  // Toggle unknown / practice later status
  const toggleUnknown = (word: string) => {
    setUnknownWords(prev =>
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
    recordActivity();
  };

  // Explicit mark as unknown
  const markAsUnknown = (word: string) => {
    setUnknownWords(prev => prev.includes(word) ? prev : [...prev, word]);
    recordActivity();
  };

  // Explicit mark as known / mastered (clears from unknown queue)
  const markAsKnown = (word: string) => {
    setUnknownWords(prev => prev.filter(w => w !== word));
    setMasteredWords(prev => prev.includes(word) ? prev : [...prev, word]);
    recordActivity();
  };

  // Get unique themes in dataset for filtering/practicing based on selectedLevels
  const themes = useMemo(() => {
    const set = new Set<string>();
    VOCABULARY_DATA.forEach(entry => {
      if (entry.theme && (selectedLevels.length === 0 || selectedLevels.includes(entry.level))) {
        set.add(normalizeThemeName(entry.theme));
      }
    });
    return Array.from(set).sort();
  }, [selectedLevels]);

  // Reset selectedTheme if it is no longer in the available themes for the active levels
  useEffect(() => {
    if (selectedTheme && !themes.includes(normalizeThemeName(selectedTheme))) {
      setSelectedTheme(null);
    }
  }, [selectedLevels, themes, selectedTheme]);

  // Get unique word types for filtering
  const wordTypes = useMemo(() => {
    const set = new Set<string>();
    VOCABULARY_DATA.forEach(entry => {
      set.add(entry.type);
    });
    return Array.from(set).sort();
  }, []);

  // Get unique levels for filtering
  const levels = useMemo(() => {
    const set = new Set<string>();
    VOCABULARY_DATA.forEach(entry => {
      if (entry.level) {
        set.add(entry.level);
      }
    });
    return Array.from(set).sort();
  }, []);

  // Filtered dataset for explorer
  const filteredVocabulary = useMemo(() => {
    return VOCABULARY_DATA.filter(entry => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        entry.word.toLowerCase().includes(query) ||
        entry.english_translation.toLowerCase().includes(query) ||
        (entry.forms && entry.forms.toLowerCase().includes(query)) ||
        entry.examples.some(ex => ex.de.toLowerCase().includes(query) || ex.en.toLowerCase().includes(query));
      
      const matchesTheme = !selectedTheme || normalizeThemeName(entry.theme) === normalizeThemeName(selectedTheme);
      const matchesType = !selectedType || entry.type === selectedType;
      const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(entry.level);
      const matchesBookmark = !showBookmarksOnly || bookmarks.includes(entry.word);
      const matchesUnknown = !showUnknownOnly || unknownWords.includes(entry.word);
      
      return matchesSearch && matchesTheme && matchesType && matchesLevel && matchesBookmark && matchesUnknown;
    });
  }, [searchQuery, selectedTheme, selectedType, selectedLevels, showBookmarksOnly, bookmarks, showUnknownOnly, unknownWords]);

  // Practice Vocabulary of current selected theme and levels
  const practiceVocabulary = useMemo(() => {
    let pool = VOCABULARY_DATA;
    if (showUnknownOnly && unknownWords.length > 0) {
      pool = pool.filter(entry => unknownWords.includes(entry.word));
    }
    if (selectedTheme) {
      pool = pool.filter(entry => normalizeThemeName(entry.theme) === normalizeThemeName(selectedTheme));
    }
    if (selectedLevels.length > 0) {
      pool = pool.filter(entry => selectedLevels.includes(entry.level));
    }
    return pool.length > 0 ? pool : VOCABULARY_DATA;
  }, [selectedTheme, selectedLevels, showUnknownOnly, unknownWords]);

  // Duo the Owl Custom speech bubble state-computed text helper
  const getDuoMessage = () => {
    if (isRecording) {
      return "Listening closely! Pronounce the target clearly into your microphone! 🦉🎙️";
    }
    if (matchScore !== null) {
      if (matchScore >= 85) {
        return `Unglaublich! Excellent pronunciation! You earned 10 XP! Your current streak is ${streak} days! 🦉🔥`;
      }
      if (matchScore >= 50) {
        return "Sehr gut! Almost there. Click the microphone to try again for a perfect score! 🦉💪";
      }
      return "Übung macht den Meister! German pronunciation can be tricky. Try listening to slow speed! 🦉💡";
    }
    const currentWord = practiceVocabulary[practiceIndex]?.word || "this word";
    return `Guten Tag! Let's listen to "${currentWord}" in normal or slow speed, then practice speaking it! Keep your ${streak}-day streak alive! 🦉🇩🇪`;
  };

  // Handle selected theme or level changes: reset practice session
  useEffect(() => {
    setPracticeIndex(0);
    setRecordedText("");
    setMatchScore(null);
    setSpeechError(null);
    setIsRecording(false);
    setIsSentencePractice(false);
  }, [selectedTheme, selectedLevels]);

  // Flashcards subset with mode support ("all" | "unknown" | "bookmarks")
  const flashcardSubset = useMemo(() => {
    let pool = VOCABULARY_DATA;
    
    if (flashcardPracticeMode === "unknown") {
      pool = pool.filter(entry => unknownWords.includes(entry.word));
      if (selectedLevels.length > 0) {
        const levelPool = pool.filter(entry => selectedLevels.includes(entry.level));
        if (levelPool.length > 0) pool = levelPool;
      }
      return pool;
    }

    if (flashcardPracticeMode === "bookmarks") {
      pool = pool.filter(entry => bookmarks.includes(entry.word));
      if (selectedLevels.length > 0) {
        const levelPool = pool.filter(entry => selectedLevels.includes(entry.level));
        if (levelPool.length > 0) pool = levelPool;
      }
      return pool;
    }

    if (selectedLevels.length > 0) {
      pool = pool.filter(entry => selectedLevels.includes(entry.level));
    }
    if (selectedTheme) {
      pool = pool.filter(entry => normalizeThemeName(entry.theme) === normalizeThemeName(selectedTheme));
    }
    if (selectedType) {
      pool = pool.filter(entry => entry.type === selectedType);
    }
    if (showBookmarksOnly) {
      pool = pool.filter(entry => bookmarks.includes(entry.word));
    }
    if (showUnknownOnly) {
      pool = pool.filter(entry => unknownWords.includes(entry.word));
    }
    return pool.length > 0 ? pool : (selectedLevels.length > 0 ? VOCABULARY_DATA.filter(e => selectedLevels.includes(e.level)) : VOCABULARY_DATA);
  }, [selectedLevels, selectedTheme, selectedType, showBookmarksOnly, bookmarks, showUnknownOnly, unknownWords, flashcardPracticeMode]);

  // Seamlessly resume and preserve flashcard position across sessions, tab switches, and filters
  useEffect(() => {
    if (!flashcardSubset || flashcardSubset.length === 0) {
      return;
    }

    // 1. If we remember the last studied word, try to resume on that exact word in the current deck
    if (lastStudiedCardWord) {
      const matchIdx = flashcardSubset.findIndex(e => e.word === lastStudiedCardWord);
      if (matchIdx >= 0) {
        if (matchIdx !== currentCardIndex) {
          setCurrentCardIndex(matchIdx);
          setIsFlipped(false);
        }
        return;
      }
    }

    // 2. Otherwise safely clamp the index within current subset range without throwing away progress
    if (currentCardIndex >= flashcardSubset.length) {
      setCurrentCardIndex(Math.max(0, flashcardSubset.length - 1));
      setIsFlipped(false);
    }
  }, [flashcardSubset]);

  // Speech recognition activation
  const startSpeechRecognition = (targetText: string, isSentence: boolean = false) => {
    setSpeechError(null);
    setIsSentencePractice(isSentence);
    setPracticingSentenceText(isSentence ? targetText : "");
    
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      setSpeechError("Speech recognition is not fully supported in this browser. Please use Google Chrome, Safari, or Microsoft Edge.");
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.lang = "de-DE"; // Set standard German language recognition
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
        setRecordedText("");
        setMatchScore(null);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech Recognition Error", event);
        setIsRecording(false);
        if (event.error === "not-allowed") {
          setMicPermissionDenied(true);
          setSpeechError("Microphone permission was denied. If using inside a frame preview, please click 'Open in New Tab' on the top-right to authorize your microphone.");
        } else if (event.error === "no-speech") {
          setSpeechError("No voice was detected. Please speak closer and clearly to your microphone.");
        } else {
          setSpeechError(`Microphone issue detected (${event.error}). Please try again.`);
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.onresult = (event: any) => {
        const transcriptText = event.results[0][0].transcript;
        setRecordedText(transcriptText);

        const evaluation = calculatePronunciationMatch(targetText, transcriptText);
        setMatchScore(evaluation.score);
        recordActivity();

        // Auto mark as mastered if accuracy is very high and it's practicing the headword
        if (evaluation.score >= 85 && !isSentence) {
          const currentWord = practiceVocabulary[practiceIndex]?.word;
          if (currentWord && !masteredWords.includes(currentWord)) {
            setMasteredWords(prev => [...prev, currentWord]);
          }
        }
      };

      recognition.start();
    } catch (err: any) {
      setSpeechError(`Error initializing microphone: ${err.message || err}`);
      setIsRecording(false);
    }
  };

  // Safely creates a cloze sentence by replacing target word/stem with "______"
  const createClozeSentence = (sentence: string, wordEntry: VocabularyEntry): string => {
    if (!sentence) return "______";

    // 1. Remove parenthesized text (e.g. "(+ Akk)", "[pl.]"), leading articles, reflexives, and comma suffixes
    const cleaned = wordEntry.word
      .replace(/\([^)]*\)/g, "")
      .replace(/\[[^\]]*\]/g, "")
      .replace(/^\((der|die|das|ein|eine|sich)\)\s+/i, "")
      .replace(/^(der|die|das|ein|eine|sich)\s+/i, "")
      .replace(/\b(sich|jdm|jdn|etw)\b/gi, "")
      .replace(/,.*$/, "")
      .trim();

    // Split into lexical tokens (e.g. "spezialisieren" from "spezialisieren...")
    const tokens = cleaned.split(/[\s,+/]+/).filter(t => t.length >= 2);

    let cloze = sentence;
    let replaced = false;

    for (const token of tokens) {
      const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      try {
        const tokenRegex = new RegExp(`\\b${escaped}\\w*\\b`, "gi");
        if (tokenRegex.test(cloze)) {
          cloze = cloze.replace(tokenRegex, "______");
          replaced = true;
          break;
        }
      } catch {
        // Safe regex fallback
      }

      // Try matching verb or noun stems
      const stem = token.replace(/(en|eln|ern|est|et|te|ten|e)$/i, "");
      if (stem.length >= 3) {
        const escapedStem = stem.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        try {
          const stemRegex = new RegExp(`\\b${escapedStem}[a-zäöüß]*\\b`, "gi");
          if (stemRegex.test(cloze)) {
            cloze = cloze.replace(stemRegex, "______");
            replaced = true;
            break;
          }
        } catch {
          // Safe regex fallback
        }
      }
    }

    // Check irregular forms if not yet replaced
    if (!replaced && wordEntry.forms) {
      const formTokens = wordEntry.forms
        .replace(/[(),]/g, " ")
        .split(/\s+/)
        .filter(t => t.length >= 3);
      for (const f of formTokens) {
        const escapedForm = f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        try {
          const formRegex = new RegExp(`\\b${escapedForm}\\b`, "gi");
          if (formRegex.test(cloze)) {
            cloze = cloze.replace(formRegex, "______");
            replaced = true;
            break;
          }
        } catch {
          // Safe regex fallback
        }
      }
    }

    // Fallback: If sentence was unchanged, replace the most distinctive word
    if (!replaced || cloze === sentence) {
      const words = sentence.split(/\s+/).filter(w => w.length >= 4 && !/^(der|die|das|dem|den|des|ein|eine|einem|einen|einer|und|oder|aber|ist|sind|war|hat|haben|hatte|wird|werden|wurde|von|mit|nach|zu|bei|in|an|auf|für)$/i.test(w));
      if (words.length > 0) {
        const target = words[0].replace(/[^a-zA-ZäöüÄÖÜß]/g, "");
        if (target.length > 0) {
          const escapedTarget = target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          try {
            cloze = sentence.replace(new RegExp(`\\b${escapedTarget}\\b`, "i"), "______");
          } catch {
            cloze = sentence.replace(target, "______");
          }
        }
      }
    }

    return cloze;
  };

  // Generate a new quiz question
  const generateQuizQuestion = () => {
    if (VOCABULARY_DATA.length === 0) return;
    
    let eligibleWords = VOCABULARY_DATA.filter(w => w.examples.length > 0);
    if (selectedLevels.length > 0) {
      const levelFiltered = eligibleWords.filter(w => selectedLevels.includes(w.level));
      if (levelFiltered.length > 0) {
        eligibleWords = levelFiltered;
      }
    }
    if (eligibleWords.length === 0) return;

    const randomWord = eligibleWords[Math.floor(Math.random() * eligibleWords.length)];
    const sentenceObj = randomWord.examples[Math.floor(Math.random() * randomWord.examples.length)];
    const sentence = sentenceObj.de;
    const translation = sentenceObj.en;
    
    const clozeSentence = createClozeSentence(sentence, randomWord);
    
    let distractorPool = VOCABULARY_DATA.filter(w => w.word !== randomWord.word);
    if (selectedLevels.length > 0) {
      const levelDistractorPool = distractorPool.filter(w => selectedLevels.includes(w.level));
      if (levelDistractorPool.length >= 3) {
        distractorPool = levelDistractorPool;
      }
    }

    const incorrectOptions = distractorPool
      .map(w => w.word)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
      
    const options = [randomWord.word, ...incorrectOptions].sort(() => 0.5 - Math.random());
    
    setCurrentQuizQuizWord(randomWord);
    setQuizExampleSentence(clozeSentence);
    setQuizFullSentence(sentence);
    setQuizExampleTranslation(translation);
    setQuizOptions(options);
    setSelectedQuizOption(null);
    setIsAnswerCorrect(null);
  };

  // Re-generate quiz question when selectedLevels changes
  useEffect(() => {
    generateQuizQuestion();
  }, [selectedLevels]);

  // Handle quiz option click
  const handleQuizAnswer = (option: string) => {
    if (selectedQuizOption !== null) return;
    
    setSelectedQuizOption(option);
    const correct = option === currentQuizWord?.word;
    setIsAnswerCorrect(correct);
    setQuizQuestionsAnswered(prev => prev + 1);
    if (correct) {
      setQuizScore(prev => prev + 1);
    }
    recordActivity();
  };



  // Themes list for each level starting from A1 to B2
  const themesByLevel = useMemo(() => {
    const mapping: Record<"A1" | "A2" | "B1" | "B2", string[]> = {
      A1: [],
      A2: [],
      B1: [],
      B2: []
    };
    
    VOCABULARY_DATA.forEach(entry => {
      if (entry.theme && entry.level) {
        if (!mapping[entry.level].includes(entry.theme)) {
          mapping[entry.level].push(entry.theme);
        }
      }
    });

    // Sort themes for consistent layout
    (["A1", "A2", "B1", "B2"] as const).forEach(lvl => {
      mapping[lvl].sort();
    });

    return mapping;
  }, []);

  // Calculate mastery statistics for each (theme, level) combination
  const themeStatsByLevelAndTheme = useMemo(() => {
    const stats: Record<string, Record<string, { total: number; mastered: number; percentage: number }>> = {
      A1: {},
      A2: {},
      B1: {},
      B2: {},
    };

    VOCABULARY_DATA.forEach(word => {
      const lvl = word.level;
      const theme = word.theme;
      if (lvl && theme) {
        if (!stats[lvl][theme]) {
          stats[lvl][theme] = { total: 0, mastered: 0, percentage: 0 };
        }
        stats[lvl][theme].total += 1;
        if (masteredWords.includes(word.word)) {
          stats[lvl][theme].mastered += 1;
        }
      }
    });

    // Calculate percentages
    (["A1", "A2", "B1", "B2"] as const).forEach(lvl => {
      Object.keys(stats[lvl]).forEach(theme => {
        const s = stats[lvl][theme];
        s.percentage = s.total > 0 ? Math.round((s.mastered / s.total) * 100) : 0;
      });
    });

    return stats;
  }, [masteredWords]);

  // Calculate mastery statistics for each theme
  const themeStats = useMemo(() => {
    const stats: Record<string, { total: number; mastered: number; percentage: number }> = {};
    
    // Initialize stats
    themes.forEach(theme => {
      stats[theme] = { total: 0, mastered: 0, percentage: 0 };
    });

    // Count words and mastered status
    VOCABULARY_DATA.forEach(word => {
      if (selectedLevels.length > 0 && !selectedLevels.includes(word.level)) return;
      if (word.theme && stats[word.theme]) {
        stats[word.theme].total += 1;
        if (masteredWords.includes(word.word)) {
          stats[word.theme].mastered += 1;
        }
      }
    });

    // Calculate percentage
    themes.forEach(theme => {
      const s = stats[theme];
      s.percentage = s.total > 0 ? Math.round((s.mastered / s.total) * 100) : 0;
    });

    return stats;
  }, [masteredWords, themes, selectedLevels]);

  // Overall Mastery percentage
  const totalMasteredPercentage = useMemo(() => {
    if (VOCABULARY_DATA.length === 0) return 0;
    return Math.round((masteredWords.length / VOCABULARY_DATA.length) * 100);
  }, [masteredWords]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-[#58cc02] text-white font-black text-2xl flex items-center justify-center shadow-[0_6px_0_#46a302] animate-bounce mb-4">
          dG
        </div>
        <h2 className="text-xl font-extrabold text-slate-800">Loading deutschGrid...</h2>
        <p className="text-xs text-slate-500 mt-1">Verifying your account session</p>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col antialiased">
      {/* Duolingo Gamified Header */}
      <header className="bg-white border-b-4 border-slate-200 text-slate-800 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-2.5 md:py-3.5 flex flex-col md:flex-row justify-between items-center gap-3">
          
          {/* Top-Left Header Group: Level Selector Dropdown + Logo */}
          <div className="flex flex-wrap items-center justify-between md:justify-start w-full md:w-auto gap-3.5">
            {/* Top Left Language Level Selector Dropdown & Quick Toggle Pills */}
            <div id="top-left-level-selector" className="flex items-center gap-1.5 bg-slate-100 border-2 border-slate-200 border-b-4 px-2.5 py-1.5 rounded-2xl transition-all shadow-xs">
              <label htmlFor="header-level-dropdown" className="text-[10px] font-black uppercase tracking-wider text-slate-500 shrink-0 flex items-center gap-1 cursor-pointer">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Level:</span>
              </label>

              {/* Quick toggle pill buttons for 1-click multi-level selection */}
              <div className="flex items-center gap-1">
                {(["A1", "A2", "B1", "B2"] as const).map(lvl => {
                  const isSelected = selectedLevels.includes(lvl);
                  const isAllActive = selectedLevels.length === 0 || selectedLevels.length === 4;
                  const colorClass = 
                    lvl === "A1" ? (isSelected ? "bg-emerald-600 text-white border-emerald-700 shadow-xs" : isAllActive ? "bg-emerald-100/70 text-emerald-800 border-emerald-200 hover:bg-emerald-200" : "bg-white text-slate-400 border-slate-200 hover:bg-slate-100") :
                    lvl === "A2" ? (isSelected ? "bg-amber-600 text-white border-amber-700 shadow-xs" : isAllActive ? "bg-amber-100/70 text-amber-800 border-amber-200 hover:bg-amber-200" : "bg-white text-slate-400 border-slate-200 hover:bg-slate-100") :
                    lvl === "B1" ? (isSelected ? "bg-blue-600 text-white border-blue-700 shadow-xs" : isAllActive ? "bg-blue-100/70 text-blue-800 border-blue-200 hover:bg-blue-200" : "bg-white text-slate-400 border-slate-200 hover:bg-slate-100") :
                    (isSelected ? "bg-purple-600 text-white border-purple-700 shadow-xs" : isAllActive ? "bg-purple-100/70 text-purple-800 border-purple-200 hover:bg-purple-200" : "bg-white text-slate-400 border-slate-200 hover:bg-slate-100");

                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => toggleLevel(lvl)}
                      title={`Toggle ${lvl} (tap 2 levels to study together)`}
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-lg border transition-all cursor-pointer select-none active:scale-95 ${colorClass}`}
                    >
                      {isSelected && "✓ "}{lvl}
                    </button>
                  );
                })}
              </div>

              {/* Preset Selector Dropdown */}
              <select
                id="header-level-dropdown"
                value={
                  selectedLevels.length === 0 || selectedLevels.length === 4 ? "ALL" :
                  selectedLevels.length === 2 && selectedLevels.includes("A1") && selectedLevels.includes("A2") ? "A1+A2" :
                  selectedLevels.length === 2 && selectedLevels.includes("B1") && selectedLevels.includes("B2") ? "B1+B2" :
                  selectedLevels.length === 1 ? selectedLevels[0] :
                  "CUSTOM"
                }
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "CUSTOM") return;
                  setSelectedLevel(val === "ALL" ? null : val);
                }}
                className="bg-transparent text-xs font-black text-slate-900 uppercase tracking-tight focus:outline-none cursor-pointer pr-1 font-sans hidden lg:inline-block"
              >
                <option value="ALL" className="font-bold text-slate-800 bg-white">All Levels (A1-B2)</option>
                <option value="A1+A2" className="font-bold text-emerald-700 bg-white">A1 + A2 (Beginner Track)</option>
                <option value="B1+B2" className="font-bold text-blue-700 bg-white">B1 + B2 (Intermediate Track)</option>
                <option value="A1" className="font-bold text-emerald-700 bg-white">A1 • Beginner</option>
                <option value="A2" className="font-bold text-amber-700 bg-white">A2 • Elementary</option>
                <option value="B1" className="font-bold text-blue-700 bg-white">B1 • Intermediate</option>
                <option value="B2" className="font-bold text-purple-700 bg-white">B2 • Upper Intermediate</option>
                {selectedLevels.length > 0 && !["ALL", "A1+A2", "B1+B2", "A1", "A2", "B1", "B2"].includes(selectedLevels.join("+")) && (
                  <option value="CUSTOM" className="font-bold text-indigo-700 bg-white">{selectedLevels.join(" + ")} (Custom)</option>
                )}
              </select>

              {/* Dynamic Badge */}
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border text-white shadow-xs ${
                selectedLevels.length === 1 && selectedLevels[0] === "A1" ? "bg-emerald-600 border-emerald-700" :
                selectedLevels.length === 1 && selectedLevels[0] === "A2" ? "bg-amber-600 border-amber-700" :
                selectedLevels.length === 1 && selectedLevels[0] === "B1" ? "bg-blue-600 border-blue-700" :
                selectedLevels.length === 1 && selectedLevels[0] === "B2" ? "bg-purple-600 border-purple-700" :
                selectedLevels.length === 2 ? "bg-gradient-to-r from-emerald-600 to-blue-600 border-emerald-700" :
                "bg-teal-600 border-teal-700"
              }`}>
                {selectedLevelsBadgeText}
              </span>
            </div>

            {/* Translation Direction 3D Switch */}
            <div id="top-left-direction-selector" className="flex items-center gap-1 bg-slate-100 border-2 border-slate-200 border-b-4 active:border-b-2 active:translate-y-[1px] p-0.5 rounded-2xl transition-all shadow-xs shrink-0 select-none">
              <button
                type="button"
                onClick={() => setTranslationDirection("en-to-de")}
                title="Translate from English to German"
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all cursor-pointer flex items-center gap-1 ${
                  translationDirection === "en-to-de"
                    ? "bg-[#58cc02] text-white shadow-xs border-b-2 border-[#46a302]"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <span>EN ➔ DE</span>
              </button>
              <button
                type="button"
                onClick={() => setTranslationDirection("de-to-en")}
                title="Translate from German to English"
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all cursor-pointer flex items-center gap-1 ${
                  translationDirection === "de-to-en"
                    ? "bg-[#ffc800] text-white shadow-xs border-b-2 border-[#e6b400]"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <span>DE ➔ EN</span>
              </button>
            </div>

            {/* Logo & Subtitle */}
            <div className="flex items-center gap-3 select-none cursor-pointer" onClick={() => setSelectedTheme(null)}>
              <span className="text-3xl md:text-4xl animate-bounce duration-1000 shrink-0">🦉</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xl md:text-2xl font-black text-[#58cc02] tracking-tight">
                    deutsch<span className="text-[#1cb0f6]">Grid</span>
                  </h1>
                  <span className="bg-[#ffc800] text-[9px] md:text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-xl text-white shadow-sm border-b-2 border-[#e6b400]">
                    A1-B2
                  </span>
                </div>
                <p className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-wider hidden sm:flex items-center gap-1.5 mt-0.5">
                  <span className="text-[#58cc02]">Practice</span>
                  <span className="text-slate-300 font-black">•</span>
                  <span className="text-[#1cb0f6]">Listen</span>
                  <span className="text-slate-300 font-black">•</span>
                  <span className="text-[#ff9600]">Speak</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Duolingo Gamification Stats widgets */}
          <div className="flex flex-wrap items-center gap-3 md:gap-5 justify-center w-full md:w-auto">
            {/* Streak Counter with Milestone Animation & Interactive Dashboard */}
            <StreakHeaderCounter
              streak={streak}
              longestStreak={longestStreak}
              lastActiveDate={lastActiveDate}
              isMilestoneTriggered={isStreakMilestoneTriggered}
              milestoneReason={streakMilestoneReason}
              onClearMilestoneTrigger={() => {
                setIsStreakMilestoneTriggered(false);
                setStreakMilestoneReason(null);
              }}
              onManualTrigger={() => {
                triggerStreakAnimation(streak || 1);
              }}
            />

            {/* XP Points */}
            <div className="flex items-center gap-2 bg-emerald-50 border-2 border-green-200 px-3 py-1.5 rounded-2xl shadow-sm">
              <Sparkles className="w-5 h-5 text-[#58cc02] fill-[#58cc02]" />
              <div className="text-left">
                <span className="block text-xs font-black text-[#46a302] leading-none">
                  {masteredWords.length * 10} XP
                </span>
                <span className="text-[8px] text-[#58cc02] font-extrabold uppercase">XP EARNED</span>
              </div>
            </div>

            {/* Crown / Level */}
            <div className="flex items-center gap-2 bg-amber-50 border-2 border-amber-200 px-3 py-1.5 rounded-2xl shadow-sm">
              <Trophy className="w-5 h-5 text-[#ffc800] fill-[#ffc800]" />
              <div className="text-left">
                <span className="block text-xs font-black text-amber-700 leading-none">
                  Lvl {Math.floor(masteredWords.length / 10) + 1}
                </span>
                <span className="text-[8px] text-amber-500 font-extrabold uppercase">CROWNS</span>
              </div>
            </div>

            {/* Hearts Indicator */}
            <div className="flex items-center gap-2 bg-rose-50 border-2 border-rose-200 px-3 py-1.5 rounded-2xl shadow-sm">
              <Heart className="w-5 h-5 text-[#ff4b4b] fill-[#ff4b4b]" />
              <div className="text-left">
                <span className="block text-xs font-black text-[#ff4b4b] leading-none">5 / 5</span>
                <span className="text-[8px] text-rose-400 font-extrabold uppercase">LIVES</span>
              </div>
            </div>

            {/* User Login / Profile Button */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl shadow-sm border-2 transition-all cursor-pointer active:translate-y-[1px] ${
                currentUser 
                  ? "bg-teal-50 border-teal-300 hover:border-teal-500 hover:shadow-sm" 
                  : "bg-white border-slate-200 hover:border-[#1cb0f6] hover:bg-slate-50"
              }`}
              title={currentUser ? `Logged in as ${currentUser.displayName || currentUser.email}` : "Log In or Create Account"}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                currentUser ? "bg-[#58cc02] text-white shadow-xs" : "bg-slate-200 text-slate-600"
              }`}>
                {currentUser ? (
                  currentUser.displayName ? currentUser.displayName[0].toUpperCase() : currentUser.email ? currentUser.email[0].toUpperCase() : "U"
                ) : (
                  <UserIcon className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="text-left hidden sm:block">
                <span className="block text-xs font-black text-slate-700 leading-none truncate max-w-[90px]">
                  {currentUser ? (currentUser.displayName || currentUser.email?.split("@")[0]) : "Log In"}
                </span>
                <span className={`text-[8px] font-extrabold uppercase leading-tight ${currentUser ? "text-teal-600" : "text-slate-400"}`}>
                  {currentUser ? "PROFILE" : "SYNC DATA"}
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* PWA Install Banner (Mobile Only) */}
      {!isStandalone && showInstallBanner && (
        <div className="mx-4 mt-4 md:hidden bg-gradient-to-r from-teal-700 to-emerald-800 text-white rounded-2xl p-4 shadow-md border border-teal-600/50 flex flex-col gap-3 relative overflow-hidden">
          <button 
            onClick={dismissInstallBanner}
            className="absolute top-2 right-2 text-white/75 hover:text-white p-1 rounded-full bg-white/10"
          >
            <XCircle className="w-4 h-4" />
          </button>
          <div className="flex gap-3 items-start pr-6">
            <div className="p-2 bg-white/10 rounded-xl">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm">Install German Speak</h4>
              <p className="text-[11px] text-teal-100 mt-0.5 leading-relaxed">
                Add to your home screen for distraction-free full-screen practice, better microphone access, and fast loading!
              </p>
            </div>
          </div>
          <button
            onClick={handleInstallApp}
            className="w-full bg-white text-teal-900 font-bold text-xs py-2 px-4 rounded-xl shadow-sm hover:bg-teal-50 transition-all flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Install Standalone App
          </button>
        </div>
      )}

      {/* Main Container - Extra bottom padding on mobile for bottom bar navigation */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-4 md:py-8 pb-28 md:pb-8 flex flex-col gap-6">
        
        {/* Navigation Tabs - Playful Duolingo 3D Desktop Tabs */}
        <div className="hidden md:flex flex-wrap gap-3 self-start">
          <button
            id="tab-practice"
            onClick={() => {
              setActiveTab("practice");
            }}
            className={`flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-wider rounded-2xl border-2 transition-all cursor-pointer shadow-sm ${
              activeTab === "practice"
                ? "bg-[#e8fcd8] text-[#46a302] border-[#58cc02] border-b-4 translate-y-[2px]"
                : "bg-white text-slate-500 border-slate-200 border-b-4 hover:bg-slate-50 active:translate-y-[2px]"
            }`}
          >
            <Mic className="w-4 h-4 text-[#58cc02]" />
            Pronunciation Practice
          </button>

          <button
            id="tab-explore"
            onClick={() => setActiveTab("explore")}
            className={`flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-wider rounded-2xl border-2 transition-all cursor-pointer shadow-sm ${
              activeTab === "explore"
                ? "bg-[#ddf4ff] text-[#1899d6] border-[#1cb0f6] border-b-4 translate-y-[2px]"
                : "bg-white text-slate-500 border-slate-200 border-b-4 hover:bg-slate-50 active:translate-y-[2px]"
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#1cb0f6]" />
            Dictionary Explorer
          </button>
          
          <button
            id="tab-flashcards"
            onClick={() => setActiveTab("flashcards")}
            className={`flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-wider rounded-2xl border-2 transition-all cursor-pointer shadow-sm ${
              activeTab === "flashcards"
                ? "bg-[#fff4d4] text-[#b38600] border-[#ffc800] border-b-4 translate-y-[2px]"
                : "bg-white text-slate-500 border-slate-200 border-b-4 hover:bg-slate-50 active:translate-y-[2px]"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#ffc800]" />
            Recall Cards
          </button>

          <button
            id="tab-quiz"
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-wider rounded-2xl border-2 transition-all cursor-pointer shadow-sm ${
              activeTab === "quiz"
                ? "bg-[#f3e8ff] text-[#7c3aed] border-purple-500 border-b-4 translate-y-[2px]"
                : "bg-white text-slate-500 border-slate-200 border-b-4 hover:bg-slate-50 active:translate-y-[2px]"
            }`}
          >
            <HelpCircle className="w-4 h-4 text-purple-600" />
            Context Quiz
          </button>

          <button
            id="tab-phrases"
            onClick={() => setActiveTab("phrases")}
            className={`flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-wider rounded-2xl border-2 transition-all cursor-pointer shadow-sm ${
              activeTab === "phrases"
                ? "bg-[#e6fffa] text-[#0d9488] border-[#14b8a6] border-b-4 translate-y-[2px]"
                : "bg-white text-slate-500 border-slate-200 border-b-4 hover:bg-slate-50 active:translate-y-[2px]"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#14b8a6]" />
            Phrases Practice
          </button>

          <button
            id="tab-voice"
            onClick={() => setActiveTab("voice")}
            className={`flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-wider rounded-2xl border-2 transition-all cursor-pointer shadow-sm ${
              activeTab === "voice"
                ? "bg-[#e0e7ff] text-[#4f46e5] border-[#6366f1] border-b-4 translate-y-[2px]"
                : "bg-white text-slate-500 border-slate-200 border-b-4 hover:bg-slate-50 active:translate-y-[2px]"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#6366f1]" />
            Voice Coach
          </button>

          <button
            id="tab-challenge"
            onClick={() => setActiveTab("challenge")}
            className={`flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-wider rounded-2xl border-2 transition-all cursor-pointer shadow-sm ${
              activeTab === "challenge"
                ? "bg-[#fff7ed] text-[#c2410c] border-[#f97316] border-b-4 translate-y-[2px]"
                : "bg-white text-slate-500 border-slate-200 border-b-4 hover:bg-slate-50 active:translate-y-[2px]"
            }`}
          >
            <Trophy className="w-4 h-4 text-[#f97316]" />
            30-Day Challenge
          </button>

          <button
            id="tab-plan"
            onClick={() => setActiveTab("plan")}
            className={`flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-wider rounded-2xl border-2 transition-all cursor-pointer shadow-sm ${
              activeTab === "plan"
                ? "bg-emerald-50 text-emerald-700 border-emerald-500 border-b-4 translate-y-[2px]"
                : "bg-white text-slate-500 border-slate-200 border-b-4 hover:bg-slate-50 active:translate-y-[2px]"
            }`}
          >
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            Learning Plans
          </button>
        </div>

        {/* Tab Content Areas */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            
            {/* PRONUNCIATION PRACTICE MODE (PRIMARY OUTCOME) */}
            {activeTab === "practice" && (
              <motion.div
                key="practice-container"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {selectedTheme === null ? (
                  <div className="space-y-6" id="theme-selection-screen">
                    {/* Duo the Owl Mascot Welcoming Speech Bubble */}
                    <div className="flex gap-4 items-center bg-white border-2 border-slate-200 border-b-4 p-5 rounded-3xl max-w-2xl mx-auto shadow-sm">
                      <div className="text-5xl md:text-6xl select-none shrink-0 animate-bounce duration-1000">🦉</div>
                      <div className="relative bg-[#e8fcd8] border-2 border-[#c3f299] p-4 rounded-2xl text-xs md:text-sm font-black text-[#46a302] shadow-sm flex-1">
                        {/* Speech bubble pointer arrow */}
                        <div className="absolute top-1/2 -left-2 w-3 h-3 bg-[#e8fcd8] border-l-2 border-b-2 border-[#c3f299] -translate-y-1/2 rotate-45 transform"></div>
                        <p className="relative z-10 leading-relaxed">
                          Hallo! Ich bin Duo! Ready to level up your German pronunciation? Choose a learning unit below to begin! 🇩🇪🎉
                        </p>
                      </div>
                    </div>

                    {/* Interactive German-to-English Sound Cheat-Sheet */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden max-w-4xl mx-auto">
                      <button
                        onClick={() => setShowPronunciationGuide(prev => !prev)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50/80 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                            <Sparkles className="w-5 h-5 text-amber-500" />
                          </span>
                          <div>
                            <h3 className="font-extrabold text-slate-900 text-sm md:text-base">
                              How to Pronounce German Sounds (English Pronunciation Key)
                            </h3>
                            <p className="text-slate-500 text-xs mt-0.5 font-medium">
                              German is highly phonetic! Expand to learn the simple English equivalent sound conversions.
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                          {showPronunciationGuide ? "Hide Guide ▲" : "Show Guide ▼"}
                        </span>
                      </button>

                      {showPronunciationGuide && (
                        <div className="border-t border-slate-100 p-5 bg-slate-50/50 space-y-5 animate-in fade-in duration-300">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            
                            {/* Column 1: Vowels and Diphthongs */}
                            <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm space-y-3">
                              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-1.5 text-amber-700">
                                <span>A, E, I, O, U & Vowel Teams</span>
                              </h4>
                              
                              <div className="space-y-2 text-xs">
                                <div className="flex justify-between items-start py-1.5 border-b border-slate-50">
                                  <div>
                                    <span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">ei</span>
                                    <span className="text-slate-400 mx-1.5 font-semibold">➔</span>
                                    <span className="font-bold text-slate-800">English &ldquo;EYE&rdquo;</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-slate-500 italic">Example:</span> <span className="font-bold text-slate-800">nein</span> <span className="text-slate-400 font-mono text-[11px]">&ldquo;nine&rdquo;</span>
                                  </div>
                                </div>

                                <div className="flex justify-between items-start py-1.5 border-b border-slate-50">
                                  <div>
                                    <span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">ie</span>
                                    <span className="text-slate-400 mx-1.5 font-semibold">➔</span>
                                    <span className="font-bold text-slate-800">English &ldquo;EE&rdquo;</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-slate-500 italic">Example:</span> <span className="font-bold text-slate-800">sie</span> <span className="text-slate-400 font-mono text-[11px]">&ldquo;zee&rdquo;</span>
                                  </div>
                                </div>

                                <div className="flex justify-between items-start py-1.5 border-b border-slate-50">
                                  <div>
                                    <span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">eu / äu</span>
                                    <span className="text-slate-400 mx-1.5 font-semibold">➔</span>
                                    <span className="font-bold text-slate-800">English &ldquo;OY&rdquo;</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-slate-500 italic">Example:</span> <span className="font-bold text-slate-800">neu</span> <span className="text-slate-400 font-mono text-[11px]">&ldquo;noy&rdquo;</span>
                                  </div>
                                </div>

                                <div className="flex justify-between items-start py-1.5 border-b border-slate-50">
                                  <div>
                                    <span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">ä</span>
                                    <span className="text-slate-400 mx-1.5 font-semibold">➔</span>
                                    <span className="font-bold text-slate-800">English &ldquo;EH&rdquo; / &ldquo;AY&rdquo;</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-slate-500 italic">Example:</span> <span className="font-bold text-slate-800">spät</span> <span className="text-slate-400 font-mono text-[11px]">&ldquo;shpayt&rdquo;</span>
                                  </div>
                                </div>

                                <div className="flex justify-between items-start py-1.5 border-b border-slate-50">
                                  <div>
                                    <span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">ö</span>
                                    <span className="text-slate-400 mx-1.5 font-semibold">➔</span>
                                    <span className="font-bold text-slate-800">English &ldquo;EW&rdquo; (rounded)</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-slate-500 italic">Example:</span> <span className="font-bold text-slate-800">schön</span> <span className="text-slate-400 font-mono text-[11px]">&ldquo;shewn&rdquo;</span>
                                  </div>
                                </div>

                                <div className="flex justify-between items-start py-1.5 border-b border-slate-50">
                                  <div>
                                    <span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">ü</span>
                                    <span className="text-slate-400 mx-1.5 font-semibold">➔</span>
                                    <span className="font-bold text-slate-800">English &ldquo;EW&rdquo; (tight)</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-slate-500 italic">Example:</span> <span className="font-bold text-slate-800">grün</span> <span className="text-slate-400 font-mono text-[11px]">&ldquo;grewn&rdquo;</span>
                                  </div>
                                </div>

                                <div className="flex justify-between items-start py-1.5">
                                  <div>
                                    <span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">final -e</span>
                                    <span className="text-slate-400 mx-1.5 font-semibold">➔</span>
                                    <span className="font-bold text-slate-800">English &ldquo;UH&rdquo; (schwa)</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-slate-500 italic">Example:</span> <span className="font-bold text-slate-800">Schule</span> <span className="text-slate-400 font-mono text-[11px]">&ldquo;shool-uh&rdquo;</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Column 2: Consonants */}
                            <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm space-y-3">
                              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-1.5 text-teal-700">
                                <span>Consonants & Clusters</span>
                              </h4>
                              
                              <div className="space-y-2 text-xs">
                                <div className="flex justify-between items-start py-1.5 border-b border-slate-50">
                                  <div>
                                    <span className="font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded font-mono">w</span>
                                    <span className="text-slate-400 mx-1.5 font-semibold">➔</span>
                                    <span className="font-bold text-slate-800">English &ldquo;V&rdquo;</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-slate-500 italic">Example:</span> <span className="font-bold text-slate-800">wo</span> <span className="text-slate-400 font-mono text-[11px]">&ldquo;voh&rdquo;</span>
                                  </div>
                                </div>

                                <div className="flex justify-between items-start py-1.5 border-b border-slate-50">
                                  <div>
                                    <span className="font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded font-mono">v</span>
                                    <span className="text-slate-400 mx-1.5 font-semibold">➔</span>
                                    <span className="font-bold text-slate-800">English &ldquo;F&rdquo;</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-slate-500 italic">Example:</span> <span className="font-bold text-slate-800">Vater</span> <span className="text-slate-400 font-mono text-[11px]">&ldquo;fah-ter&rdquo;</span>
                                  </div>
                                </div>

                                <div className="flex justify-between items-start py-1.5 border-b border-slate-50">
                                  <div>
                                    <span className="font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded font-mono">z</span>
                                    <span className="text-slate-400 mx-1.5 font-semibold">➔</span>
                                    <span className="font-bold text-slate-800">English &ldquo;TS&rdquo;</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-slate-500 italic">Example:</span> <span className="font-bold text-slate-800">zwei</span> <span className="text-slate-400 font-mono text-[11px]">&ldquo;tsvye&rdquo;</span>
                                  </div>
                                </div>

                                <div className="flex justify-between items-start py-1.5 border-b border-slate-50">
                                  <div>
                                    <span className="font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded font-mono">j</span>
                                    <span className="text-slate-400 mx-1.5 font-semibold">➔</span>
                                    <span className="font-bold text-slate-800">English &ldquo;Y&rdquo;</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-slate-500 italic">Example:</span> <span className="font-bold text-slate-800">ja</span> <span className="text-slate-400 font-mono text-[11px]">&ldquo;yah&rdquo;</span>
                                  </div>
                                </div>

                                <div className="flex justify-between items-start py-1.5 border-b border-slate-50">
                                  <div>
                                    <span className="font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded font-mono">initial s</span>
                                    <span className="text-slate-400 mx-1.5 font-semibold">➔</span>
                                    <span className="font-bold text-slate-800">English &ldquo;Z&rdquo;</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-slate-500 italic">Example:</span> <span className="font-bold text-slate-800">Suppe</span> <span className="text-slate-400 font-mono text-[11px]">&ldquo;zoop-uh&rdquo;</span>
                                  </div>
                                </div>

                                <div className="flex justify-between items-start py-1.5 border-b border-slate-50">
                                  <div>
                                    <span className="font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded font-mono">st / sp</span>
                                    <span className="text-slate-400 mx-1.5 font-semibold">➔</span>
                                    <span className="font-bold text-slate-800">English &ldquo;SHT / SHP&rdquo;</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-slate-500 italic">Example:</span> <span className="font-bold text-slate-800">Sport</span> <span className="text-slate-400 font-mono text-[11px]">&ldquo;shport&rdquo;</span>
                                  </div>
                                </div>

                                <div className="flex justify-between items-start py-1.5">
                                  <div>
                                    <span className="font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded font-mono">final g/d/b</span>
                                    <span className="text-slate-400 mx-1.5 font-semibold">➔</span>
                                    <span className="font-bold text-slate-800">Devoiced &ldquo;K / T / P&rdquo;</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-slate-500 italic">Example:</span> <span className="font-bold text-slate-800">und</span> <span className="text-slate-400 font-mono text-[11px]">&ldquo;oont&rdquo;</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Gamified 3D Level Selector on the Home Screen */}
                    <div className="bg-white rounded-3xl border-2 border-slate-200 border-b-6 p-6 max-w-4xl mx-auto shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="text-left">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#1cb0f6] bg-sky-50 border border-sky-100 px-2.5 py-0.5 rounded-full inline-block">
                            Select Proficiency Levels
                          </span>
                          <h3 className="text-lg font-black text-slate-800 mt-1">German Language Levels (A1-B2)</h3>
                          <p className="text-slate-500 text-xs mt-0.5 font-medium">
                            💡 <span className="font-bold text-slate-700">Multi-Level Study:</span> Tap multiple levels to select 2 levels at the same time (e.g. <span className="font-bold text-emerald-700">A1</span> + <span className="font-bold text-amber-700">A2</span> or <span className="font-bold text-blue-700">B1</span> + <span className="font-bold text-purple-700">B2</span>)!
                          </p>
                        </div>

                        {selectedLevels.length > 0 && selectedLevels.length < 4 && (
                          <div className="self-start sm:self-auto flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-xl text-xs font-black shrink-0">
                            <span>Studying: {selectedLevels.join(" + ")}</span>
                            <button
                              type="button"
                              onClick={() => setSelectedLevels([])}
                              className="text-emerald-700 hover:text-emerald-900 underline ml-1 cursor-pointer font-bold"
                            >
                              Reset to All
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedLevels([])}
                          className={`px-4 py-3.5 rounded-2xl border-2 border-b-6 font-black uppercase text-xs tracking-wider transition-all cursor-pointer ${
                            selectedLevels.length === 0 || selectedLevels.length === 4
                              ? "bg-slate-800 text-white border-slate-900 border-b-2 translate-y-[4px]"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 active:translate-y-[4px] active:border-b-2"
                          }`}
                        >
                          🌐 All Levels
                        </button>
                        {(["A1", "A2", "B1", "B2"] as const).map(lvl => {
                          const isSelected = selectedLevels.includes(lvl);
                          const label = lvl === "A1" ? "A1 • Beginner" :
                                        lvl === "A2" ? "A2 • Elementary" :
                                        lvl === "B1" ? "B1 • Intermediate" :
                                        "B2 • Upper Int.";
                          const activeClass = lvl === "A1" ? "bg-emerald-500 text-white border-emerald-700 border-b-2 translate-y-[4px]" :
                                              lvl === "A2" ? "bg-amber-500 text-white border-amber-700 border-b-2 translate-y-[4px]" :
                                              lvl === "B1" ? "bg-blue-500 text-white border-blue-700 border-b-2 translate-y-[4px]" :
                                              "bg-purple-500 text-white border-purple-700 border-b-2 translate-y-[4px]";
                          const inactiveClass = lvl === "A1" ? "bg-[#e8fcd8] text-emerald-800 border-[#c3f299] hover:bg-[#d8f9bf] active:translate-y-[4px] active:border-b-2" :
                                                lvl === "A2" ? "bg-[#fff4d4] text-amber-800 border-[#ffc800] hover:bg-[#ffeebd] active:translate-y-[4px] active:border-b-2" :
                                                lvl === "B1" ? "bg-[#e0f2fe] text-blue-800 border-[#bae6fd] hover:bg-[#bae6fd]/50 active:translate-y-[4px] active:border-b-2" :
                                                "bg-[#f3e8ff] text-purple-800 border-[#e9d5ff] hover:bg-[#e9d5ff]/50 active:translate-y-[4px] active:border-b-2";

                          return (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => toggleLevel(lvl)}
                              className={`px-3 py-3.5 rounded-2xl border-2 border-b-6 font-black uppercase text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                isSelected ? activeClass : inactiveClass
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                              <span>{label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Theme Lists organized by level */}
                    <div className="space-y-12">
                      {(["A1", "A2", "B1", "B2"] as const)
                        .filter(lvl => selectedLevels.length === 0 || selectedLevels.includes(lvl))
                        .map(lvl => {
                          const levelThemes = themesByLevel[lvl];
                          if (levelThemes.length === 0) return null;

                          const levelLabel = lvl === "A1" ? "A1 • Beginner Level Units" :
                                             lvl === "A2" ? "A2 • Elementary Level Units" :
                                             lvl === "B1" ? "B1 • Intermediate Level Units" :
                                             "B2 • Upper Intermediate Level Units";

                          const levelDesc = lvl === "A1" ? "Start here! Learn basic greetings, food, and everyday objects." :
                                            lvl === "A2" ? "Talk about shopping, work, travel, and express direct requests." :
                                            lvl === "B1" ? "Handle situations while traveling, discuss interests, and explain plans." :
                                            "Express opinions, debate legal/social topics, and discuss complex thoughts.";

                          const headerBg = lvl === "A1" ? "bg-[#e8fcd8] text-emerald-800 border-[#c3f299]" :
                                           lvl === "A2" ? "bg-[#fff4d4] text-amber-800 border-[#ffc800]" :
                                           lvl === "B1" ? "bg-[#e0f2fe] text-blue-800 border-[#bae6fd]" :
                                           "bg-[#f3e8ff] text-purple-800 border-[#e9d5ff]";

                          const accentDot = lvl === "A1" ? "bg-emerald-500" :
                                            lvl === "A2" ? "bg-amber-500" :
                                            lvl === "B1" ? "bg-blue-500" :
                                            "bg-purple-500";

                          return (
                            <div key={lvl} className="space-y-5">
                              {/* Level Category Section Header */}
                              <div className={`p-4 rounded-2xl border-2 border-b-4 ${headerBg} flex flex-col md:flex-row justify-between items-start md:items-center gap-2 shadow-xs`}>
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2">
                                    <span className={`w-3 h-3 rounded-full ${accentDot} animate-pulse`} />
                                    <h4 className="text-sm md:text-base font-black uppercase tracking-tight">{levelLabel}</h4>
                                  </div>
                                  <p className="text-xs font-semibold opacity-90 leading-relaxed">{levelDesc}</p>
                                </div>
                                <span className="text-[10px] font-black uppercase bg-white/75 px-3 py-1 rounded-full border border-black/5 tracking-wider self-stretch md:self-auto text-center shrink-0">
                                  {levelThemes.length} Units available
                                </span>
                              </div>

                              {/* Grid of themes for this level */}
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {levelThemes.map(themeName => {
                                  const metrics = THEME_METRICS[themeName] || {
                                    name: themeName.replace(/[\uD800-\uDFFF].*$/, "").trim(),
                                    emoji: "💬",
                                    bgGradient: "from-slate-50 to-slate-100/40",
                                    borderColor: "border-slate-200/80",
                                    hoverBorder: "hover:border-slate-500",
                                    textColor: "text-slate-800",
                                    accentBg: "bg-slate-600",
                                    description: "Practice essential German speech terms and sentences."
                                  };
                                  const stats = themeStatsByLevelAndTheme[lvl]?.[themeName] || { total: 0, mastered: 0, percentage: 0 };

                                  return (
                                    <div
                                      key={themeName}
                                      id={`theme-card-${lvl}-${normalizeText(metrics.name)}`}
                                      onClick={() => {
                                        // Set both selectedTheme and selectedLevel when clicking a theme
                                        setSelectedLevel(lvl);
                                        setSelectedTheme(themeName);
                                      }}
                                      className={`bg-white border-2 ${metrics.borderColor} border-b-8 ${metrics.hoverBorder} p-5 rounded-3xl transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden active:border-b-2 active:translate-y-[6px] shadow-sm`}
                                    >
                                      <div className="space-y-3">
                                        <div className="flex justify-between items-start">
                                          <span className="text-3xl p-2 bg-slate-50 rounded-2xl shadow-sm border-2 border-slate-100 group-hover:scale-110 transition-transform duration-300">
                                            {metrics.emoji}
                                          </span>
                                          {stats.percentage === 100 && (
                                            <span className="bg-[#58cc02] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase flex items-center gap-1 shadow-sm border-b-2 border-[#46a302]">
                                              <Check className="w-3 h-3 stroke-[3px]" /> Mastered
                                            </span>
                                          )}
                                        </div>
                                        <div>
                                          <h3 className={`text-base font-black ${metrics.textColor} tracking-tight uppercase`}>
                                            {metrics.name}
                                          </h3>
                                          <p className="text-slate-500 text-xs mt-1 leading-relaxed line-clamp-2 font-medium">
                                            {metrics.description}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="border-t-2 border-slate-100 pt-4 mt-4 space-y-2">
                                        <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-wider">
                                          <span>{stats.mastered} / {stats.total} Mastered</span>
                                          <span className={metrics.textColor}>{stats.percentage}% accuracy</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                                          <div 
                                            className={`${metrics.accentBg} h-full rounded-full transition-all duration-500`}
                                            style={{ width: `${stats.percentage}%` }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6" id="practice-arena">
                    {/* Back header navigation */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                      <button
                        onClick={() => setSelectedTheme(null)}
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 py-2 px-4 rounded-xl transition-all"
                      >
                        <ArrowLeft className="w-4 h-4" /> Change Theme
                      </button>
                      
                      <div className="flex flex-col sm:items-end">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Theme</span>
                        <span className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                          {THEME_METRICS[selectedTheme]?.emoji} {THEME_METRICS[selectedTheme]?.name || selectedTheme}
                        </span>
                      </div>
                    </div>

                    {/* Progress indicator bar */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                        <span>Vocabulary Progress</span>
                        <span>Word {practiceIndex + 1} of {practiceVocabulary.length}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200/50">
                        <div 
                          className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${((practiceIndex + 1) / practiceVocabulary.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Active Practice Mascot speech bubble */}
                    <div className="flex gap-4 items-center bg-white border-2 border-slate-200 border-b-4 p-4 rounded-3xl max-w-2xl mx-auto shadow-sm">
                      <div className="text-4xl md:text-5xl select-none shrink-0 animate-bounce">🦉</div>
                      <div className="relative bg-[#e8fcd8] border-2 border-[#c3f299] p-3 rounded-2xl text-xs md:text-sm font-black text-[#46a302] shadow-sm flex-1">
                        {/* Speech bubble pointer arrow */}
                        <div className="absolute top-1/2 -left-2 w-3 h-3 bg-[#e8fcd8] border-l-2 border-b-2 border-[#c3f299] -translate-y-1/2 rotate-45 transform"></div>
                        <p className="relative z-10 leading-relaxed">
                          {getDuoMessage()}
                        </p>
                      </div>
                    </div>

                    {/* Main Practice Dashboard */}
                    {practiceVocabulary[practiceIndex] && (
                      <div className="relative w-full overflow-hidden select-none">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={practiceIndex}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.6}
                            onDragEnd={(event, info) => {
                              const swipeThreshold = 80;
                              if (info.offset.x < -swipeThreshold) {
                                // Swiped left -> Next
                                if (practiceIndex < practiceVocabulary.length - 1) {
                                  setPracticeIndex(prev => prev + 1);
                                  setRecordedText("");
                                  setMatchScore(null);
                                  setSpeechError(null);
                                  setIsRecording(false);
                                  setIsSentencePractice(false);
                                }
                              } else if (info.offset.x > swipeThreshold) {
                                // Swiped right -> Previous
                                if (practiceIndex > 0) {
                                  setPracticeIndex(prev => prev - 1);
                                  setRecordedText("");
                                  setMatchScore(null);
                                  setSpeechError(null);
                                  setIsRecording(false);
                                  setIsSentencePractice(false);
                                }
                              }
                            }}
                            initial={{ opacity: 0, x: 100, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -100, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative cursor-grab active:cursor-grabbing touch-none"
                          >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        {/* Left Column: Word details and audio trigger */}
                        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6 flex flex-col relative overflow-hidden">
                          <div className="absolute right-4 top-4 flex gap-2">
                            <button
                              onClick={() => toggleBookmark(practiceVocabulary[practiceIndex].word)}
                              className={`p-2 rounded-xl transition-all border ${
                                bookmarks.includes(practiceVocabulary[practiceIndex].word)
                                  ? "bg-amber-50 border-amber-200 text-amber-500"
                                  : "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600"
                              }`}
                              title="Bookmark word"
                            >
                              <Bookmark className={`w-4.5 h-4.5 ${bookmarks.includes(practiceVocabulary[practiceIndex].word) ? "fill-amber-500 text-amber-500" : "text-slate-400"}`} />
                            </button>

                            <button
                              onClick={() => toggleMastered(practiceVocabulary[practiceIndex].word)}
                              className={`p-2 rounded-xl transition-all border ${
                                masteredWords.includes(practiceVocabulary[practiceIndex].word)
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                                  : "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600"
                              }`}
                              title="Mark as pronounced correctly"
                            >
                              <Check className={`w-4.5 h-4.5 ${masteredWords.includes(practiceVocabulary[practiceIndex].word) ? "stroke-[3px]" : ""}`} />
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="bg-slate-100 text-slate-600 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md">
                                {practiceVocabulary[practiceIndex].type}
                              </span>
                              <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md ${
                                practiceVocabulary[practiceIndex].level === "B2" ? "bg-purple-100 text-purple-700" :
                                practiceVocabulary[practiceIndex].level === "B1" ? "bg-blue-100 text-blue-700" :
                                practiceVocabulary[practiceIndex].level === "A2" ? "bg-amber-100 text-amber-700" :
                                "bg-emerald-100 text-emerald-700"
                              }`}>
                                {practiceVocabulary[practiceIndex].level}
                              </span>
                              {masteredWords.includes(practiceVocabulary[practiceIndex].word) && (
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5 stroke-[3px]" /> Pronounced Perfect
                                </span>
                              )}
                            </div>

                            {/* Head German Word */}
                            <div className="space-y-1">
                              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">
                                {practiceVocabulary[practiceIndex].word}
                              </h3>
                              {practiceVocabulary[practiceIndex].forms && (
                                <p className="text-slate-500 italic text-sm font-medium">
                                  ({practiceVocabulary[practiceIndex].forms})
                                </p>
                              )}
                              
                              {/* English to German phonetic sound guide */}
                              <div className="inline-flex flex-wrap items-center gap-2 bg-amber-50/70 border border-amber-200/50 px-3 py-1.5 rounded-xl mt-1 text-xs text-amber-900 font-medium shadow-sm">
                                <span className="font-extrabold uppercase text-[9px] tracking-wider bg-amber-600 text-white px-1.5 py-0.5 rounded-md shrink-0">Say it in English:</span>
                                <span className="font-mono text-sm font-bold tracking-wide text-amber-900 bg-white/60 px-2 py-0.5 rounded-md border border-amber-100">
                                  {getGermanToEnglishPhonetic(practiceVocabulary[practiceIndex].word)}
                                </span>
                              </div>
                            </div>

                            {/* English Translation */}
                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">English Definition</span>
                              <p className="text-slate-800 font-semibold text-base leading-snug">
                                {practiceVocabulary[practiceIndex].english_translation}
                              </p>
                            </div>
                          </div>

                          {/* Sound Guidance & TTS */}
                          <div className="space-y-3">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">1. Audio Training (Listen)</span>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <button
                                onClick={() => speakWord(practiceVocabulary[practiceIndex].word, false)}
                                className="flex items-center justify-center gap-2 bg-[#1cb0f6] hover:bg-[#24bfff] border-b-4 border-[#1899d6] active:border-b-0 active:translate-y-1 text-white font-black text-xs md:text-sm py-3.5 px-4 rounded-2xl transition-all shadow-sm tracking-wider uppercase cursor-pointer"
                              >
                                <Volume2 className="w-5 h-5" /> Normal Speed
                              </button>
                              
                              <button
                                onClick={() => speakWord(practiceVocabulary[practiceIndex].word, true)}
                                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border-2 border-slate-200 border-b-4 active:border-b-2 active:translate-y-[2px] text-slate-700 font-black text-xs md:text-sm py-3.5 px-4 rounded-2xl transition-all shadow-sm tracking-wider uppercase cursor-pointer"
                              >
                                <Volume2 className="w-5 h-5 text-[#1cb0f6]" /> Slow Speed (0.7x)
                              </button>
                            </div>
                          </div>

                          {/* Example Sentences */}
                          <div className="border-t border-slate-100 pt-5 space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Context Example Sentences</span>
                              <span className="text-[10px] font-medium text-slate-400 italic">Try pronouncing sentences too!</span>
                            </div>

                            <div className="space-y-3">
                              {practiceVocabulary[practiceIndex].examples.map((example, idx) => (
                                <div 
                                  key={idx} 
                                  className="bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all"
                                >
                                  <div className="space-y-1">
                                    <p className="font-bold text-slate-800 text-sm leading-relaxed">{example.de}</p>
                                    <p className="text-xs text-slate-500 italic leading-normal">{example.en}</p>
                                  </div>

                                  <div className="flex gap-2 shrink-0 self-end sm:self-center">
                                    <button
                                      onClick={() => speakWord(example.de)}
                                      title="Hear sentence"
                                      className="p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-500 hover:text-emerald-600 transition-all shadow-sm"
                                    >
                                      <Volume2 className="w-4 h-4" />
                                    </button>

                                    <button
                                      onClick={() => startSpeechRecognition(example.de, true)}
                                      title="Practice speaking sentence"
                                      className={`p-2 border rounded-xl transition-all shadow-sm ${
                                        isRecording && isSentencePractice && practicingSentenceText === example.de
                                          ? "bg-red-500 border-red-500 text-white animate-pulse"
                                          : "bg-white hover:bg-slate-100 border-slate-200 text-slate-500 hover:text-red-500"
                                      }`}
                                    >
                                      <Mic className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Microphone input, waveform, analysis feedback */}
                        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6 flex flex-col justify-between self-stretch">
                          <div className="space-y-6">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">2. Speech Training (Pronounce)</span>

                            {/* Circular Microphone Trigger */}
                            <div className="flex flex-col items-center text-center space-y-3 py-6 bg-slate-50/60 border border-slate-100 rounded-3xl">
                              <button
                                onClick={() => startSpeechRecognition(practiceVocabulary[practiceIndex].word, false)}
                                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                                  isRecording
                                    ? "bg-red-600 hover:bg-red-700 text-white ring-8 ring-red-500/20 animate-pulse scale-105"
                                    : "bg-gradient-to-tr from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-md hover:scale-105"
                                }`}
                              >
                                <Mic className="w-9 h-9" />
                              </button>

                              <div className="space-y-1 px-4">
                                <h4 className="text-sm font-bold text-slate-800">
                                  {isRecording ? "Listening... Speak Now!" : "Click to Record Voice"}
                                </h4>
                                <p className="text-xs text-slate-400 leading-normal max-w-[220px] mx-auto">
                                  {isRecording 
                                    ? `Pronounce "${isSentencePractice ? "the full sentence" : practiceVocabulary[practiceIndex].word}"` 
                                    : "Say the words clearly into your device microphone."
                                  }
                                </p>
                              </div>
                            </div>

                            {/* Error warnings */}
                            {speechError && (
                              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-2.5 text-xs text-amber-800 font-medium leading-relaxed">
                                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-bold">Microphone Status Indicator</p>
                                  <p className="mt-0.5">{speechError}</p>
                                  {micPermissionDenied && (
                                    <p className="font-bold text-emerald-800 mt-2 hover:underline cursor-pointer" onClick={() => window.open(window.location.href, "_blank")}>
                                      Click here to Open Trainer in a New Tab ↗
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Real-time speech result feedback */}
                            {(recordedText || matchScore !== null) && (
                              <div className="space-y-4 border-t border-slate-100 pt-5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Accuracy Analysis</span>
                                
                                {matchScore !== null && (
                                  <div className="flex items-center gap-4">
                                    {/* Circle Gauge */}
                                    <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                                      <svg className="absolute w-full h-full transform -rotate-90">
                                        <circle cx="32" cy="32" r="28" fill="transparent" stroke="#f1f5f9" strokeWidth="6" />
                                        <circle 
                                          cx="32" 
                                          cy="32" 
                                          r="28" 
                                          fill="transparent" 
                                          stroke={matchScore >= 85 ? "#10b981" : matchScore >= 50 ? "#f59e0b" : "#ef4444"} 
                                          strokeWidth="6" 
                                          strokeDasharray={175} 
                                          strokeDashoffset={175 - (175 * matchScore) / 100}
                                          strokeLinecap="round"
                                          className="transition-all duration-1000 ease-out"
                                        />
                                      </svg>
                                      <span className={`text-base font-black ${matchScore >= 85 ? "text-emerald-600" : matchScore >= 50 ? "text-amber-500" : "text-red-500"}`}>
                                        {matchScore}%
                                      </span>
                                    </div>

                                    <div>
                                      <h5 className={`text-sm font-bold ${matchScore >= 85 ? "text-emerald-800" : matchScore >= 50 ? "text-amber-800" : "text-red-800"}`}>
                                        {matchScore >= 85 ? "Ausgezeichnet! (Excellent)" : matchScore >= 50 ? "Gute Arbeit! (Good Effort)" : "Noch einmal versuchen!"}
                                      </h5>
                                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                        {matchScore >= 85 
                                          ? "Perfect pronunciation. Keep up the amazing work!" 
                                          : matchScore >= 50 
                                            ? "Very close! Click the microphone to try perfecting your rhythm." 
                                            : "We had trouble matching your audio. Click slow pronunciation to study sounds."
                                        }
                                      </p>
                                    </div>
                                  </div>
                                )}

                                <div className="space-y-2 text-xs">
                                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Target Word</span>
                                    <span className="font-bold text-slate-800">
                                      {isSentencePractice ? practicingSentenceText : practiceVocabulary[practiceIndex].word}
                                    </span>
                                  </div>

                                  <div className={`p-3 rounded-xl border ${matchScore && matchScore >= 85 ? "bg-emerald-50 border-emerald-100" : "bg-slate-50 border-slate-100"}`}>
                                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">You Pronounced</span>
                                    <span className="font-bold text-slate-800 italic">
                                      &ldquo;{recordedText}&rdquo;
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Footer control buttons */}
                          <div className="border-t-2 border-slate-100 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                            <button
                              disabled={practiceIndex === 0}
                              onClick={() => {
                                if (practiceIndex > 0) {
                                  setPracticeIndex(prev => prev - 1);
                                  setRecordedText("");
                                  setMatchScore(null);
                                  setSpeechError(null);
                                  setIsRecording(false);
                                  setIsSentencePractice(false);
                                }
                              }}
                              className="flex-1 bg-white hover:bg-slate-50 border-2 border-slate-200 border-b-4 active:border-b-2 active:translate-y-[2px] text-slate-700 disabled:opacity-40 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                            >
                              ◄ Previous
                            </button>

                            <button
                              onClick={() => toggleMastered(practiceVocabulary[practiceIndex].word)}
                              className={`flex-1 border-2 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm text-center cursor-pointer ${
                                masteredWords.includes(practiceVocabulary[practiceIndex].word)
                                  ? "bg-[#e8fcd8] border-[#58cc02] border-b-4 text-[#46a302]"
                                  : "bg-white border-slate-200 border-b-4 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {masteredWords.includes(practiceVocabulary[practiceIndex].word) ? "✓ Mastered!" : "Mark Mastered"}
                            </button>

                            <button
                              disabled={practiceIndex === practiceVocabulary.length - 1}
                              onClick={() => {
                                if (practiceIndex < practiceVocabulary.length - 1) {
                                  setPracticeIndex(prev => prev + 1);
                                  setRecordedText("");
                                  setMatchScore(null);
                                  setSpeechError(null);
                                  setIsRecording(false);
                                  setIsSentencePractice(false);
                                }
                              }}
                              className="flex-1 bg-[#58cc02] hover:bg-[#61e002] border-b-4 border-[#46a302] active:border-b-0 active:translate-y-1 text-white disabled:opacity-40 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                            >
                              Next ►
                            </button>
                          </div>
                        </div>

                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* EXPLORE DICTIONARY TAB */}
            {activeTab === "explore" && (
              <motion.div
                key="explore"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search German words, conjugations, examples..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400 font-medium"
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <select
                        value={selectedType || ""}
                        onChange={(e) => setSelectedType(e.target.value || null)}
                        className="bg-slate-50 border border-slate-200 text-xs md:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-700 cursor-pointer"
                      >
                        <option value="">All Categories</option>
                        {wordTypes.map(type => (
                          <option key={type} value={type}>{type.toUpperCase()}</option>
                        ))}
                      </select>

                      {/* Multi-Level Toggle Pills in Explorer */}
                      <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1 shrink-0">
                        <span className="text-[10px] font-black uppercase text-slate-400 px-1">Level:</span>
                        {(["A1", "A2", "B1", "B2"] as const).map(lvl => {
                          const isSelected = selectedLevels.includes(lvl);
                          return (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => toggleLevel(lvl)}
                              title={`Toggle ${lvl}`}
                              className={`px-2 py-1 rounded-lg text-xs font-black transition-all cursor-pointer select-none ${
                                isSelected
                                  ? "bg-slate-800 text-white shadow-xs"
                                  : "text-slate-600 hover:bg-slate-200/70"
                              }`}
                            >
                              {isSelected && "✓ "}{lvl}
                            </button>
                          );
                        })}
                      </div>

                      <select
                        value={
                          selectedLevels.length === 0 || selectedLevels.length === 4 ? "" :
                          selectedLevels.length === 2 && selectedLevels.includes("A1") && selectedLevels.includes("A2") ? "A1+A2" :
                          selectedLevels.length === 2 && selectedLevels.includes("B1") && selectedLevels.includes("B2") ? "B1+B2" :
                          selectedLevels.length === 1 ? selectedLevels[0] :
                          "CUSTOM"
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "CUSTOM") return;
                          setSelectedLevel(val === "" ? null : val);
                        }}
                        className="bg-slate-50 border border-slate-200 text-xs md:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-700 cursor-pointer"
                      >
                        <option value="">All Levels (A1-B2)</option>
                        <option value="A1+A2">A1 + A2 (Beginner Track)</option>
                        <option value="B1+B2">B1 + B2 (Intermediate Track)</option>
                        <option value="A1">A1 • Beginner</option>
                        <option value="A2">A2 • Elementary</option>
                        <option value="B1">B1 • Intermediate</option>
                        <option value="B2">B2 • Upper Intermediate</option>
                        {selectedLevels.length > 0 && !["", "A1+A2", "B1+B2", "A1", "A2", "B1", "B2"].includes(selectedLevels.join("+")) && (
                          <option value="CUSTOM">{selectedLevels.join(" + ")} (Custom)</option>
                        )}
                      </select>

                      <button
                        onClick={() => setShowBookmarksOnly(prev => !prev)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs md:text-sm font-semibold transition-all ${
                          showBookmarksOnly 
                            ? "bg-amber-50 border-amber-200 text-amber-800 shadow-sm"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${showBookmarksOnly ? "fill-amber-500 text-amber-500" : "text-slate-400"}`} />
                        Bookmarks ({bookmarks.length})
                      </button>

                      <button
                        onClick={() => setShowUnknownOnly(prev => !prev)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs md:text-sm font-semibold transition-all ${
                          showUnknownOnly 
                            ? "bg-orange-50 border-orange-300 text-orange-800 shadow-sm font-black"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <RotateCcw className={`w-4 h-4 ${showUnknownOnly ? "text-orange-600 font-bold" : "text-slate-400"}`} />
                        Practice Later ({unknownWords.length})
                      </button>

                      {(searchQuery || selectedTheme || selectedType || selectedLevels.length > 0 || showBookmarksOnly || showUnknownOnly) && (
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setSelectedTheme(null);
                            setSelectedType(null);
                            setSelectedLevels([]);
                            setShowBookmarksOnly(false);
                            setShowUnknownOnly(false);
                          }}
                          className="bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-red-100 transition-all cursor-pointer"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Theme-Based Categories</span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedTheme(null)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedTheme === null
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                        }`}
                      >
                        🌟 All Themes
                      </button>
                      {themes.map(theme => (
                        <button
                          key={theme}
                          onClick={() => setSelectedTheme(theme)}
                          className={`px-4 py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all ${
                            selectedTheme === theme
                              ? "bg-emerald-600 text-white shadow-sm"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                          }`}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs md:text-sm text-slate-500 font-medium px-1">
                  <span>
                    Showing <strong className="text-slate-800">{filteredVocabulary.length}</strong> of{" "}
                    <strong className="text-slate-800">{VOCABULARY_DATA.length}</strong> core words
                    {unknownWords.length > 0 && (
                      <span className="ml-2 text-orange-600 font-semibold">
                        • {unknownWords.length} marked to practice later
                      </span>
                    )}
                  </span>
                </div>

                {filteredVocabulary.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredVocabulary.map((entry) => {
                      const isBookmarked = bookmarks.includes(entry.word);
                      const isUnknown = unknownWords.includes(entry.word);
                      const isMastered = masteredWords.includes(entry.word);
                      return (
                        <div 
                          key={entry.id}
                          className={`bg-white p-5 rounded-2xl border transition-all flex flex-col justify-between gap-3 group relative ${
                            isUnknown 
                              ? "border-orange-300 ring-1 ring-orange-200/60 shadow-sm" 
                              : "border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-600/30"
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                                    {entry.word}
                                  </h3>
                                  <button
                                    onClick={() => speakWord(entry.word)}
                                    title="Pronounce word"
                                    className="text-slate-400 hover:text-emerald-600 p-1 hover:bg-slate-50 rounded-lg transition-all shrink-0"
                                  >
                                    <Volume2 className="w-4 h-4" />
                                  </button>
                                  {isUnknown && (
                                    <span className="bg-orange-100 text-orange-800 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1">
                                      <RotateCcw className="w-3 h-3" /> Practice Later
                                    </span>
                                  )}
                                  {isMastered && !isUnknown && (
                                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1">
                                      <CheckCircle className="w-3 h-3" /> Mastered
                                    </span>
                                  )}
                                </div>
                                
                                <p className="text-slate-600 text-sm font-semibold mt-0.5">
                                  {entry.english_translation}
                                </p>

                                {/* Phonetic pronunciation guide */}
                                <p className="text-amber-800 text-xs font-medium mt-1 font-mono flex items-center gap-1">
                                  <span className="text-[10px] text-amber-600 font-sans font-extrabold uppercase bg-amber-50 px-1 py-0.5 rounded border border-amber-200/50">Sound:</span>
                                  <span className="font-bold">&ldquo;{getGermanToEnglishPhonetic(entry.word)}&rdquo;</span>
                                </p>
                                
                                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                                    {entry.type}
                                  </span>
                                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                    entry.level === "B2" ? "bg-purple-100 text-purple-700" :
                                    entry.level === "B1" ? "bg-blue-100 text-blue-700" :
                                    entry.level === "A2" ? "bg-amber-100 text-amber-700" :
                                    "bg-emerald-100 text-emerald-700"
                                  }`}>
                                    {entry.level}
                                  </span>
                                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                                    {entry.theme}
                                  </span>
                                  {entry.forms && (
                                    <span className="text-slate-500 text-xs italic font-medium">
                                      ({entry.forms})
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  onClick={() => toggleUnknown(entry.word)}
                                  title={isUnknown ? "Remove from Practice Later" : "Mark as Unknown (Practice Later)"}
                                  className={`p-2 rounded-xl transition-all cursor-pointer ${
                                    isUnknown
                                      ? "bg-orange-100 text-orange-700 hover:bg-orange-200 ring-1 ring-orange-300"
                                      : "bg-slate-50 text-slate-400 hover:text-orange-600 hover:bg-orange-50"
                                  }`}
                                >
                                  <RotateCcw className={`w-4 h-4 ${isUnknown ? "text-orange-700 font-bold" : ""}`} />
                                </button>
                                <button
                                  onClick={() => toggleBookmark(entry.word)}
                                  title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
                                  className={`p-2 rounded-xl transition-all cursor-pointer ${
                                    isBookmarked
                                      ? "bg-amber-50 text-amber-500 hover:bg-amber-100"
                                      : "bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                                  }`}
                                >
                                  <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-amber-500 text-amber-500" : "text-slate-400"}`} />
                                </button>
                              </div>
                            </div>

                            <div className="border-t border-slate-100/80 pt-3 mt-3 flex-1 flex flex-col gap-2">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Example Context</span>
                              <div className="space-y-2.5 flex-1">
                                {entry.examples.map((example, i) => (
                                  <div key={i} className="flex gap-2 items-start text-sm text-slate-700 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/60">
                                    <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                      <p className="font-semibold text-slate-800 leading-relaxed">{example.de}</p>
                                      <p className="text-xs text-slate-500 italic mt-0.5 leading-relaxed">{example.en}</p>
                                    </div>
                                    <button
                                      onClick={() => speakWord(example.de)}
                                      title="Pronounce sentence"
                                      className="text-slate-400 hover:text-emerald-600 p-1 hover:bg-white rounded-md transition-all shrink-0 self-start"
                                    >
                                      <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-slate-100 pt-3 mt-1 flex justify-end">
                            <button
                              onClick={() => {
                                setSelectedTheme(entry.theme);
                                const itemIndex = VOCABULARY_DATA.filter(w => w.theme === entry.theme).findIndex(w => w.word === entry.word);
                                setPracticeIndex(itemIndex >= 0 ? itemIndex : 0);
                                setActiveTab("practice");
                              }}
                              className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-white hover:bg-emerald-600 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-lg transition-all"
                            >
                              <Mic className="w-3.5 h-3.5" /> Speak & Practice Word ➔
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 max-w-md mx-auto">
                    <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-slate-800 mb-1">No vocabulary matches</h3>
                    <p className="text-slate-500 text-sm mb-4">Try clearing filters or search query to explore the complete dataset.</p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedTheme(null);
                        setSelectedType(null);
                        setShowBookmarksOnly(false);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* FLASHCARDS TAB */}
            {activeTab === "flashcards" && (
              <motion.div
                key="flashcards"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-2xl mx-auto space-y-5"
              >
                {/* Header & Mode Switcher */}
                <div className="text-center space-y-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Recall & Memory Training</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-0.5">Vocabulary Flashcards</h2>
                    <p className="text-slate-500 text-xs md:text-sm mt-1">
                      Pick your practice deck, flip cards to test recall, and mark unknown vocabs to review later.
                    </p>
                  </div>

                  {/* Deck Selection Tabs */}
                  <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/80 max-w-lg mx-auto">
                    <button
                      onClick={() => {
                        setFlashcardPracticeMode("all");
                        setShowBookmarksOnly(false);
                        setShowUnknownOnly(false);
                        setIsFlipped(false);
                      }}
                      className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                        flashcardPracticeMode === "all"
                          ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                      }`}
                    >
                      <span>🗂️ All Deck</span>
                      <span className="text-[10px] bg-slate-200/80 text-slate-700 font-bold px-1.5 py-0.5 rounded-full">
                        {VOCABULARY_DATA.length}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setFlashcardPracticeMode("unknown");
                        setShowUnknownOnly(true);
                        setShowBookmarksOnly(false);
                        setIsFlipped(false);
                      }}
                      className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                        flashcardPracticeMode === "unknown"
                          ? "bg-orange-500 text-white shadow-sm ring-2 ring-orange-400/50"
                          : "text-orange-700 bg-orange-50/70 hover:bg-orange-100/70 border border-orange-200/60"
                      }`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Practice Later</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        flashcardPracticeMode === "unknown" ? "bg-white text-orange-700" : "bg-orange-200 text-orange-900"
                      }`}>
                        {unknownWords.length}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setFlashcardPracticeMode("bookmarks");
                        setShowBookmarksOnly(true);
                        setShowUnknownOnly(false);
                        setIsFlipped(false);
                      }}
                      className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                        flashcardPracticeMode === "bookmarks"
                          ? "bg-amber-500 text-white shadow-sm ring-2 ring-amber-400/50"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Bookmarks</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        flashcardPracticeMode === "bookmarks" ? "bg-white text-amber-700" : "bg-slate-200/80 text-slate-700"
                      }`}>
                        {bookmarks.length}
                      </span>
                    </button>
                  </div>

                  {/* Secondary Filters: Direction & Level Selector */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    {/* Translation Direction Switcher */}
                    <div className="inline-flex bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
                      <button
                        onClick={() => setTranslationDirection("de-to-en")}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          translationDirection === "de-to-en"
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        🇩🇪 German ➔ 🇬🇧 English
                      </button>
                      <button
                        onClick={() => setTranslationDirection("en-to-de")}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          translationDirection === "en-to-de"
                            ? "bg-teal-700 text-white shadow-xs"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        🇬🇧 English ➔ 🇩🇪 German
                      </button>
                    </div>

                    {/* Level Selector Pills */}
                    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
                      <span className="text-[10px] font-black uppercase text-slate-400 px-1">Level:</span>
                      {(["A1", "A2", "B1", "B2"] as const).map(lvl => {
                        const isSelected = selectedLevels.includes(lvl);
                        return (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => toggleLevel(lvl)}
                            className={`px-2 py-1 rounded-lg text-xs font-black transition-all cursor-pointer select-none ${
                              isSelected
                                ? "bg-slate-800 text-white shadow-xs"
                                : "text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            {isSelected && "✓ "}{lvl}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Card Deck or Empty State */}
                {flashcardSubset.length === 0 ? (
                  <div className="bg-white p-10 text-center rounded-3xl border border-slate-200 shadow-sm max-w-md mx-auto space-y-4">
                    {flashcardPracticeMode === "unknown" ? (
                      <>
                        <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mx-auto border border-orange-200">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-slate-800">All Caught Up on Unknown Vocabs!</h3>
                          <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                            You have no unknown words marked for practice right now. While studying flashcards or exploring vocabulary, tap <strong>&ldquo;Need Practice&rdquo;</strong> to add any tricky words here.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setFlashcardPracticeMode("all");
                            setShowUnknownOnly(false);
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-3 px-5 rounded-xl transition-all shadow-sm cursor-pointer"
                        >
                          Browse All Flashcards ({VOCABULARY_DATA.length} words)
                        </button>
                      </>
                    ) : flashcardPracticeMode === "bookmarks" ? (
                      <>
                        <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto border border-amber-200">
                          <Bookmark className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-slate-800">No Bookmarked Words</h3>
                          <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                            Click the bookmark icon on any flashcard or vocabulary entry to study your custom collection.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setFlashcardPracticeMode("all");
                            setShowBookmarksOnly(false);
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-3 px-5 rounded-xl transition-all shadow-sm cursor-pointer"
                        >
                          Browse All Flashcards
                        </button>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                        <div>
                          <h3 className="text-lg font-black text-slate-800">No matching flashcards</h3>
                          <p className="text-slate-500 text-xs mt-1">Try resetting the level or theme filters.</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedLevels([]);
                            setSelectedTheme(null);
                            setSelectedType(null);
                            setShowBookmarksOnly(false);
                            setShowUnknownOnly(false);
                            setFlashcardPracticeMode("all");
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 px-4 rounded-xl transition-all shadow-sm cursor-pointer"
                        >
                          Reset Filters
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Progress Bar & Continuity Resume Indicator */}
                    <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-800">
                            Card {Math.min(currentCardIndex + 1, flashcardSubset.length)} of {flashcardSubset.length}
                          </span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md">
                            {Math.round(((Math.min(currentCardIndex + 1, flashcardSubset.length)) / flashcardSubset.length) * 100)}%
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md hidden sm:inline-flex items-center gap-1">
                            📍 Resumed where you stopped
                          </span>
                          {currentCardIndex > 0 && (
                            <button
                              onClick={() => {
                                setCurrentCardIndex(0);
                                setIsFlipped(false);
                                recordActivity();
                              }}
                              title="Start deck from the beginning"
                              className="text-[11px] font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-2 py-0.5 rounded-md transition-all cursor-pointer"
                            >
                              ⏮ Restart Deck
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Progress Line */}
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-[#1cb0f6] h-full transition-all duration-300 rounded-full"
                          style={{ width: `${Math.round(((Math.min(currentCardIndex + 1, flashcardSubset.length)) / flashcardSubset.length) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Interactive 3D Flashcard */}
                    <div className="relative w-full overflow-hidden py-1 select-none">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentCardIndex}
                          drag="x"
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={0.6}
                          onDragEnd={(event, info) => {
                            const swipeThreshold = 80;
                            if (info.offset.x < -swipeThreshold) {
                              // Swiped left -> Next
                              setCurrentCardIndex(prev => (prev + 1) % flashcardSubset.length);
                              setIsFlipped(false);
                              recordActivity();
                            } else if (info.offset.x > swipeThreshold) {
                              // Swiped right -> Previous
                              setCurrentCardIndex(prev => Math.max(0, prev - 1));
                              setIsFlipped(false);
                              recordActivity();
                            }
                          }}
                          initial={{ opacity: 0, x: 80, scale: 0.96 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -80, scale: 0.96 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className="relative h-84 md:h-88 w-full cursor-grab active:cursor-grabbing touch-none perspective"
                        >
                          <div 
                            onClick={() => {
                              setIsFlipped(prev => !prev);
                              recordActivity();
                            }}
                            className={`w-full h-full duration-500 transform-style-3d relative cursor-pointer ${isFlipped ? "rotate-y-180" : ""}`}
                          >
                            {/* FRONT OF CARD */}
                            <div className="absolute inset-0 backface-hidden bg-white rounded-3xl border-2 border-slate-200 p-6 md:p-8 shadow-md flex flex-col justify-between items-center text-center">
                              {/* Top Bar on Card Front */}
                              <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="bg-slate-100 text-slate-700 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md">
                                    {flashcardSubset[currentCardIndex]?.type}
                                  </span>
                                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                                    flashcardSubset[currentCardIndex]?.level === "B2" ? "bg-purple-100 text-purple-700" :
                                    flashcardSubset[currentCardIndex]?.level === "B1" ? "bg-blue-100 text-blue-700" :
                                    flashcardSubset[currentCardIndex]?.level === "A2" ? "bg-amber-100 text-amber-700" :
                                    "bg-emerald-100 text-emerald-700"
                                  }`}>
                                    {flashcardSubset[currentCardIndex]?.level || "A1"}
                                  </span>
                                  {unknownWords.includes(flashcardSubset[currentCardIndex]?.word || "") && (
                                    <span className="bg-orange-100 text-orange-800 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1">
                                      <RotateCcw className="w-3 h-3" /> Practice Later
                                    </span>
                                  )}
                                  {masteredWords.includes(flashcardSubset[currentCardIndex]?.word || "") && (
                                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1">
                                      <CheckCircle className="w-3 h-3" /> Mastered
                                    </span>
                                  )}
                                </div>

                                {/* In-Card Quick Actions */}
                                <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                                  <button
                                    onClick={() => speakWord(flashcardSubset[currentCardIndex]?.word || "")}
                                    title="Pronounce German word"
                                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-emerald-600 transition-all cursor-pointer"
                                  >
                                    <Volume2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => toggleUnknown(flashcardSubset[currentCardIndex]?.word || "")}
                                    title={unknownWords.includes(flashcardSubset[currentCardIndex]?.word || "") ? "Remove from Practice Later" : "Mark as Unknown / Practice Later"}
                                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                                      unknownWords.includes(flashcardSubset[currentCardIndex]?.word || "")
                                        ? "bg-orange-100 text-orange-700"
                                        : "hover:bg-slate-100 text-slate-400 hover:text-orange-600"
                                    }`}
                                  >
                                    <RotateCcw className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => toggleBookmark(flashcardSubset[currentCardIndex]?.word || "")}
                                    title={bookmarks.includes(flashcardSubset[currentCardIndex]?.word || "") ? "Remove Bookmark" : "Add Bookmark"}
                                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                                      bookmarks.includes(flashcardSubset[currentCardIndex]?.word || "")
                                        ? "bg-amber-100 text-amber-600"
                                        : "hover:bg-slate-100 text-slate-400 hover:text-amber-500"
                                    }`}
                                  >
                                    <Bookmark className={`w-4 h-4 ${bookmarks.includes(flashcardSubset[currentCardIndex]?.word || "") ? "fill-amber-500" : ""}`} />
                                  </button>
                                </div>
                              </div>

                              {/* Center Content of Card Front */}
                              <div className="my-auto flex flex-col items-center gap-2 max-w-md">
                                {translationDirection === "en-to-de" ? (
                                  <>
                                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0d9488] bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md">
                                      English Clue
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                                      {flashcardSubset[currentCardIndex]?.english_translation}
                                    </h3>
                                    <p className="text-slate-400 font-bold text-xs mt-1 uppercase tracking-wider">
                                      What is the German word?
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                                      {flashcardSubset[currentCardIndex]?.word}
                                    </h3>
                                    {flashcardSubset[currentCardIndex]?.forms && (
                                      <p className="text-slate-500 italic text-sm font-medium">
                                        ({flashcardSubset[currentCardIndex]?.forms})
                                      </p>
                                    )}

                                    {/* English-to-German phonetic guide */}
                                    {flashcardSubset[currentCardIndex] && (
                                      <div className="inline-flex items-center gap-1.5 text-xs text-amber-800 font-bold font-mono mt-2 bg-amber-50/80 px-3 py-1 rounded-xl border border-amber-200/60">
                                        <span className="text-[9px] uppercase font-sans text-amber-700">Sound:</span>
                                        <span>&ldquo;{getGermanToEnglishPhonetic(flashcardSubset[currentCardIndex].word)}&rdquo;</span>
                                      </div>
                                    )}
                                  </>
                                )}

                                <span className="mt-3 text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200/50 flex items-center gap-1">
                                  👆 Tap to Flip • ↔ Swipe to Navigate
                                </span>
                              </div>

                              <div className="text-slate-400 text-xs font-medium">
                                {translationDirection === "en-to-de" 
                                  ? "Recall the German translation, then tap to check pronunciation and example sentences"
                                  : "Study the grammatical forms, then tap to check translation and sentence context"}
                              </div>
                            </div>

                            {/* BACK OF CARD */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-teal-900 text-white rounded-3xl border-2 border-teal-800 p-6 md:p-8 shadow-md flex flex-col justify-between">
                              <div className="flex justify-between items-center w-full">
                                <span className="bg-teal-800 text-teal-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10">
                                  Sentence Context & Answer
                                </span>
                                
                                <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                  <button
                                    onClick={() => speakWord(flashcardSubset[currentCardIndex]?.word || "")}
                                    title="Pronounce word"
                                    className="p-1.5 hover:bg-teal-800 rounded-lg text-teal-300 hover:text-white transition-all cursor-pointer"
                                  >
                                    <Volume2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => toggleUnknown(flashcardSubset[currentCardIndex]?.word || "")}
                                    title={unknownWords.includes(flashcardSubset[currentCardIndex]?.word || "") ? "Remove from Practice Later" : "Mark as Unknown / Practice Later"}
                                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                                      unknownWords.includes(flashcardSubset[currentCardIndex]?.word || "")
                                        ? "bg-orange-500 text-white"
                                        : "hover:bg-teal-800 text-teal-300 hover:text-orange-400"
                                    }`}
                                  >
                                    <RotateCcw className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              <div className="my-auto space-y-3">
                                <div className="text-center">
                                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#58cc02] bg-teal-950 px-2 py-0.5 rounded-md mb-1.5 inline-block border border-teal-800">
                                    {translationDirection === "en-to-de" ? "German Answer" : "English Translation"}
                                  </span>
                                  <h4 className="text-2xl md:text-3xl font-black text-teal-100 tracking-tight">
                                    {flashcardSubset[currentCardIndex]?.word}
                                  </h4>
                                  {flashcardSubset[currentCardIndex]?.forms && (
                                    <p className="text-xs text-teal-200 italic font-medium mt-0.5">
                                      ({flashcardSubset[currentCardIndex]?.forms})
                                    </p>
                                  )}
                                  
                                  <div className="mt-1.5 space-y-0.5">
                                    <p className="text-xs text-[#ffc800] font-black font-mono">
                                      Sound: &ldquo;{getGermanToEnglishPhonetic(flashcardSubset[currentCardIndex]?.word || "")}&rdquo;
                                    </p>
                                    <p className="text-xs text-teal-200 font-bold">
                                      Meaning: {flashcardSubset[currentCardIndex]?.english_translation}
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                                  {flashcardSubset[currentCardIndex]?.examples.map((ex, i) => (
                                    <div key={i} className="text-left text-xs md:text-sm bg-teal-800/60 p-2.5 rounded-xl border border-teal-700/60 text-slate-100 font-medium">
                                      <p className="font-bold leading-relaxed text-white">{ex.de}</p>
                                      <p className="text-[11px] text-teal-300 italic mt-0.5 leading-relaxed">{ex.en}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="text-teal-300/80 text-[10px] font-bold text-center flex items-center justify-center gap-1">
                                👆 Tap to Flip Back • ↔ Swipe to Navigate
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Primary Flashcard Action Buttons (Anki / Duolingo Recall Controls) */}
                    <div className="space-y-3 pt-1">
                      {/* Row 1: Recall Grading & Marking Buttons */}
                      <div className="grid grid-cols-3 gap-2.5">
                        {/* 1. Need Practice / Mark Unknown Button */}
                        <button
                          onClick={() => {
                            const word = flashcardSubset[currentCardIndex]?.word;
                            if (word) {
                              markAsUnknown(word);
                            }
                            // Advance to next card smoothly
                            setCurrentCardIndex(prev => (prev + 1) % flashcardSubset.length);
                            setIsFlipped(false);
                          }}
                          className="bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 border-b-4 border-b-orange-400 active:border-b-2 active:translate-y-[2px] text-orange-900 py-3 px-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-xs flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw className="w-4 h-4 text-orange-600" />
                          <span>Need Practice</span>
                        </button>

                        {/* 2. Flip Card Button */}
                        <button
                          onClick={() => {
                            setIsFlipped(prev => !prev);
                            recordActivity();
                          }}
                          className="bg-[#1cb0f6] hover:bg-[#24bfff] border-b-4 border-[#1899d6] active:border-b-0 active:translate-y-1 text-white py-3 px-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>🔄 Flip Card</span>
                        </button>

                        {/* 3. I Know This / Mastered Button */}
                        <button
                          onClick={() => {
                            const word = flashcardSubset[currentCardIndex]?.word;
                            if (word) {
                              markAsKnown(word);
                            }
                            // Advance to next card smoothly
                            setCurrentCardIndex(prev => (prev + 1) % flashcardSubset.length);
                            setIsFlipped(false);
                          }}
                          className="bg-[#58cc02] hover:bg-[#61e002] border-b-4 border-[#46a302] active:border-b-0 active:translate-y-1 text-white py-3 px-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>I Know This!</span>
                        </button>
                      </div>

                      {/* Row 2: Secondary Navigation Controls */}
                      <div className="flex items-center justify-between gap-3 pt-1">
                        <button
                          disabled={currentCardIndex === 0}
                          onClick={() => {
                            setCurrentCardIndex(prev => Math.max(0, prev - 1));
                            setIsFlipped(false);
                            recordActivity();
                          }}
                          className="flex-1 bg-white hover:bg-slate-50 border-2 border-slate-200 border-b-4 active:border-b-2 active:translate-y-[2px] text-slate-700 disabled:opacity-40 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                        >
                          ◄ Previous
                        </button>

                        <button
                          onClick={() => speakWord(flashcardSubset[currentCardIndex]?.word || "")}
                          className="bg-white hover:bg-slate-50 border-2 border-slate-200 border-b-4 active:border-b-2 active:translate-y-[2px] text-[#1cb0f6] p-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
                          title="Pronounce word"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            setCurrentCardIndex(prev => (prev + 1) % flashcardSubset.length);
                            setIsFlipped(false);
                            recordActivity();
                          }}
                          className="flex-1 bg-white hover:bg-slate-50 border-2 border-slate-200 border-b-4 active:border-b-2 active:translate-y-[2px] text-slate-700 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                        >
                          Next ►
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ADAPTIVE CONTEXT QUIZ TAB */}
            {activeTab === "quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-xl mx-auto space-y-6"
              >
                <div className="text-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Interactive Quiz</span>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Context Clues Training</h2>
                  <p className="text-slate-500 text-xs md:text-sm mt-1">
                    Fill the blank in the German sentence by choosing the correct word from the options.
                  </p>
                </div>

                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-700" />
                    <span className="text-sm font-bold text-indigo-800">Practice Score</span>
                  </div>
                  <div className="text-sm font-black text-indigo-900">
                    {quizScore} correct out of {quizQuestionsAnswered} questions
                  </div>
                </div>

                {currentQuizWord && (
                  <div className="relative w-full overflow-hidden select-none">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQuizWord.word}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.6}
                        onDragEnd={(event, info) => {
                          const swipeThreshold = 80;
                          if (info.offset.x < -swipeThreshold) {
                            // Swiped left -> Next Question
                            generateQuizQuestion();
                          }
                        }}
                        initial={{ opacity: 0, x: 100, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -100, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative cursor-grab active:cursor-grabbing touch-none"
                      >
                        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Complete the Cloze Sentence</span>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center space-y-2">
                        <p className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed">
                          &ldquo;{quizExampleSentence}&rdquo;
                        </p>
                        {quizExampleTranslation && (
                          <p className="text-xs text-slate-500 font-medium italic">
                            Hint (Translation): &ldquo;{quizExampleTranslation}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-center text-xs font-semibold text-slate-500 italic">
                      Clue: The correct word belongs to the category &ldquo;{currentQuizWord.type}&rdquo;
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {quizOptions.map((option) => {
                        const isSelected = selectedQuizOption === option;
                        const isCorrectOption = option === currentQuizWord.word;
                        
                        let btnStyle = "bg-white border-2 border-slate-200 border-b-4 hover:border-slate-300 hover:bg-slate-50 active:border-b-2 active:translate-y-[2px] text-slate-800";
                        let icon = null;

                        if (selectedQuizOption !== null) {
                           if (isCorrectOption) {
                            btnStyle = "bg-[#e8fcd8] border-2 border-[#58cc02] border-b-4 text-[#46a302] font-black";
                            icon = <CheckCircle className="w-5 h-5 text-[#58cc02] shrink-0" />;
                          } else if (isSelected) {
                            btnStyle = "bg-[#ffdfe0] border-2 border-[#ea2b2b] border-b-4 text-[#ea2b2b] font-black";
                            icon = <XCircle className="w-5 h-5 text-[#ea2b2b] shrink-0" />;
                          } else {
                            btnStyle = "bg-slate-50 border-2 border-slate-100 text-slate-300 opacity-50";
                          }
                        }

                        return (
                          <button
                            key={option}
                            disabled={selectedQuizOption !== null}
                            onClick={() => handleQuizAnswer(option)}
                            className={`w-full p-4 rounded-2xl text-sm font-black flex items-center justify-between gap-3 text-left transition-all cursor-pointer ${btnStyle}`}
                          >
                            <span className="uppercase tracking-wide">{option}</span>
                            {icon}
                          </button>
                        );
                      })}
                    </div>

                    {selectedQuizOption !== null && (
                      <div className="border-t border-slate-100 pt-5 space-y-4">
                        <div className={`p-4 rounded-xl text-sm ${isAnswerCorrect ? "bg-emerald-50 text-emerald-800 border border-emerald-100" : "bg-red-50 text-red-800 border border-red-100"}`}>
                          <p className="font-bold mb-1">
                            {isAnswerCorrect ? "Super! That's correct." : "Leider nicht ganz richtig."}
                          </p>
                          <p className="text-xs md:text-sm leading-relaxed opacity-90 space-y-1.5">
                            <span>The correct word is <strong className="font-bold text-slate-900">{currentQuizWord.word}</strong> ({currentQuizWord.english_translation}).</span>
                            <span className="block">The complete sentence is:</span>
                            <strong className="font-semibold italic text-slate-900 block bg-white/40 p-2 rounded-lg border border-black/5">
                              &ldquo;{quizFullSentence || currentQuizWord.examples[0]?.de}&rdquo;
                            </strong>
                            <span className="text-xs block text-slate-600">
                              English: &ldquo;{quizExampleTranslation || currentQuizWord.examples[0]?.en}&rdquo;
                            </span>
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => speakWord(currentQuizWord.word)}
                            className="flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 border-2 border-slate-200 border-b-4 active:border-b-2 active:translate-y-[2px] text-slate-700 px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                          >
                            <Volume2 className="w-4 h-4 text-[#1cb0f6]" />
                            Listen
                          </button>

                          <button
                            onClick={generateQuizQuestion}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-[#58cc02] hover:bg-[#61e002] border-b-4 border-[#46a302] active:border-b-0 active:translate-y-1 text-white px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Next Question
                          </button>
                        </div>
                      </div>
                    )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}

            {/* PHRASES PRACTICE TAB */}
            {activeTab === "phrases" && (
              <motion.div
                key="phrases"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Level selection & Header */}
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 border-b-8 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                        <MessageSquare className="w-6 h-6 text-[#14b8a6]" />
                        Phrases Practice Unit
                      </h2>
                      <p className="text-slate-500 text-xs md:text-sm font-medium flex items-center gap-2 mt-0.5">
                        <span>Master entire German colloquial phrases and daily expressions.</span>
                        <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-800 text-[11px] font-black uppercase px-2.5 py-0.5 rounded-lg border border-teal-200">
                          <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
                          Level: {selectedLevelsBadgeText}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Playful Theme Selector Bubble List */}
                  {availableThemesForLevel.length > 1 && (
                    <div className="border-t border-slate-100 pt-4 mt-1 space-y-2.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                        📂 Grouped by Theme / Category
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedPhraseTheme(null)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border-2 ${
                            selectedPhraseTheme === null
                              ? "bg-[#14b8a6] border-[#0d9488] text-white shadow-sm"
                              : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                          }`}
                        >
                          🌟 All Themes ({phrasesList.length})
                        </button>
                        {availableThemesForLevel.map(theme => {
                          const count = phrasesList.filter(p => p.theme === theme).length;
                          return (
                            <button
                              key={theme}
                              onClick={() => setSelectedPhraseTheme(theme)}
                              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border-2 ${
                                selectedPhraseTheme === theme
                                  ? "bg-teal-600 border-teal-700 text-white shadow-sm"
                                  : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                              }`}
                            >
                              {theme} ({count})
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>



                {/* Duo Mascot speech bubble */}
                <div className="flex gap-4 items-center bg-white border-2 border-slate-200 border-b-4 p-4 rounded-3xl max-w-2xl mx-auto shadow-sm">
                  <div className="text-4xl md:text-5xl select-none shrink-0 animate-bounce">🦉</div>
                  <div className="relative bg-[#e8fcd8] border-2 border-[#c3f299] p-3 rounded-2xl text-xs md:text-sm font-black text-[#46a302] shadow-sm flex-1">
                    <div className="absolute top-1/2 -left-2 w-3 h-3 bg-[#e8fcd8] border-l-2 border-b-2 border-[#c3f299] -translate-y-1/2 rotate-45 transform"></div>
                    <p className="relative z-10 leading-relaxed">
                      {phraseRecording ? (
                        "Listening to your German pronunciation! Read the phrase clearly into your microphone... 🦉🎙️"
                      ) : phraseMatchScore !== null ? (
                        phraseMatchScore >= 85 ? (
                          `Unglaublich! ${phraseMatchScore}% pronunciation accuracy on this phrase! Outstanding! 🦉🎉`
                        ) : phraseMatchScore >= 50 ? (
                          `Sehr gut! ${phraseMatchScore}% match. Keep training to get a perfect 100%! 🦉💪`
                        ) : (
                          `Wunderbar parsed! Keep trying to pronounce the German sentence clearly! 🦉💡`
                        )
                      ) : (
                        `Excellent! Ready to practice ${phraseLevel} phrases? Listen to the native audio, then click the mic to read! 🦉🇩🇪`
                      )}
                    </p>
                  </div>
                </div>

                {/* Active practice card layout */}
                {filteredPhrases[phraseIndex] ? (
                  <div className="max-w-3xl mx-auto w-full">
                    
                    {/* Active phrase training panel */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-200 border-b-8 shadow-sm space-y-6">
                      
                      {/* Target phrase card display (Swappable & Swipeable) */}
                      <div className="relative w-full overflow-hidden py-2 select-none">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={phraseIndex}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.6}
                            onDragEnd={(event, info) => {
                              const swipeThreshold = 80;
                              if (info.offset.x < -swipeThreshold) {
                                // Swiped left -> Next
                                if (phraseIndex < filteredPhrases.length - 1) {
                                  setPhraseIndex(prev => prev + 1);
                                  setPhraseRecordedText("");
                                  setPhraseMatchScore(null);
                                  setPhraseSpeechError(null);
                                }
                              } else if (info.offset.x > swipeThreshold) {
                                // Swiped right -> Previous
                                if (phraseIndex > 0) {
                                  setPhraseIndex(prev => prev - 1);
                                  setPhraseRecordedText("");
                                  setPhraseMatchScore(null);
                                  setPhraseSpeechError(null);
                                }
                              }
                            }}
                            initial={{ opacity: 0, x: 100, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -100, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative cursor-grab active:cursor-grabbing touch-none"
                            style={{ perspective: 1000 }}
                          >
                            <div className="w-full h-[220px] md:h-[180px] relative">
                              <motion.div
                                animate={{ rotateY: phraseFlipped ? 180 : 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                style={{ transformStyle: "preserve-3d" }}
                                onClick={() => setPhraseFlipped(!phraseFlipped)}
                                className="w-full h-full relative"
                              >
                                {/* FRONT SIDE */}
                                <div 
                                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                                  className="absolute inset-0 w-full h-full bg-slate-50 border-2 border-slate-200 p-6 rounded-2xl flex flex-col justify-between items-center text-center shadow-sm hover:border-teal-300 transition-colors"
                                >
                                  <div className="w-full flex justify-between items-center">
                                    <span className="bg-teal-100 text-teal-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-teal-200">
                                      {translationDirection === "en-to-de" ? "English Clue" : `${phraseLevel} Phrase`}
                                    </span>
                                    <span className="text-xs font-black text-slate-400 flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-2xs">
                                      🔄 {translationDirection === "en-to-de" ? "Tap to Show Phrase" : "Tap to Show Translation"}
                                    </span>
                                  </div>

                                  <div className="space-y-1.5 my-auto">
                                    {translationDirection === "en-to-de" ? (
                                      <>
                                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-600 block mb-0.5">Translate to German</span>
                                        <p className="text-slate-800 font-black text-lg md:text-xl leading-relaxed">
                                          {filteredPhrases[phraseIndex].english}
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-snug">
                                          {filteredPhrases[phraseIndex].german}
                                        </h3>
                                        {filteredPhrases[phraseIndex].pronunciation_hint && (
                                          <p className="text-xs font-mono text-slate-500 select-all">
                                            &ldquo;{filteredPhrases[phraseIndex].pronunciation_hint}&rdquo;
                                          </p>
                                        )}
                                      </>
                                    )}
                                  </div>

                                  <div className="w-full text-center flex justify-between items-center text-[9px] font-extrabold uppercase tracking-widest text-slate-400 px-2">
                                    <span>{phraseIndex > 0 ? "◀ Swipe Right for Prev" : ""}</span>
                                    <span>{phraseIndex < filteredPhrases.length - 1 ? "Swipe Left for Next ▶" : ""}</span>
                                  </div>
                                </div>

                                {/* BACK SIDE */}
                                <div 
                                  style={{ 
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                    transform: "rotateY(180deg)"
                                  }}
                                  className="absolute inset-0 w-full h-full bg-teal-50 border-2 border-teal-200 p-6 rounded-2xl flex flex-col justify-between items-center text-center shadow-inner"
                                >
                                  <div className="w-full flex justify-between items-center">
                                    <span className="bg-teal-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-teal-700">
                                      {translationDirection === "en-to-de" ? `${phraseLevel} Phrase` : "English Translation"}
                                    </span>
                                    <span className="text-xs font-black text-teal-700 flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-teal-100 shadow-2xs">
                                      🔄 {translationDirection === "en-to-de" ? "Tap to Show Clue" : "Tap to Show Phrase"}
                                    </span>
                                  </div>

                                  <div className="space-y-1.5 my-auto">
                                    {translationDirection === "en-to-de" ? (
                                      <>
                                        <h3 className="text-xl md:text-2xl font-black text-teal-900 leading-snug">
                                          {filteredPhrases[phraseIndex].german}
                                        </h3>
                                        {filteredPhrases[phraseIndex].pronunciation_hint && (
                                          <p className="text-xs font-mono text-teal-700 select-all">
                                            &ldquo;{filteredPhrases[phraseIndex].pronunciation_hint}&rdquo;
                                          </p>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-600 block mb-0.5">Translation</span>
                                        <p className="text-slate-800 font-black text-lg md:text-xl leading-relaxed">
                                          {filteredPhrases[phraseIndex].english}
                                        </p>
                                      </>
                                    )}
                                  </div>

                                  <div className="w-full text-center flex justify-between items-center text-[9px] font-extrabold uppercase tracking-widest text-teal-500/80 px-2">
                                    <span>{phraseIndex > 0 ? "◀ Swipe Right for Prev" : ""}</span>
                                    <span>{phraseIndex < filteredPhrases.length - 1 ? "Swipe Left for Next ▶" : ""}</span>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* TTS Voice Training Buttons */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">1. Audio Training (Listen)</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <button
                            onClick={() => speakWord(filteredPhrases[phraseIndex].german, false)}
                            className="flex items-center justify-center gap-2 bg-[#1cb0f6] hover:bg-[#24bfff] border-b-4 border-[#1899d6] active:border-b-0 active:translate-y-1 text-white font-black text-xs md:text-sm py-3.5 px-4 rounded-2xl transition-all shadow-sm tracking-wider uppercase cursor-pointer"
                          >
                            <Volume2 className="w-5 h-5" /> Normal Speed
                          </button>
                          
                          <button
                            onClick={() => speakWord(filteredPhrases[phraseIndex].german, true)}
                            className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border-2 border-slate-200 border-b-4 active:border-b-2 active:translate-y-[2px] text-slate-700 font-black text-xs md:text-sm py-3.5 px-4 rounded-2xl transition-all shadow-sm tracking-wider uppercase cursor-pointer"
                          >
                            <Volume2 className="w-5 h-5 text-[#1cb0f6]" /> Slow Speed (0.7x)
                          </button>
                        </div>
                      </div>

                      {/* Microphone Pronunciation Engine */}
                      <div className="space-y-3 pt-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">2. Speaking Practice (Speak)</span>
                        
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/50 space-y-4">
                          {phraseRecording ? (
                            <button
                              disabled
                              className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg relative cursor-not-allowed"
                            >
                              <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30"></div>
                              <Mic className="w-8 h-8 animate-pulse" />
                            </button>
                          ) : (
                            <button
                              onClick={() => startPhraseSpeechRecognition(filteredPhrases[phraseIndex].german)}
                              className="w-16 h-16 rounded-full bg-[#58cc02] hover:bg-[#61e002] border-b-4 border-[#46a302] text-white flex items-center justify-center shadow-md active:translate-y-1 active:border-b-0 transition-all cursor-pointer"
                              title="Start speaking phrase"
                            >
                              <Mic className="w-7 h-7" />
                            </button>
                          )}

                          <div className="text-center space-y-1">
                            <span className="text-xs font-black text-slate-700 uppercase tracking-wide">
                              {phraseRecording ? "Listening closely... Speak now!" : "Click the microphone and speak the sentence!"}
                            </span>
                            <p className="text-[10px] text-slate-400 font-medium">
                              Reads your speech in real-time & calculates your phoneme match score.
                            </p>
                          </div>
                        </div>

                        {/* Speech recognition errors */}
                        {phraseSpeechError && (
                          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-xs text-red-700 space-y-1.5 leading-relaxed">
                            <div className="flex items-center gap-2 font-black uppercase text-red-800">
                              <ShieldAlert className="w-4 h-4 text-red-600" />
                              <span>Microphone Error</span>
                            </div>
                            <p className="font-semibold">{phraseSpeechError}</p>
                          </div>
                        )}

                        {/* Display evaluation transcript & score */}
                        {phraseRecordedText && (
                          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 md:p-5 space-y-3.5 animate-in fade-in duration-300">
                            <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/60">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Pronunciation Analysis</span>
                              {phraseMatchScore !== null && (
                                <span className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-full ${
                                  phraseMatchScore >= 85 ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                                }`}>
                                  Score: {phraseMatchScore}%
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                              <div className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase block">Target German Phrase</span>
                                <p className="font-black text-slate-800 leading-snug">
                                  {filteredPhrases[phraseIndex].german}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase block">Your Spoken Text</span>
                                <p className="font-bold text-[#1899d6] leading-snug">
                                  &ldquo;{phraseRecordedText}&rdquo;
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer Navigation Buttons */}
                      <div className="border-t-2 border-slate-100 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                        <button
                          disabled={phraseIndex === 0}
                          onClick={() => {
                            setPhraseIndex(prev => Math.max(0, prev - 1));
                            setPhraseRecordedText("");
                            setPhraseMatchScore(null);
                            setPhraseSpeechError(null);
                          }}
                          className="flex-1 bg-white hover:bg-slate-50 border-2 border-slate-200 border-b-4 active:border-b-2 active:translate-y-[2px] text-slate-700 disabled:opacity-40 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                        >
                          ◄ Previous Phrase
                        </button>

                        <div className="text-center font-black text-xs text-slate-400 uppercase tracking-widest shrink-0">
                          Phrase {phraseIndex + 1} of {filteredPhrases.length}
                        </div>

                        <button
                          disabled={phraseIndex === filteredPhrases.length - 1}
                          onClick={() => {
                            setPhraseIndex(prev => Math.min(filteredPhrases.length - 1, prev + 1));
                            setPhraseRecordedText("");
                            setPhraseMatchScore(null);
                            setPhraseSpeechError(null);
                          }}
                          className="flex-1 bg-[#58cc02] hover:bg-[#61e002] border-b-4 border-[#46a302] active:border-b-0 active:translate-y-1 text-white disabled:opacity-40 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                        >
                          Next Phrase ►
                        </button>
                      </div>

                    </div>

                  </div>
                ) : (
                  <div className="bg-white p-12 rounded-3xl border-2 border-slate-200 border-b-8 shadow-sm text-center space-y-4">
                    <div className="text-5xl">🤷‍♂️</div>
                    <h3 className="font-black text-slate-900 uppercase">No phrases loaded</h3>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                      There are no phrases currently active for level <strong className="font-black uppercase">{phraseLevel}</strong>. Click the button below to restore default phrases.
                    </p>
                    <button
                      onClick={() => {
                        resetPhrasesForLevel(phraseLevel);
                        setPhrasesList(loadPhrasesForLevel(phraseLevel));
                        setPhraseIndex(0);
                        setPhraseMatchScore(null);
                      }}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-5 rounded-2xl text-xs transition-all shadow-sm"
                    >
                      Restore Defaults
                    </button>
                  </div>
                )}
              </motion.div>
            )}



            {/* VOICE CONVERSATION TAB */}
            {activeTab === "voice" && (
              <motion.div
                key="voice"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <VoiceConversation 
                  selectedLevel={selectedLevel}
                  activeLessonContext={activeLessonContext}
                  onClearLessonContext={() => setActiveLessonContext(null)}
                  onSelectLevel={(level) => setSelectedLevel(level)}
                />
              </motion.div>
            )}

            {/* 30-DAY VOCABULARY & PHRASE CHALLENGE TAB */}
            {activeTab === "challenge" && (
              <motion.div
                key="challenge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {activeChallengePracticeDay !== null && activeChallenge ? (
                  <ChallengeDailyPractice
                    challenge={activeChallenge}
                    dayNumber={activeChallengePracticeDay}
                    onFinishSession={handleFinishChallengeSession}
                    onExit={() => setActiveChallengePracticeDay(null)}
                    onAddXP={(xp) => {
                      // Handled in handleFinishChallengeSession
                    }}
                  />
                ) : (
                  <ChallengeDashboard
                    challenge={activeChallenge}
                    onOpenSetup={() => setIsChallengeSetupOpen(true)}
                    onStartDayPractice={handleStartChallengeDay}
                    onResetChallenge={handleResetChallenge}
                    onUpdateDirection={(newDir) => {
                      if (activeChallenge) {
                        const updated: ChallengeProgress = { ...activeChallenge, direction: newDir };
                        setActiveChallenge(updated);
                        saveChallengeToLocal(updated);
                        if (currentUser) {
                          saveChallengeToCloud(updated).catch(err => console.error("Cloud direction save failed:", err));
                        }
                      }
                    }}
                  />
                )}
              </motion.div>
            )}

            {/* LEARNING PLANS TAB */}
            {activeTab === "plan" && (
              <motion.div
                key="plan"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <LearningPlanView
                  selectedLevel={selectedLevel}
                  setSelectedLevel={setSelectedLevel}
                  onNavigateToPractice={(theme, level) => {
                    if (level) setSelectedLevel(level);
                    if (theme) setSelectedTheme(theme);
                    setActiveTab("practice");
                  }}
                  onNavigateToPhrases={(theme, level) => {
                    if (level) setSelectedLevel(level);
                    setActiveTab("phrases");
                  }}
                  onNavigateToQuiz={(level) => {
                    if (level) setSelectedLevel(level);
                    setActiveTab("quiz");
                  }}
                  onNavigateToVoiceCoach={(context) => {
                    if (context.level) setSelectedLevel(context.level);
                    setActiveLessonContext(context);
                    setActiveTab("voice");
                  }}
                />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* Styled Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 pb-28 md:py-6 text-center text-xs text-slate-400 font-medium">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <span className="flex items-center gap-1.5 flex-wrap justify-center">
            <span className="font-extrabold uppercase text-[#58cc02]">Practice</span>
            <span className="text-slate-300 font-bold">&bull;</span>
            <span className="font-extrabold uppercase text-[#1cb0f6]">Listen</span>
            <span className="text-slate-300 font-bold">&bull;</span>
            <span className="font-extrabold uppercase text-[#ff9600]">Speak</span>
            <span className="text-slate-300 font-bold">&bull;</span>
            <span className="font-semibold text-slate-500">German Vocabulary &amp; Pronunciation Trainer (A1-B2)</span>
          </span>
          <span>Designed with high-contrast UI, custom accessibility pairings, and real-time Speech Analysis</span>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] grid grid-cols-4 sm:grid-cols-8 px-1 py-2 pb-safe gap-y-1">
        <button
          onClick={() => setActiveTab("challenge")}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${
            activeTab === "challenge" ? "text-orange-600 font-extrabold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Trophy className={`w-4 h-4 ${activeTab === "challenge" ? "text-orange-600 stroke-[2.5px]" : "text-slate-400"}`} />
          <span>Challenge</span>
        </button>
        <button
          onClick={() => setActiveTab("plan")}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${
            activeTab === "plan" ? "text-emerald-600 font-extrabold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <GraduationCap className={`w-4 h-4 ${activeTab === "plan" ? "text-emerald-600 stroke-[2.5px]" : "text-slate-400"}`} />
          <span>Plan</span>
        </button>
        <button
          onClick={() => setActiveTab("practice")}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${
            activeTab === "practice" ? "text-emerald-600 font-extrabold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Mic className={`w-4 h-4 ${activeTab === "practice" ? "text-emerald-600 stroke-[2.5px]" : "text-slate-400"}`} />
          <span>Practice</span>
        </button>
        <button
          onClick={() => setActiveTab("explore")}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${
            activeTab === "explore" ? "text-cyan-600 font-extrabold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <BookOpen className={`w-4 h-4 ${activeTab === "explore" ? "text-cyan-600 stroke-[2.5px]" : "text-slate-400"}`} />
          <span>Explorer</span>
        </button>
        <button
          onClick={() => setActiveTab("flashcards")}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${
            activeTab === "flashcards" ? "text-amber-500 font-extrabold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Sparkles className={`w-4 h-4 ${activeTab === "flashcards" ? "text-amber-500 stroke-[2.5px]" : "text-slate-400"}`} />
          <span>Cards</span>
        </button>
        <button
          onClick={() => setActiveTab("quiz")}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${
            activeTab === "quiz" ? "text-indigo-600 font-extrabold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <HelpCircle className={`w-4 h-4 ${activeTab === "quiz" ? "text-indigo-600 stroke-[2.5px]" : "text-slate-400"}`} />
          <span>Quiz</span>
        </button>
        <button
          onClick={() => setActiveTab("phrases")}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${
            activeTab === "phrases" ? "text-teal-600 font-extrabold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <MessageSquare className={`w-4 h-4 ${activeTab === "phrases" ? "text-teal-600 stroke-[2.5px]" : "text-slate-400"}`} />
          <span>Phrases</span>
        </button>
        <button
          onClick={() => setActiveTab("voice")}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${
            activeTab === "voice" ? "text-indigo-600 font-extrabold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Sparkles className={`w-4 h-4 ${activeTab === "voice" ? "text-indigo-600 stroke-[2.5px]" : "text-slate-400"}`} />
          <span>Voice</span>
        </button>
      </div>

      {/* Installation Guide Modal (Popup over everything) */}
      {showNativeGuide && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 space-y-5 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <h3 className="font-black text-slate-900 text-lg">Add to Home Screen</h3>
              </div>
              <button 
                onClick={() => setShowNativeGuide(false)}
                className="text-slate-400 hover:text-slate-600 p-1 bg-slate-100 rounded-full"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-600">
              {isIOSDevice ? (
                <div className="space-y-3">
                  <p>To run this application as a standalone mobile app on iOS/iPhone:</p>
                  <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2.5 text-xs">
                      <span className="bg-white px-2 py-1 rounded-md text-xs font-bold border border-slate-200 shrink-0">1</span>
                      <span>Tap the <strong>Share</strong> button (box with upward arrow) in the Safari toolbar.</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs">
                      <span className="bg-white px-2 py-1 rounded-md text-xs font-bold border border-slate-200 shrink-0">2</span>
                      <span>Scroll down and select <strong>Add to Home Screen</strong>.</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs">
                      <span className="bg-white px-2 py-1 rounded-md text-xs font-bold border border-slate-200 shrink-0">3</span>
                      <span>Name it <strong>German Speak</strong> and tap <strong>Add</strong>.</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p>To install this application as a native web app on Android/Chrome:</p>
                  <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2.5 text-xs">
                      <span className="bg-white px-2 py-1 rounded-md text-xs font-bold border border-slate-200 shrink-0">1</span>
                      <span>Tap the <strong>Menu</strong> (three vertical dots) in the browser top-right.</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs">
                      <span className="bg-white px-2 py-1 rounded-md text-xs font-bold border border-slate-200 shrink-0">2</span>
                      <span>Select <strong>Install app</strong> or <strong>Add to Home screen</strong>.</span>
                    </div>
                  </div>
                </div>
              )}
              <p className="text-xs text-slate-400 leading-normal">
                Standalone apps get a dedicated launcher icon, full screen display (no URL bar), and optimized touch performance.
              </p>
            </div>

            <button
              onClick={() => setShowNativeGuide(false)}
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-2xl hover:bg-slate-800 transition-all text-xs"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Streak Celebration Modal (Popup over everything) */}
      <AnimatePresence>
        {showStreakCelebration && (
          <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border-2 border-orange-200 text-center space-y-6 relative overflow-hidden"
            >
              {/* Confetti-like decoration background */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500" />
              
              <div className="relative pt-4">
                {/* Glowing pulsating Flame icon */}
                <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center border-4 border-orange-200 animate-bounce">
                  <Flame className="w-14 h-14 text-orange-500 fill-orange-500 drop-shadow-[0_4px_6px_rgba(234,88,12,0.4)] animate-pulse" />
                </div>
                
                {/* Dynamic floating sparkles */}
                <Sparkles className="w-6 h-6 text-yellow-500 absolute top-2 right-8 animate-pulse" />
                <Sparkles className="w-5 h-5 text-amber-500 absolute bottom-2 left-6 animate-pulse" />
              </div>

              <div className="space-y-2">
                {streak >= longestStreak && streak > 1 ? (
                  <div className="inline-flex items-center gap-1.5 bg-amber-100 border border-amber-300 text-amber-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    <Trophy className="w-3.5 h-3.5 fill-amber-600 text-amber-700" />
                    <span>New All-Time Record!</span>
                  </div>
                ) : isStreakMilestone(streak) ? (
                  <div className="inline-flex items-center gap-1.5 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Milestone Milestone Unlocked!</span>
                  </div>
                ) : null}

                <h3 className="font-black text-[#ff9600] text-3xl tracking-tight uppercase">
                  {streak} {streak === 1 ? "DAY" : "DAYS"} STREAK!
                </h3>
                <p className="text-sm font-extrabold text-slate-500 uppercase tracking-widest font-mono">
                  {streak === 1 ? "STREAK STARTED" : "STREAK EXTENDED!"}
                </p>
                <h4 className="text-xl font-bold text-slate-800 pt-2">
                  {streak === 1 ? "Großartig!" : "Fantastisch!"} 🇩🇪
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed px-2">
                  You are making incredible progress! You've successfully practiced today and kept your Duolingo-style streak shining bright.
                </p>
              </div>

              <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100 grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="block text-2xl font-black text-orange-600 font-mono">{streak}</span>
                  <span className="text-[10px] font-bold text-orange-400 uppercase">Days Active</span>
                </div>
                <div className="border-x border-orange-200">
                  <span className="block text-2xl font-black text-amber-600 font-mono">{Math.max(streak, longestStreak)}</span>
                  <span className="text-[10px] font-bold text-amber-500 uppercase">Best Record</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-emerald-600 font-mono">+{streak * 5}</span>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">XP Bonus</span>
                </div>
              </div>

              <button
                onClick={() => setShowStreakCelebration(false)}
                className="w-full bg-[#ff9600] hover:bg-[#ffaa22] active:translate-y-0.5 border-b-4 border-[#e07b00] active:border-b-0 text-white font-black py-4 rounded-2xl transition-all text-sm uppercase tracking-wider shadow-md cursor-pointer"
              >
                Weiterlernen! ➔
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Auth & Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
      />

      {/* 30-Day Challenge Setup Modal */}
      <ChallengeSetupModal
        isOpen={isChallengeSetupOpen}
        onClose={() => setIsChallengeSetupOpen(false)}
        onStartChallenge={handleStartNewChallenge}
        initialLevel={selectedLevel as ChallengeLevel}
      />

      {/* 30-Day Challenge Completion Celebration Modal */}
      {activeChallenge && (
        <ChallengeCompletionModal
          isOpen={isChallengeCompletionOpen}
          challenge={activeChallenge}
          onClose={() => setIsChallengeCompletionOpen(false)}
          onReviewWeakWords={() => {
            setIsChallengeCompletionOpen(false);
            if (activeChallenge.currentDay) {
              setActiveChallengePracticeDay(activeChallenge.currentDay);
            }
          }}
          onRetakeChallenge={() => {
            setIsChallengeCompletionOpen(false);
            handleStartNewChallenge(activeChallenge.level, activeChallenge.contentType);
          }}
          onStartNextLevel={(nextLvl) => {
            setIsChallengeCompletionOpen(false);
            handleStartNewChallenge(nextLvl, activeChallenge.contentType);
          }}
        />
      )}
    </div>
  );
}
