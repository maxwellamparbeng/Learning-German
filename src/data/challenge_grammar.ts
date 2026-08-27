import { CEFRLevel, GrammarTopic } from "../types/challenge";
import { A1_GRAMMAR_TOPICS } from "./challenge_grammar_a1";
import { A2_GRAMMAR_TOPICS } from "./challenge_grammar_a2";
import { B1_GRAMMAR_TOPICS } from "./challenge_grammar_b1";
import { B2_GRAMMAR_TOPICS } from "./challenge_grammar_b2";

export function getGrammarTopicsForLevel(level: CEFRLevel): GrammarTopic[] {
  switch (level) {
    case "A1":
      return A1_GRAMMAR_TOPICS;
    case "A2":
      return A2_GRAMMAR_TOPICS;
    case "B1":
      return B1_GRAMMAR_TOPICS;
    case "B2":
      return B2_GRAMMAR_TOPICS;
    default:
      return A1_GRAMMAR_TOPICS;
  }
}

export function getGrammarTopicForDay(level: CEFRLevel, dayNumber: number): GrammarTopic | undefined {
  const topics = getGrammarTopicsForLevel(level);
  if (topics.length === 0) return undefined;

  // Direct match by dayNumber
  const directMatch = topics.find((t) => t.dayNumber === dayNumber);
  if (directMatch) return directMatch;

  // Fallback: index mapping (0-indexed) or cycling if fewer than 30
  const index = (dayNumber - 1) % topics.length;
  const baseTopic = topics[index];
  if (!baseTopic) return undefined;

  // Return with adjusted dayNumber if falling back
  return {
    ...baseTopic,
    id: `${level.toLowerCase()}-day-${dayNumber}`,
    dayNumber: dayNumber
  };
}

export function getAllGrammarTopics(): GrammarTopic[] {
  return [
    ...A1_GRAMMAR_TOPICS,
    ...A2_GRAMMAR_TOPICS,
    ...B1_GRAMMAR_TOPICS,
    ...B2_GRAMMAR_TOPICS
  ];
}
