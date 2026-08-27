import { 
  ChallengeLevel, 
  ChallengeContentType, 
  ChallengeDirection,
  ChallengeProgress, 
  ChallengeItem, 
  ChallengeDay, 
  PracticeQuestion, 
  LearningState,
  PracticeExerciseType,
  DailySessionResult,
  GrammarTopic
} from "../types/challenge";
import { VOCABULARY_DATA, VocabularyEntry } from "../data/vocabulary";
import { loadPhrasesForLevel, PhraseEntry } from "../data/phrases";
import { getGrammarTopicsForLevel, getGrammarTopicForDay } from "../data/challenge_grammar";
import { getGermanToEnglishPhonetic } from "./pronunciation";
import { db, handleFirestoreError, OperationType, auth } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const LOCAL_STORAGE_KEY_PREFIX = "german_30day_challenge_";

/**
 * Escapes regex special characters safely
 */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Creates a cloze sentence for a vocabulary item
 */
function createClozeText(sentence: string, word: string): string {
  if (!sentence) return "______";
  const cleanWord = word
    .replace(/\([^)]*\)/g, "")
    .replace(/\[[^\]]*\]/g, "")
    .replace(/^(der|die|das|ein|eine|sich)\s+/i, "")
    .replace(/\b(sich|jdm|jdn|etw)\b/gi, "")
    .replace(/,.*$/, "")
    .trim();

  const tokens = cleanWord.split(/[\s,+/]+/).filter(t => t.length >= 2);
  let cloze = sentence;
  let replaced = false;

  for (const token of tokens) {
    const escaped = escapeRegExp(token);
    try {
      const reg = new RegExp(`\\b${escaped}\\w*\\b`, "gi");
      if (reg.test(cloze)) {
        cloze = cloze.replace(reg, "______");
        replaced = true;
        break;
      }
    } catch {
      // safe fallback
    }
  }

  if (!replaced) {
    // try direct replacement of first word token
    const firstWord = cleanWord.split(" ")[0];
    if (firstWord && firstWord.length >= 3) {
      try {
        cloze = sentence.replace(new RegExp(escapeRegExp(firstWord), "i"), "______");
      } catch {
        cloze = sentence.replace(firstWord, "______");
      }
    }
  }

  return cloze;
}

/**
 * Calculates a preview summary for challenge setup screen
 */
export function getChallengePreview(level: ChallengeLevel, contentType: ChallengeContentType) {
  const levelVocab = VOCABULARY_DATA.filter(w => w.level === level);
  const levelPhrases = loadPhrasesForLevel(level);
  const levelGrammar = getGrammarTopicsForLevel(level);

  const totalVocab = (contentType === "phrases" || contentType === "grammar") ? 0 : levelVocab.length;
  const totalPhrases = (contentType === "vocab" || contentType === "grammar") ? 0 : levelPhrases.length;
  const totalGrammarTopics = (contentType === "vocab" || contentType === "phrases") ? 0 : 30;

  const durationDays = 30;
  const vocabPerDayAvg = totalVocab > 0 ? Math.round((totalVocab / durationDays) * 10) / 10 : 0;
  const phrasesPerDayAvg = totalPhrases > 0 ? Math.round((totalPhrases / durationDays) * 10) / 10 : 0;
  const grammarPerDayAvg = totalGrammarTopics > 0 ? 1 : 0;

  // Approximate time estimate: ~1.5 mins per new item + 5 mins review + 4 mins grammar if included
  const totalDailyItems = Math.ceil(vocabPerDayAvg + phrasesPerDayAvg);
  const grammarMinutes = grammarPerDayAvg > 0 ? 5 : 0;
  const minTime = Math.max(10, Math.round(totalDailyItems * 1.5) + grammarMinutes);
  const maxTime = minTime + 8;

  return {
    level,
    contentType,
    totalVocab,
    totalPhrases,
    totalGrammarTopics,
    vocabPerDayAvg,
    phrasesPerDayAvg,
    grammarPerDayAvg,
    estimatedDailyMinutes: `${minTime}–${maxTime} mins`,
    durationDays
  };
}

