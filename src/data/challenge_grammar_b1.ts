import { GrammarTopic } from "../types/challenge";

export const B1_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: "b1-day-1",
    dayNumber: 1,
    level: "B1",
    title: "Relative Clauses with Dative & Prepositions",
    germanTitle: "Relativsätze mit Dativ & Präpositionen (mit dem, an der, für die...)",
    category: "Sentence Structure & Word Order",
    summary: "Relative clauses can take Dative or include prepositions. In Dative: dem (m), der (f), dem (n), denen (pl - note 'denen'!). Prepositions stand before the relative pronoun.",
    ruleExplanation: [
      "Dative relative pronouns: dem (m), der (f), dem (n), DENEN (pl - irregular!).",
      "With prepositions: The preposition comes directly before the relative pronoun: 'die Frau, MIT DER ich spreche', 'der Kollege, AN DEN ich denke'.",
      "The case is governed by the preposition or verb inside the relative clause."
    ],
    formula: "[Noun], [Preposition + Rel. Pronoun (Akk/Dat)] + ... + [Verb (End)]",
    table: {
      headers: ["Case", "Masculine (der)", "Feminine (die)", "Neuter (das)", "Plural (die)"],
      rows: [
        ["Nominativ", "der", "die", "das", "die"],
        ["Akkusativ", "den", "die", "das", "die"],
        ["Dativ", "dem", "der", "dem", "denen (special!)"],
        ["Genitiv", "dessen", "deren", "dessen", "deren"]
      ]
    },
    examples: [
      { de: "Das ist die Kollegin, mit der ich das Projekt leite.", en: "That is the colleague with whom I manage the project.", highlight: "mit der ich ... leite" },
      { de: "Die Kinder, denen wir geholfen haben, waren sehr dankbar.", en: "The children whom we helped were very grateful.", highlight: "denen wir geholfen haben" }
    ],
    commonMistake: {
      mistake: "Die Leute, den ich helfe.",
      correction: "Die Leute, denen ich helfe.",
      explanation: "The plural dative relative pronoun is 'denen', not 'den'."
    },
    drills: [
      {
        id: "b1-d1-q1",
        type: "multiple_choice",
        prompt: "Choose the plural dative relative pronoun:",
        questionSentence: "Das sind die Freunde, ___ ich immer vertrauen kann.",
        englishTranslation: "Those are the friends whom I can always trust.",
        options: ["denen", "den", "die", "deren"],
        correctAnswer: "denen",
        explanation: "'vertrauen' governs Dative, and plural relative pronoun in Dative is 'denen'."
      }
    ]
  },
  {
    id: "b1-day-2",
    dayNumber: 2,
    level: "B1",
    title: "Relative Clauses with Genitive (dessen, deren)",
    germanTitle: "Relativsätze im Genitiv (dessen, deren = whose)",
    category: "Sentence Structure & Word Order",
    summary: "Genitive relative pronouns translate to 'whose'. Masculine/Neuter = 'dessen'; Feminine/Plural = 'deren'. The following noun takes NO article!",
    ruleExplanation: [
      "Masculine & Neuter: dessen ('der Mann, dessen Auto neu ist' / 'das Kind, dessen Mutter Ärztin ist').",
      "Feminine & Plural: deren ('die Frau, deren Mann Koch ist' / 'die Eltern, deren Kinder hier spielen').",
      "Crucial rule: No article is placed after dessen/deren!"
    ],
    formula: "Masc/Neut: dessen + [Noun without art.] | Fem/Plur: deren + [Noun without art.]",
    examples: [
      { de: "Der Autor, dessen Buch weltweit berühmt wurde, hält heute einen Vortrag.", en: "The author whose book became world famous is giving a lecture today.", highlight: "dessen Buch" },
      { de: "Die Lehrerin, deren Schüler die Prüfung bestanden haben, ist stolz.", en: "The teacher whose students passed the exam is proud.", highlight: "deren Schüler" }
    ],
    commonMistake: {
      mistake: "Der Mann, dessen das Auto...",
      correction: "Der Mann, dessen Auto...",
      explanation: "Do not insert an article after 'dessen' or 'deren'."
    },
    drills: [
      {
        id: "b1-d2-q1",
        type: "cloze",
        prompt: "Choose the Genitive relative pronoun for feminine noun (die Frau):",
        questionSentence: "Hier ist die Frau, ___ Tasche gestohlen wurde.",
        englishTranslation: "Here is the woman whose bag was stolen.",
        options: ["deren", "dessen", "derer", "die"],
        correctAnswer: "deren",
        explanation: "Feminine Genitive relative pronoun is 'deren'."
      }
    ]
  },
  {
    id: "b1-day-3",
    dayNumber: 3,
    level: "B1",
    title: "Konjunktiv II: Unreal Conditions & Hypotheticals",
    germanTitle: "Konjunktiv II: Irreale Bedingungen & Wünsche (Wenn ich reich wäre...)",
    category: "Subjunctive & Passive",
    summary: "Express unreal situations, hypothetical dreams, and conditions: 'Wenn ich reich wäre (subj), würde ich (subj) eine Weltreise machen.'",
    ruleExplanation: [
      "sein -> wäre (ich wäre, du wärst, er wäre, wir wären...)",
      "haben -> hätte (ich hätte, du hättest, er hätte, wir hätten...)",
      "können -> könnte (ich könnte, du könntest...)",
      "All other verbs: würde + Infinitive (ich würde reisen, wir würden kaufen).",
      "Past hypothetical: hätte / wäre + Partizip II ('Hätte ich gelernt, hätte ich bestanden')."
    ],
    formula: "Wenn [Subject] + ... + [wäre/hätte/könnte], [würde] + [Subject] + ... + [Inf.]",
    examples: [
      { de: "Wenn ich mehr Zeit hätte, würde ich jeden Tag Sport treiben.", en: "If I had more time, I would do sports every day.", highlight: "hätte, würde ich ... treiben" },
      { de: "Wenn ich du wäre, würde ich das Angebot sofort annehmen.", en: "If I were you, I would accept the offer immediately.", highlight: "wäre, würde ich ... annehmen" }
    ],
    commonMistake: {
      mistake: "Wenn ich reich bin, würde ich ein Schloss kaufen.",
      correction: "Wenn ich reich wäre, würde ich ein Schloss kaufen.",
      explanation: "Hypothetical unreal condition requires Konjunktiv II ('wäre', not 'bin')."
    },
    drills: [
      {
        id: "b1-d3-q1",
        type: "conjugation",
        prompt: "Choose the Konjunktiv II form of 'haben' for 'ich':",
        questionSentence: "Wenn ich mehr Geld ___, würde ich mir ein Haus kaufen.",
        englishTranslation: "If I had more money, I would buy myself a house.",
        options: ["hätte", "habe", "hatte", "hättest"],
        correctAnswer: "hätte",
        explanation: "Konjunktiv II of 'haben' for 'ich' is 'hätte'."
      }
    ]
  },
  {
    id: "b1-day-4",
    dayNumber: 4,
    level: "B1",
    title: "The Passive Voice in Present Tense (Präsens Passiv)",
    germanTitle: "Das Vorgangspassiv im Präsens (werden + Partizip II)",
    category: "Subjunctive & Passive",
    summary: "The Passive focuses on the action itself rather than who performs it: 'werden' (conjugated) + Partizip II at the very end.",
    ruleExplanation: [
      "Active: 'Der Mechaniker repariert das Auto.'",
      "Passive: 'Das Auto WIRD (Pos 2) vom Mechaniker REPARIERT (End).'",
      "Conjugation of 'werden': ich werde, du wirst, er/sie/es wird, wir werden, ihr werdet, sie/Sie werden.",
      "The agent doing the action can be added with 'von' + Dative (people/agencies) or 'durch' + Accusative (means/causes)."
    ],
    formula: "[Subject] + [werden (Pos 2)] + [von + Dat] + [Partizip II (End)]",
    examples: [
      { de: "Das Haus wird jeden Samstag gründlich gereinigt.", en: "The house is cleaned thoroughly every Saturday.", highlight: "wird ... gereinigt" },
      { de: "Hier werden viele moderne Autos gebaut.", en: "Many modern cars are built here.", highlight: "werden ... gebaut" }
    ],
    commonMistake: {
      mistake: "Das Auto ist repariert von dem Mechaniker (for ongoing action).",
      correction: "Das Auto wird vom Mechaniker repariert.",
      explanation: "Process passive in present tense uses 'werden' + Partizip II."
    },
    drills: [
      {
        id: "b1-d4-q1",
        type: "multiple_choice",
        prompt: "Choose the correct passive auxiliary for singular subject:",
        questionSentence: "Der Brief ___ heute noch abgeschickt.",
        englishTranslation: "The letter is being sent off today.",
        options: ["wird", "werde", "wurde", "worden"],
        correctAnswer: "wird",
        explanation: "3rd person singular present passive uses 'wird'."
      }
    ]
  },
  {
    id: "b1-day-5",
    dayNumber: 5,
    level: "B1",
    title: "The Passive Voice in Past Tenses (Präteritum & Perfekt Passiv)",
    germanTitle: "Das Passiv in der Vergangenheit (wurde + Partizip II / ist ... worden)",
    category: "Subjunctive & Passive",
    summary: "Past passive: In written/narrative German, use Präteritum 'wurde + Partizip II'. In spoken German, use 'ist + Partizip II + worden'.",
    ruleExplanation: [
      "Präteritum Passiv (most common): 'Das Haus WURDE 1990 GEBAUT.' (wurde, wurdest, wurde, wurden, wurdet, wurden).",
      "Perfekt Passiv: 'Das Haus IST 1990 gebaut WORDEN.' (Notice: 'worden', NOT 'geworden'!).",
      "Both put the Partizip II at the end."
    ],
    formula: "Präteritum: [wurde/wurden] + ... + [Partizip II] | Perfekt: [sein] + ... + [Partizip II + worden]",
    examples: [
      { de: "Die Straße wurde wegen Bauarbeiten gesperrt.", en: "The street was blocked due to construction work.", highlight: "wurde ... gesperrt" },
      { de: "Das Dokument ist gestern unterschrieben worden.", en: "The document was signed yesterday.", highlight: "ist ... unterschrieben worden" }
    ],
    commonMistake: {
      mistake: "Das Haus ist gebaut geworden.",
      correction: "Das Haus ist gebaut worden.",
      explanation: "In passive past perfect, always use 'worden' (without ge-)."
    },
    drills: [
      {
        id: "b1-d5-q1",
        type: "cloze",
        prompt: "Choose the Präteritum passive form for 'das Auto':",
        questionSentence: "Das Auto ___ gestern in der Werkstatt repariert.",
        englishTranslation: "The car was repaired yesterday in the workshop.",
        options: ["wurde", "wurden", "wird", "war"],
        correctAnswer: "wurde",
        explanation: "Singular past passive is 'wurde'."
      }
    ]
  },
  {
    id: "b1-day-6",
    dayNumber: 6,
    level: "B1",
    title: "Passive Voice with Modal Verbs",
    germanTitle: "Passiv mit Modalverben (muss gemacht werden)",
    category: "Subjunctive & Passive",
    summary: "Combine a modal verb with the passive: Modal verb in Position 2 + Partizip II + 'werden' at the very end.",
    ruleExplanation: [
      "Present: 'Das Problem MUSS (Modal Pos 2) schnell GELÖST WERDEN (End).'",
      "Past (Präteritum): 'Das Problem MUSSTE schnell gelöst werden.'",
      "Subordinate clause: '..., weil die Rechnung bezahlt werden muss.'"
    ],
    formula: "[Modal Verb (Pos 2)] + ... + [Partizip II] + [werden (End)]",
    examples: [
      { de: "Die Hausaufgaben müssen bis morgen erledigt werden.", en: "The homework must be completed by tomorrow.", highlight: "müssen ... erledigt werden" },
      { de: "Dieses Medikament darf nicht ohne Rezept verkauft werden.", en: "This medication may not be sold without a prescription.", highlight: "darf ... verkauft werden" }
    ],
    commonMistake: {
      mistake: "Das muss werden gemacht.",
      correction: "Das muss gemacht werden.",
      explanation: "In passive modal sentences, 'werden' stands at the very end after the Partizip II."
    },
    drills: [
      {
        id: "b1-d6-q1",
        type: "word_order",
        prompt: "Complete the sentence with passive modal structure:",
        questionSentence: "Der Vertrag soll morgen ___.",
        englishTranslation: "The contract is supposed to be signed tomorrow.",
        options: ["unterschrieben werden", "werden unterschrieben", "unterschreiben wird", "unterschrieben worden"],
        correctAnswer: "unterschrieben werden",
        explanation: "Formula: Partizip II ('unterschrieben') + 'werden'."
      }
    ]
  },
  {
    id: "b1-day-7",
    dayNumber: 7,
    level: "B1",
    title: "Two-Part Connectors: sowohl ... als auch & weder ... noch",
    germanTitle: "Zweiteilige Konnektoren: sowohl ... als auch & weder ... noch",
    category: "Sentence Structure & Word Order",
    summary: "Connect two elements simultaneously: 'sowohl ... als auch' = both ... and (positive addition); 'weder ... noch' = neither ... nor (double negation without 'nicht').",
    ruleExplanation: [
      "sowohl ... als auch: 'Er spricht sowohl Deutsch als auch Französisch fließend.'",
      "weder ... noch: 'Er hat weder Zeit noch Geld.' (Notice: no 'nicht' or 'kein' needed!).",
      "They can link nouns, adjectives, or entire phrases."
    ],
    formula: "sowohl [A] als auch [B] (both A and B) | weder [A] noch [B] (neither A nor B)",
    examples: [
      { de: "Das Hotel war sowohl sauber als auch sehr preiswert.", en: "The hotel was both clean and very reasonably priced.", highlight: "sowohl ... als auch" },
      { de: "Ich habe weder den Film gesehen noch das Buch gelesen.", en: "I have neither seen the movie nor read the book.", highlight: "weder ... noch" }
    ],
    commonMistake: {
      mistake: "Ich habe nicht weder Zeit noch Geld.",
      correction: "Ich habe weder Zeit noch Geld.",
      explanation: "'weder ... noch' already contains complete negation; never add 'nicht'."
    },
    drills: [
      {
        id: "b1-d7-q1",
        type: "cloze",
        prompt: "Choose the counterpart to 'sowohl':",
        questionSentence: "Sie beherrscht sowohl Englisch ___ auch Spanisch perfekt.",
        englishTranslation: "She masters both English and Spanish perfectly.",
        options: ["als", "wie", "und", "sondern"],
        correctAnswer: "als",
        explanation: "'sowohl ... als auch' is the fixed two-part connector."
      }
    ]
  },
  {
    id: "b1-day-8",
    dayNumber: 8,
    level: "B1",
    title: "Two-Part Connectors: nicht nur ... sondern auch, entweder ... oder, zwar ... aber",
    germanTitle: "Zweiteilige Konnektoren: nicht nur ... sondern auch, entweder ... oder, zwar ... aber",
    category: "Sentence Structure & Word Order",
    summary: "Expand your rhetorical range with multi-part connectors: 'nicht nur ... sondern auch' (not only ... but also), 'entweder ... oder' (either ... or), 'zwar ... aber' (indeed ... but).",
    ruleExplanation: [
      "nicht nur ... sondern auch (emphasis on both): 'Er ist nicht nur klug, sondern auch fleißig.'",
      "entweder ... oder (alternative choice): 'Wir fahren entweder nach Rom oder nach Paris.'",
      "zwar ... aber (concession & contrast): 'Das Auto ist zwar alt, aber es fährt zuverlässig.'"
    ],
    formula: "nicht nur [A] sondern auch [B] | entweder [A] oder [B] | zwar [A] aber [B]",
    examples: [
      { de: "Wir können uns entweder heute Abend treffen oder am Samstag telefonieren.", en: "We can either meet tonight or talk on the phone on Saturday.", highlight: "entweder ... oder" },
      { de: "Er hat nicht nur die Prüfung bestanden, sondern auch eine Auszeichnung erhalten.", en: "He not only passed the exam, but also received an award.", highlight: "nicht nur ... sondern auch" }
    ],
    commonMistake: {
      mistake: "Nicht nur er lernt Deutsch, aber auch er spricht Englisch.",
      correction: "Er lernt nicht nur Deutsch, sondern spricht auch Englisch.",
      explanation: "'nicht nur' must pair with 'sondern auch', not 'aber auch'."
    },
    drills: [
      {
        id: "b1-d8-q1",
        type: "multiple_choice",
        prompt: "Choose the connector to express 'not only ... but also':",
        questionSentence: "Der Kurs war nicht nur informativ, ___ auch sehr unterhaltsam.",
        englishTranslation: "The course was not only informative, but also very entertaining.",
        options: ["sondern", "aber", "und", "als"],
        correctAnswer: "sondern",
        explanation: "'nicht nur' always pairs with 'sondern auch'."
      }
    ]
  },
  {
    id: "b1-day-9",
    dayNumber: 9,
    level: "B1",
    title: "Proportional Connector: je ... desto / umso (The ... the)",
    germanTitle: "Proportionale Konnektoren: je ... desto / umso (Komparativ)",
    category: "Sentence Structure & Word Order",
    summary: "Express proportional cause and effect: 'je' + Comparative (subordinate word order with verb at end), 'desto / umso' + Comparative (main clause word order with verb in Position 2).",
    ruleExplanation: [
      "Clause 1: 'Je' + Comparative + [Subject] + ... + [Verb (End)].",
      "Clause 2: 'desto' (or 'umso') + Comparative + [Verb (Pos 2)] + [Subject]...",
      "Example: 'Je MEHR du übst (Verb end), desto BESSER WIRST (Verb Pos 2) du.'"
    ],
    formula: "Je + [Comparative] + [Subj] + ... + [Verb (End)], desto + [Comparative] + [Verb (Pos 2)] + [Subj]...",
    examples: [
      { de: "Je früher wir losfahren, desto schneller sind wir am Ziel.", en: "The earlier we drive off, the faster we are at our destination.", highlight: "Je früher ... desto schneller sind wir" },
      { de: "Je mehr Vokabeln du lernst, umso leichter fällt dir das Sprechen.", en: "The more vocabulary words you learn, the easier speaking becomes.", highlight: "Je mehr ... umso leichter fällt" }
    ],
    commonMistake: {
      mistake: "Je mehr du lernst, desto du sprichst besser.",
      correction: "Je mehr du lernst, desto besser sprichst du.",
      explanation: "In the 'desto' clause, the comparative comes first, immediately followed by the verb: 'desto besser sprichst du'."
    },
    drills: [
      {
        id: "b1-d9-q1",
        type: "word_order",
        prompt: "Choose the correct word order after 'desto schneller':",
        questionSentence: "Je fleißiger du arbeitest, desto schneller ___ du fertig.",
        englishTranslation: "The more diligently you work, the faster you get done.",
        options: ["bist", "du bist", "bist du", "du wirst"],
        correctAnswer: "bist",
        explanation: "The verb 'bist' must follow the comparative immediately in Position 2: 'desto schneller bist du fertig'."
      }
    ]
  },
  {
    id: "b1-day-10",
    dayNumber: 10,
    level: "B1",
    title: "Temporal Subordinate Conjunctions (während, bevor, nachdem, sobald)",
    germanTitle: "Temporale Nebensätze: während (Gleichzeitigkeit), bevor, nachdem, sobald",
    category: "Sentence Structure & Word Order",
    summary: "Connect time relationships between actions: 'während' (while - simultaneous), 'bevor' (before), 'nachdem' (after - sequence of tenses), 'sobald' (as soon as), 'seitdem' (ever since).",
    ruleExplanation: [
      "All temporal conjunctions kick the verb to the end of the subordinate clause.",
      "während = while (simultaneous actions): 'Während ich koche, hört er Musik.'",
      "bevor = before: 'Bevor du gehst, mach bitte das Licht aus.'",
      "nachdem = after: requires anterior tense (Plusquamperfekt in the past: 'Nachdem er gegessen hatte, ging er schlafen').",
      "sobald = as soon as: 'Sobald ich ankomme, rufe ich dich an.'"
    ],
    formula: "[während / bevor / nachdem / sobald / seitdem] + [Subject] + ... + [Verb (End)]",
    examples: [
      { de: "Sobald die Sonne scheint, gehen wir an den See.", en: "As soon as the sun shines, we will go to the lake.", highlight: "Sobald ... scheint" },
      { de: "Während sie den Bericht schrieb, telefonierte ihr Kollege mit dem Kunden.", en: "While she wrote the report, her colleague was on the phone with the client.", highlight: "Während ... schrieb" }
    ],
    commonMistake: {
      mistake: "Nach ich habe gegessen, ging ich ins Bett.",
      correction: "Nachdem ich gegessen hatte, ging ich ins Bett.",
      explanation: "'nach' is a preposition; the conjunction meaning 'after' is 'nachdem'."
    },
    drills: [
      {
        id: "b1-d10-q1",
        type: "multiple_choice",
        prompt: "Choose the conjunction meaning 'as soon as':",
        questionSentence: "___ die Besprechung beendet ist, melde ich mich bei dir.",
        englishTranslation: "As soon as the meeting is finished, I will get in touch with you.",
        options: ["Sobald", "Während", "Bevor", "Seit"],
        correctAnswer: "Sobald",
        explanation: "'Sobald' means 'as soon as'."
      }
    ]
  },
  {
    id: "b1-day-11",
    dayNumber: 30,
    level: "B1",
    title: "B1 Grammar Synthesis & Master Review",
    germanTitle: "B1 Grammatik-Synthese: Das große Abschluss-Review",
    category: "Mastery Review",
    summary: "Congratulations on mastering B1 German Grammar! You have mastered Passiv, Konjunktiv II, relative clauses with prepositions & Genitive, complex two-part connectors, and nuanced word order.",
    ruleExplanation: [
      "Passiv: werden + Partizip II (Präsens: wird gebaut / Präteritum: wurde gebaut / Perfekt: ist gebaut worden).",
      "Konjunktiv II: wäre, hätte, könnte, würde + Infinitiv for unreal hypotheticals.",
      "Relative pronouns: mit dem (m), mit der (f), mit dem (n), mit denen (pl); dessen (m/n), deren (f/pl).",
      "Two-part connectors: sowohl... als auch, weder... noch, nicht nur... sondern auch, je... desto."
    ],
    formula: "B1 Certified: Ready for TELC / Goethe B1 Examination!",
    examples: [
      { de: "Nachdem alle Unterlagen geprüft worden waren, wurde der Vertrag, dessen Bedingungen wir besprochen hatten, unterschrieben.", en: "After all documents had been checked, the contract whose conditions we had discussed was signed.", highlight: "B1 Master Synthesis" }
    ],
    drills: [
      {
        id: "b1-d30-q1",
        type: "multiple_choice",
        prompt: "Choose the sentence that is 100% grammatically flawless in B1 German:",
        questionSentence: "Welcher Satz ist grammatisch vollkommen korrekt?",
        englishTranslation: "Which sentence is completely correct?",
        options: [
          "Je mehr Vokabeln man lernt, desto sicherer spricht man die Sprache.",
          "Je mehr Vokabeln man lernt, desto man spricht sicherer die Sprache.",
          "Je mehr Vokabeln lernt man, desto sicherer man spricht die Sprache.",
          "Je mehr Vokabeln man lernt, umso man spricht sicherer."
        ],
        correctAnswer: "Je mehr Vokabeln man lernt, desto sicherer spricht man die Sprache.",
        explanation: "Correct 'je ... desto' syntax: verb 'lernt' at end of 'je' clause; comparative 'desto sicherer' followed immediately by verb 'spricht' in main clause."
      }
    ]
  }
];
