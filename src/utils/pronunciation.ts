/**
 * German to English Phonetic Pronunciation Guide Utilities
 */

// Helper to clean parenthetical expressions and comma-separated parts of dictionary entries
export function getCleanGermanWord(rawWord: string): string {
  if (!rawWord) return "";
  
  // 1. Remove everything after a comma (for verbs listed with forms: "abbiegen, biegt ab...")
  let clean = rawWord.split(",")[0].trim();
  
  // 2. Remove parenthesis prefix content like (das), (ein), (sich)
  clean = clean.replace(/\(([^)]+)\)/g, (match, group) => {
    const trimmedGroup = group.trim().toLowerCase();
    // If it's a grammar article or pronoun, strip it. If it's part of the word like (he)rausfinden, keep the letters
    if (
      ["der", "die", "das", "ein", "eine", "sich", "sich etwas", "etwas", "jdn", "jdm", "jemand", "j-m", "j-n"].includes(trimmedGroup)
    ) {
      return "";
    }
    return group; // Keep prefix parts like 'he' in (he)rausfinden -> herausfinden
  }).trim();

  // Remove leading/trailing non-word chars but keep spaces/umlauts
  clean = clean.replace(/^[^a-zA-ZäöüÄÖÜß]+|[^a-zA-ZäöüÄÖÜß]+$/g, "").trim();

  return clean;
}

// Curated high-accuracy manual overrides for core German vocabulary
const PRONUNCIATION_OVERRIDES: Record<string, string> = {
  // Articles & core helpers
  "der": "dare",
  "die": "dee",
  "das": "dahss",
  "ein": "ine",
  "eine": "ine-uh",
  "einen": "ine-en",
  "einem": "ine-em",
  "einer": "ine-er",
  "eines": "ine-es",
  "sich": "zikh",
  "ich": "ikh",
  "du": "doo",
  "er": "air",
  "sie": "zee",
  "es": "ess",
  "wir": "veer",
  "ihr": "eer",
  "und": "oont",
  "oder": "oh-der",
  "aber": "ah-ber",
  "nicht": "nikht",
  "ja": "yah",
  "nein": "nine",
  "von": "fon",
  "vor": "for",
  "was": "vahss",
  "wer": "vair",
  "wie": "vee",
  "wo": "voh",
  "gut": "goot",
  "zu": "tsoo",
  "deutsch": "doytch",

  // Food & Dining
  "apfel": "AHP-fel",
  "bier": "beer",
  "brot": "broht",
  "butter": "BOOT-ter",
  "gemüse": "geh-MEW-zuh",
  "kaffee": "KAF-ay",
  "käse": "KAY-zuh",
  "kochen": "KOKH-en",
  "milch": "milkh",
  "obst": "ohpst",
  "salat": "zah-LAHT",
  "suppe": "ZOOP-uh",
  "tee": "tay",
  "trinken": "TRINK-en",
  "wasser": "VAH-ser",
  "wein": "vine",
  "zitrone": "tsee-TROH-nuh",
  "zucker": "TSOOK-er",

  // Travel & Transport
  "auto": "OW-toh",
  "bahn": "bahn",
  "bahnhof": "BAHN-hohf",
  "bus": "booss",
  "fahrrad": "FAHR-raht",
  "fahren": "FAH-ren",
  "flug": "flook",
  "flughafen": "FLOOK-hah-fen",
  "hotel": "hoh-TEL",
  "koffer": "KOF-er",
  "reise": "RYE-zuh",
  "reisen": "RYE-zen",
  "taxi": "TAK-see",
  "ticket": "TIK-et",
  "u-bahn": "OO-bahn",
  "zug": "tsook",

  // Work & Education
  "arbeit": "AR-bite",
  "arbeiten": "AR-by-ten",
  "beruf": "beh-ROOF",
  "büro": "bew-ROH",
  "chef": "shef",
  "gehalt": "geh-HAHLT",
  "klasse": "KLAH-suh",
  "lernen": "LAIR-nen",
  "prüfung": "PREW-foong",
  "schule": "SHOOL-uh",
  "studium": "SHTOO-dee-oom",
  "vertrag": "fer-TRAHK",
  "zeugnis": "TSOYKH-niss",

  // Health & Medical
  "arzt": "artst",
  "apotheke": "ah-poh-TAY-kuh",
  "fieber": "FEE-ber",
  "gesund": "geh-ZOONT",
  "krank": "krahnk",
  "krankenhaus": "KRAHNK-en-howss",
  "medikament": "meh-dee-kah-MENT",
  "rezept": "reh-TSEPT",
  "schmerz": "shmairtst",
  "tablette": "tah-BLET-uh",

  // Home & Living
  "bad": "baht",
  "bett": "bet",
  "garten": "GAR-ten",
  "haus": "howss",
  "küche": "KEW-khuh",
  "miete": "MEE-tuh",
  "möbel": "MEW-bel",
  "schlüssel": "SHLEW-sel",
  "tisch": "tish",
  "wohnung": "VOH-noong",

  // Numbers & Basics
  "null": "nool",
  "eins": "ynts",
  "zwei": "tsvye",
  "drei": "drye",
  "vier": "feer",
  "fünf": "fewnf",
  "sechs": "zekhs",
  "sieben": "ZEE-ben",
  "acht": "akht",
  "neun": "noyn",
  "zehn": "tsayn"
};