/**
 * Initializes and creates a fresh 30-day challenge
 */
export function create30DayChallenge(
  level: ChallengeLevel,
  contentType: ChallengeContentType = "both",
  userId?: string,
  excludeMasteredIds: string[] = [],
  direction: ChallengeDirection = "de-to-en"
): ChallengeProgress {
  const durationDays = 30;
  const challengeId = `chal_${level.toLowerCase()}_${Date.now()}`;
  const now = new Date().toISOString();
  const todayStr = new Date().toISOString().split("T")[0];

  // 1. Gather vocabulary
  let availableVocab: VocabularyEntry[] = [];
  if (contentType === "vocab" || contentType === "both" || contentType === "complete") {
    availableVocab = VOCABULARY_DATA.filter(w => w.level === level);
    if (excludeMasteredIds.length > 0) {
      const unmastered = availableVocab.filter(w => !excludeMasteredIds.includes(w.id) && !excludeMasteredIds.includes(w.word));
      if (unmastered.length >= 30) {
        availableVocab = unmastered;
      }
    }
  }

  // 2. Gather phrases
  let availablePhrases: PhraseEntry[] = [];
  if (contentType === "phrases" || contentType === "both" || contentType === "complete") {
    availablePhrases = loadPhrasesForLevel(level);
  }

  const items: Record<string, ChallengeItem> = {};
  const days: Record<number, ChallengeDay> = {};

  // Initialize all 30 days
  for (let d = 1; d <= durationDays; d++) {
    const grammarTopic = (contentType === "grammar" || contentType === "complete" || contentType === "both") 
      ? getGrammarTopicForDay(level, d) 
      : undefined;

    days[d] = {
      dayNumber: d,
      status: d === 1 ? "available" : "locked",
      newVocabIds: [],
      newPhraseIds: [],
      reviewIds: [],
      grammarTopicId: grammarTopic ? grammarTopic.id : undefined,
      grammarCompleted: false
    };
  }

  // 3. Deterministically distribute Vocabulary across 30 days
  const vocabCount = availableVocab.length;
  if (vocabCount > 0) {
    const basePerDay = Math.floor(vocabCount / durationDays);
    const remainder = vocabCount % durationDays;

    let vocabIdx = 0;
    for (let d = 1; d <= durationDays; d++) {
      // Days 1..remainder get 1 extra word to cleanly distribute remainder
      const countForDay = basePerDay + (d <= remainder ? 1 : 0);
      for (let i = 0; i < countForDay && vocabIdx < vocabCount; i++) {
        const v = availableVocab[vocabIdx];
        const itemId = `vocab_${v.id || vocabIdx}`;
        items[itemId] = {
          id: itemId,
          contentId: v.id || `v-${vocabIdx}`,
          contentType: "vocab",
          german: v.word || v.german_word,
          english: v.english_translation,
          level: v.level,
          type: v.type,
          forms: v.forms,
          examples: v.examples,
          phonetic: getGermanToEnglishPhonetic(v.word || v.german_word),
          learningState: "NEW",
          timesSeen: 0,
          timesCorrect: 0,
          timesIncorrect: 0,
          consecutiveCorrect: 0,
          assignedDay: d
        };
        days[d].newVocabIds.push(itemId);
        vocabIdx++;
      }
    }
  }

  // 4. Deterministically distribute Phrases across 30 days
  const phraseCount = availablePhrases.length;
  if (phraseCount > 0) {
    const basePerDay = Math.floor(phraseCount / durationDays);
    const remainder = phraseCount % durationDays;

    let phraseIdx = 0;
    for (let d = 1; d <= durationDays; d++) {
      const countForDay = basePerDay + (d <= remainder ? 1 : 0);
      for (let i = 0; i < countForDay && phraseIdx < phraseCount; i++) {
        const p = availablePhrases[phraseIdx];
        const itemId = `phrase_${level}_${phraseIdx}`;
        items[itemId] = {
          id: itemId,
          contentId: `p-${level}-${phraseIdx}`,
          contentType: "phrase",
          german: p.german,
          english: p.english,
          level: level,
          type: "Key Phrase",
          phonetic: p.pronunciation_hint || getGermanToEnglishPhonetic(p.german),
          learningState: "NEW",
          timesSeen: 0,
          timesCorrect: 0,
          timesIncorrect: 0,
          consecutiveCorrect: 0,
          assignedDay: d
        };
        days[d].newPhraseIds.push(itemId);
        phraseIdx++;
      }
    }
  }

  const challenge: ChallengeProgress = {
    id: challengeId,
    userId,
    language: "German",
    level,
    durationDays,
    contentType,
    direction: direction || "de-to-en",
    startDate: now,
    lastActiveDate: todayStr,
    status: "active",
    currentDay: 1,
    totalVocabCount: vocabCount,
    totalPhraseCount: phraseCount,
    totalGrammarTopicsCount: (contentType === "grammar" || contentType === "complete" || contentType === "both") ? 30 : 0,
    items,
    days,
    grammarCompletedDays: [],
    completedDaysCount: 0,
    totalXPEarned: 0,
    currentStreak: 0,
    longestStreak: 0,
    averageAccuracy: 0,
    totalQuestionsAnswered: 0,
    totalQuestionsCorrect: 0,
    badgesEarned: [],
    createdAt: now,
    updatedAt: now
  };

  saveChallengeToLocal(challenge);
  return challenge;
}

