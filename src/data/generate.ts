import { GoogleGenAI, Type } from "@google/genai";
import * as fs from "fs";
import { VocabularyEntry } from "./vocabulary";

// Check for API key
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY environment variable is missing!");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// We group the letters into 6 balanced batches to keep the total API request count very low (only 6 requests)
// while generating a comprehensive, high-quality A-Z vocabulary matching the German language standard.
const letterGroups = [
  { name: "Group 1 (A-D)", letters: ["A", "B", "C", "D"], count: 150 },
  { name: "Group 2 (E-H)", letters: ["E", "F", "G", "H"], count: 140 },
  { name: "Group 3 (I-M)", letters: ["I", "J", "K", "L", "M"], count: 130 },
  { name: "Group 4 (N-R)", letters: ["N", "O", "P", "Q", "R"], count: 120 },
  { name: "Group 5 (S-V)", letters: ["S", "T", "U", "V"], count: 150 },
  { name: "Group 6 (W-Z)", letters: ["W", "Y", "Z"], count: 90 }
];

async function generateGroup(groupName: string, letters: string[], count: number): Promise<VocabularyEntry[]> {
  console.log(`Generating up to ${count} words for ${groupName} [${letters.join(", ")}]...`);
  
  const prompt = `You are an expert German lexicographer specializing in standard German language curricula (levels A1 to B2).
Generate a professional, highly authentic and comprehensive selection of vocabulary entries starting with the letters: ${letters.join(", ")}.
Generate exactly ${count} highly standard, essential words in total, distributed across these letters (e.g. more for common letters like A, B, D, F, G, H, K, L, M, N, R, S, T, W, and fewer for rare letters like C, J, O, Q, Y, Z).

We want a highly rich, comprehensive vocabulary covering levels A1, A2, B1, and B2.
- A1-A2 (DTZ Basic): Everyday words, simple interactions.
- B1 (DTZ Independent): Standard topics, expressing opinions, work life.
- B2 (Professional): More advanced, abstract concepts, professional and formal contexts, compound nouns, and nuanced verbs.

Ensure a balanced distribution among word classes (nouns, verbs, adjectives, adverbs, prepositions).
- Nouns: must include their definite article ("der", "die", or "das") and have the plural suffix (or plural form) in the "forms" property (e.g. "-e", "-en", "-\\"e", "-s", "kein Plural" or null).
- Verbs: must be in the infinitive (e.g. "buchen", "sich bewerben") and have key conjugations in the "forms" property (e.g. third person present, simple past, past participle: "bucht, buchte, hat gebucht" / "bewirbt sich, bewarb sich, hat sich beworben").
- Adjectives, adverbs, prepositions, conjunctions: "forms" property should be null.
- Provide 1 to 2 clean, high-quality, natural German example sentences showing how the word is used, customized to the proficiency level of the word.

You must return a JSON array of objects conforming exactly to this schema:
[
  {
    "word": "string (the word, including article for nouns, or reflexive particle, e.g. 'der Bahnhof', 'das Baby', 'sich beschweren', 'bequem', 'allerdings')",
    "type": "string ('noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'pronoun')",
    "forms": "string or null (plural marker for nouns, conjugations for verbs, null for others)",
    "examples": ["array of 1 to 2 natural German example sentences"],
    "level": "string (strictly one of: 'A1', 'A2', 'B1', 'B2')"
  }
]`;

  let attempts = 3;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                word: { type: Type.STRING },
                type: { type: Type.STRING },
                forms: { type: Type.STRING, nullable: true },
                examples: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                level: { type: Type.STRING, enum: ["A1", "A2", "B1", "B2"] }
              },
              required: ["word", "type", "forms", "examples", "level"]
            }
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("Empty response from Gemini");
      const parsed: VocabularyEntry[] = JSON.parse(text.trim());
      console.log(`Successfully generated ${parsed.length} entries for ${groupName}!`);
      return parsed;
    } catch (error: any) {
      console.error(`Attempt ${attempt} failed for ${groupName}: ${error.message || error}`);
      if (attempt === attempts) {
        throw error;
      }
      let backoff = attempt * 15000;
      if (error.message && (error.message.includes("429") || error.message.includes("quota") || error.message.includes("RESOURCE_EXHAUSTED"))) {
        console.log("Rate limit or quota warning detected. Waiting 65 seconds to let the rate limit window fully reset...");
        backoff = 65000;
      } else {
        console.log(`Waiting ${backoff}ms before retrying...`);
      }
      await new Promise(resolve => setTimeout(resolve, backoff));
    }
  }
  return [];
}

async function run() {
  console.log("=== German Vocabulary Database Builder (A1 - B2 Comprehensive Edition) ===");

  const allWords: VocabularyEntry[] = [];

  for (let i = 0; i < letterGroups.length; i++) {
    const group = letterGroups[i];
    try {
      const groupWords = await generateGroup(group.name, group.letters, group.count);
      allWords.push(...groupWords);
    } catch (err) {
      console.error(`Fatal error generating ${group.name}. Aborting script to avoid corrupted output.`);
      process.exit(1);
    }

    // Sleep generously between requests to stay safely within free tier rate limits (max 15 RPM, but we want to be safe)
    if (i < letterGroups.length - 1) {
      console.log("Waiting 15 seconds before next group to maintain safe request spacing...");
      await new Promise(resolve => setTimeout(resolve, 15000));
    }
  }

  // Deduplicate case-insensitively on the word field
  const uniqueWordsMap = new Map<string, VocabularyEntry>();
  allWords.forEach(entry => {
    const key = entry.word.toLowerCase().trim();
    if (!uniqueWordsMap.has(key)) {
      uniqueWordsMap.set(key, entry);
    }
  });
  const finalVocabulary = Array.from(uniqueWordsMap.values());

  // Sort alphabetically (ignoring articles like der/die/das/sich for sorting)
  const cleanSortKey = (word: string) => {
    return word.replace(/^(der|die|das|sich)\s+/i, "").toLowerCase();
  };
  finalVocabulary.sort((a, b) => cleanSortKey(a.word).localeCompare(cleanSortKey(b.word)));

  // Save the complete data as structured JSON
  const outputData = {
    title: "German Core Vocabulary Database",
    description: "Comprehensive alphabetical vocabulary database for A1-B2 levels, complete with grammatical categories, inflected forms, and real-world everyday/professional example sentences.",
    count: finalVocabulary.length,
    extracted_at: new Date().toISOString().split("T")[0],
    vocabulary: finalVocabulary
  };

  const outputFilePath = "./src/data/vocabulary.json";
  fs.writeFileSync(outputFilePath, JSON.stringify(outputData, null, 2), "utf-8");
  console.log(`\n🎉 Success! Wrote ${finalVocabulary.length} highly professional and comprehensive vocabulary entries (A1-B2) to: ${outputFilePath}`);
}

run();
