import { GrammarTopic } from "../types/challenge";

export const A2_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: "a2-day-1",
    dayNumber: 1,
    level: "A2",
    title: "Irregular Perfect Tense (Partizip II Strong Verbs)",
    germanTitle: "Das Perfekt: Unregelmäßige Verben (ge-sproch-en, ge-fahr-en)",
    category: "Verbs & Tenses",
    summary: "Strong / irregular verbs in German form their Partizip II with 'ge- ... -en' and often change their stem vowel (e.g. sprechen -> gesprochen, trinken -> getrunken).",
    ruleExplanation: [
      "Regular verbs end in '-t' (gemacht), but strong/irregular verbs end in '-en' (gesprochen, gegessen, geschlafen).",
      "Vowel change patterns: e -> o (sprechen -> gesprochen), i -> u (trinken -> getrunken), ei -> ie (schreiben -> geschrieben).",
      "Always memorize the 3 principal forms of strong verbs: Infinitiv, Präteritum, Partizip II (z.B. sehen, sah, gesehen)."
    ],
    formula: "haben / sein + ... + [ge- + Vowel Change + -en]",
    table: {
      headers: ["Infinitive", "Partizip II", "Auxiliary (haben/sein)", "English"],
      rows: [
        ["sprechen", "gesprochen", "hat", "spoken"],
        ["schreiben", "geschrieben", "hat", "written"],
        ["trinken", "getrunken", "hat", "drunk"],
        ["fahren", "gefahren", "ist", "driven / traveled"],
        ["gehen", "gegangen", "ist", "gone / walked"]
      ]
    },
    examples: [
      { de: "Ich habe gestern mit meiner Chefin gesprochen.", en: "I spoke with my boss yesterday.", highlight: "habe ... gesprochen" },
      { de: "Er hat eine lange E-Mail geschrieben.", en: "He wrote a long email.", highlight: "hat ... geschrieben" }
    ],
    commonMistake: {
      mistake: "Ich habe ein Buch geschreibt.",
      correction: "Ich habe ein Buch geschrieben.",
      explanation: "'schreiben' is an irregular strong verb: Partizip II is 'geschrieben'."
    },
    drills: [
      {
        id: "a2-d1-q1",
        type: "cloze",
        prompt: "Choose the correct Partizip II of 'trinken':",
        questionSentence: "Hast du genug Wasser ___?",
        englishTranslation: "Did you drink enough water?",
        options: ["getrunken", "getrinkt", "getrank", "getrunkt"],
        correctAnswer: "getrunken",
        explanation: "trinken -> getrunken (strong verb)."
      }
    ]
  },
  {
    id: "a2-day-2",
    dayNumber: 2,
    level: "A2",
    title: "Simple Past (Präteritum) of sein, haben & Modals",
    germanTitle: "Das Präteritum: sein (war), haben (hatte) & Modalverben",
    category: "Verbs & Tenses",
    summary: "In spoken and written German, 'sein', 'haben', and modal verbs are almost always used in the Simple Past (Präteritum) instead of the Perfekt.",
    ruleExplanation: [
      "sein: ich war, du warst, er/sie/es war, wir waren, ihr wart, sie/Sie waren.",
      "haben: ich hatte, du hattest, er/sie/es hatte, wir hatten, ihr hattet, sie/Sie hatten.",
      "Modals drop the Umlaut in Präteritum: können -> konnte, müssen -> musste, dürfen -> durfte, wollen -> wollte, sollen -> sollte."
    ],
    formula: "war / hatte / konnte / musste / durfte / wollte / sollte",
    examples: [
      { de: "Gestern war ich krank und hatte hohes Fieber.", en: "Yesterday I was sick and had a high fever.", highlight: "war / hatte" },
      { de: "Ich konnte gestern nicht kommen, weil ich arbeiten musste.", en: "I could not come yesterday because I had to work.", highlight: "konnte / musste" }
    ],
    commonMistake: {
      mistake: "Ich bin krank gewesen gestern (in fluent German conversation).",
      correction: "Ich war gestern krank.",
      explanation: "While grammatically possible, native German speakers overwhelmingly prefer 'Ich war' and 'Ich hatte'."
    },
    drills: [
      {
        id: "a2-d2-q1",
        type: "conjugation",
        prompt: "Choose the Präteritum form of 'können' for 'wir':",
        questionSentence: "Wir ___ den Bus leider nicht mehr erreichen.",
        englishTranslation: "Unfortunately we could not catch the bus anymore.",
        options: ["konnten", "könnten", "konntet", "können"],
        correctAnswer: "konnten",
        explanation: "Präteritum of 'können' drops the umlaut: 'wir konnten'."
      }
    ]
  },
  {
    id: "a2-day-3",
    dayNumber: 3,
    level: "A2",
    title: "Dative Verbs (helfen, danken, gehören, gefallen)",
    germanTitle: "Verben mit Dativobjekt (helfen, danken, gefallen, schmecken)",
    category: "Cases & Prepositions",
    summary: "Certain common verbs in German govern the Dative case for their object rather than the standard Accusative.",
    ruleExplanation: [
      "Key Dative verbs: helfen (to help), danken (to thank), gefallen (to please/like), gehören (to belong to), schmecken (to taste), passen (to fit), gratulieren (to congratulate), fehlen (to miss/lack).",
      "Example: 'Ich helfe DIR' (NOT dich!), 'Das Buch gehört MIR' (NOT mich!).",
      "Things pleasing people: 'Die Jacke gefällt meiner Schwester (Dat).'"
    ],
    formula: "[helfen / gefallen / danken / gehören / schmecken] + DATIV",
    examples: [
      { de: "Kannst du mir bitte beim Umzug helfen?", en: "Can you please help me with moving?", highlight: "mir ... helfen" },
      { de: "Die Suppe schmeckt den Gästen ausgezeichnet.", en: "The soup tastes delicious to the guests.", highlight: "den Gästen" }
    ],
    commonMistake: {
      mistake: "Ich danke dich für deine Hilfe.",
      correction: "Ich danke dir für deine Hilfe.",
      explanation: "'danken' requires the dative case (dir, not dich)."
    },
    drills: [
      {
        id: "a2-d3-q1",
        type: "case_selection",
        prompt: "Choose the pronoun after 'gefallen':",
        questionSentence: "Gefällt ___ das neue Haus?",
        englishTranslation: "Do you like the new house?",
        options: ["dir", "dich", "du", "dein"],
        correctAnswer: "dir",
        explanation: "'gefallen' takes the dative: 'Gefällt dir...?'"
      }
    ]
  },
  {
    id: "a2-day-4",
    dayNumber: 4,
    level: "A2",
    title: "Two-Way Prepositions: Wo? (Dativ) vs. Wohin? (Akkusativ)",
    germanTitle: "Wechselpräpositionen: Wo? (Dativ) vs. Wohin? (Akkusativ)",
    category: "Cases & Prepositions",
    summary: "The 9 dual prepositions (an, auf, hinter, in, neben, über, unter, vor, zwischen) take Dative for stationary location (Wo?) and Accusative for movement/direction (Wohin?).",
    ruleExplanation: [
      "Wo? (Location / Static / At rest) -> DATIV (dem, der, dem, den). E.g., 'Das Buch liegt auf dem Tisch.'",
      "Wohin? (Destination / Direction / Movement) -> AKKUSATIV (den, die, das, die). E.g., 'Ich lege das Buch auf den Tisch.'",
      "Verb pairs: liegen/legen, stehen/stellen, sitzen/setzen, hängen/hängen."
    ],
    formula: "Wo? -> DATIV | Wohin? -> AKKUSATIV",
    table: {
      headers: ["Question", "Case", "Action Verbs", "Position Verbs"],
      rows: [
        ["Wohin? (Where to?)", "Akkusativ", "stellen, legen, setzen, hängen", "Movement into a place"],
        ["Wo? (Where?)", "Dativ", "stehen, liegen, sitzen, hängen", "Stationary state"]
      ]
    },
    examples: [
      { de: "Die Katze schläft unter dem Bett (Wo? - Dativ).", en: "The cat is sleeping under the bed.", highlight: "unter dem Bett" },
      { de: "Die Katze läuft unter das Bett (Wohin? - Akkusativ).", en: "The cat runs under the bed.", highlight: "unter das Bett" }
    ],
    commonMistake: {
      mistake: "Ich bin in die Stadt (when you are already there).",
      correction: "Ich bin in der Stadt.",
      explanation: "Being in a city answers 'Wo?' (location), which requires Dative: 'in der Stadt'."
    },
    drills: [
      {
        id: "a2-d4-q1",
        type: "case_selection",
        prompt: "Choose the correct article for location (Wo?):",
        questionSentence: "Wir sitzen in ___ gemütlichen Restaurant (das Restaurant).",
        englishTranslation: "We are sitting in a cozy restaurant.",
        options: ["einem", "einen", "eines", "einer"],
        correctAnswer: "einem",
        explanation: "Sitting in a restaurant is stationary (Wo?), taking Dative neuter: 'einem'."
      }
    ]
  },
  {
    id: "a2-day-5",
    dayNumber: 5,
    level: "A2",
    title: "Subordinate Clauses with 'weil' (Because)",
    germanTitle: "Nebensätze mit 'weil' (Kausalsätze & Verb am Ende)",
    category: "Sentence Structure & Word Order",
    summary: "'weil' introduces a subordinate clause explaining the reason. It kicks the conjugated verb all the way to the very END of the clause!",
    ruleExplanation: [
      "In a subordinate clause (Nebensatz), the conjugated verb is placed at the very end.",
      "Formula: [Main Clause], weil + [Subject] + ... + [Conjugated Verb (End)].",
      "Example: 'Ich lerne Deutsch, weil ich in München studieren WILL.'"
    ],
    formula: "..., weil + [Subject] + ... + [Conjugated Verb (End)]",
    examples: [
      { de: "Er bleibt heute zu Hause, weil er krank ist.", en: "He is staying home today because he is sick.", highlight: "weil er krank ist" },
      { de: "Wir freuen uns, weil wir die Prüfung bestanden haben.", en: "We are happy because we passed the exam.", highlight: "bestanden haben" }
    ],
    commonMistake: {
      mistake: "Ich gehe ins Bett, weil ich bin müde.",
      correction: "Ich gehe ins Bett, weil ich müde bin.",
      explanation: "With 'weil', the conjugated verb 'bin' MUST go to the end of the clause."
    },
    drills: [
      {
        id: "a2-d5-q1",
        type: "word_order",
        prompt: "Choose the correct word order with 'weil':",
        questionSentence: "Ich esse einen Apfel, weil ich ___.",
        englishTranslation: "I am eating an apple because I have hunger.",
        options: ["Hunger habe", "habe Hunger", "bin Hunger", "habe gehabt Hunger"],
        correctAnswer: "Hunger habe",
        explanation: "In 'weil' clauses, the verb 'habe' goes to the end: 'Hunger habe'."
      }
    ]
  },
  {
    id: "a2-day-6",
    dayNumber: 6,
    level: "A2",
    title: "Subordinate Clauses with 'dass' (That)",
    germanTitle: "Nebensätze mit 'dass' (Objektsätze & Verb am Ende)",
    category: "Sentence Structure & Word Order",
    summary: "'dass' (that) introduces a dependent clause expressing thoughts, opinions, or statements, kicking the conjugated verb to the end.",
    ruleExplanation: [
      "Used after verbs of knowing, thinking, feeling, and saying: glauben, wissen, hoffen, finden, sagen, denken.",
      "Formula: [Main clause], dass + [Subject] + ... + [Conjugated Verb (End)].",
      "Notice the double 'ss' in 'dass' (conjunction) vs 'das' (article/pronoun)."
    ],
    formula: "..., dass + [Subject] + ... + [Conjugated Verb (End)]",
    examples: [
      { de: "Ich weiß, dass Deutsch lernen Spaß macht.", en: "I know that learning German is fun.", highlight: "dass ... Spaß macht" },
      { de: "Sie hofft, dass das Wetter morgen schön wird.", en: "She hopes that the weather will be nice tomorrow.", highlight: "dass ... schön wird" }
    ],
    commonMistake: {
      mistake: "Ich glaube, das du Recht hast.",
      correction: "Ich glaube, dass du Recht hast.",
      explanation: "The conjunction 'that' is spelled with double 's': 'dass'."
    },
    drills: [
      {
        id: "a2-d6-q1",
        type: "cloze",
        prompt: "Complete with the correct word order after 'dass':",
        questionSentence: "Ich freue mich, dass du mich ___.",
        englishTranslation: "I am glad that you are visiting me.",
        options: ["besuchst", "hast besucht", "besuchen wirst", "besuchtest"],
        correctAnswer: "besuchst",
        explanation: "The conjugated verb 'besuchst' goes to the end of the 'dass' clause."
      }
    ]
  },
  {
    id: "a2-day-7",
    dayNumber: 7,
    level: "A2",
    title: "Subordinate Clauses with 'wenn' (If / When)",
    germanTitle: "Konditional- & Temporalsätze mit 'wenn' (Bedingung & Wiederholung)",
    category: "Sentence Structure & Word Order",
    summary: "'wenn' expresses a condition (if) or a present/future/repeated past occurrence (when). It places the conjugated verb at the end.",
    ruleExplanation: [
      "Condition: 'Wenn es regnet (Verb end), bleibe ich zu Hause.'",
      "When the 'wenn' clause comes first, the main clause immediately starts with the Verb in Position 2: 'Wenn du Zeit hast, KOMMST (Verb) du zu mir?'",
      "Contrast with 'als', which is used for a single specific past event."
    ],
    formula: "Wenn + [Subject] + ... + [Verb 1 (End)], [Verb 2] + [Subject]...",
    examples: [
      { de: "Wenn das Wetter schön ist, gehen wir spazieren.", en: "If the weather is nice, we go for a walk.", highlight: "ist, gehen wir" },
      { de: "Sag mir Bescheid, wenn du angekommen bist.", en: "Let me know when you have arrived.", highlight: "wenn du angekommen bist" }
    ],
    commonMistake: {
      mistake: "Wenn ich habe Zeit, ich rufe dich an.",
      correction: "Wenn ich Zeit habe, rufe ich dich an.",
      explanation: "'habe' goes to the end of the 'wenn' clause, and the second clause starts directly with 'rufe ich'."
    },
    drills: [
      {
        id: "a2-d7-q1",
        type: "word_order",
        prompt: "Choose the correct main clause continuation after 'Wenn du willst':",
        questionSentence: "Wenn du willst, ___ wir heute ins Kino.",
        englishTranslation: "If you want, we can go to the cinema today.",
        options: ["gehen", "wir gehen", "gingen", "gegangen"],
        correctAnswer: "gehen",
        explanation: "The main clause must place the verb 'gehen' in the position immediately following the comma."
      }
    ]
  },
  {
    id: "a2-day-8",
    dayNumber: 8,
    level: "A2",
    title: "Indirect Questions with 'ob' and W-Words",
    germanTitle: "Indirekte Fragesätze mit 'ob' (whether/if) & W-Wörtern",
    category: "Sentence Structure & Word Order",
    summary: "Turn direct questions into polite indirect questions: Yes/No questions turn into 'ob' clauses; W-questions keep the W-word. In both cases, the verb moves to the END!",
    ruleExplanation: [
      "Direct: 'Kommt er morgen?' -> Indirect: 'Ich weiß nicht, OB er morgen KOMMT.'",
      "Direct: 'Wo ist der Bahnhof?' -> Indirect: 'Können Sie mir sagen, WO der Bahnhof IST?'",
      "Common introductory phrases: 'Ich möchte wissen...', 'Können Sie mir sagen...', 'Weißt du...'"
    ],
    formula: "[Intro clause], ob / [W-Word] + [Subject] + ... + [Verb (End)]",
    examples: [
      { de: "Können Sie mir sagen, wann der nächste Zug abfährt?", en: "Could you tell me when the next train departs?", highlight: "wann ... abfährt" },
      { de: "Ich weiß nicht, ob das Geschäft heute geöffnet ist.", en: "I don't know whether the shop is open today.", highlight: "ob ... geöffnet ist" }
    ],
    commonMistake: {
      mistake: "Können Sie mir sagen, wo ist die Apotheke?",
      correction: "Können Sie mir sagen, wo die Apotheke ist?",
      explanation: "In an indirect question, the verb 'ist' must be moved to the end."
    },
    drills: [
      {
        id: "a2-d8-q1",
        type: "word_order",
        prompt: "Complete the indirect question:",
        questionSentence: "Weißt du, ob der Supermarkt noch ___?",
        englishTranslation: "Do you know whether the supermarket is still open?",
        options: ["aufhat", "hat auf", "aufhaben", "aufhatte"],
        correctAnswer: "aufhat",
        explanation: "In the 'ob' clause, the conjugated verb 'aufhat' goes to the end."
      }
    ]
  },
  {
    id: "a2-day-9",
    dayNumber: 9,
    level: "A2",
    title: "Comparative of Adjectives (Komparativ: schneller als)",
    germanTitle: "Der Komparativ der Adjektive (schneller als, so... wie)",
    category: "Adjectives & Adverbs",
    summary: "Compare two things in German: Equal comparison = 'so ... wie' (as ... as); Unequal comparison = Adjective + '-er' + 'als' (faster than).",
    ruleExplanation: [
      "Add '-er' to the base adjective: schnell -> schneller, klein -> kleiner.",
      "Short mono-syllable adjectives with a/o/u often take an Umlaut: alt -> älter, groß -> größer, warm -> wärmer.",
      "Irregular comparatives: gut -> besser, viel -> mehr, gern -> lieber, hoch -> höher, nah -> näher."
    ],
    formula: "[Adj + er] + als... (Unequal) | so + [Base Adj] + wie... (Equal)",
    examples: [
      { de: "Ein Zug ist schneller als ein Fahrrad.", en: "A train is faster than a bicycle.", highlight: "schneller als" },
      { de: "Mein Bruder ist so groß wie mein Vater.", en: "My brother is as tall as my father.", highlight: "so groß wie" }
    ],
    commonMistake: {
      mistake: "Er ist mehr groß als ich.",
      correction: "Er ist größer als ich.",
      explanation: "In German, add '-er' (with umlaut): 'größer als', never 'mehr groß'."
    },
    drills: [
      {
        id: "a2-d9-q1",
        type: "multiple_choice",
        prompt: "Choose the comparative form of 'gut':",
        questionSentence: "Dieses Buch ist viel ___ als der Film.",
        englishTranslation: "This book is much better than the movie.",
        options: ["besser", "guter", "mehr gut", "am besten"],
        correctAnswer: "besser",
        explanation: "'gut' has the irregular comparative 'besser'."
      }
    ]
  },
  {
    id: "a2-day-10",
    dayNumber: 10,
    level: "A2",
    title: "Superlative of Adjectives (am schnellsten)",
    germanTitle: "Der Superlativ der Adjektive (am schnellsten, am besten)",
    category: "Adjectives & Adverbs",
    summary: "Express the highest degree: 'am' + Adjective + '-sten' (am schnellsten). Irregulars: am besten (best), am meisten (most), am liebsten (most preferred).",
    ruleExplanation: [
      "Formula: am + [Adjective stem + -(e)sten]: am schnellsten, am kleinsten.",
      "Adjectives ending in -d, -t, -s, -ß, -z add an '-esten' for easy pronunciation: am ältesten, am heißesten.",
      "Irregulars: gut -> am besten, viel -> am meisten, gern -> am liebsten, hoch -> am höchsten, nah -> am nächsten."
    ],
    formula: "am + [Stem (+ Umlaut) + -(e)sten]",
    table: {
      headers: ["Base", "Comparative", "Superlative", "Meaning"],
      rows: [
        ["gut", "besser", "am besten", "good / better / best"],
        ["viel", "mehr", "am meisten", "much / more / most"],
        ["gern", "lieber", "am liebsten", "gladly / prefer / prefer most"],
        ["groß", "größer", "am größten", "big / bigger / biggest"],
        ["hoch", "höher", "am höchsten", "high / higher / highest"]
      ]
    },
    examples: [
      { de: "Im Sommer ist es am wärmsten.", en: "In summer it is warmest.", highlight: "am wärmsten" },
      { de: "Kaffee trinke ich am liebsten ohne Zucker.", en: "I prefer drinking coffee most without sugar.", highlight: "am liebsten" }
    ],
    commonMistake: {
      mistake: "Dieser Weg ist am meiste schnell.",
      correction: "Dieser Weg ist am schnellsten.",
      explanation: "Add '-sten' to the adjective stem: 'am schnellsten'."
    },
    drills: [
      {
        id: "a2-d10-q1",
        type: "cloze",
        prompt: "Fill in with the superlative of 'gern':",
        questionSentence: "Welche Musik hörst du am ___?",
        englishTranslation: "Which music do you like to listen to most?",
        options: ["liebsten", "gernten", "besten", "meisten"],
        correctAnswer: "liebsten",
        explanation: "'gern' has the superlative 'am liebsten'."
      }
    ]
  },
  {
    id: "a2-day-11",
    dayNumber: 11,
    level: "A2",
    title: "Adjective Endings with Definite Article (Schwache Deklination)",
    germanTitle: "Adjektivdeklination mit bestimmtem Artikel (der nette Mann, die nette Frau...)",
    category: "Adjectives & Adverbs",
    summary: "When preceded by a definite article (der, die, das), adjectives only take two possible endings: '-e' (5 singular forms) or '-en' (all plurals, all datives, all genitives, and masculine accusative!).",
    ruleExplanation: [
      "Ending '-e': Nominative masculine (der gute Mann), Nominative & Accusative feminine (die gute Frau), Nominative & Accusative neuter (das gute Kind).",
      "Ending '-en': EVERY other form! (Masculine Accusative 'den guten Mann', ALL Datives 'dem/der/den guten...', ALL Genitives, ALL Plurals 'die guten Kinder').",
      "Mnemonic: If the article changes from its basic form or is plural/dative, the adjective takes '-en'!"
    ],
    formula: "Nom/Akk sing: -e | Akk masc, Dat, Gen, Plural: -en",
    table: {
      headers: ["Case", "Masculine (der)", "Feminine (die)", "Neuter (das)", "Plural (die)"],
      rows: [
        ["Nominativ", "der neue Tisch", "die neue Lampe", "das neue Auto", "die neuen Autos (-en)"],
        ["Akkusativ", "den neuen Tisch (-en)", "die neue Lampe", "das neue Auto", "die neuen Autos (-en)"],
        ["Dativ", "dem neuen Tisch (-en)", "der neuen Lampe (-en)", "dem neuen Auto (-en)", "den neuen Autos (-en)"]
      ]
    },
    examples: [
      { de: "Der neue Nachbar ist sehr freundlich.", en: "The new neighbor is very friendly.", highlight: "Der neue Nachbar" },
      { de: "Ich habe den roten Mantel gekauft.", en: "I bought the red coat (m).", highlight: "den roten Mantel" }
    ],
    commonMistake: {
      mistake: "Ich sehe den rote Pullover.",
      correction: "Ich sehe den roten Pullover.",
      explanation: "Masculine accusative with 'den' requires the adjective ending '-en': 'den roten Pullover'."
    },
    drills: [
      {
        id: "a2-d11-q1",
        type: "case_selection",
        prompt: "Choose the adjective ending after 'dem' (Dative):",
        questionSentence: "Ich helfe dem alt___ Mann über die Straße.",
        englishTranslation: "I am helping the old man across the street.",
        options: ["en", "e", "er", "em"],
        correctAnswer: "en",
        explanation: "All dative adjectives after definite articles take '-en' -> 'dem alten Mann'."
      }
    ]
  },
  {
    id: "a2-day-12",
    dayNumber: 12,
    level: "A2",
    title: "Adjective Endings with Indefinite Article (Gemischte Deklination)",
    germanTitle: "Adjektivdeklination mit unbestimmtem Artikel (ein guter Mann, eine gute Frau...)",
    category: "Adjectives & Adverbs",
    summary: "After 'ein / kein / mein', the adjective shows the gender signal that 'ein' lacks in nominative: ein gut-er Mann (m), eine gut-e Frau (f), ein gut-es Kind (n). All datives, genitives, and masculine accusatives take '-en'!",
    ruleExplanation: [
      "Nominativ: ein neu-er Wagen (m), eine neu-e Tasche (f), ein neu-es Buch (n).",
      "Akkusativ: einen neu-en Wagen (m), eine neu-e Tasche (f), ein neu-es Buch (n).",
      "Dativ: einem/einer/einem neu-en ... (all take '-en'!).",
      "Plural with 'keine / meine': keine neu-en Bücher (-en)."
    ],
    formula: "Nom: ein -er (m), eine -e (f), ein -es (n) | Akk masc & all Dativ: -en",
    examples: [
      { de: "Er hat ein schnelles Auto gekauft.", en: "He bought a fast car (n).", highlight: "ein schnelles Auto" },
      { de: "Das ist ein schöner Tag heute!", en: "That is a beautiful day today (m)!", highlight: "ein schöner Tag" }
    ],
    commonMistake: {
      mistake: "Das ist ein schönes Tag.",
      correction: "Das ist ein schöner Tag.",
      explanation: "'Tag' is masculine (der Tag). In nominative with 'ein', the adjective takes '-er' -> 'ein schöner Tag'."
    },
    drills: [
      {
        id: "a2-d12-q1",
        type: "cloze",
        prompt: "Choose the correct ending for feminine noun with 'eine':",
        questionSentence: "Sie hat eine schön___ Stimme.",
        englishTranslation: "She has a beautiful voice.",
        options: ["e", "er", "es", "en"],
        correctAnswer: "e",
        explanation: "Feminine with 'eine' takes '-e' -> 'eine schöne Stimme'."
      }
    ]
  },
  {
    id: "a2-day-13",
    dayNumber: 13,
    level: "A2",
    title: "Reflexive Verbs with Accusative (sich freuen, sich waschen)",
    germanTitle: "Reflexive Verben mit Akkusativ (sich freuen, sich interessieren)",
    category: "Verbs & Tenses",
    summary: "Reflexive verbs show the subject performing an action on itself. They use reflexive pronouns: mich, dich, sich, uns, euch, sich.",
    ruleExplanation: [
      "Conjugation with 'sich freuen' (to be glad/look forward): ich freue mich, du freust dich, er/sie/es freut sich, wir freuen uns, ihr freut euch, sie/Sie freuen sich.",
      "Key verbs: sich freuen auf/über, sich interessieren für, sich ärgern über, sich fühlen, sich erinnern an.",
      "Notice that 3rd person (singular & plural & formal) is ALWAYS 'sich'."
    ],
    formula: "ich mich | du dich | er/sie/es sich | wir uns | ihr euch | sie/Sie sich",
    examples: [
      { de: "Ich freue mich sehr auf den Urlaub.", en: "I am really looking forward to the vacation.", highlight: "freue mich" },
      { de: "Interessierst du dich für Kunst?", en: "Are you interested in art?", highlight: "Interessierst du dich" }
    ],
    commonMistake: {
      mistake: "Er freut ihn über das Geschenk.",
      correction: "Er freut sich über das Geschenk.",
      explanation: "3rd person reflexive pronoun is always 'sich', never 'ihn'."
    },
    drills: [
      {
        id: "a2-d13-q1",
        type: "multiple_choice",
        prompt: "Choose the reflexive pronoun for 'wir':",
        questionSentence: "Wir treffen ___ heute um 18 Uhr im Café.",
        englishTranslation: "We are meeting today at 6 PM in the café.",
        options: ["uns", "sich", "euch", "wir"],
        correctAnswer: "uns",
        explanation: "The reflexive pronoun for 'wir' is 'uns'."
      }
    ]
  },
  {
    id: "a2-day-14",
    dayNumber: 14,
    level: "A2",
    title: "Reflexive Verbs with Dative (sich etwas vorstellen)",
    germanTitle: "Reflexive Verben mit Dativ (sich die Hände waschen, sich merken)",
    category: "Verbs & Tenses",
    summary: "When a reflexive action includes an explicit direct object (e.g. body parts, specific things), the reflexive pronoun switches to Dative (mir, dir, sich, uns, euch, sich).",
    ruleExplanation: [
      "Accusative reflexive: 'Ich wasche MICH' (I wash myself).",
      "Dative reflexive (with object): 'Ich wasche MIR die Hände (Akk)' (I wash my hands).",
      "Pronouns only differ in 1st & 2nd person singular: ich -> mir (instead of mich), du -> dir (instead of dich).",
      "Key dative reflexive verbs: sich die Zähne putzen, sich etwas vorstellen (imagine), sich etwas merken (remember)."
    ],
    formula: "ich -> mir | du -> dir | (all other persons remain identical)",
    examples: [
      { de: "Ich putze mir jeden Morgen die Zähne.", en: "I brush my teeth every morning.", highlight: "putze mir die Zähne" },
      { de: "Kannst du dir das vorstellen?", en: "Can you imagine that?", highlight: "dir ... vorstellen" }
    ],
    commonMistake: {
      mistake: "Ich wasche mich die Hände.",
      correction: "Ich wasche mir die Hände.",
      explanation: "Because 'die Hände' is the accusative direct object, the reflexive pronoun must be dative 'mir'."
    },
    drills: [
      {
        id: "a2-d14-q1",
        type: "cloze",
        prompt: "Choose 'mir' or 'mich':",
        questionSentence: "Ich kaufe ___ ein neues Smartphone.",
        englishTranslation: "I am buying myself a new smartphone.",
        options: ["mir", "mich", "meine", "sich"],
        correctAnswer: "mir",
        explanation: "'ein Smartphone' is the direct object, so the reflexive pronoun is dative 'mir'."
      }
    ]
  },
  {
    id: "a2-day-15",
    dayNumber: 15,
    level: "A2",
    title: "Verbs with Fixed Prepositions (warten auf, träumen von)",
    germanTitle: "Verben mit festen Präpositionen (warten auf + Akk, sprechen über + Akk)",
    category: "Verbs & Tenses",
    summary: "Many German verbs are permanently paired with a specific preposition that dictates either Accusative or Dative case.",
    ruleExplanation: [
      "With Accusative: warten auf (to wait for), sich freuen auf/über (look forward/rejoice), denken an (think of), sich interessieren für (interested in), sprechen/diskutieren über (talk about).",
      "With Dative: träumen von (dream of), sprechen mit (speak with), teilnehmen an (participate in), gehören zu (belong to), suchen nach (look for).",
      "Always memorize the verb together with its preposition and case!"
    ],
    formula: "[Verb] + [Preposition] + [Akk / Dat]",
    examples: [
      { de: "Ich warte seit 20 Minuten auf den Bus (Akk).", en: "I have been waiting for the bus for 20 minutes.", highlight: "warte ... auf den Bus" },
      { de: "Er träumt von einer Reise nach Japan (Dat).", en: "He dreams of a trip to Japan.", highlight: "träumt von einer Reise" }
    ],
    commonMistake: {
      mistake: "Ich warte für den Bus.",
      correction: "Ich warte auf den Bus.",
      explanation: "In German, 'wait for' is 'warten auf' (+ Accusative), never 'warten für'."
    },
    drills: [
      {
        id: "a2-d15-q1",
        type: "multiple_choice",
        prompt: "Choose the correct preposition for 'sich interessieren':",
        questionSentence: "Interessierst du dich ___ moderne Architektur?",
        englishTranslation: "Are you interested in modern architecture?",
        options: ["für", "über", "an", "auf"],
        correctAnswer: "für",
        explanation: "'sich interessieren für' (+ Accusative)."
      }
    ]
  },
  {
    id: "a2-day-16",
    dayNumber: 16,
    level: "A2",
    title: "Pronominal Adverbs: da(r)- and wo(r)- Compounds",
    germanTitle: "Präpositionalpronomen (Worauf / Darauf, Womit / Damit, Wovon / Davon)",
    category: "Pronouns",
    summary: "When referring to things or concepts with prepositional verbs, German combines 'da(r)-' or 'wo(r)-' with the preposition instead of using pronouns like 'es' or 'was'.",
    ruleExplanation: [
      "For Things/Actions: 'Worauf wartest du? – Ich warte darauf (auf den Bus).' (Insert 'r' if prep begins with vowel: da-r-auf).",
      "For Persons: Use standard preposition + pronoun: 'Auf wen wartest du? – Auf meinen Freund.'",
      "womit (with what) / damit (with that), wovon (of what) / davon (of that), worüber (about what) / darüber (about that)."
    ],
    formula: "Thing: Wo(r)+Prep? -> Da(r)+Prep. | Person: Prep + Wen/Wem?",
    examples: [
      { de: "Worüber lacht ihr? – Wir lachen über einen Witz.", en: "What are you laughing about? – We are laughing about a joke.", highlight: "Worüber" },
      { de: "Ich habe mich sehr darüber gefreut.", en: "I was very pleased about that.", highlight: "darüber" }
    ],
    commonMistake: {
      mistake: "Über was sprecht ihr? / Ich denke über das.",
      correction: "Worüber sprecht ihr? / Ich denke darüber nach.",
      explanation: "Use 'Worüber' and 'darüber' for things rather than 'über was' or 'über das'."
    },
    drills: [
      {
        id: "a2-d16-q1",
        type: "multiple_choice",
        prompt: "Choose the correct compound to ask 'What are you waiting for?':",
        questionSentence: "___ wartest du? – Auf den Feierabend!",
        englishTranslation: "What are you waiting for? – For the end of the workday!",
        options: ["Worauf", "Wofür", "Warum", "Woran"],
        correctAnswer: "Worauf",
        explanation: "'warten auf' combines to 'Worauf'."
      }
    ]
  },
  {
    id: "a2-day-17",
    dayNumber: 17,
    level: "A2",
    title: "Subordinate Clauses with 'obwohl' (Although)",
    germanTitle: "Konzessivsätze mit 'obwohl' (Gegensatz & Verb am Ende)",
    category: "Sentence Structure & Word Order",
    summary: "'obwohl' introduces a concession (although / even though), expressing an unexpected outcome. The conjugated verb goes to the end.",
    ruleExplanation: [
      "Structure: [Main clause], obwohl + [Subject] + ... + [Conjugated Verb (End)].",
      "Example: 'Er geht spazieren, obwohl es stark regnet.'",
      "If 'obwohl' clause comes first: 'Obwohl es regnet, GEHT er spazieren.'"
    ],
    formula: "..., obwohl + [Subject] + ... + [Conjugated Verb (End)]",
    examples: [
      { de: "Ich habe alles verstanden, obwohl der Lehrer sehr schnell gesprochen hat.", en: "I understood everything, although the teacher spoke very fast.", highlight: "obwohl ... gesprochen hat" }
    ],
    commonMistake: {
      mistake: "Obwohl er ist müde, lernt er weiter.",
      correction: "Obwohl er müde ist, lernt er weiter.",
      explanation: "'ist' must move to the end of the 'obwohl' clause."
    },
    drills: [
      {
        id: "a2-d17-q1",
        type: "word_order",
        prompt: "Choose the correct word order with 'obwohl':",
        questionSentence: "Wir haben das Spiel gewonnen, obwohl wir ___.",
        englishTranslation: "We won the game, although we played poorly.",
        options: ["schlecht gespielt haben", "haben schlecht gespielt", "schlecht haben gespielt", "spielten schlecht"],
        correctAnswer: "schlecht gespielt haben",
        explanation: "Conjugated auxiliary verb 'haben' stands at the very end."
      }
    ]
  },
  {
    id: "a2-day-18",
    dayNumber: 18,
    level: "A2",
    title: "Past Temporal Clauses: 'als' vs. 'wenn'",
    germanTitle: "Temporale Konjunktionen: 'als' (einmalig Vergangenheit) vs. 'wenn' (wiederholt)",
    category: "Sentence Structure & Word Order",
    summary: "Use 'als' for a SINGLE, specific event or state in the PAST (when I was a child). Use 'wenn' for repeated past events ('immer wenn') or present/future conditions.",
    ruleExplanation: [
      "'als': Once in the past ('Als ich 10 Jahre alt war, lebte ich in Köln').",
      "'wenn': Repeated past ('Immer wenn ich Zeit hatte, besuchte ich Oma') or present/future ('Wenn ich Zeit habe, komme ich').",
      "Both place the conjugated verb at the end of the clause."
    ],
    formula: "Single Past Event = als | Repeated / Present / Future = wenn",
    examples: [
      { de: "Als ich in Deutschland ankam, sprach ich kein Wort Deutsch.", en: "When I arrived in Germany (one-time event), I didn't speak a word of German.", highlight: "Als ich ... ankam" },
      { de: "Immer wenn wir Urlaub hatten, fuhren wir ans Meer.", en: "Whenever we had vacation, we went to the sea.", highlight: "Immer wenn" }
    ],
    commonMistake: {
      mistake: "Wenn ich ein Kind war, spielte ich viel draußen.",
      correction: "Als ich ein Kind war, spielte ich viel draußen.",
      explanation: "Childhood is a single continuous period in the past, so use 'Als ich ein Kind war'."
    },
    drills: [
      {
        id: "a2-d18-q1",
        type: "multiple_choice",
        prompt: "Choose 'als' or 'wenn':",
        questionSentence: "___ ich gestern nach Hause kam, war niemand da.",
        englishTranslation: "When I came home yesterday, no one was there.",
        options: ["Als", "Wenn", "Wann", "Weil"],
        correctAnswer: "Als",
        explanation: "A single specific event in the past takes 'Als'."
      }
    ]
  },
  {
    id: "a2-day-19",
    dayNumber: 19,
    level: "A2",
    title: "Temporal Prepositions: vor, nach, während, seit, ab, bis",
    germanTitle: "Temporale Präpositionen: vor (Dat), nach (Dat), seit (Dat), bis (Akk)",
    category: "Cases & Prepositions",
    summary: "Prepositions describing time sequences: 'vor' (before / ago + Dat), 'nach' (after + Dat), 'seit' (since/for + Dat), 'ab' (starting from + Dat), 'bis' (until + Akk).",
    ruleExplanation: [
      "vor einem Monat (a month ago), vor dem Essen (before the meal) -> DATIV.",
      "nach der Arbeit (after work), nach dem Kurs -> DATIV.",
      "seit drei Wochen (for three weeks / ongoing) -> DATIV.",
      "ab nächster Woche (starting next week) -> DATIV.",
      "bis morgen / bis nächsten Montag -> AKKUSATIV."
    ],
    formula: "vor / nach / seit / bei / ab + DATIV | bis / um + AKKUSATIV",
    examples: [
      { de: "Ich bin vor zwei Jahren nach Berlin gezogen.", en: "I moved to Berlin two years ago.", highlight: "vor zwei Jahren" },
      { de: "Nach dem Frühstück gehe ich zur Arbeit.", en: "After breakfast I go to work.", highlight: "Nach dem Frühstück" }
    ],
    commonMistake: {
      mistake: "Ich wohne hier für zwei Jahre (when still living there).",
      correction: "Ich wohne hier seit zwei Jahren.",
      explanation: "Ongoing duration starting in the past uses 'seit' + Dative in present tense, never 'für'."
    },
    drills: [
      {
        id: "a2-d19-q1",
        type: "cloze",
        prompt: "Fill in the preposition meaning 'ago':",
        questionSentence: "Wir haben uns ___ einer Woche getroffen.",
        englishTranslation: "We met a week ago.",
        options: ["vor", "nach", "seit", "für"],
        correctAnswer: "vor",
        explanation: "'vor' + Dative expresses 'ago'."
      }
    ]
  },
  {
    id: "a2-day-20",
    dayNumber: 20,
    level: "A2",
    title: "Directional Prepositions: nach, zu, in, an, auf",
    germanTitle: "Lokale Präpositionen der Richtung (Wohin? nach, zu, in, auf)",
    category: "Cases & Prepositions",
    summary: "Choosing the correct preposition for destinations: 'nach' (cities, countries without article), 'in' (countries with article, buildings), 'zu' (people, specific places), 'auf' (public buildings, islands, open spaces).",
    ruleExplanation: [
      "nach: nach Deutschland, nach Berlin, nach Hause (home).",
      "in (+ Akk): in die Schweiz (country with article), ins Kino, in die Stadt.",
      "zu (+ Dat): zum Arzt (to the doctor), zu meiner Freundin, zum Bahnhof.",
      "an (+ Akk): ans Meer (to the sea), an den Strand.",
      "auf (+ Akk): auf die Post, auf den Markt, auf eine Insel."
    ],
    formula: "nach [City/Country] | in [Enclosed/Country with art.] | zu [Person/Institution]",
    examples: [
      { de: "Morgen fahre ich nach München und gehe zum Zahnarzt.", en: "Tomorrow I drive to Munich and go to the dentist.", highlight: "nach München / zum Zahnarzt" },
      { de: "Wir fliegen in die Türkei und gehen ans Meer.", en: "We are flying to Turkey and going to the sea.", highlight: "in die Türkei / ans Meer" }
    ],
    commonMistake: {
      mistake: "Ich gehe nach Arzt.",
      correction: "Ich gehe zum Arzt.",
      explanation: "Going to a person or professional requires 'zu' + Dative: 'zum Arzt'."
    },
    drills: [
      {
        id: "a2-d20-q1",
        type: "multiple_choice",
        prompt: "Choose the correct directional preposition for going to a person:",
        questionSentence: "Ich gehe heute Abend ___ meinen Großeltern.",
        englishTranslation: "I am going to my grandparents tonight.",
        options: ["zu", "nach", "in", "bei"],
        correctAnswer: "zu",
        explanation: "Going to visit people always uses 'zu' + Dative."
      }
    ]
  },
  {
    id: "a2-day-21",
    dayNumber: 21,
    level: "A2",
    title: "Konjunktiv II: Polite Requests & Desires (würde, hätte, wäre, könnte)",
    germanTitle: "Der Konjunktiv II der Höflichkeit & Wünsche (würde gern, hätte, wäre, könnte)",
    category: "Subjunctive & Passive",
    summary: "Use Konjunktiv II to make extremely polite requests or express wishes: 'Ich hätte gern' (I would like to have), 'Ich wäre gern' (I would like to be), 'Könnten Sie' (Could you), 'Ich würde gern' (I would like to).",
    ruleExplanation: [
      "hätte gern = would like to have: 'Ich hätte gern einen Kaffee.'",
      "wäre gern = would like to be: 'Ich wäre jetzt gern am Strand.'",
      "könnte = could: 'Könnten Sie mir bitte helfen?' (more polite than 'Können Sie').",
      "würde + Infinitive = would do: 'Ich würde gern mehr reisen.'"
    ],
    formula: "würde / hätte / wäre / könnte + ... + [Infinitive (End)]",
    examples: [
      { de: "Könnten Sie das bitte noch einmal wiederholen?", en: "Could you please repeat that once more?", highlight: "Könnten Sie ... wiederholen" },
      { de: "Ich hätte gern zwei Brötchen und ein Stück Kuchen.", en: "I would like two rolls and a piece of cake.", highlight: "Ich hätte gern" }
    ],
    commonMistake: {
      mistake: "Ich will ein Kaffee bitte (in a café).",
      correction: "Ich hätte gern einen Kaffee, bitte.",
      explanation: "'Ich hätte gern' or 'Ich möchte' is the polite, culturally expected standard in German."
    },
    drills: [
      {
        id: "a2-d21-q1",
        type: "cloze",
        prompt: "Form a polite request with 'können' (Konjunktiv II):",
        questionSentence: "___ Sie mir bitte das Salz reichen?",
        englishTranslation: "Could you please pass me the salt?",
        options: ["Könnten", "Können", "Konnten", "Könntet"],
        correctAnswer: "Könnten",
        explanation: "'Könnten Sie' is the polite Konjunktiv II form."
      }
    ]
  },
  {
    id: "a2-day-22",
    dayNumber: 22,
    level: "A2",
    title: "Possessive Articles in Dative & Accusative",
    germanTitle: "Possessivartikel im Dativ & Akkusativ (meinem, meiner, meinen...)",
    category: "Pronouns",
    summary: "Possessive articles take the exact same declension endings as 'kein': Akkusativ masc = meinen; Dativ masc/neut = meinem, fem = meiner, plural = meinen (+n on noun).",
    ruleExplanation: [
      "Akkusativ: Ich besuche meinen Bruder (m), meine Schwester (f), mein Kind (n), meine Freunde (pl).",
      "Dativ: Ich helfe meinem Bruder (m), meiner Schwester (f), meinem Kind (n), meinen Freunden (+n) (pl).",
      "Applies to all possessives: dein-, sein-, ihr-, unser-, euer-, Ihr-."
    ],
    formula: "Dativ: -em (m/n), -er (f), -en (pl + Noun-n)",
    examples: [
      { de: "Ich fahre mit meinem neuen Auto zur Arbeit.", en: "I drive to work with my new car (n).", highlight: "mit meinem neuen Auto" },
      { de: "Sie schenkt ihrer Mutter ein Buch.", en: "She gives her mother (f) a book.", highlight: "ihrer Mutter" }
    ],
    commonMistake: {
      mistake: "Ich spreche mit mein Bruder.",
      correction: "Ich spreche mit meinem Bruder.",
      explanation: "'mit' requires Dative: masculine possessive is 'meinem Bruder'."
    },
    drills: [
      {
        id: "a2-d22-q1",
        type: "case_selection",
        prompt: "Choose the correct possessive in Dative feminine:",
        questionSentence: "Er hilft ___ Kollegin (f) bei der Präsentation.",
        englishTranslation: "He is helping his colleague with the presentation.",
        options: ["seiner", "seine", "seinem", "seinen"],
        correctAnswer: "seiner",
        explanation: "Feminine Dative possessive ending is '-er' -> 'seiner Kollegin'."
      }
    ]
  },
  {
    id: "a2-day-23",
    dayNumber: 23,
    level: "A2",
    title: "Demonstrative Pronouns: dieser, diese, dieses",
    germanTitle: "Demonstrativpronomen: dieser, diese, dieses (dieses Buch, diese Frau...)",
    category: "Pronouns",
    summary: "'dieser' (this / these) points to a specific item. It declines exactly like the definite article 'der, die, das': dieser (m), diese (f), dieses (n), diese (pl).",
    ruleExplanation: [
      "Nominativ: dieser Mann (m), diese Frau (f), dieses Buch (n), diese Leute (pl).",
      "Akkusativ: diesen Mann (m), diese Frau (f), dieses Buch (n), diese Leute (pl).",
      "Dativ: diesem Mann (m), dieser Frau (f), diesem Buch (n), diesen Leuten (pl)."
    ],
    formula: "dies- + [Article Endings: -er, -e, -es, -en, -em...]",
    examples: [
      { de: "Dieser Pullover gefällt mir sehr gut.", en: "I like this sweater (m) very much.", highlight: "Dieser Pullover" },
      { de: "In diesem Hotel haben wir übernachtet.", en: "We stayed in this hotel (n).", highlight: "In diesem Hotel" }
    ],
    commonMistake: {
      mistake: "Ich kaufe dieses Mantel (m).",
      correction: "Ich kaufe diesen Mantel.",
      explanation: "Mantel is masculine (der Mantel). In accusative, use 'diesen Mantel'."
    },
    drills: [
      {
        id: "a2-d23-q1",
        type: "case_selection",
        prompt: "Choose the demonstrative pronoun in accusative masculine:",
        questionSentence: "Kennst du ___ Mann dort drüben?",
        englishTranslation: "Do you know this man over there?",
        options: ["diesen", "dieser", "diesem", "dieses"],
        correctAnswer: "diesen",
        explanation: "Masculine accusative takes 'diesen'."
      }
    ]
  },
  {
    id: "a2-day-24",
    dayNumber: 24,
    level: "A2",
    title: "Indefinite Pronouns: man, jemand, niemand, etwas, nichts",
    germanTitle: "Indefinitpronomen: man (one/people), jemand, niemand, etwas, nichts",
    category: "Pronouns",
    summary: "Indefinite pronouns refer to unspecified people or things: 'man' (one/people in general), 'jemand' (someone), 'niemand' (no one), 'etwas' (something), 'nichts' (nothing), 'alle' (everyone/all).",
    ruleExplanation: [
      "'man' always conjugates with the 3rd person singular verb (er/sie/es): 'Hier darf MAN nicht rauchen.'",
      "'jemand' / 'niemand' can add accusative (-en) or dative (-em) endings or stay uninflected in spoken German.",
      "'etwas' and 'nichts' never change form."
    ],
    formula: "man + [3rd person singular verb]",
    examples: [
      { de: "In Deutschland trennt man den Müll.", en: "In Germany, people separate trash.", highlight: "man trennt" },
      { de: "Hat jemand meine Schlüssel gesehen? – Nein, niemand.", en: "Has anyone seen my keys? – No, no one.", highlight: "jemand / niemand" }
    ],
    commonMistake: {
      mistake: "Man können hier Deutsch lernen.",
      correction: "Man kann hier Deutsch lernen.",
      explanation: "'man' is grammatically singular and conjugates like 'er/sie/es' ('man kann')."
    },
    drills: [
      {
        id: "a2-d24-q1",
        type: "cloze",
        prompt: "Fill in the pronoun meaning 'no one':",
        questionSentence: "Es war dunkel und ___ war auf der Straße.",
        englishTranslation: "It was dark and no one was on the street.",
        options: ["niemand", "jemand", "nichts", "man"],
        correctAnswer: "niemand",
        explanation: "'niemand' means 'no one / nobody'."
      }
    ]
  },
  {
    id: "a2-day-25",
    dayNumber: 25,
    level: "A2",
    title: "The Genitive Case Basics (Possession & wegen)",
    germanTitle: "Der Genitiv: des Vaters, der Mutter (Besitz & wegen + Genitiv)",
    category: "Cases & Prepositions",
    summary: "The Genitive case expresses possession (whose?) and is triggered by prepositions like 'wegen' (because of) and 'während' (during). Articles: des (+s/-es), der, des (+s/-es), der.",
    ruleExplanation: [
      "Masculine (der) & Neuter (das) become 'des' AND the noun adds -(e)s: des Vaters, des Autos, des Kindes.",
      "Feminine (die) & Plural (die) become 'der': der Mutter, der Stadt, der Kinder.",
      "Common Genitive preposition: 'wegen des schlechten Wetters' (because of the bad weather), 'während der Pause' (during the break)."
    ],
    formula: "M/N: des [Noun-(e)s] | F/Pl: der [Noun]",
    table: {
      headers: ["Gender", "Nominative", "Genitive (Possession)"],
      rows: [
        ["Masculine (m)", "der Chef", "das Büro des Chefs (+s)"],
        ["Feminine (f)", "die Kollegin", "das Auto der Kollegin"],
        ["Neuter (n)", "das Kind", "das Spielzeug des Kindes (+es)"],
        ["Plural (pl)", "die Eltern", "das Haus der Eltern"]
      ]
    },
    examples: [
      { de: "Wegen des Regens bleiben wir zu Hause.", en: "Because of the rain, we are staying home.", highlight: "Wegen des Regens" },
      { de: "Das ist das Auto meines Vaters.", en: "That is my father's car.", highlight: "meines Vaters" }
    ],
    commonMistake: {
      mistake: "Wegen dem Regen (informal spoken).",
      correction: "Wegen des Regens (standard correct German).",
      explanation: "In standard written German, 'wegen' requires Genitive ('des Regens')."
    },
    drills: [
      {
        id: "a2-d25-q1",
        type: "case_selection",
        prompt: "Choose the Genitive article for 'der Lehrer' (m):",
        questionSentence: "Das ist die Tasche ___ Lehrers.",
        englishTranslation: "That is the teacher's bag.",
        options: ["des", "dem", "der", "den"],
        correctAnswer: "des",
        explanation: "Masculine in Genitive takes 'des' + '-(e)s' on the noun."
      }
    ]
  },
  {
    id: "a2-day-26",
    dayNumber: 26,
    level: "A2",
    title: "Infinitive with 'zu' (Infinitiv mit zu)",
    germanTitle: "Infinitivkonstruktionen mit 'zu' (Ich habe vor, Deutsch zu lernen)",
    category: "Sentence Structure & Word Order",
    summary: "When a second verb depends on expressions of intention, ability, or feelings (haben Lust, es ist wichtig, planen, vorhaben), use 'zu' + Infinitive at the very end.",
    ruleExplanation: [
      "Structure: [Main clause], ... + [zu + Infinitive (End)].",
      "For separable verbs, insert '-zu-' between the prefix and stem: einkaufen -> ein-zu-kaufen, aufstehen -> auf-zu-stehen.",
      "NO 'zu' with modal verbs (können, müssen...), verbs of motion (gehen), or sensory verbs (hören, sehen)."
    ],
    formula: "... + [zu + Infinitive] | Separable: [Prefix + zu + Stem + en]",
    examples: [
      { de: "Ich habe vor, nächstes Jahr nach Wien zu reisen.", en: "I plan to travel to Vienna next year.", highlight: "zu reisen" },
      { de: "Es ist wichtig, jeden Tag neue Wörter zu wiederholen.", en: "It is important to review new words every day.", highlight: "zu wiederholen" }
    ],
    commonMistake: {
      mistake: "Ich kann zu schwimmen.",
      correction: "Ich kann schwimmen.",
      explanation: "Modal verbs NEVER take 'zu' with their infinitive."
    },
    drills: [
      {
        id: "a2-d26-q1",
        type: "cloze",
        prompt: "Complete the separable verb infinitive with 'zu' for 'anrufen':",
        questionSentence: "Ich habe vergessen, dich ___.",
        englishTranslation: "I forgot to call you.",
        options: ["anzurufen", "zu anrufen", "anrufen zu", "angerufen"],
        correctAnswer: "anzurufen",
        explanation: "In separable verbs, 'zu' is placed between prefix and stem: 'an-zu-rufen'."
      }
    ]
  },
  {
    id: "a2-day-27",
    dayNumber: 27,
    level: "A2",
    title: "Final Clauses: 'um ... zu' (In order to)",
    germanTitle: "Finalsätze mit 'um ... zu' (Ziel & Absicht bei gleichem Subjekt)",
    category: "Sentence Structure & Word Order",
    summary: "Express purpose (in order to / so as to) when the subject of both clauses is the same: 'um' introduces the purpose, and 'zu + Infinitive' stands at the end.",
    ruleExplanation: [
      "Formula: [Main clause], um + [Details] + [zu + Infinitive (End)].",
      "Only possible when BOTH actions are performed by the SAME subject: 'Ich lerne Deutsch, um in Deutschland zu arbeiten.'",
      "Answers the question: 'Wozu?' (For what purpose / why?)."
    ],
    formula: "..., um + ... + [zu + Infinitive]",
    examples: [
      { de: "Er spart Geld, um ein neues Auto zu kaufen.", en: "He is saving money in order to buy a new car.", highlight: "um ... zu kaufen" },
      { de: "Ich stehe früh auf, um pünktlich zur Arbeit zu kommen.", en: "I get up early in order to arrive at work on time.", highlight: "um ... zu kommen" }
    ],
    commonMistake: {
      mistake: "Ich lerne Deutsch für arbeiten in Berlin.",
      correction: "Ich lerne Deutsch, um in Berlin zu arbeiten.",
      explanation: "Do not use 'für' with verbs in German; use 'um ... zu' + Infinitive."
    },
    drills: [
      {
        id: "a2-d27-q1",
        type: "cloze",
        prompt: "Choose the conjunction for purpose (same subject):",
        questionSentence: "Ich gehe in den Supermarkt, ___ Obst zu kaufen.",
        englishTranslation: "I go to the supermarket in order to buy fruit.",
        options: ["um", "damit", "weil", "dass"],
        correctAnswer: "um",
        explanation: "'um ... zu' expresses 'in order to'."
      }
    ]
  },
  {
    id: "a2-day-28",
    dayNumber: 28,
    level: "A2",
    title: "Adjective Endings with Zero Article (Starke Deklination)",
    germanTitle: "Adjektivdeklination ohne Artikel / Nullartikel (kaltes Wasser, frische Milch)",
    category: "Adjectives & Adverbs",
    summary: "When there is no article before the noun (uncountable substances, plural nouns without article), the adjective takes the definite article's ending to show case and gender: kalt-es Wasser (das), frisch-e Milch (die), heiß-er Tee (der).",
    ruleExplanation: [
      "Masculine Nominative: heiß-er Tee (-er like 'der').",
      "Feminine Nominative & Accusative: frisch-e Milch (-e like 'die').",
      "Neuter Nominative & Accusative: kalt-es Wasser (-es like 'das').",
      "Plural Nominative & Accusative: groß-e Probleme (-e like 'die').",
      "Exception: Masculine & Neuter Genitive takes '-en' (guten Weines)."
    ],
    formula: "No Article -> Adjective takes the ending of 'der / die / das'!",
    examples: [
      { de: "Ich trinke gern kaltes Wasser und frische Milch.", en: "I like drinking cold water (n) and fresh milk (f).", highlight: "kaltes Wasser / frische Milch" },
      { de: "Deutscher Käse schmeckt sehr lecker.", en: "German cheese (m) tastes very delicious.", highlight: "Deutscher Käse" }
    ],
    commonMistake: {
      mistake: "Ich trinke kalt Wasser.",
      correction: "Ich trinke kaltes Wasser.",
      explanation: "Without an article, the adjective must take the neuter ending '-es' ('kaltes Wasser')."
    },
    drills: [
      {
        id: "a2-d28-q1",
        type: "case_selection",
        prompt: "Choose the adjective ending without article for neuter 'Bier' (das):",
        questionSentence: "Möchtest du kühl___ Bier trinken?",
        englishTranslation: "Would you like to drink cool beer?",
        options: ["es", "e", "er", "en"],
        correctAnswer: "es",
        explanation: "Neuter accusative without article takes '-es' -> 'kühles Bier'."
      }
    ]
  },
  {
    id: "a2-day-29",
    dayNumber: 29,
    level: "A2",
    title: "Relative Clauses in Nominative & Accusative",
    germanTitle: "Relativsätze im Nominativ & Akkusativ (der Mann, der... / den ich kenne)",
    category: "Sentence Structure & Word Order",
    summary: "Relative clauses provide extra information about a noun. The relative pronoun matches the gender of the noun, its case depends on its role in the relative clause, and the verb goes to the END.",
    ruleExplanation: [
      "Relative pronouns in Nominativ: der (m), die (f), das (n), die (pl).",
      "Relative pronouns in Akkusativ: den (m), die (f), das (n), die (pl).",
      "Example: 'Das ist der Mann, DER nebenan wohnt (Nom).' / 'Das ist der Mann, DEN ich gestern gesehen habe (Akk).'"
    ],
    formula: "[Noun], [Rel. Pronoun] + ... + [Verb (End)]",
    examples: [
      { de: "Das ist das Buch, das ich gerade lese.", en: "That is the book (n) that I am currently reading.", highlight: "das ich gerade lese" },
      { de: "Dort steht die Frau, die neu in unserer Firma ist.", en: "There stands the woman (f) who is new in our company.", highlight: "die neu in unserer Firma ist" }
    ],
    commonMistake: {
      mistake: "Das ist der Film, wer ich so mag.",
      correction: "Das ist der Film, den ich so mag.",
      explanation: "'wer' is never used as a relative pronoun for things. Use 'den' (masculine accusative)."
    },
    drills: [
      {
        id: "a2-d29-q1",
        type: "multiple_choice",
        prompt: "Choose the relative pronoun for masculine direct object:",
        questionSentence: "Wo ist der Schlüssel, ___ ich eben auf den Tisch gelegt habe?",
        englishTranslation: "Where is the key that I just placed on the table?",
        options: ["den", "der", "dem", "das"],
        correctAnswer: "den",
        explanation: "'der Schlüssel' is the accusative direct object of 'gelegt habe', so use 'den'."
      }
    ]
  },
  {
    id: "a2-day-30",
    dayNumber: 30,
    level: "A2",
    title: "A2 Grammar Synthesis & Master Review",
    germanTitle: "A2 Grammatik-Synthese: Das große Abschluss-Review",
    category: "Mastery Review",
    summary: "Congratulations on mastering A2 German Grammar! You are now fully prepared to connect complex sentences with subordinators, handle adjective declensions, express polite requests with Konjunktiv II, and use two-way prepositions effortlessly.",
    ruleExplanation: [
      "Subordinating Conjunctions (weil, dass, wenn, obwohl, als, ob): conjugated verb at the END.",
      "Two-Way Prepositions: Wo? = Dativ, Wohin? = Akkusativ.",
      "Adjective endings: Follow clear rules based on definite, indefinite, or zero articles.",
      "Konjunktiv II: würde gern, hätte gern, wäre gern, könnte."
    ],
    formula: "A2 Certified: Subordinates + Adjectives + Konjunktiv II + Relative Clauses!",
    examples: [
      { de: "Obwohl das Wetter schlecht war, haben wir einen schönen Ausflug gemacht, weil wir uns gut vorbereitet hatten.", en: "Although the weather was bad, we had a nice excursion because we had prepared well.", highlight: "A2 Mastery" }
    ],
    drills: [
      {
        id: "a2-d30-q1",
        type: "multiple_choice",
        prompt: "Select the sentence that is grammatically 100% correct in A2 German:",
        questionSentence: "Welcher Satz ist grammatisch vollkommen korrekt?",
        englishTranslation: "Which sentence is completely correct?",
        options: [
          "Wenn ich Zeit habe, helfe ich meinem besten Freund.",
          "Wenn ich habe Zeit, ich helfe mein bester Freund.",
          "Wenn ich Zeit habe, helfe ich mein bester Freund.",
          "Wenn ich Zeit habe, ich helfe meinem besten Freund."
        ],
        correctAnswer: "Wenn ich Zeit habe, helfe ich meinem besten Freund.",
        explanation: "Verb 'habe' at end of 'wenn' clause, main clause starts with verb 'helfe', and 'helfen' takes Dative 'meinem besten Freund'."
      }
    ]
  }
];