/**
 * Updates the study direction of an active challenge and persists the change
 */
export function updateChallengeDirection(
  challenge: ChallengeProgress,
  direction: ChallengeDirection
): ChallengeProgress {
  const updated: ChallengeProgress = {
    ...challenge,
    direction,
    updatedAt: new Date().toISOString()
  };
  saveChallengeToLocal(updated);
  saveChallengeToCloud(updated);
  return updated;
}

/**
 * Selects adaptive review items for a given day
 */
export function getAdaptiveReviewItems(challenge: ChallengeProgress, dayNumber: number): ChallengeItem[] {
  const allItems = Object.values(challenge.items);
  // Items eligible for review must have been introduced in previous days or previously seen
  const eligibleItems = allItems.filter(item => item.assignedDay < dayNumber || item.timesSeen > 0);

  if (eligibleItems.length === 0) return [];

  // Group by priority:
  // Priority 1: Difficult items (answered incorrectly recently)
  const difficultItems = eligibleItems.filter(i => i.learningState === "DIFFICULT");
  
  // Priority 2: Recently learned or learning items
  const learningItems = eligibleItems.filter(i => i.learningState === "LEARNING");

  // Priority 3: Review items due
  const reviewItems = eligibleItems.filter(i => i.learningState === "REVIEW");

  // Priority 4: Mastered items (occasional maintenance review)
  const masteredItems = eligibleItems.filter(i => i.learningState === "MASTERED");

  // Sort within groups by least recently seen / most errors
  const sortFn = (a: ChallengeItem, b: ChallengeItem) => {
    if (a.timesIncorrect !== b.timesIncorrect) {
      return b.timesIncorrect - a.timesIncorrect;
    }
    return a.timesSeen - b.timesSeen;
  };

  difficultItems.sort(sortFn);
  learningItems.sort(sortFn);
  reviewItems.sort(sortFn);
  masteredItems.sort(sortFn);

  // Take up to 5 difficult, 4 learning, 3 review, 2 mastered
  const selected: ChallengeItem[] = [];
  const addedIds = new Set<string>();

  const addItems = (list: ChallengeItem[], limit: number) => {
    for (const it of list) {
      if (selected.length >= 12) break;
      if (!addedIds.has(it.id)) {
        selected.push(it);
        addedIds.add(it.id);
        if (selected.length >= limit) break;
      }
    }
  };

  addItems(difficultItems, 5);
  addItems(learningItems, 9);
  addItems(reviewItems, 12);
  if (selected.length < 5) {
    addItems(masteredItems, 10);
  }

  return selected;
}