/**
 * Generates an English phonetic approximation of a German word or phrase.
 * Helps English speakers learn how to pronounce words accurately.
 */
export function getGermanToEnglishPhonetic(rawWord: string): string {
  if (!rawWord) return "";
  
  // Clean first
  const cleanWord = getCleanGermanWord(rawWord);
  
  // Split into components to preserve spaces
  const words = cleanWord.split(/\s+/);
  
  const phoneticWords = words.map(w => {
    const lower = w.toLowerCase().replace(/[^a-zäöüß-]/g, "");
    if (!lower) return "";
    
    // Check direct override first
    if (PRONUNCIATION_OVERRIDES[lower]) {
      return PRONUNCIATION_OVERRIDES[lower];
    }
    
    // Rule-based phonetics conversion
    let p = lower;
    
    // 1. Initial/Boundary letter combinations
    p = p.replace(/^st/g, "sht").replace(/\bst/g, "sht");
    p = p.replace(/^sp/g, "shp").replace(/\bsp/g, "shp");
    p = p.replace(/^s([aeiouäöü])/g, "z$1").replace(/\bs([aeiouäöü])/g, "z$1");
    
    // 2. S between vowels -> z
    p = p.replace(/([aeiouäöü])s([aeiouäöü])/g, "$1z$2");
    
    // 3. Multi-character clusters
    p = p.replace(/sch/g, "sh");
    p = p.replace(/tsch/g, "ch");
    
    // 4. Diphthongs (Vowel teams)
    p = p.replace(/eu/g, "oy");
    p = p.replace(/äu/g, "oy");
    p = p.replace(/ei/g, "eye");
    p = p.replace(/ie/g, "ee");
    
    // 5. CH rules (soft vs hard back vowel sounds)
    p = p.replace(/([aou])ch/g, "$1kh");
    p = p.replace(/ch/g, "kh"); // Soft ch, approximate with "kh" for simplicity
    
    // 6. Special consonants
    p = p.replace(/qu/g, "kv");
    p = p.replace(/ph/g, "f");
    p = p.replace(/v/g, "f");
    p = p.replace(/w/g, "v");
    p = p.replace(/j/g, "y");
    p = p.replace(/z/g, "ts");
    p = p.replace(/tz/g, "ts");
    
    // 7. Suffix -ig at the end of words -> ikh
    p = p.replace(/ig$/g, "ikh");
    
    // 8. Word-final devoicing (g -> k, d -> t, b -> p)
    p = p.replace(/g$/g, "k");
    p = p.replace(/d$/g, "t");
    p = p.replace(/b$/g, "p");
    
    // 9. Umlauts & Double Vowels
    p = p.replace(/aa/g, "ah");
    p = p.replace(/ee/g, "ay");
    p = p.replace(/oo/g, "oh");
    p = p.replace(/ä/g, "eh");
    p = p.replace(/ö/g, "ew"); // Rounded o -> ew
    p = p.replace(/ü/g, "ew"); // Rounded u -> ew
    p = p.replace(/ß/g, "ss");
    
    // 10. Vocalic 'er' suffix -> ah
    p = p.replace(/er$/g, "ah");
    
    // 11. Word-final 'e' -> vocalized schwa "uh"
    p = p.replace(/e$/g, "uh");
    
    // 12. Single vowels mapping
    p = p.replace(/a/g, "ah");
    p = p.replace(/u/g, "oo");
    p = p.replace(/o/g, "oh");
    p = p.replace(/e/g, "eh");
    p = p.replace(/i/g, "ee");
    
    // 13. Silent 'h' after vowels (remove to keep spelling phonetic)
    p = p.replace(/([aeiouy])h/g, "$1");
    
    // 14. Consonant doubling cleanups
    p = p.replace(/ck/g, "k");
    p = p.replace(/pp/g, "p");
    p = p.replace(/tt/g, "t");
    p = p.replace(/ll/g, "l");
    p = p.replace(/mm/g, "m");
    p = p.replace(/nn/g, "n");
    p = p.replace(/rr/g, "r");
    p = p.replace(/ff/g, "f");
    
    // 15. Standard syllable separation hyphen placement (v-c-v pattern)
    let phon = p;
    phon = phon.replace(/([aeiouy|ah|ay|ee|oh|oo|oy|ey|ur|ew])([bcdfghjklmnpqrstvwxz]{1,2})([aeiouy|ah|ay|ee|oh|oo|oy|ey|ur|ew])/g, (match, v1, c, v2) => {
      if (c.length === 1) {
        return `${v1}-${c}${v2}`;
      } else {
        return `${v1}${c[0]}-${c.slice(1)}${v2}`;
      }
    });
    
    // Final polish on spacing and dashes
    phon = phon.replace(/-+/g, "-").replace(/^-/g, "").replace(/-$/g, "");
    
    // Adjust double vocalic endings
    phon = phon.replace(/eh-ah$/g, "er").replace(/ee-ah$/g, "ee-ah").replace(/oo-ah$/g, "oo-ah");

    return phon;
  });
  
  // Format as space separated words, e.g. "dee tah-bell-uh"
  return phoneticWords.filter(Boolean).join(" ");
}
