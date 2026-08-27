import { VocabularyEntry } from "../data/vocabulary";
import { PhraseEntry } from "../data/phrases";

export type ChallengeLevel = "A1" | "A2" | "B1" | "B2";
export type CEFRLevel = ChallengeLevel;

export type ChallengeContentType = "vocab" | "phrases" | "grammar" | "both" | "complete";
export type ChallengeDirection = "de-to-en" | "en-to-de" | "mixed";
export type ChallengeStatus = "active" | "completed" | "paused";

export type LearningState = "NEW" | "LEARNING" | "REVIEW" | "MASTERED" | "DIFFICULT";

export interface GrammarDrill {
  id: string;
  type: "multiple_choice" | "cloze" | "conjugation" | "case_selection" | "word_order";
  prompt: string;
  questionSentence: string;
  englishTranslation: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
}

export interface GrammarTable {
  title?: string;
  headers: string[];
  rows: string[][];
}

export interface GrammarRuleItem {
  rule: string;
  explanation: string;
  formula?: string;
}

export interface GrammarMistakeItem {
  mistake?: string;
  incorrect?: string;
  correction?: string;
  correct?: string;
  explanation: string;
}

export interface GrammarTopic {
  id: string;
  dayNumber: number; // 1 to 30
  level: ChallengeLevel;
  title: string;
  germanTitle?: string;
  englishTitle?: string;
  category?: string;
  summary: string;
  rules?: GrammarRuleItem[];
  ruleExplanation?: string[];
  formula?: string;
  table?: GrammarTable;
  tables?: GrammarTable[];
  examples: { de: string; en: string; highlight?: string; german?: string; english?: string; note?: string }[];
  commonMistake?: { mistake: string; correction: string; explanation: string };
  commonMistakes?: GrammarMistakeItem[];
  drills: GrammarDrill[];
}

export interface ChallengeItem {
  id: string; // Unique item ID
  contentId: string;
  contentType: "vocab" | "phrase" | "grammar";
  german: string;
  english: string;
  level: ChallengeLevel;
  type?: string;
  forms?: string | null;
  examples?: { de: string; en: string }[];
  phonetic?: string;
  
  // Adaptive & Spaced repetition metrics
  learningState: LearningState;
  timesSeen: number;
  timesCorrect: number;
  timesIncorrect: number;
  consecutiveCorrect: number;
  assignedDay: number; // 1 to 30
  lastReviewedAt?: string;
  nextReviewAt?: string;
}

export interface ChallengeDay {
  dayNumber: number; // 1 to 30
  status: "locked" | "available" | "completed" | "missed";
  scheduledDate?: string;
  completedAt?: string;
  grammarTopicId?: string;
  newVocabIds: string[];
  newPhraseIds: string[];
  reviewIds: string[];
  accuracy?: number;
  xpEarned?: number;
  grammarCompleted?: boolean;
}

export interface ChallengeProgress {
  id: string;
  userId?: string;
  language: string; // "German"
  level: ChallengeLevel;
  durationDays: number; // 30
  contentType: ChallengeContentType;
  direction?: ChallengeDirection; // "de-to-en" | "en-to-de" | "mixed"
  startDate: string;
  lastActiveDate: string;
  status: ChallengeStatus;
  currentDay: number; // Current day the user is on (1..30)
  
  // Total item counts
  totalVocabCount: number;
  totalPhraseCount: number;
  totalGrammarTopicsCount: number;
  
  // Stored items and daily schedule
  items: Record<string, ChallengeItem>;
  days: Record<number, ChallengeDay>;
  grammarCompletedDays: number[]; // Day numbers where grammar was completed
  
  // Aggregated Stats
  completedDaysCount: number;
  totalXPEarned: number;
  currentStreak: number;
  longestStreak: number;
  averageAccuracy: number;
  totalQuestionsAnswered: number;
  totalQuestionsCorrect: number;
  
  // Badge unlock records
  badgesEarned: string[];
  
  createdAt: string;
  updatedAt: string;
}

export interface ChallengePreviewSummary {
  level: ChallengeLevel;
  contentType: ChallengeContentType;
  totalVocab: number;
  totalPhrases: number;
  totalGrammar: number;
  vocabPerDayAvg: number;
  phrasesPerDayAvg: number;
  grammarPerDayAvg: number;
  estimatedDailyMinutes: string;
  durationDays: number;
}

export type PracticeExerciseType = 
  | "flashcard"
  | "multiple_choice"
  | "cloze"
  | "translation"
  | "speaking"
  | "grammar_drill"
  | "grammar";

export interface PracticeQuestion {
  id: string;
  itemId: string;
  item?: ChallengeItem;
  grammarTopicId?: string;
  type: PracticeExerciseType;
  direction?: "de-to-en" | "en-to-de";
  prompt: string;
  germanText: string;
  englishTranslation: string;
  exampleDe?: string;
  exampleEn?: string;
  clozeSentence?: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface DailySessionResult {
  dayNumber: number;
  newLearnedCount: number;
  reviewsCount: number;
  grammarTopicCompleted?: boolean;
  accuracy: number;
  xpEarned: number;
  correctCount: number;
  totalQuestions: number;
  itemsUpdated: ChallengeItem[];
  newBadges: string[];
}