/**
 * Builds interactive practice questions from items (vocab, phrases, and grammar drills)
 */
export function buildPracticeQuestions(
  newItems: ChallengeItem[],
  reviewItems: ChallengeItem[],
  allChallengeItems: ChallengeItem[],
  grammarTopic?: GrammarTopic,
  direction: ChallengeDirection = "mixed"
): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  const combined = [...newItems, ...reviewItems];
  const pool = allChallengeItems.length > 0 ? allChallengeItems : combined;

  // 1. Add grammar drills first if a grammar topic is present
  if (grammarTopic && grammarTopic.drills && grammarTopic.drills.length > 0) {
    grammarTopic.drills.forEach((drill, dIdx) => {
      questions.push({
        id: `grammar_${grammarTopic.id}_drill_${dIdx}`,
        itemId: `grammar_${grammarTopic.id}`,
        type: drill.type === "cloze" ? "cloze" : "grammar",
        direction: "en-to-de",
        prompt: drill.prompt,
        germanText: drill.questionSentence,
        englishTranslation: drill.englishTranslation,
        options: drill.options,
        correctAnswer: drill.correctAnswer,
        explanation: drill.explanation,
        clozeSentence: drill.questionSentence,
        grammarTopicId: grammarTopic.id
      });
    });
  }

  // 2. Add vocabulary and phrase questions based on direction
  combined.forEach((item, index) => {
    // Determine direction for this specific item in current session
    // If direction is "de-to-en": all DE -> EN
    // If direction is "en-to-de": all EN -> DE
    // If direction is "mixed": alternate
    const itemDirection: "de-to-en" | "en-to-de" = 
      direction === "de-to-en" ? "de-to-en" :
      direction === "en-to-de" ? "en-to-de" :
      (index % 2 === 0 ? "de-to-en" : "en-to-de");

    if (itemDirection === "de-to-en") {
      // German -> English questions (DE-EN)
      const distractors = pool
        .filter(p => p.id !== item.id && p.english !== item.english)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(p => p.english);

      const mcOptions = [item.english, ...distractors].sort(() => 0.5 - Math.random());
      questions.push({
        id: `mc_de_en_${item.id}_${index}`,
        itemId: item.id,
        item,
        type: "multiple_choice",
        direction: "de-to-en",
        prompt: `What is the correct English translation for:`,
        germanText: item.german,
        englishTranslation: item.english,
        options: mcOptions,
        correctAnswer: item.english,
        explanation: item.forms ? `Forms: ${item.forms}` : item.type ? `Category: ${item.type}` : undefined
      });

      // Cloze or sentence meaning test
      if (item.examples && item.examples.length > 0) {
        const example = item.examples[0];
        const cloze = createClozeText(example.de, item.german);
        
        const clozeDistractors = pool
          .filter(p => p.id !== item.id && p.german !== item.german)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(p => p.german);

        const clozeOptions = [item.german, ...clozeDistractors].sort(() => 0.5 - Math.random());

        questions.push({
          id: `cloze_${item.id}_${index}`,
          itemId: item.id,
          item,
          type: "cloze",
          direction: "de-to-en",
          prompt: `Fill in the missing German word from context:`,
          germanText: item.german,
          englishTranslation: item.english,
          exampleDe: example.de,
          exampleEn: example.en,
          clozeSentence: cloze,
          options: clozeOptions,
          correctAnswer: item.german,
          explanation: `Full sentence: "${example.de}" (${example.en})`
        });
      }
    } else {
      // English -> German questions (EN-DE)
      const deDistractors = pool
        .filter(p => p.id !== item.id && p.german !== item.german)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(p => p.german);

      const deOptions = [item.german, ...deDistractors].sort(() => 0.5 - Math.random());

      questions.push({
        id: `trans_en_de_${item.id}_${index}`,
        itemId: item.id,
        item,
        type: "translation",
        direction: "en-to-de",
        prompt: `Select the German translation for:`,
        germanText: item.german,
        englishTranslation: item.english,
        options: deOptions,
        correctAnswer: item.german,
        explanation: item.forms ? `German forms: ${item.forms}` : undefined
      });

      if (item.examples && item.examples.length > 0) {
        const example = item.examples[0];
        const cloze = createClozeText(example.de, item.german);
        
        const clozeDistractors = pool
          .filter(p => p.id !== item.id && p.german !== item.german)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(p => p.german);

        const clozeOptions = [item.german, ...clozeDistractors].sort(() => 0.5 - Math.random());

        questions.push({
          id: `cloze_en_de_${item.id}_${index}`,
          itemId: item.id,
          item,
          type: "cloze",
          direction: "en-to-de",
          prompt: `Complete German sentence for "${example.en}":`,
          germanText: item.german,
          englishTranslation: item.english,
          exampleDe: example.de,
          exampleEn: example.en,
          clozeSentence: cloze,
          options: clozeOptions,
          correctAnswer: item.german,
          explanation: `Full sentence: "${example.de}"`
        });
      }
    }

    // Pronunciation / Speaking question (every other item)
    if (index % 2 === 0) {
      questions.push({
        id: `speak_${item.id}_${index}`,
        itemId: item.id,
        item,
        type: "speaking",
        direction: itemDirection,
        prompt: itemDirection === "en-to-de" 
          ? `Speak the German word for "${item.english}":` 
          : `Speak the German text clearly:`,
        germanText: item.german,
        englishTranslation: item.english,
        correctAnswer: item.german,
        explanation: `Phonetic sound: ${item.phonetic || item.german}`
      });
    }
  });

  // Shuffle questions for varied learning flow
  return questions.sort(() => 0.5 - Math.random());
}

