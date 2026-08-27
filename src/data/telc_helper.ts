import { cleanGermanWord, generateVerbForms, NON_VERB_WORDS } from "../utils/verbConjugator";

export interface VocabularyExample {
  de: string;
  en: string;
}

export interface VocabularyEntry {
  id?: string;
  german_word: string;
  forms: string | null;
  english_translation: string;
  examples: VocabularyExample[];
  
  // Backward compatibility fields
  word: string;
  type: string;
  level: "A1" | "A2" | "B1" | "B2";
  theme: string;
}

export function getWordType(germanWord: string): string {
  const cleanWord = germanWord.trim().toLowerCase();
  if (NON_VERB_WORDS.has(cleanWord)) {
    return "Other / Adjective";
  }
  if (
    cleanWord.startsWith("der ") || 
    cleanWord.startsWith("die ") || 
    cleanWord.startsWith("das ")
  ) {
    return "Noun (Substantiv)";
  }
  if (
    cleanWord.startsWith("sich ") || 
    cleanWord.endsWith("en") || 
    cleanWord.endsWith("eln") || 
    cleanWord.endsWith("ern")
  ) {
    return "Verb";
  }
  return "Other / Adjective";
}

export function convertRawVocabulary(
  rawList: [string, string, string, string, string][]
): VocabularyEntry[] {
  return rawList.map(item => {
    const [raw_german_word, english_translation, exDe, exEn, suffix] = item;
    const type = getWordType(raw_german_word);
    let final_word = raw_german_word;
    let forms: string | null = null;

    if (type === "Verb") {
      const { cleanWord, forms: embeddedForms } = cleanGermanWord(raw_german_word);
      final_word = cleanWord;
      forms = embeddedForms || generateVerbForms(cleanWord);
    }

    return {
      german_word: final_word,
      forms,
      english_translation,
      examples: [
        {
          de: exDe,
          en: exEn
        }
      ],
      word: final_word,
      type,
      level: "B1" as const,
      theme: suffix
    };
  });
}

export function convertRawB2Vocabulary(
  rawList: [string, string, string, string, string][]
): VocabularyEntry[] {
  return rawList.map(item => {
    const [raw_german_word, english_translation, exDe, exEn, suffix] = item;
    const type = getWordType(raw_german_word);
    let final_word = raw_german_word;
    let forms: string | null = null;

    if (type === "Verb") {
      const { cleanWord, forms: embeddedForms } = cleanGermanWord(raw_german_word);
      final_word = cleanWord;
      forms = embeddedForms || generateVerbForms(cleanWord);
    }

    return {
      german_word: final_word,
      forms,
      english_translation,
      examples: [
        {
          de: exDe,
          en: exEn
        }
      ],
      word: final_word,
      type,
      level: "B2" as const,
      theme: suffix
    };
  });
}

