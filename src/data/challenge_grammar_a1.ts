import { GrammarTopic } from "../types/challenge";

export const A1_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: "a1-day-1",
    dayNumber: 1,
    level: "A1",
    title: "Definite & Indefinite Articles in Nominative",
    germanTitle: "Bestimmte & Unbestimmte Artikel (der, die, das / ein, eine)",
    category: "Articles & Nouns",
    summary: "German nouns have three genders: Masculine (der/ein), Feminine (die/eine), and Neuter (das/ein). Plural uses 'die' (no indefinite plural article).",
    ruleExplanation: [
      "Every German noun has a grammatical gender and is always capitalized.",
      "In the Nominative case (the subject doing the action): Masculine = der / ein, Feminine = die / eine, Neuter = das / ein, Plural = die / (keine).",
      "Always learn every noun with its article: e.g., 'der Tisch', 'die Lampe', 'das Buch'."
    ],
    formula: "Subject = Nominativ: der (m), die (f), das (n), die (pl)",
    table: {
      headers: ["Gender", "Definite (The)", "Indefinite (A/An)", "Negative (No/Not any)"],
      rows: [
        ["Masculine (m)", "der Mann", "ein Mann", "kein Mann"],
        ["Feminine (f)", "die Frau", "eine Frau", "keine Frau"],
        ["Neuter (n)", "das Kind", "ein Kind", "kein Kind"],
        ["Plural (pl)", "die Kinder", "— (Kinder)", "keine Kinder"]
      ]
    },
    examples: [
      { de: "Das ist ein Mann. Der Mann heißt Markus.", en: "That is a man. The man is named Markus.", highlight: "ein Mann / Der Mann" },
      { de: "Hier ist eine Zeitung. Die Zeitung ist neu.", en: "Here is a newspaper. The newspaper is new.", highlight: "eine Zeitung / Die Zeitung" },
      { de: "Das Buch ist sehr interessant.", en: "The book is very interesting.", highlight: "Das Buch" }
    ],
    commonMistake: {
      mistake: "Das ist eine Buch.",
      correction: "Das ist ein Buch.",
      explanation: "'Buch' is neuter (das Buch), so use 'ein Buch', never 'eine'."
    },
    drills: [
      {
        id: "a1-d1-q1",
        type: "multiple_choice",
        prompt: "Choose the correct definite article for 'Tisch' (masculine):",
        questionSentence: "Wo steht ___ Tisch?",
        englishTranslation: "Where is the table?",
        options: ["der", "die", "das", "den"],
        correctAnswer: "der",
        explanation: "'Tisch' is masculine, and in the nominative subject position, the article is 'der'."
      },
      {
        id: "a1-d1-q2",
        type: "cloze",
        prompt: "Fill in the correct indefinite article for 'Frau' (feminine):",
        questionSentence: "Dort arbeitet ___ Ärztin.",
        englishTranslation: "A doctor (female) works there.",
        options: ["eine", "ein", "der", "die"],
        correctAnswer: "eine",
        explanation: "Feminine nouns in nominative use 'eine'."
      },
      {
        id: "a1-d1-q3",
        type: "multiple_choice",
        prompt: "Select the correct plural form of 'das Kind':",
        questionSentence: "___ spielen im Garten.",
        englishTranslation: "The children are playing in the garden.",
        options: ["Die Kinder", "Der Kinder", "Das Kinder", "Den Kinder"],
        correctAnswer: "Die Kinder",
        explanation: "All German plural nouns in the nominative take the definite article 'die'."
      }
    ]
  },
  {
    id: "a1-day-2",
    dayNumber: 2,
    level: "A1",
    title: "Personal Pronouns in Nominative",
    germanTitle: "Personalpronomen im Nominativ (ich, du, er, sie, es...)",
    category: "Pronouns",
    summary: "Personal pronouns replace nouns and act as the subject of the sentence (ich = I, du = you informal, er/sie/es = he/she/it, wir = we, ihr = you all, sie/Sie = they/You formal).",
    ruleExplanation: [
      "Use 'du' with friends, family, and children; use capital 'Sie' with strangers, in professional settings, and with superiors.",
      "Pronouns match the grammatical gender of the noun they replace: der Tisch -> er, die Lampe -> sie, das Auto -> es.",
      "'ihr' is plural informal (you guys/y'all), while 'wir' is we."
    ],
    formula: "ich, du, er/sie/es, wir, ihr, sie / Sie",
    table: {
      headers: ["Pronoun", "Meaning", "Example", "Verb Ending (Präsens)"],
      rows: [
        ["ich", "I", "ich lerne", "-e"],
        ["du", "you (informal)", "du lernst", "-st"],
        ["er / sie / es", "he / she / it", "er lernt", "-t"],
        ["wir", "we", "wir lernen", "-en"],
        ["ihr", "you all", "ihr lernt", "-t"],
        ["sie / Sie", "they / You (formal)", "sie / Sie lernen", "-en"]
      ]
    },
    examples: [
      { de: "Wo ist der Schlüssel? – Er liegt auf dem Tisch.", en: "Where is the key? – It is lying on the table.", highlight: "Er (der Schlüssel)" },
      { de: "Wie heißen Sie? – Ich heiße Anna Müller.", en: "What is your name (formal)? – I am named Anna Müller.", highlight: "Sie / Ich" },
      { de: "Habt ihr heute Zeit?", en: "Do you guys have time today?", highlight: "ihr" }
    ],
    commonMistake: {
      mistake: "Wo ist das Auto? Sie ist rot.",
      correction: "Wo ist das Auto? Es ist rot.",
      explanation: "Auto is neuter (das Auto), so the pronoun must be 'es', not 'sie'."
    },
    drills: [
      {
        id: "a1-d2-q1",
        type: "multiple_choice",
        prompt: "Replace 'die Tasche' with the correct pronoun:",
        questionSentence: "Wo ist die Tasche? ___ ist neu.",
        englishTranslation: "Where is the bag? It is new.",
        options: ["Sie", "Er", "Es", "Ihnen"],
        correctAnswer: "Sie",
        explanation: "'die Tasche' is feminine, so it is replaced by 'sie' (she/it)."
      },
      {
        id: "a1-d2-q2",
        type: "cloze",
        prompt: "Choose the pronoun for addressing a group of friends:",
        questionSentence: "Kommt ___ heute Abend zur Party?",
        englishTranslation: "Are you guys coming to the party tonight?",
        options: ["ihr", "wir", "Sie", "du"],
        correctAnswer: "ihr",
        explanation: "'ihr' is the informal plural pronoun (you all / you guys)."
      }
    ]
  },
  {
    id: "a1-day-3",
    dayNumber: 3,
    level: "A1",
    title: "Present Tense Regular Verb Conjugation",
    germanTitle: "Präsens: Regelmäßige Verben (lernen, machen, wohnen)",
    category: "Verbs & Tenses",
    summary: "Take the verb stem (infinitive minus -en) and attach regular person endings: -e, -st, -t, -en, -t, -en.",
    ruleExplanation: [
      "To conjugate: take infinitive (e.g. 'mach-en') -> stem = 'mach'.",
      "ich mach-e, du mach-st, er/sie/es mach-t, wir mach-en, ihr mach-t, sie/Sie mach-en.",
      "If the stem ends in -t or -d (e.g. 'arbeit-en'), add an extra 'e' before -st and -t: du arbeit-e-st, er arbeit-e-t."
    ],
    formula: "Stem + [-e, -st, -t, -en, -t, -en]",
    table: {
      headers: ["Subject", "lernen (to learn)", "wohnen (to live)", "arbeiten (to work)"],
      rows: [
        ["ich", "lerne", "wohne", "arbeite"],
        ["du", "lernst", "wohnst", "arbeitest"],
        ["er/sie/es", "lernt", "wohnt", "arbeitet"],
        ["wir", "lernen", "wohnen", "arbeiten"],
        ["ihr", "lernt", "wohnt", "arbeitet"],
        ["sie / Sie", "lernen", "wohnen", "arbeiten"]
      ]
    },
    examples: [
      { de: "Ich wohne in Frankfurt und lerne Deutsch.", en: "I live in Frankfurt and am learning German.", highlight: "wohne / lerne" },
      { de: "Er arbeitet bei Siemens.", en: "He works at Siemens.", highlight: "arbeitet" }
    ],
    commonMistake: {
      mistake: "Du arbeitst in Berlin.",
      correction: "Du arbeitest in Berlin.",
      explanation: "Because 'arbeit-' ends in -t, insert an 'e' for pronunciation: 'arbeitest'."
    },
    drills: [
      {
        id: "a1-d3-q1",
        type: "conjugation",
        prompt: "Conjugate 'spielen' for 'du':",
        questionSentence: "___ du gerne Fußball?",
        englishTranslation: "Do you like to play soccer?",
        options: ["Spielst", "Spielt", "Spiele", "Spielen"],
        correctAnswer: "Spielst",
        explanation: "'du' takes the ending -st -> 'spielst'."
      }
    ]
  },
  {
    id: "a1-day-4",
    dayNumber: 4,
    level: "A1",
    title: "Irregular Verbs: sein & haben",
    germanTitle: "Unregelmäßige Verben: sein (to be) & haben (to have)",
    category: "Verbs & Tenses",
    summary: "'sein' (bin, bist, ist, sind, seid, sind) and 'haben' (habe, hast, hat, haben, habt, haben) are the two most fundamental verbs in German.",
    ruleExplanation: [
      "'sein' is completely irregular: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.",
      "'haben' has a stem change for du and er/sie/es: du hast (not habst), er hat (not habt).",
      "Both are also vital auxiliary verbs for building past tense sentences."
    ],
    formula: "sein: bin/bist/ist/sind/seid/sind | haben: habe/hast/hat/haben/habt/haben",
    examples: [
      { de: "Ich bin müde, aber ich habe keine Zeit.", en: "I am tired, but I have no time.", highlight: "bin / habe" },
      { de: "Wir sind im Café und haben Hunger.", en: "We are in the café and are hungry.", highlight: "sind / haben" }
    ],
    commonMistake: {
      mistake: "Ihr sind sehr nett.",
      correction: "Ihr seid sehr nett.",
      explanation: "'ihr' conjugates with 'seid', while 'wir' and 'sie/Sie' use 'sind'."
    },
    drills: [
      {
        id: "a1-d4-q1",
        type: "multiple_choice",
        prompt: "Fill in with the correct form of 'sein':",
        questionSentence: "Wo ___ ihr gerade?",
        englishTranslation: "Where are you guys right now?",
        options: ["seid", "sind", "bist", "ist"],
        correctAnswer: "seid",
        explanation: "'ihr' pairs with 'seid'."
      }
    ]
  },
  {
    id: "a1-day-5",
    dayNumber: 5,
    level: "A1",
    title: "The Accusative Case (Direct Object)",
    germanTitle: "Der Akkusativ (Direktes Objekt): den / einen / keinen",
    category: "Cases & Prepositions",
    summary: "The direct object receiving the action takes the Accusative. Only Masculine changes from 'der/ein' to 'den/einen'!",
    ruleExplanation: [
      "Nominative is the subject (who is doing it). Accusative is the direct object (what/who is being acted upon).",
      "MASCULINE changes: der -> den, ein -> einen, kein -> keinen, mein -> meinen.",
      "Feminine, Neuter, and Plural DO NOT CHANGE: die/eine bleibt die/eine, das/ein bleibt das/ein, die/keine bleibt die/keine."
    ],
    formula: "M: den/einen | F: die/eine | N: das/ein | Pl: die/keine",
    table: {
      headers: ["Gender", "Nominative (Subject)", "Accusative (Direct Object)"],
      rows: [
        ["Masculine (m)", "der / ein / kein Apfel", "den / einen / keinen Apfel"],
        ["Feminine (f)", "die / eine / keine Suppe", "die / eine / keine Suppe"],
        ["Neuter (n)", "das / ein / kein Brötchen", "das / ein / kein Brötchen"],
        ["Plural (pl)", "die / — / keine Äpfel", "die / — / keine Äpfel"]
      ]
    },
    examples: [
      { de: "Ich habe einen Kaffee und ein Wasser bestellt.", en: "I ordered a coffee (m) and a water (n).", highlight: "einen Kaffee / ein Wasser" },
      { de: "Er sucht den Schlüssel.", en: "He is looking for the key (m).", highlight: "den Schlüssel" }
    ],
    commonMistake: {
      mistake: "Ich trinke ein Kaffee.",
      correction: "Ich trinke einen Kaffee.",
      explanation: "Kaffee is masculine (der Kaffee). In the accusative direct object position, 'ein' becomes 'einen'."
    },
    drills: [
      {
        id: "a1-d5-q1",
        type: "case_selection",
        prompt: "Choose the correct article for masculine direct object:",
        questionSentence: "Ich kaufe ___ neuen Laptop (m).",
        englishTranslation: "I am buying the new laptop.",
        options: ["den", "der", "dem", "das"],
        correctAnswer: "den",
        explanation: "Masculine direct objects in accusative take 'den'."
      },
      {
        id: "a1-d5-q2",
        type: "cloze",
        prompt: "Choose the indefinite article in accusative:",
        questionSentence: "Möchtest du ___ Tee (m)?",
        englishTranslation: "Would you like a tea?",
        options: ["einen", "ein", "eine", "einem"],
        correctAnswer: "einen",
        explanation: "Tee is masculine (der Tee), so accusative is 'einen'."
      }
    ]
  },
  {
    id: "a1-day-6",
    dayNumber: 6,
    level: "A1",
    title: "Negation: nicht vs. kein",
    germanTitle: "Verneinung: nicht vs. kein",
    category: "Pronouns & Negation",
    summary: "Use 'kein' to negate nouns with 'ein' or nouns without articles. Use 'nicht' to negate verbs, adjectives, adverbs, and specific definite nouns.",
    ruleExplanation: [
      "'kein' acts like 'ein' with a 'k-': kein Mann, keine Frau, kein Kind, keine Bücher.",
      "Use 'nicht' to negate actions (Ich komme nicht), adjectives (Das ist nicht teuer), or specific things (Ich kenne den Mann nicht).",
      "'nicht' usually stands at the end of simple sentences or before the element it negates."
    ],
    formula: "kein + [Noun with ein / no article] | nicht + [Verb / Adj / Prep / Specific Noun]",
    examples: [
      { de: "Ich habe kein Geld.", en: "I have no money.", highlight: "kein Geld" },
      { de: "Ich verstehe den Satz nicht.", en: "I do not understand the sentence.", highlight: "nicht" }
    ],
    commonMistake: {
      mistake: "Ich habe nicht Auto.",
      correction: "Ich habe kein Auto.",
      explanation: "Auto is a noun with indefinite/no article, so negate it with 'kein Auto'."
    },
    drills: [
      {
        id: "a1-d6-q1",
        type: "multiple_choice",
        prompt: "Select 'nicht' or 'kein':",
        questionSentence: "Wir haben heute ___ Zeit.",
        englishTranslation: "We have no time today.",
        options: ["keine", "nicht", "kein", "nichts"],
        correctAnswer: "keine",
        explanation: "Zeit is feminine (die Zeit), so with no article, negate with 'keine Zeit'."
      }
    ]
  },
  {
    id: "a1-day-7",
    dayNumber: 7,
    level: "A1",
    title: "Possessive Articles in Nominative",
    germanTitle: "Possessivartikel im Nominativ (mein, dein, sein, ihr...)",
    category: "Pronouns",
    summary: "Express ownership in German: mein (my), dein (your inf.), sein (his/its), ihr (her/their), unser (our), euer (your pl.), Ihr (Your formal).",
    ruleExplanation: [
      "Possessive articles take the same endings as 'ein' / 'kein' in nominative: - for masculine/neuter, -e for feminine/plural.",
      "mein Bruder (m), meine Schwester (f), mein Kind (n), meine Eltern (pl).",
      "Special spelling for euer: euer Bruder, but eur-e Schwester (drops the middle e)."
    ],
    formula: "mein/dein/sein/ihr/unser/euer/Ihr + [- (m/n), -e (f/pl)]",
    table: {
      headers: ["Person", "Masculine (der)", "Feminine (die)", "Neuter (das)", "Plural (die)"],
      rows: [
        ["ich (my)", "mein", "meine", "mein", "meine"],
        ["du (your)", "dein", "deine", "dein", "deine"],
        ["er/es (his/its)", "sein", "seine", "sein", "seine"],
        ["sie (her)", "ihr", "ihre", "ihr", "ihre"],
        ["wir (our)", "unser", "unsere", "unser", "unsere"],
        ["ihr (your pl.)", "euer", "eure", "euer", "eure"],
        ["Sie (Your formal)", "Ihr", "Ihre", "Ihr", "Ihre"]
      ]
    },
    examples: [
      { de: "Das ist mein Vater und meine Mutter.", en: "That is my father and my mother.", highlight: "mein Vater / meine Mutter" },
      { de: "Ist das eure Wohnung?", en: "Is that your (guys') apartment?", highlight: "eure Wohnung" }
    ],
    commonMistake: {
      mistake: "Das ist euere Schwester.",
      correction: "Das ist eure Schwester.",
      explanation: "'euer' loses the internal 'e' when adding an ending: 'eure', not 'euere'."
    },
    drills: [
      {
        id: "a1-d7-q1",
        type: "cloze",
        prompt: "Choose the correct possessive for 'our car' (das Auto):",
        questionSentence: "___ Auto ist sehr sparsam.",
        englishTranslation: "Our car is very economical.",
        options: ["Unser", "Unsere", "Unseres", "Unseren"],
        correctAnswer: "Unser",
        explanation: "'Auto' is neuter (das Auto), so in nominative, the possessive has no ending: 'Unser Auto'."
      }
    ]
  },
  {
    id: "a1-day-8",
    dayNumber: 8,
    level: "A1",
    title: "Basic Word Order: Statements & Yes/No Questions",
    germanTitle: "Satzbau: Aussagesätze & Ja/Nein-Fragen (Verbposition)",
    category: "Sentence Structure & Word Order",
    summary: "The Golden Rule of German: The conjugated verb is always in Position 2 in normal statements! In Yes/No questions, the verb moves to Position 1.",
    ruleExplanation: [
      "In standard main clauses, the conjugated verb is firmly locked in Position 2: 'Heute (1) gehe (2) ich ins Kino.'",
      "If you start with time or place, invert subject and verb (Verb stays 2nd): 'Morgen lerne ich' (NOT 'Morgen ich lerne').",
      "For Yes/No questions, put the verb in Position 1: 'Kommst (1) du (2) morgen?'"
    ],
    formula: "Statement: [Position 1] + [Verb (Pos 2)] + [Subject]... | Question: [Verb (Pos 1)] + [Subject]...?",
    examples: [
      { de: "Ich lerne heute Deutsch. / Heute lerne ich Deutsch.", en: "I learn German today. / Today I learn German.", highlight: "lerne (Position 2)" },
      { de: "Kommst du aus Spanien? – Ja, ich komme aus Madrid.", en: "Do you come from Spain? – Yes, I come from Madrid.", highlight: "Kommst (Position 1)" }
    ],
    commonMistake: {
      mistake: "Heute ich gehe nach Hause.",
      correction: "Heute gehe ich nach Hause.",
      explanation: "In German, the verb MUST stay in position 2. Since 'Heute' is in position 1, 'gehe' is 2nd, and 'ich' follows."
    },
    drills: [
      {
        id: "a1-d8-q1",
        type: "word_order",
        prompt: "Rearrange into correct German word order starting with 'Am Wochenende':",
        questionSentence: "Am Wochenende ___ wir Freunde.",
        englishTranslation: "On the weekend we visit friends.",
        options: ["besuchen", "wir besuchen", "besucht", "haben"],
        correctAnswer: "besuchen",
        explanation: "'Am Wochenende' is Position 1, so the verb 'besuchen' must be in Position 2."
      }
    ]
  },
  {
    id: "a1-day-9",
    dayNumber: 9,
    level: "A1",
    title: "W-Questions (W-Fragen)",
    germanTitle: "W-Fragen (Wer, Was, Wo, Woher, Wohin, Wann, Wie, Warum)",
    category: "Sentence Structure & Word Order",
    summary: "Question words starting with W occupy Position 1, followed immediately by the conjugated verb in Position 2.",
    ruleExplanation: [
      "Wer? (Who?), Was? (What?), Wo? (Where? static), Woher? (Where from?), Wohin? (Where to?).",
      "Wann? (When?), Wie? (How?), Warum? (Why?).",
      "Formula: [W-Word] + [Conjugated Verb] + [Subject] + [Rest]?"
    ],
    formula: "[W-Word (1)] + [Verb (2)] + [Subject (3)]...?",
    examples: [
      { de: "Woher kommst du?", en: "Where do you come from?", highlight: "Woher kommst" },
      { de: "Wann beginnt der Deutschkurs?", en: "When does the German course begin?", highlight: "Wann beginnt" }
    ],
    commonMistake: {
      mistake: "Wo du wohnst?",
      correction: "Wo wohnst du?",
      explanation: "The verb 'wohnst' must immediately follow the question word 'Wo'."
    },
    drills: [
      {
        id: "a1-d9-q1",
        type: "multiple_choice",
        prompt: "Choose the correct W-word for asking origin:",
        questionSentence: "___ kommst du? – Aus Italien.",
        englishTranslation: "Where do you come from? – From Italy.",
        options: ["Woher", "Wohin", "Wo", "Wer"],
        correctAnswer: "Woher",
        explanation: "'Woher' asks for origin (where from)."
      }
    ]
  },
  {
    id: "a1-day-10",
    dayNumber: 10,
    level: "A1",
    title: "Plural Forms of Nouns",
    germanTitle: "Pluralbildung der Nomen (-e, -er, -n/-en, -s)",
    category: "Articles & Nouns",
    summary: "German noun plurals use several patterns: -n/-en, -e (often with Umlaut), -er (often with Umlaut), -s, or no change.",
    ruleExplanation: [
      "Feminine nouns ending in -e almost always add -n: die Blume -> die Blumen.",
      "Most feminine nouns add -(e)n: die Frau -> die Frauen, die Zeitung -> die Zeitungen.",
      "Many masculine nouns add -e + Umlaut: der Arzt -> die Ärzte, der Tisch -> die Tische.",
      "Many neuter nouns add -er + Umlaut: das Kind -> die Kinder, das Buch -> die Bücher.",
      "Foreign words and abbreviations add -s: das Auto -> die Autos, das Hotel -> die Hotels."
    ],
    formula: "All Plurals in Nominative take 'die'!",
    examples: [
      { de: "Ein Buch, zwei Bücher.", en: "One book, two books.", highlight: "Bücher" },
      { de: "Eine Lampe, drei Lampen.", en: "One lamp, three lamps.", highlight: "Lampen" }
    ],
    commonMistake: {
      mistake: "Zwei Autos kosten viele Gelder.",
      correction: "Zwei Autos kosten viel Geld.",
      explanation: "'Geld' is uncountable in German and does not have a plural form."
    },
    drills: [
      {
        id: "a1-d10-q1",
        type: "multiple_choice",
        prompt: "What is the plural of 'das Foto'?",
        questionSentence: "Ich habe viele schöne ___ gemacht.",
        englishTranslation: "I took many beautiful photos.",
        options: ["Fotos", "Fotoen", "Föter", "Foten"],
        correctAnswer: "Fotos",
        explanation: "Foreign loanwords ending in a vowel like 'Foto' form their plural with '-s'."
      }
    ]
  },
  {
    id: "a1-day-11",
    dayNumber: 11,
    level: "A1",
    title: "Modal Verb: können (Can / Ability & Possibility)",
    germanTitle: "Modalverb: können (kann, kannst, kann, können, könnt, können)",
    category: "Verbs & Tenses",
    summary: "Modal verbs express ability, necessity, or permission. The modal verb takes Position 2, and the main verb moves to the very END of the sentence in the infinitive!",
    ruleExplanation: [
      "Conjugation of 'können': ich kann, du kannst, er/sie/es kann, wir können, ihr könnt, sie/Sie können.",
      "Notice that 'ich' and 'er/sie/es' forms have NO ending and share the exact same stem: 'kann'!",
      "Sentence Bracket (Satzklammer): 'Ich KANN (Pos 2) sehr gut Deutsch SPRECHEN (End).'"
    ],
    formula: "[Subject] + [können (Pos 2)] + ... + [Infinitive (End)]",
    examples: [
      { de: "Ich kann sehr gut schwimmen.", en: "I can swim very well.", highlight: "kann ... schwimmen" },
      { de: "Kannst du mir bitte helfen?", en: "Can you please help me?", highlight: "Kannst ... helfen" }
    ],
    commonMistake: {
      mistake: "Ich kann sprechen Deutsch.",
      correction: "Ich kann Deutsch sprechen.",
      explanation: "The second verb must be at the very END in infinitive form."
    },
    drills: [
      {
        id: "a1-d11-q1",
        type: "cloze",
        prompt: "Choose the correct form of 'können':",
        questionSentence: "Er ___ schon sehr gut Deutsch sprechen.",
        englishTranslation: "He can already speak German very well.",
        options: ["kann", "kannst", "könnt", "können"],
        correctAnswer: "kann",
        explanation: "'er' takes 'kann' (no -t ending for modal verbs in 3rd person singular)."
      }
    ]
  },
  {
    id: "a1-day-12",
    dayNumber: 12,
    level: "A1",
    title: "Modal Verb: müssen (Must / Obligation)",
    germanTitle: "Modalverb: müssen (muss, musst, muss, müssen, müsst, müssen)",
    category: "Verbs & Tenses",
    summary: "'müssen' expresses obligation or necessity (have to / must). In the singular, the stem vowel changes from ü to u.",
    ruleExplanation: [
      "ich muss, du musst, er/sie/es muss, wir müssen, ihr müsst, sie/Sie müssen.",
      "Sentence structure: Subject + müssen (Pos 2) + Object/Time + Main Verb (End).",
      "'nicht müssen' means 'do not have to' (not forbidden, just not required): 'Du musst nicht kommen' = You don't have to come."
    ],
    formula: "[Subject] + [muss/musst/muss/müssen/müsst] + ... + [Verb Inf.]",
    examples: [
      { de: "Ich muss heute lange arbeiten.", en: "I have to work long today.", highlight: "muss ... arbeiten" },
      { de: "Wir müssen den Zug pünktlich erreichen.", en: "We must catch the train on time.", highlight: "müssen ... erreichen" }
    ],
    commonMistake: {
      mistake: "Er müsst heute lernen.",
      correction: "Er muss heute lernen.",
      explanation: "'er' takes 'muss' (stem change from ü to u, no ending)."
    },
    drills: [
      {
        id: "a1-d12-q1",
        type: "multiple_choice",
        prompt: "Fill in the sentence with 'müssen':",
        questionSentence: "Morgen ___ ich früh aufstehen.",
        englishTranslation: "Tomorrow I have to get up early.",
        options: ["muss", "müsst", "musst", "müsse"],
        correctAnswer: "muss",
        explanation: "'ich' pairs with 'muss'."
      }
    ]
  },
  {
    id: "a1-day-13",
    dayNumber: 13,
    level: "A1",
    title: "Modal Verbs: wollen & möchten",
    germanTitle: "Modalverben: wollen (to want) & möchten (would like)",
    category: "Verbs & Tenses",
    summary: "'wollen' indicates a strong will or plan (ich will, du willst, er will...). 'möchten' is a polite way to say 'would like' (ich möchte, du möchtest, er möchte...).",
    ruleExplanation: [
      "wollen: ich will, du willst, er/sie/es will, wir wollen, ihr wollt, sie/Sie wollen.",
      "möchten: ich möchte, du möchtest, er/sie/es möchte, wir möchten, ihr möchtet, sie/Sie möchten.",
      "Use 'möchten' in restaurants, shops, and polite requests: 'Ich möchte einen Kaffee, bitte.'"
    ],
    formula: "[möchte / will] + ... + [Infinitive at end]",
    examples: [
      { de: "Ich möchte bitte ein Glas Wasser bestellen.", en: "I would like to order a glass of water, please.", highlight: "möchte ... bestellen" },
      { de: "Wir wollen im Sommer nach Deutschland reisen.", en: "We want to travel to Germany in the summer.", highlight: "wollen ... reisen" }
    ],
    commonMistake: {
      mistake: "Ich will ein Kaffee bitte (in a restaurant).",
      correction: "Ich möchte bitte einen Kaffee.",
      explanation: "'Ich will' sounds demanding or rude when ordering; always use 'Ich möchte'."
    },
    drills: [
      {
        id: "a1-d13-q1",
        type: "cloze",
        prompt: "Choose the polite form of 'would like' for 'wir':",
        questionSentence: "Wir ___ gerne zahlen, bitte.",
        englishTranslation: "We would like to pay, please.",
        options: ["möchten", "möchtet", "wollen", "will"],
        correctAnswer: "möchten",
        explanation: "'wir' pairs with 'möchten'."
      }
    ]
  },
  {
    id: "a1-day-14",
    dayNumber: 14,
    level: "A1",
    title: "Separable Verbs (Trennbare Verben)",
    germanTitle: "Trennbare Verben (aufstehen, einkaufen, anrufen, mitkommen)",
    category: "Verbs & Tenses",
    summary: "In present tense main clauses, separable prefixes (auf-, ein-, an-, mit-, ab-, aus-, vor-) detach from the verb and go to the very END of the sentence!",
    ruleExplanation: [
      "Common separable prefixes: ab-, an-, auf-, aus-, ein-, mit-, nach-, vor-, weg-, zu-, zurück-.",
      "Structure: [Subject] + [Conjugated Verb Stem (Pos 2)] + [Rest] + [Prefix (End)].",
      "Example: 'aufstehen' -> 'Ich STEHE um 7 Uhr AUF.'",
      "Example: 'einkaufen' -> 'Wir KAUFEN im Supermarkt EIN.'"
    ],
    formula: "[Subject] + [Verb Stem (Pos 2)] + ... + [Prefix (End)]",
    examples: [
      { de: "Ich stehe jeden Morgen um 7 Uhr auf.", en: "I get up every morning at 7 o'clock.", highlight: "stehe ... auf" },
      { de: "Rufst du mich heute Abend an?", en: "Will you call me tonight?", highlight: "Rufst ... an" }
    ],
    commonMistake: {
      mistake: "Ich aufstehe um 6 Uhr.",
      correction: "Ich stehe um 6 Uhr auf.",
      explanation: "Separable verbs must split: the prefix 'auf' goes to the end of the sentence."
    },
    drills: [
      {
        id: "a1-d14-q1",
        type: "word_order",
        prompt: "Complete the sentence with 'fernsehen' (to watch TV):",
        questionSentence: "Am Abend ___ ich gerne ___.",
        englishTranslation: "In the evening I like to watch TV.",
        options: ["sehe ... fern", "fern ... sehe", "seht ... fern", "fernsehe"],
        correctAnswer: "sehe ... fern",
        explanation: "The verb conjugates as 'sehe' in Position 2, and prefix 'fern' goes to the end."
      }
    ]
  },
  {
    id: "a1-day-15",
    dayNumber: 15,
    level: "A1",
    title: "Accusative Prepositions (DOGFU)",
    germanTitle: "Akkusativ-Präpositionen: durch, für, gegen, ohne, um",
    category: "Cases & Prepositions",
    summary: "These five prepositions ALWAYS trigger the Accusative case, no matter the context: Durch, Ohne, Gegen, Für, Um (mnemonic: DOGFU).",
    ruleExplanation: [
      "durch = through: durch den Park (m)",
      "für = for: für meinen Bruder (m), für dich",
      "gegen = against / around (time): gegen die Wand, gegen 18 Uhr",
      "ohne = without: ohne einen Cent (m)",
      "um = around / at (time): um den Tisch, um 8 Uhr"
    ],
    formula: "[durch / für / gegen / ohne / um] + AKKUSATIV",
    examples: [
      { de: "Das Geschenk ist für meinen Vater.", en: "The gift is for my father.", highlight: "für meinen Vater" },
      { de: "Ohne einen Regenschirm gehe ich nicht raus.", en: "Without an umbrella I am not going out.", highlight: "Ohne einen Regenschirm" }
    ],
    commonMistake: {
      mistake: "Das Buch ist für mein Vater.",
      correction: "Das Buch ist für meinen Vater.",
      explanation: "'für' demands accusative, so masculine becomes 'meinen Vater'."
    },
    drills: [
      {
        id: "a1-d15-q1",
        type: "case_selection",
        prompt: "Choose the correct article after 'ohne':",
        questionSentence: "Er trinkt Kaffee ohne ___ Zucker (m).",
        englishTranslation: "He drinks coffee without sugar.",
        options: ["den", "dem", "der", "des"],
        correctAnswer: "den",
        explanation: "'ohne' takes accusative: 'den Zucker'."
      }
    ]
  },
  {
    id: "a1-day-16",
    dayNumber: 16,
    level: "A1",
    title: "The Dative Case Basics (Indirect Object)",
    germanTitle: "Der Dativ: dem, der, dem, den (+n)",
    category: "Cases & Prepositions",
    summary: "The Dative case is used for the indirect object (to whom/for whom). Articles change: der/das -> dem, die -> der, die (pl) -> den + n on noun!",
    ruleExplanation: [
      "Masculine (der) -> dem / einem / keinem / meinem",
      "Feminine (die) -> der / einer / keiner / meiner",
      "Neuter (das) -> dem / einem / keinem / meinem",
      "Plural (die) -> den / — / keinen / meinen + add '-n' to noun if possible (den Kindern)."
    ],
    formula: "M: dem | F: der | N: dem | Pl: den + Noun-n",
    table: {
      headers: ["Gender", "Nominative", "Accusative", "Dative"],
      rows: [
        ["Masculine (m)", "der Mann", "den Mann", "dem Mann"],
        ["Feminine (f)", "die Frau", "die Frau", "der Frau"],
        ["Neuter (n)", "das Kind", "das Kind", "dem Kind"],
        ["Plural (pl)", "die Kinder", "die Kinder", "den Kindern (+n)"]
      ]
    },
    examples: [
      { de: "Ich gebe dem Mann das Buch.", en: "I give the man (Dat) the book (Akk).", highlight: "dem Mann" },
      { de: "Er hilft der Frau.", en: "He is helping the woman (Dat).", highlight: "der Frau" }
    ],
    commonMistake: {
      mistake: "Ich helfe die Frau.",
      correction: "Ich helfe der Frau.",
      explanation: "The verb 'helfen' requires the dative case. Feminine in dative is 'der Frau'."
    },
    drills: [
      {
        id: "a1-d16-q1",
        type: "case_selection",
        prompt: "Choose the correct dative article for 'der Lehrer' (m):",
        questionSentence: "Die Schülerin antwortet ___ Lehrer.",
        englishTranslation: "The student answers the teacher.",
        options: ["dem", "den", "der", "des"],
        correctAnswer: "dem",
        explanation: "Masculine in dative takes 'dem'."
      }
    ]
  },
  {
    id: "a1-day-17",
    dayNumber: 17,
    level: "A1",
    title: "Dative Prepositions (aus, bei, mit, nach, seit, von, zu)",
    germanTitle: "Dativ-Präpositionen: aus, bei, mit, nach, seit, von, zu",
    category: "Cases & Prepositions",
    summary: "These prepositions ALWAYS trigger the Dative case: aus, bei, mit, nach, seit, von, zu, ab, gegenüber.",
    ruleExplanation: [
      "aus = from / out of: aus der Schweiz",
      "bei = at / with: beim Arzt (bei + dem = beim)",
      "mit = with / by means of: mit dem Bus, mit meiner Freundin",
      "nach = after / to (cities/countries): nach der Arbeit, nach Berlin",
      "seit = since / for (duration): seit einem Jahr",
      "von = from / of: vom Bahnhof (von + dem = vom)",
      "zu = to: zum Supermarkt (zu + dem = zum), zur Schule (zu + der = zur)"
    ],
    formula: "[aus, bei, mit, nach, seit, von, zu] + DATIV",
    examples: [
      { de: "Ich fahre mit dem Zug zur Arbeit.", en: "I travel by train (m) to work (f).", highlight: "mit dem Zug / zur Arbeit" },
      { de: "Ich wohne seit einem Monat in Wien.", en: "I have been living in Vienna for a month.", highlight: "seit einem Monat" }
    ],
    commonMistake: {
      mistake: "Ich fahre mit den Bus.",
      correction: "Ich fahre mit dem Bus.",
      explanation: "'mit' demands dative. Masculine 'der Bus' becomes 'dem Bus'."
    },
    drills: [
      {
        id: "a1-d17-q1",
        type: "multiple_choice",
        prompt: "Fill in the correct article after 'mit':",
        questionSentence: "Kommst du mit ___ Freundin (f)?",
        englishTranslation: "Are you coming with your girlfriend?",
        options: ["deiner", "deine", "deinen", "deinem"],
        correctAnswer: "deiner",
        explanation: "'mit' takes dative, and feminine possessive in dative is 'deiner'."
      }
    ]
  },
  {
    id: "a1-day-18",
    dayNumber: 18,
    level: "A1",
    title: "The Imperative: Commands & Requests",
    germanTitle: "Der Imperativ (du, ihr, Sie)",
    category: "Verbs & Tenses",
    summary: "Give commands or instructions in German depending on who you address: du (drop -st and du), ihr (verb stem + t, drop ihr), Sie (Verb + Sie).",
    ruleExplanation: [
      "du-form (informal singular): 'Komm!' / 'Lern!' / 'Mach!' (Drop the -st and pronoun 'du'). Vowel change e->i remains: 'Lies!' (lesen), 'Sprich!' (sprechen).",
      "ihr-form (informal plural): 'Kommt!' / 'Lernt!' (Regular 2nd person plural, drop 'ihr').",
      "Sie-form (formal): 'Kommen Sie!' / 'Lernen Sie bitte!' (Keep 'Sie' after verb)."
    ],
    formula: "du: [Stem]! | ihr: [Stem+t]! | Sie: [Verb-en Sie]!",
    examples: [
      { de: "Komm bitte pünktlich! (du)", en: "Please come on time!", highlight: "Komm" },
      { de: "Öffnen Sie bitte das Fenster! (Sie)", en: "Please open the window!", highlight: "Öffnen Sie" }
    ],
    commonMistake: {
      mistake: "Du mach deine Hausaufgaben!",
      correction: "Mach deine Hausaufgaben!",
      explanation: "In the informal 'du' imperative, drop the pronoun 'du' and the '-st' ending."
    },
    drills: [
      {
        id: "a1-d18-q1",
        type: "conjugation",
        prompt: "Form the 'du' imperative for 'warten':",
        questionSentence: "___ bitte hier auf mich!",
        englishTranslation: "Please wait here for me!",
        options: ["Warte", "Wartest", "Wartet", "Warten"],
        correctAnswer: "Warte",
        explanation: "Verbs ending in -t/-d add an -e in the du imperative: 'Warte!'."
      }
    ]
  },
  {
    id: "a1-day-19",
    dayNumber: 19,
    level: "A1",
    title: "Ordinal Numbers & Calendar Dates",
    germanTitle: "Ordinalzahlen & Datum (am ersten, am zweiten...)",
    category: "Adjectives & Adverbs",
    summary: "Ordinal numbers: 1st to 19th add '-te' (or '-ten' after 'am'). 20th and above add '-ste' / '-sten'.",
    ruleExplanation: [
      "Basic ordinal: der 1. (erste), der 2. (zweite), der 3. (dritte), der 7. (siebte), der 20. (zwanzigste).",
      "With 'am' (an + dem = dative): 'am ersten Mai' (on May 1st), 'am einunddreißigsten Dezember'.",
      "Saying the year: 1995 = 'neunzehnhundertfünfundneunzig' (NOT eintausend...); 2024 = 'zweitausendvierundzwanzig'."
    ],
    formula: "am + [Number + ten] + [Month]",
    examples: [
      { de: "Ich habe am dritten Oktober Geburtstag.", en: "My birthday is on October 3rd.", highlight: "am dritten Oktober" },
      { de: "Heute ist der einundzwanzigste August.", en: "Today is the twenty-first of August.", highlight: "der einundzwanzigste" }
    ],
    commonMistake: {
      mistake: "Ich komme am ein Mai.",
      correction: "Ich komme am ersten Mai.",
      explanation: "Dates with 'am' require the ordinal with '-ten': 'am ersten Mai'."
    },
    drills: [
      {
        id: "a1-d19-q1",
        type: "cloze",
        prompt: "Choose the correct date expression for May 1st:",
        questionSentence: "Das Fest ist am ___ Mai.",
        englishTranslation: "The festival is on May 1st.",
        options: ["ersten", "erste", "eins", "einem"],
        correctAnswer: "ersten",
        explanation: "'am' requires the dative ending '-ten' -> 'am ersten'."
      }
    ]
  },
  {
    id: "a1-day-20",
    dayNumber: 20,
    level: "A1",
    title: "Time Prepositions: um, am, im",
    germanTitle: "Temporale Präpositionen: um, am, im (Uhrzeit, Tage, Monate)",
    category: "Cases & Prepositions",
    summary: "Use 'um' for exact clock times, 'am' for days and parts of the day, and 'im' for months, seasons, and years.",
    ruleExplanation: [
      "um: clock time (um 8 Uhr, um halb neun).",
      "am: days of week, dates, parts of day (am Montag, am Wochenende, am Morgen; BUT: in der Nacht!).",
      "im (in + dem): months & seasons (im Januar, im Sommer, im Herbst)."
    ],
    formula: "um [Time] | am [Day/Date] | im [Month/Season]",
    table: {
      headers: ["Preposition", "Usage", "Examples"],
      rows: [
        ["um", "Clock times", "um 14:00 Uhr, um Viertel vor acht"],
        ["am", "Days, dates, parts of day", "am Freitag, am 10. Mai, am Abend (exc: in der Nacht)"],
        ["im", "Months, seasons", "im Juli, im Frühling, im Winter"]
      ]
    },
    examples: [
      { de: "Der Zug fährt um 15:30 Uhr ab.", en: "The train departs at 15:30.", highlight: "um 15:30 Uhr" },
      { de: "Im Sommer fahre ich am Wochenende ans Meer.", en: "In summer I travel to the sea on the weekend.", highlight: "Im Sommer / am Wochenende" }
    ],
    commonMistake: {
      mistake: "Ich treffe dich in Montag um Juli.",
      correction: "Ich treffe dich am Montag im Juli.",
      explanation: "Days take 'am' (am Montag), and months take 'im' (im Juli)."
    },
    drills: [
      {
        id: "a1-d20-q1",
        type: "multiple_choice",
        prompt: "Choose the correct time preposition for Sunday:",
        questionSentence: "___ Sonntag schlafe ich lange.",
        englishTranslation: "On Sunday I sleep in.",
        options: ["Am", "Im", "Um", "In"],
        correctAnswer: "Am",
        explanation: "Days of the week always take 'am'."
      }
    ]
  },
  {
    id: "a1-day-21",
    dayNumber: 21,
    level: "A1",
    title: "Predicative Adjectives (No Endings)",
    germanTitle: "Prädikative Adjektive (ohne Endung nach sein/bleiben/werden)",
    category: "Adjectives & Adverbs",
    summary: "When an adjective comes after 'sein', 'werden', or 'bleiben' (predicative), it does NOT take any grammatical ending!",
    ruleExplanation: [
      "Adjectives modifying the subject after 'sein': 'Der Mann ist alt.' 'Die Frau ist alt.' 'Die Kinder sind alt.'",
      "Unlike French or Spanish, German predicative adjectives remain in base dictionary form.",
      "Only adjectives directly in front of a noun (attributive) take declension endings."
    ],
    formula: "[Noun] + [ist / sind] + [Adjective with NO ending]",
    examples: [
      { de: "Das Auto ist schnell und teuer.", en: "The car is fast and expensive.", highlight: "schnell / teuer" },
      { de: "Die Blumen sind sehr schön.", en: "The flowers are very beautiful.", highlight: "schön" }
    ],
    commonMistake: {
      mistake: "Die Schuhe sind teuere.",
      correction: "Die Schuhe sind teuer.",
      explanation: "Predicative adjectives after 'sein' take NO ending."
    },
    drills: [
      {
        id: "a1-d21-q1",
        type: "cloze",
        prompt: "Fill in with the base adjective form:",
        questionSentence: "Das Zimmer ist sehr ___ (clean).",
        englishTranslation: "The room is very clean.",
        options: ["sauber", "sauberes", "saubere", "saubern"],
        correctAnswer: "sauber",
        explanation: "Predicative adjectives take no ending: 'sauber'."
      }
    ]
  },
  {
    id: "a1-day-22",
    dayNumber: 22,
    level: "A1",
    title: "Accusative Personal Pronouns",
    germanTitle: "Personalpronomen im Akkusativ (mich, dich, ihn, sie, es...)",
    category: "Pronouns",
    summary: "When a person pronoun is the direct object: ich -> mich, du -> dich, er -> ihn, sie -> sie, es -> es, wir -> uns, ihr -> euch, sie/Sie -> sie/Sie.",
    ruleExplanation: [
      "ich -> mich (me)",
      "du -> dich (you)",
      "er -> ihn (him - changes!)",
      "sie -> sie (her), es -> es (it)",
      "wir -> uns (us), ihr -> euch (you guys), sie/Sie -> sie/Sie (them/You formal)."
    ],
    formula: "Nominativ: ich, du, er -> Akkusativ: mich, dich, ihn",
    examples: [
      { de: "Liebst du mich? – Ja, ich liebe dich.", en: "Do you love me? – Yes, I love you.", highlight: "mich / dich" },
      { de: "Kennst du Thomas? – Ja, ich kenne ihn gut.", en: "Do you know Thomas? – Yes, I know him well.", highlight: "ihn" }
    ],
    commonMistake: {
      mistake: "Ich sehe er im Park.",
      correction: "Ich sehe ihn im Park.",
      explanation: "'er' in the accusative direct object position becomes 'ihn'."
    },
    drills: [
      {
        id: "a1-d22-q1",
        type: "multiple_choice",
        prompt: "Replace 'meinen Bruder' with the correct accusative pronoun:",
        questionSentence: "Ich rufe ___ morgen an.",
        englishTranslation: "I will call him tomorrow.",
        options: ["ihn", "ihm", "er", "sein"],
        correctAnswer: "ihn",
        explanation: "'anrufen' requires accusative, so 'er' becomes 'ihn'."
      }
    ]
  },
  {
    id: "a1-day-23",
    dayNumber: 23,
    level: "A1",
    title: "Dative Personal Pronouns",
    germanTitle: "Personalpronomen im Dativ (mir, dir, ihm, ihr, uns, euch, ihnen/Ihnen)",
    category: "Pronouns",
    summary: "When a pronoun receives something or follows a dative verb: ich -> mir, du -> dir, er/es -> ihm, sie -> ihr, wir -> uns, ihr -> euch, sie/Sie -> ihnen/Ihnen.",
    ruleExplanation: [
      "Common dative phrases: 'Wie geht es dir?' (How are you?), 'Das schmeckt mir' (It tastes good to me).",
      "'Er gibt mir das Buch' (He gives me the book).",
      "'Ich danke Ihnen' (I thank You formal)."
    ],
    formula: "ich -> mir | du -> dir | er/es -> ihm | sie -> ihr | wir -> uns | ihr -> euch | sie/Sie -> ihnen/Ihnen",
    examples: [
      { de: "Wie geht es dir? – Danke, mir geht es gut!", en: "How are you? – Thanks, I am doing well!", highlight: "dir / mir" },
      { de: "Kannst du mir bitte helfen?", en: "Can you please help me?", highlight: "mir" }
    ],
    commonMistake: {
      mistake: "Wie geht es dich?",
      correction: "Wie geht es dir?",
      explanation: "'Wie geht es' requires the dative pronoun 'dir'."
    },
    drills: [
      {
        id: "a1-d23-q1",
        type: "cloze",
        prompt: "Fill in the correct dative pronoun for 'ich':",
        questionSentence: "Das Kleid gefällt ___ sehr gut.",
        englishTranslation: "I like the dress very much (The dress pleases me).",
        options: ["mir", "mich", "ich", "meine"],
        correctAnswer: "mir",
        explanation: "The verb 'gefallen' takes dative -> 'mir'."
      }
    ]
  },
  {
    id: "a1-day-24",
    dayNumber: 24,
    level: "A1",
    title: "Coordinating Conjunctions: und, aber, oder, denn",
    germanTitle: "Hauptsatz-Konjunktionen (Position 0): und, aber, oder, denn, sondern",
    category: "Sentence Structure & Word Order",
    summary: "These connectors link two independent clauses without changing the normal Position 2 word order (Position 0). ADUSO: Aber, Denn, Und, Sondern, Oder.",
    ruleExplanation: [
      "und = and, aber = but, oder = or, denn = because / for, sondern = but rather (after a negation).",
      "Because they take Position 0, the next clause starts fresh with Position 1 (Subject) + Position 2 (Verb).",
      "'Ich bleibe zu Hause (0), denn (0) ich (1) bin (2) krank.'"
    ],
    formula: "[Clause 1] + [und / aber / oder / denn / sondern (Pos 0)] + [Subject (Pos 1)] + [Verb (Pos 2)]",
    examples: [
      { de: "Ich lerne Deutsch, denn ich möchte in Wien studieren.", en: "I am learning German, because I want to study in Vienna.", highlight: "denn ich möchte" },
      { de: "Er ist müde, aber er arbeitet weiter.", en: "He is tired, but he continues working.", highlight: "aber er arbeitet" }
    ],
    commonMistake: {
      mistake: "Ich bleibe hier, denn ich krank bin.",
      correction: "Ich bleibe hier, denn ich bin krank.",
      explanation: "'denn' is a Position 0 coordinator; the verb 'bin' must remain in Position 2!"
    },
    drills: [
      {
        id: "a1-d24-q1",
        type: "multiple_choice",
        prompt: "Choose the conjunction meaning 'because' (Position 0):",
        questionSentence: "Ich trinke Wasser, ___ ich habe großen Durst.",
        englishTranslation: "I drink water because I am very thirsty.",
        options: ["denn", "weil", "dass", "ob"],
        correctAnswer: "denn",
        explanation: "'denn' connects main clauses with the verb 'habe' in Position 2."
      }
    ]
  },
  {
    id: "a1-day-25",
    dayNumber: 25,
    level: "A1",
    title: "Compound Nouns (Komposita)",
    germanTitle: "Zusammengesetzte Nomen (Komposita)",
    category: "Articles & Nouns",
    summary: "German can create new compound nouns by gluing words together. The LAST noun determines the gender and plural of the entire compound!",
    ruleExplanation: [
      "das Wort + das Buch = das Wörterbuch (dictionary)",
      "der Kaffee + die Tasse = die Kaffeetasse (coffee cup - gender comes from die Tasse)",
      "Often a linking element (Fugenelement) like -s-, -n-, -en-, or -er- is inserted: die Geburt + der Tag = der Geburtstag."
    ],
    formula: "Word 1 + Word 2 + [Main Noun] -> Gender of Main Noun!",
    examples: [
      { de: "die Haustür (das Haus + die Tür = die Haustür)", en: "the front door", highlight: "die Tür -> die Haustür" },
      { de: "der Bahnhof (die Bahn + der Hof = der Bahnhof)", en: "the train station", highlight: "der Hof -> der Bahnhof" }
    ],
    commonMistake: {
      mistake: "das Kaffeetasse",
      correction: "die Kaffeetasse",
      explanation: "The last word is 'die Tasse' (feminine), so the compound is 'die Kaffeetasse'."
    },
    drills: [
      {
        id: "a1-d25-q1",
        type: "multiple_choice",
        prompt: "What is the article for 'Krankenhaus' (krank + das Haus)?",
        questionSentence: "Er liegt im ___ (in + dem) Krankenhaus.",
        englishTranslation: "He is in the hospital.",
        options: ["das", "die", "der", "den"],
        correctAnswer: "das",
        explanation: "'Haus' is neuter (das Haus), so 'das Krankenhaus'."
      }
    ]
  },
  {
    id: "a1-day-26",
    dayNumber: 26,
    level: "A1",
    title: "Perfect Tense with 'haben' (Conversational Past)",
    germanTitle: "Das Perfekt mit 'haben' (ge-kauf-t, ge-lern-t)",
    category: "Verbs & Tenses",
    summary: "In spoken German, use the Perfekt for the past: Present tense of 'haben' (Pos 2) + Past Participle (Partizip II) at the very END.",
    ruleExplanation: [
      "Regular Partizip II formula: ge- + [Verb Stem] + -t (ge-lern-t, ge-kauf-t, ge-hör-t).",
      "Sentence structure: Subject + haben (Pos 2) + ... + Partizip II (End).",
      "Verbs ending in -ieren do NOT take 'ge-': studiert, telefoniert, repariert."
    ],
    formula: "[haben (Pos 2)] + ... + [ge- + Stem + -t (End)]",
    examples: [
      { de: "Ich habe gestern Deutsch gelernt.", en: "I studied German yesterday.", highlight: "habe ... gelernt" },
      { de: "Wir haben eine Pizza bestellt.", en: "We ordered a pizza.", highlight: "haben ... bestellt" }
    ],
    commonMistake: {
      mistake: "Ich habe gelernt gestern Deutsch.",
      correction: "Ich habe gestern Deutsch gelernt.",
      explanation: "The Partizip II 'gelernt' must stand at the very END of the clause."
    },
    drills: [
      {
        id: "a1-d26-q1",
        type: "cloze",
        prompt: "Form the Partizip II for 'machen':",
        questionSentence: "Was hast du am Wochenende ___?",
        englishTranslation: "What did you do on the weekend?",
        options: ["gemacht", "gemachen", "macht", "gemachten"],
        correctAnswer: "gemacht",
        explanation: "machen -> ge- + mach + -t = 'gemacht'."
      }
    ]
  },
  {
    id: "a1-day-27",
    dayNumber: 27,
    level: "A1",
    title: "Perfect Tense with 'sein' (Movement & State Change)",
    germanTitle: "Das Perfekt mit 'sein' (gegangen, gefahren, aufgestanden)",
    category: "Verbs & Tenses",
    summary: "Verbs indicating movement from A to B (gehen, fahren, fliegen, kommen) or a change of state (aufstehen, einschlafen, sterben) use 'sein' instead of 'haben'!",
    ruleExplanation: [
      "Movement: gehen (ist gegangen), fahren (ist gefahren), fliegen (ist geflogen), kommen (ist gekommen).",
      "State change: aufwachen (ist aufgewacht), einschlafen (ist eingeschlafen).",
      "Exceptions: sein (ist gewesen), bleiben (ist geblieben), passieren (ist passiert)."
    ],
    formula: "[sein (Pos 2)] + ... + [Partizip II (End)]",
    examples: [
      { de: "Ich bin nach Berlin gefahren.", en: "I drove / traveled to Berlin.", highlight: "bin ... gefahren" },
      { de: "Wann bist du heute aufgestanden?", en: "When did you get up today?", highlight: "bist ... aufgestanden" }
    ],
    commonMistake: {
      mistake: "Ich habe nach Hause gegangen.",
      correction: "Ich bin nach Hause gegangen.",
      explanation: "'gehen' involves movement from one place to another, so it requires 'sein' (bin gegangen)."
    },
    drills: [
      {
        id: "a1-d27-q1",
        type: "multiple_choice",
        prompt: "Choose the auxiliary verb for 'fliegen':",
        questionSentence: "Wir ___ nach Spanien geflogen.",
        englishTranslation: "We flew to Spain.",
        options: ["sind", "haben", "waren", "hatten"],
        correctAnswer: "sind",
        explanation: "'fliegen' is a verb of movement and takes 'sein' (wir sind geflogen)."
      }
    ]
  },
  {
    id: "a1-day-28",
    dayNumber: 28,
    level: "A1",
    title: "Modal Verbs: dürfen & sollen",
    germanTitle: "Modalverben: dürfen (permission/allowed) & sollen (should/supposed to)",
    category: "Verbs & Tenses",
    summary: "'dürfen' expresses permission (darf, darfst, darf...). 'nicht dürfen' means 'MUST NOT' (forbidden!). 'sollen' expresses advice or duty (soll, sollst, soll...).",
    ruleExplanation: [
      "dürfen: ich darf, du darfst, er/sie/es darf, wir dürfen, ihr dürft, sie/Sie dürfen.",
      "sollen: ich soll, du sollst, er/sie/es soll, wir sollen, ihr sollt, sie/Sie sollen.",
      "CRITICAL: 'Hier darf man nicht rauchen' = Smoking is strictly forbidden here!"
    ],
    formula: "[darf / soll (Pos 2)] + ... + [Infinitive (End)]",
    examples: [
      { de: "Darf ich hier parken?", en: "Am I allowed to park here?", highlight: "Darf ... parken" },
      { de: "Der Arzt sagt, ich soll viel Wasser trinken.", en: "The doctor says I should drink a lot of water.", highlight: "soll ... trinken" }
    ],
    commonMistake: {
      mistake: "Hier muss man nicht parken (when forbidden).",
      correction: "Hier darf man nicht parken.",
      explanation: "'nicht müssen' means 'don't have to'. For forbidden actions, you must say 'nicht dürfen'."
    },
    drills: [
      {
        id: "a1-d28-q1",
        type: "multiple_choice",
        prompt: "Choose the modal meaning 'not allowed / forbidden':",
        questionSentence: "Man ___ im Flugzeug nicht rauchen.",
        englishTranslation: "One is not allowed to smoke on the airplane.",
        options: ["darf", "muss", "soll", "will"],
        correctAnswer: "darf",
        explanation: "'nicht dürfen' expresses prohibition (not allowed)."
      }
    ]
  },
  {
    id: "a1-day-29",
    dayNumber: 29,
    level: "A1",
    title: "Two-Way Prepositions in Accusative (Movement / Direction)",
    germanTitle: "Wechselpräpositionen im Akkusativ (Wohin? Richtung / Bewegung)",
    category: "Cases & Prepositions",
    summary: "The 9 two-way prepositions (an, auf, hinter, in, neben, über, unter, vor, zwischen) take ACCUSATIVE when answering 'Wohin?' (direction / movement to a destination).",
    ruleExplanation: [
      "The 9 two-way prepositions: an, auf, hinter, in, neben, über, unter, vor, zwischen.",
      "Question 'Wohin?' (Where to?) -> AKKUSATIV: in den Park (m), auf den Tisch (m), in die Stadt (f), ins Kino (in + das).",
      "Contrast with 'Wo?' (static location) which takes Dative."
    ],
    formula: "Wohin? (Movement) -> Wechselpräposition + AKKUSATIV",
    examples: [
      { de: "Ich gehe in den Supermarkt.", en: "I am going into the supermarket (m).", highlight: "in den Supermarkt" },
      { de: "Er legt das Buch auf den Tisch.", en: "He places the book onto the table (m).", highlight: "auf den Tisch" }
    ],
    commonMistake: {
      mistake: "Ich gehe in dem Park.",
      correction: "Ich gehe in den Park.",
      explanation: "Going into the park is a movement answering 'Wohin?', so use Accusative 'den Park'."
    },
    drills: [
      {
        id: "a1-d29-q1",
        type: "case_selection",
        prompt: "Choose the accusative article for movement onto 'der Tisch':",
        questionSentence: "Stell die Tasse bitte auf ___ Tisch!",
        englishTranslation: "Please put the cup onto the table!",
        options: ["den", "dem", "der", "das"],
        correctAnswer: "den",
        explanation: "Placing an item onto a table is movement (Wohin?), requiring Accusative 'den'."
      }
    ]
  },
  {
    id: "a1-day-30",
    dayNumber: 30,
    level: "A1",
    title: "A1 Grammar Synthesis & Master Review",
    germanTitle: "A1 Grammatik-Synthese: Das große Abschluss-Review",
    category: "Mastery Review",
    summary: "Congratulations on completing 30 days of A1 Grammar! Review key building blocks: Genders, Cases (Nom/Akk/Dat), Verb conjugations, and Word order.",
    ruleExplanation: [
      "Rule 1: German verb is ALWAYS in Position 2 in main statements.",
      "Rule 2: Accusative is the direct object (den/einen). Dative is the indirect object or after dative prepositions (dem/der/dem/den).",
      "Rule 3: Perfekt tense: haben/sein + Partizip II at the end.",
      "Rule 4: Modal verbs put the infinitive at the end."
    ],
    formula: "A1 Mastered: Pronouns + Cases + Verbs + Word Order = Confident German Speaker!",
    examples: [
      { de: "Ich habe gestern mit meiner Mutter telefoniert und wir wollen uns morgen treffen.", en: "I spoke with my mother yesterday on the phone and we want to meet tomorrow.", highlight: "Perfekt & Modalverb" }
    ],
    drills: [
      {
        id: "a1-d30-q1",
        type: "multiple_choice",
        prompt: "Comprehensive review: choose the correct sentence:",
        questionSentence: "Welcher Satz ist grammatisch vollkommen richtig?",
        englishTranslation: "Which sentence is grammatically completely correct?",
        options: [
          "Gestern habe ich einen interessanten Film gesehen.",
          "Gestern ich habe einen interessanten Film gesehen.",
          "Gestern habe ich ein interessanten Film gesehen.",
          "Gestern habe ich gesehen einen Film."
        ],
        correctAnswer: "Gestern habe ich einen interessanten Film gesehen.",
        explanation: "Verb 'habe' in Position 2, accusative masculine 'einen', and Partizip II 'gesehen' at the end."
      }
    ]
  }
];