/**
 * Updates item mastery and challenge progress after a daily session
 */
export function applyDailySessionResults(
  challenge: ChallengeProgress,
  dayNumber: number,
  answers: { itemId: string; correct: boolean }[],
  grammarCompleted: boolean = true
): { updatedChallenge: ChallengeProgress; result: DailySessionResult } {
  const updated = { ...challenge };
  const items = { ...updated.items };
  const days = { ...updated.days };
  const updatedItemsList: ChallengeItem[] = [];

  let correctCount = 0;
  const totalQuestions = answers.length;

  // Track per-item accuracy in this session
  const itemResultsMap = new Map<string, { correct: number; incorrect: number }>();
  for (const ans of answers) {
    if (ans.correct) correctCount++;
    const curr = itemResultsMap.get(ans.itemId) || { correct: 0, incorrect: 0 };
    if (ans.correct) {
      curr.correct += 1;
    } else {
      curr.incorrect += 1;
    }
    itemResultsMap.set(ans.itemId, curr);
  }

  const nowIso = new Date().toISOString();

  // Update item learning states
  itemResultsMap.forEach((res, itemId) => {
    const item = items[itemId];
    if (!item) return;

    const itemCopy = { ...item };
    itemCopy.timesSeen += res.correct + res.incorrect;
    itemCopy.timesCorrect += res.correct;
    itemCopy.timesIncorrect += res.incorrect;
    itemCopy.lastReviewedAt = nowIso;

    if (res.incorrect > 0) {
      itemCopy.consecutiveCorrect = 0;
      itemCopy.learningState = "DIFFICULT";
    } else {
      itemCopy.consecutiveCorrect += res.correct;
      if (itemCopy.consecutiveCorrect >= 3) {
        itemCopy.learningState = "MASTERED";
      } else if (itemCopy.consecutiveCorrect >= 2) {
        itemCopy.learningState = "REVIEW";
      } else {
        itemCopy.learningState = "LEARNING";
      }
    }

    items[itemId] = itemCopy;
    updatedItemsList.push(itemCopy);
  });

  const sessionAccuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 100;
  
  // Calculate XP earned:
  // 5 XP per correct question + 50 XP completion bonus + accuracy bonus
  const accuracyBonus = sessionAccuracy >= 90 ? 30 : sessionAccuracy >= 75 ? 15 : 0;
  const xpEarned = (correctCount * 5) + 50 + accuracyBonus;

  // Update Day record
  const day = days[dayNumber] || {
    dayNumber,
    status: "available",
    newVocabIds: [],
    newPhraseIds: [],
    reviewIds: []
  };

  day.status = "completed";
  day.completedAt = nowIso;
  day.accuracy = sessionAccuracy;
  day.xpEarned = xpEarned;
  if (grammarCompleted || day.grammarTopicId) {
    day.grammarCompleted = true;
  }
  days[dayNumber] = day;

  // Unlock next day
  if (dayNumber < challenge.durationDays) {
    if (days[dayNumber + 1]) {
      days[dayNumber + 1].status = "available";
    }
    updated.currentDay = dayNumber + 1;
  }

  // Update challenge totals
  updated.items = items;
  updated.days = days;
  updated.totalXPEarned = (updated.totalXPEarned || 0) + xpEarned;
  updated.completedDaysCount = Object.values(days).filter(d => d.status === "completed").length;
  updated.totalQuestionsAnswered = (updated.totalQuestionsAnswered || 0) + totalQuestions;
  updated.totalQuestionsCorrect = (updated.totalQuestionsCorrect || 0) + correctCount;
  updated.averageAccuracy = updated.totalQuestionsAnswered > 0
    ? Math.round((updated.totalQuestionsCorrect / updated.totalQuestionsAnswered) * 100)
    : sessionAccuracy;

  // Update streak
  const todayStr = new Date().toISOString().split("T")[0];
  const lastActive = updated.lastActiveDate;
  if (!lastActive) {
    updated.currentStreak = 1;
  } else {
    const lastDate = new Date(lastActive);
    const currDate = new Date(todayStr);
    const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
    if (diffDays === 1) {
      updated.currentStreak = (updated.currentStreak || 0) + 1;
    } else if (diffDays === 0) {
      if (updated.currentStreak === 0) updated.currentStreak = 1;
    } else {
      updated.currentStreak = 1;
    }
  }
  updated.lastActiveDate = todayStr;
  updated.longestStreak = Math.max(updated.longestStreak || 0, updated.currentStreak);

  // Check badges
  const newBadges: string[] = [];
  const checkBadge = (badgeId: string) => {
    if (!updated.badgesEarned.includes(badgeId)) {
      updated.badgesEarned.push(badgeId);
      newBadges.push(badgeId);
    }
  };

  if (updated.currentStreak >= 7) checkBadge("streak_7");
  if (updated.currentStreak >= 14) checkBadge("streak_14");
  if (updated.currentStreak >= 21) checkBadge("streak_21");
  if (updated.currentStreak >= 30) checkBadge("streak_30");

  const masteredCount = Object.values(items).filter(i => i.learningState === "MASTERED").length;
  if (masteredCount >= 25) checkBadge("mastered_25");
  if (masteredCount >= 50) checkBadge("mastered_50");
  if (masteredCount >= 100) checkBadge("mastered_100");
  if (sessionAccuracy === 100 && totalQuestions >= 5) checkBadge("perfect_day");

  // Check complete challenge
  if (updated.completedDaysCount >= challenge.durationDays) {
    updated.status = "completed";
    checkBadge("challenge_completed");
  }

  updated.updatedAt = nowIso;

  // Persist locally & to Firebase
  saveChallengeToLocal(updated);
  saveChallengeToCloud(updated);

  const result: DailySessionResult = {
    dayNumber,
    newLearnedCount: (day.newVocabIds.length || 0) + (day.newPhraseIds.length || 0),
    reviewsCount: day.reviewIds?.length || 0,
    accuracy: sessionAccuracy,
    xpEarned,
    correctCount,
    totalQuestions,
    itemsUpdated: updatedItemsList,
    newBadges
  };

  return { updatedChallenge: updated, result };
}

/**
 * Recalculates remaining workload if user missed multiple days
 */
export function recalculateMissedDaysWorkload(challenge: ChallengeProgress): ChallengeProgress {
  const updated = { ...challenge };
  const days = { ...updated.days };
  const items = { ...updated.items };

  const completedDayNumbers = Object.values(days)
    .filter(d => d.status === "completed")
    .map(d => d.dayNumber);

  const maxCompletedDay = completedDayNumbers.length > 0 ? Math.max(...completedDayNumbers) : 0;
  const remainingDays = 30 - maxCompletedDay;

  if (remainingDays <= 0) return updated;

  // Unlearned items
  const unlearnedItems = Object.values(items).filter(i => i.timesSeen === 0);
  if (unlearnedItems.length === 0) return updated;

  // Re-assign remaining unlearned items evenly across remaining days
  const itemsPerRemainingDay = Math.floor(unlearnedItems.length / remainingDays);
  const remainder = unlearnedItems.length % remainingDays;

  let itemIdx = 0;
  for (let d = maxCompletedDay + 1; d <= 30; d++) {
    const day = days[d];
    if (!day) continue;
    day.newVocabIds = [];
    day.newPhraseIds = [];

    const offset = d - maxCompletedDay;
    const countForThisDay = itemsPerRemainingDay + (offset <= remainder ? 1 : 0);

    for (let c = 0; c < countForThisDay && itemIdx < unlearnedItems.length; c++) {
      const it = unlearnedItems[itemIdx];
      it.assignedDay = d;
      items[it.id] = it;
      if (it.contentType === "vocab") {
        day.newVocabIds.push(it.id);
      } else {
        day.newPhraseIds.push(it.id);
      }
      itemIdx++;
    }
  }

  updated.days = days;
  updated.items = items;
  updated.updatedAt = new Date().toISOString();
  saveChallengeToLocal(updated);
  saveChallengeToCloud(updated);
  return updated;
}

/**
 * Storage helpers
 */
export function getChallengeStorageKey(level?: string): string {
  return `${LOCAL_STORAGE_KEY_PREFIX}${level || "current"}`;
}

export function saveChallengeToLocal(challenge: ChallengeProgress): void {
  try {
    localStorage.setItem(getChallengeStorageKey(challenge.level), JSON.stringify(challenge));
    localStorage.setItem(getChallengeStorageKey("current"), JSON.stringify(challenge));
  } catch (err) {
    console.error("Error saving challenge to localStorage:", err);
  }
}

export function loadChallengeFromLocal(level?: string): ChallengeProgress | null {
  try {
    const raw = localStorage.getItem(getChallengeStorageKey(level));
    if (!raw) return null;
    return JSON.parse(raw) as ChallengeProgress;
  } catch {
    return null;
  }
}

export function removeChallengeFromLocal(level?: string): void {
  try {
    localStorage.removeItem(getChallengeStorageKey(level));
    localStorage.removeItem(getChallengeStorageKey("current"));
  } catch {}
}

/**
 * Cloud Firestore Persistence
 */
export async function saveChallengeToCloud(challenge: ChallengeProgress): Promise<void> {
  const user = auth.currentUser;
  if (!user || !user.uid) return;
  const path = `challenges/${user.uid}`;
  try {
    const ref = doc(db, "challenges", user.uid);
    await setDoc(ref, {
      ...challenge,
      userId: user.uid,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function loadChallengeFromCloud(userId: string): Promise<ChallengeProgress | null> {
  if (!userId) return null;
  const path = `challenges/${userId}`;
  try {
    const ref = doc(db, "challenges", userId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as ChallengeProgress;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
  return null;
}
