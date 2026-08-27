import { GrammarTopic } from "../types/challenge";

export const B2_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: "b2-day-1",
    dayNumber: 1,
    level: "B2",
    title: "Konjunktiv I: Reported & Indirect Speech",
    germanTitle: "Der Konjunktiv I: Indirekte Rede (er behaupte, sie sei, man habe)",
    category: "Subjunctive & Passive",
    summary: "Konjunktiv I is used in journalism and formal writing to report quotes and statements neutrally without endorsing their truth: 'Der Minister sagte, die Lage SEI stabil.'",
    ruleExplanation: [
      "Base formation: Verb stem + Konjunktiv endings (-e, -est, -e, -en, -et, -en).",
      "Special 'sein' forms: ich sei, du sei(e)st, er/sie/es sei, wir seien, ihr seiet, sie seien.",
      "Rule of replacement: If the Konjunktiv I form is identical to the Indikativ Präsens (especially in 'ich', 'wir', 'sie'), replace it with Konjunktiv II (or 'würde' + Infinitiv) to avoid ambiguity.",
      "Past reported speech: 'sei' / 'habe' + Partizip II ('Er sagte, er habe die Unterlagen bereits gesendet')."
    ],
    formula: "Stem + [-e, -est, -e, -en, -et, -en] | 'sein': sei, seiest, sei, seien, seiet, seien",
    table: {
      headers: ["Person", "sein", "haben", "wissen", "Regular (kommen)"],
      rows: [
        ["er/sie/es", "sei", "habe", "wisse", "komme"],
        ["wir", "seien (K1)", "hätten (K2)", "wüssten (K2)", "kämen / würden kommen (K2)"],
        ["sie (pl)", "seien (K1)", "hätten (K2)", "wüssten (K2)", "kämen / würden kommen (K2)"]
      ]
    },
    examples: [
      { de: "Der Sprecher betonte, das Unternehmen stehe vor großen Herausforderungen.", en: "The spokesperson emphasized that the company faces major challenges.", highlight: "stehe" },
      { de: "Die Zeugin sagte aus, sie habe den Unfallhergang genau beobachtet.", en: "The witness testified that she observed the accident precisely.", highlight: "habe ... beobachtet" }
    ],
    commonMistake: {
      mistake: "Er behauptet, dass er ist unschuldig.",
      correction: "Er behauptet, er sei unschuldig.",
      explanation: "In formal reported speech, use Konjunktiv I 'sei' without 'dass' or with 'dass er unschuldig sei'."
    },
    drills: [
      {
        id: "b2-d1-q1",
        type: "conjugation",
        prompt: "Choose the 3rd person singular Konjunktiv I form of 'sein':",
        questionSentence: "Der Experte meint, die wirtschaftliche Lage ___ derzeit stabil.",
        englishTranslation: "The expert believes that the economic situation is currently stable.",
        options: ["sei", "wäre", "ist", "seien"],
        correctAnswer: "sei",
        explanation: "3rd person singular Konjunktiv I of 'sein' is 'sei'."
      }
    ]
  },
  {
    id: "b2-day-2",
    dayNumber: 2,
    level: "B2",
    title: "Extended Participle Attributes (Erweiterte Partizipien)",
    germanTitle: "Erweiterte Partizipialattribute (die vom Experten überprüften Daten)",
    category: "Adjectives & Adverbs",
    summary: "In academic and formal German, relative clauses are often compressed into dense adjective constructions placed directly in front of the noun.",
    ruleExplanation: [
      "Relative clause: 'die Daten, die gestern von Experten überprüft wurden'",
      "Extended Participle: 'die [gestern von Experten überprüften] Daten'",
      "Structure: [Article] + [Descriptive / Adverbial details] + [Participle with Adjective ending] + [Noun].",
      "Partizip I (active/simultaneous): 'die stetig steigenden Preise' (the steadily rising prices).",
      "Partizip II (passive/completed): 'die erfolgreich abgeschlossene Studie' (the successfully completed study)."
    ],
    formula: "[Article] + [Extended Modifiers] + [Participle-Ending] + [Noun]",
    examples: [
      { de: "Die im letzten Monat veröffentlichten Forschungsergebnisse erregten großes Aufsehen.", en: "The research results published last month caused a great sensation.", highlight: "Die im letzten Monat veröffentlichten Forschungsergebnisse" },
      { de: "Die ständig wachsende Nachfrage nach erneuerbaren Energien verändert den Markt.", en: "The constantly growing demand for renewable energies changes the market.", highlight: "Die ständig wachsende Nachfrage" }
    ],
    commonMistake: {
      mistake: "Die veröffentlichte letzte Monat Ergebnisse.",
      correction: "Die im letzten Monat veröffentlichten Ergebnisse.",
      explanation: "All modifying information must sit between the article and the participle, which directly precedes the noun."
    },
    drills: [
      {
        id: "b2-d2-q1",
        type: "multiple_choice",
        prompt: "Identify the correct extended participle phrase for 'the measures resolved by the committee':",
        questionSentence: "___ müssen unverzüglich umgesetzt werden.",
        englishTranslation: "The measures resolved by the committee must be implemented immediately.",
        options: [
          "Die vom Ausschuss beschlossenen Maßnahmen",
          "Die beschlossene Maßnahmen vom Ausschuss",
          "Die vom Ausschuss beschlossen Maßnahmen",
          "Die Maßnahmen vom Ausschuss beschlossen"
        ],
        correctAnswer: "Die vom Ausschuss beschlossenen Maßnahmen",
        explanation: "Correct bracket: 'Die' + 'vom Ausschuss' + 'beschlossenen' (with plural ending -en) + 'Maßnahmen'."
      }
    ]
  },
  {
    id: "b2-day-3",
    dayNumber: 3,
    level: "B2",
    title: "Passive Voice Alternatives: sein + zu + Infinitiv",
    germanTitle: "Passiversatzformen: sein + zu + Infinitiv (Notwendigkeit & Möglichkeit)",
    category: "Subjunctive & Passive",
    summary: "'sein + zu + Infinitiv' replaces passive with 'müssen' (obligation) or 'können' (possibility). 'Das Problem ist zu lösen' = 'Das Problem muss / kann gelöst werden.'",
    ruleExplanation: [
      "Expresses necessity: 'Dieser Bericht ist bis morgen abzugeben' (= Der Bericht muss abgegeben werden).",
      "Expresses feasibility: 'Das Phänomen ist leicht zu erklären' (= Das Phänomen kann leicht erklärt werden).",
      "Very common in academic, legal, and professional business texts."
    ],
    formula: "[Subject] + [sein (Pos 2)] + [zu + Infinitiv (End)]",
    examples: [
      { de: "Die Sicherheitsvorschriften sind strikt einzuhalten.", en: "The safety regulations are to be strictly adhered to (must be followed).", highlight: "sind ... einzuhalten" },
      { de: "Es ist nicht zu übersehen, wie wichtig dieses Thema ist.", en: "It cannot be overlooked how important this topic is.", highlight: "ist nicht zu übersehen" }
    ],
    commonMistake: {
      mistake: "Die Aufgabe ist lösen.",
      correction: "Die Aufgabe ist zu lösen.",
      explanation: "This passive alternative strictly requires 'zu' before the infinitive: 'ist zu lösen'."
    },
    drills: [
      {
        id: "b2-d3-q1",
        type: "cloze",
        prompt: "Complete the passive alternative with 'sein + zu + Infinitiv':",
        questionSentence: "Die Rechnungen sind unverzüglich ___.",
        englishTranslation: "The invoices are to be paid immediately (must be paid).",
        options: ["zu begleichen", "begleichen", "begleicht", "beglichen"],
        correctAnswer: "zu begleichen",
        explanation: "'sein + zu + Infinitiv' -> 'sind unverzüglich zu begleichen'."
      }
    ]
  },
  {
    id: "b2-day-4",
    dayNumber: 4,
    level: "B2",
    title: "Passive Voice Alternatives: sich lassen & -bar / -lich",
    germanTitle: "Passiversatzformen: sich lassen + Infinitiv & Adjektive auf -bar / -lich",
    category: "Subjunctive & Passive",
    summary: "Replace passive with 'können': 'Das lässt sich machen' (= Das kann gemacht werden) and adjectives like 'machbar' (doable), 'lesbar' (readable), 'verständlich' (understandable).",
    ruleExplanation: [
      "'sich lassen + Infinitiv': 'Die Datei lässt sich nicht öffnen' (= Die Datei kann nicht geöffnet werden).",
      "Adjectives with suffix -bar: machbar (feasible), lösbar (solvable), erreichbar (reachable), bezahlbar (affordable).",
      "Adjectives with suffix -lich: verständlich (understandable), verkäuflich (salable), erforderlich (required)."
    ],
    formula: "Subject + lässt sich + Infinitiv = Subject + kann + Partizip II + werden",
    examples: [
      { de: "Dieses Problem lässt sich durch einfache Maßnahmen lösen.", en: "This problem can be solved through simple measures.", highlight: "lässt sich ... lösen" },
      { de: "Die Handschrift des Arztes war kaum lesbar.", en: "The doctor's handwriting was barely legible (could barely be read).", highlight: "lesbar" }
    ],
    commonMistake: {
      mistake: "Das lässt sich gemacht werden.",
      correction: "Das lässt sich machen.",
      explanation: "'sich lassen' takes a simple infinitive in active form ('machen'), NOT passive or participle."
    },
    drills: [
      {
        id: "b2-d4-q1",
        type: "multiple_choice",
        prompt: "Rephrase 'Dieser Fehler kann nicht vermieden werden' using 'sich lassen':",
        questionSentence: "Dieser Fehler ___.",
        englishTranslation: "This mistake cannot be avoided.",
        options: [
          "lässt sich nicht vermeiden",
          "lässt sich nicht vermieden werden",
          "lässt nicht zu vermeiden",
          "ist sich zu vermeiden"
        ],
        correctAnswer: "lässt sich nicht vermeiden",
        explanation: "'lässt sich' + active infinitive 'vermeiden'."
      }
    ]
  },
  {
    id: "b2-day-5",
    dayNumber: 5,
    level: "B2",
    title: "Noun-Verb Collocations (Funktionsverbgefüge)",
    germanTitle: "Funktionsverbgefüge (zur Verfügung stehen, in Betracht ziehen, Kritik üben)",
    category: "Verbs & Tenses",
    summary: "Funktionsverbgefüge replace simple verbs with formal noun-verb combinations, essential for C-level fluency and professional workplace communication.",
    ruleExplanation: [
      "zur Verfügung stehen = verfügbar sein (to be available)",
      "zur Verfügung stellen = bereitstellen (to provide / make available)",
      "in Betracht ziehen = berücksichtigen / erwägen (to consider / take into account)",
      "eine Entscheidung treffen = sich entscheiden (to make a decision)",
      "in Anspruch nehmen = beanspruchen / nutzen (to make use of)",
      "Kritik üben an (+ Dat) = kritisieren (to criticize)"
    ],
    formula: "[Preposition + Noun] + [Functional Verb (stehen, stellen, ziehen, treffen, bringen...)]",
    table: {
      headers: ["Funktionsverbgefüge", "Simple Verb Equivalent", "Meaning"],
      rows: [
        ["zur Verfügung stehen", "vorhanden sein", "to be available"],
        ["zur Verfügung stellen", "bereitstellen", "to make available"],
        ["in Betracht ziehen", "erwägen", "to take into consideration"],
        ["eine Entscheidung treffen", "sich entscheiden", "to make a decision"],
        ["in Frage kommen", "möglich sein", "to be out of the question / possible"]
      ]
    },
    examples: [
      { de: "Für Rückfragen stehe ich Ihnen jederzeit gerne zur Verfügung.", en: "For further questions I am available to you at any time.", highlight: "stehe ... zur Verfügung" },
      { de: "Wir müssen alle Faktoren sorgfältig in Betracht ziehen.", en: "We must take all factors carefully into consideration.", highlight: "in Betracht ziehen" }
    ],
    commonMistake: {
      mistake: "Ich mache eine Entscheidung.",
      correction: "Ich treffe eine Entscheidung.",
      explanation: "The correct standard collocation is 'eine Entscheidung treffen', not 'machen'."
    },
    drills: [
      {
        id: "b2-d5-q1",
        type: "cloze",
        prompt: "Choose the verb that pairs with 'zur Verfügung' when offering help:",
        questionSentence: "Die Universitätsbibliothek ___ den Studierenden zahlreiche Online-Ressourcen zur Verfügung.",
        englishTranslation: "The university library makes numerous online resources available to students.",
        options: ["stellt", "steht", "macht", "gibt"],
        correctAnswer: "stellt",
        explanation: "'etwas zur Verfügung stellen' means to make something available."
      }
    ]
  },
  {
    id: "b2-day-6",
    dayNumber: 6,
    level: "B2",
    title: "Subjective Use of Modal Verbs (Epistemischer Gebrauch)",
    germanTitle: "Subjektive Bedeutung der Modalverben (Er soll reich sein / Er muss das gewusst haben)",
    category: "Verbs & Tenses",
    summary: "Modal verbs can express degrees of certainty or hearsay: 'müssen' = 100% certainty (must have), 'dürfte' = 80% probable, 'könnte' = 50% possible, 'sollen' = reported rumor (allegedly), 'wollen' = unverified self-claim.",
    ruleExplanation: [
      "müssen: 'Er MUSS zu Hause sein' (I am certain he is home).",
      "dürfte: 'Das Fest DÜRFTE um 20 Uhr beginnen' (It is very likely to begin at 8).",
      "sollen (rumor/hearsay): 'Er SOLL im Lotto gewonnen haben' (People say he won the lottery).",
      "wollen (dubious self-claim): 'Er WILL den Chef persönlich kennen' (He claims to know the boss, but we doubt it).",
      "Past certainty: 'Er muss das gewusst haben' (Modal + Partizip II + haben/sein)."
    ],
    formula: "Modal + [Partizip II + haben / sein] (Past subjective assumption)",
    examples: [
      { de: "Der Zug dürfte in wenigen Minuten einfahren.", en: "The train is likely to arrive in a few minutes.", highlight: "dürfte ... einfahren" },
      { de: "Er will davon nichts gewusst haben.", en: "He claims to have known nothing about it.", highlight: "will ... gewusst haben" }
    ],
    commonMistake: {
      mistake: "Man sagt, er hat viel Geld -> Er will viel Geld haben.",
      correction: "Er soll viel Geld haben.",
      explanation: "Use 'sollen' for rumors from others ('allegedly'). 'Wollen' is only for a subject's own claim about themselves."
    },
    drills: [
      {
        id: "b2-d6-q1",
        type: "multiple_choice",
        prompt: "Choose the modal expressing high probability (~80% certainty):",
        questionSentence: "Nach den Prognosen ___ die Wirtschaft im nächsten Quartal wachsen.",
        englishTranslation: "According to forecasts, the economy is likely to grow in the next quarter.",
        options: ["dürfte", "sollte", "müsste", "wollte"],
        correctAnswer: "dürfte",
        explanation: "'dürfte' expresses probable assumption based on evidence."
      }
    ]
  },
  {
    id: "b2-day-7",
    dayNumber: 7,
    level: "B2",
    title: "Nominal Style vs. Verbal Style (Nominalstil)",
    germanTitle: "Der Nominalstil (Bei Sonnenaufgang statt Wenn die Sonne aufgeht)",
    category: "Sentence Structure & Word Order",
    summary: "German administrative and academic language heavily favors nouns derived from verbs combined with Genitive or Dative prepositions: 'Beim Verlassen des Gebäudes' instead of 'Wenn man das Gebäude verlässt'.",
    ruleExplanation: [
      "Verbal: 'Weil die Preise gestiegen sind...' -> Nominal: 'Aufgrund des Preisanstiegs...'",
      "Verbal: 'Bevor der Vertrag unterschrieben wird...' -> Nominal: 'Vor der Vertragsunterzeichnung...'",
      "Verbal: 'Obwohl es regnete...' -> Nominal: 'Trotz des Regens...'",
      "Mastering Nominalstil is the hallmark of professional B2/C1 German writing."
    ],
    formula: "Preposition + [Nominalized Noun in Genitive/Dative]",
    examples: [
      { de: "Nach Abschluss der Verhandlungen traten die Delegierten vor die Presse.", en: "After the conclusion of negotiations, delegates stepped before the press.", highlight: "Nach Abschluss der Verhandlungen" },
      { de: "Zwecks Klärung der offenen Fragen wurde ein Meeting anberaumt.", en: "For the purpose of clarifying the open questions, a meeting was arranged.", highlight: "Zwecks Klärung" }
    ],
    commonMistake: {
      mistake: "Wegen steigen die Preise...",
      correction: "Wegen des Preisanstiegs...",
      explanation: "'wegen' must govern a noun in Genitive: 'Wegen des Preisanstiegs'."
    },
    drills: [
      {
        id: "b2-d7-q1",
        type: "cloze",
        prompt: "Transform 'Bevor das Flugzeug abfliegt' into nominal style with Genitive:",
        questionSentence: "Vor dem ___ des Flugzeugs müssen alle Telefone ausgeschaltet werden.",
        englishTranslation: "Before the departure of the airplane, all phones must be switched off.",
        options: ["Abflug", "Abfliegen", "Abfliegenen", "Abflugs"],
        correctAnswer: "Abflug",
        explanation: "'der Abflug' -> 'Vor dem Abflug des Flugzeugs'."
      }
    ]
  },
  {
    id: "b2-day-8",
    dayNumber: 8,
    level: "B2",
    title: "Advanced Genitive Prepositions (angesichts, hinsichtlich, anlässlich)",
    germanTitle: "Gehobene Genitiv-Präpositionen: angesichts, hinsichtlich, anlässlich, infolge",
    category: "Cases & Prepositions",
    summary: "Elevate your writing with sophisticated Genitive prepositions: 'angesichts' (in view of), 'hinsichtlich / bezüglich' (with regard to), 'anlässlich' (on the occasion of), 'infolge' (as a result of), 'mangels' (for lack of).",
    ruleExplanation: [
      "angesichts (+ Gen): 'Angesichts der aktuellen Krise...' (In light of the current crisis).",
      "hinsichtlich / bezüglich (+ Gen): 'Hinsichtlich dieser Frage...' (Regarding this question).",
      "anlässlich (+ Gen): 'Anlässlich des Firmenjubiläums...' (On the occasion of the anniversary).",
      "infolge (+ Gen): 'Infolge eines technischen Defekts...' (As a result of a defect).",
      "mangels (+ Gen): 'Mangels ausreichender Beweise...' (For lack of evidence)."
    ],
    formula: "[angesichts / hinsichtlich / anlässlich / infolge / mangels] + GENITIV",
    examples: [
      { de: "Angesichts der steigenden Energiepreise müssen Sparmaßnahmen ergriffen werden.", en: "In light of rising energy prices, conservation measures must be taken.", highlight: "Angesichts der steigenden Energiepreise" },
      { de: "Bezüglich Ihrer Bewerbung möchten wir Sie zu einem Gespräch einladen.", en: "Regarding your application, we would like to invite you to an interview.", highlight: "Bezüglich Ihrer Bewerbung" }
    ],
    commonMistake: {
      mistake: "Hinsichtlich an diese Frage...",
      correction: "Hinsichtlich dieser Frage...",
      explanation: "'hinsichtlich' directly takes the Genitive case without 'an'."
    },
    drills: [
      {
        id: "b2-d8-q1",
        type: "case_selection",
        prompt: "Choose the correct Genitive article after 'angesichts':",
        questionSentence: "Angesichts ___ schwierigen wirtschaftlichen Lage müssen wir sparen.",
        englishTranslation: "In view of the difficult economic situation, we must save.",
        options: ["der", "die", "des", "den"],
        correctAnswer: "der",
        explanation: "Feminine Genitive takes 'der' -> 'Angesichts der schwierigen Lage'."
      }
    ]
  },
  {
    id: "b2-day-9",
    dayNumber: 9,
    level: "B2",
    title: "Double Infinitive Word Order (Ersatzinfinitiv)",
    germanTitle: "Der Ersatzinfinitiv bei Perfekt mit Modalverben (hat machen müssen)",
    category: "Sentence Structure & Word Order",
    summary: "When modal verbs (können, müssen...), 'lassen', or 'sehen/hören' are used in the Perfekt with another verb, they replace their Partizip II with an Infinitive (Ersatzinfinitiv). In subordinate clauses, the conjugated auxiliary 'haben' jumps to the front of the verb cluster!",
    ruleExplanation: [
      "Main clause: 'Ich habe das Buch LESEN MÜSSEN' (NOT 'gelesen gemusst').",
      "Subordinate clause (The IPP Leap): In subordinate clauses, 'hat/haben' does NOT stand at the very end. It jumps right before the double infinitive: '..., weil ich das Buch HABE (Aux) LESEN MÜSSEN (Double Inf).'"
    ],
    formula: "Subordinate: ..., weil + [Subj] + ... + [hat/haben] + [Main Verb Inf] + [Modal Inf]",
    examples: [
      { de: "Er bedauert, dass er gestern so lange hat arbeiten müssen.", en: "He regrets that he had to work so long yesterday.", highlight: "hat arbeiten müssen" },
      { de: "Sie erzählt, dass sie ihr Auto hat reparieren lassen.", en: "She says that she had her car repaired.", highlight: "hat reparieren lassen" }
    ],
    commonMistake: {
      mistake: "..., weil ich das Auto reparieren gemusst habe.",
      correction: "..., weil ich das Auto habe reparieren müssen.",
      explanation: "Use double infinitive with auxiliary 'habe' preceding the two infinitives in subordinate clauses."
    },
    drills: [
      {
        id: "b2-d9-q1",
        type: "word_order",
        prompt: "Choose the correct verb cluster word order for the subordinate clause:",
        questionSentence: "Es tut mir leid, dass ich gestern nicht ___.",
        englishTranslation: "I am sorry that I could not come yesterday.",
        options: [
          "habe kommen können",
          "kommen können habe",
          "kommen gekonnt habe",
          "habe gekommen können"
        ],
        correctAnswer: "habe kommen können",
        explanation: "In subordinate clauses with Ersatzinfinitiv, 'habe' precedes the two infinitives: 'habe kommen können'."
      }
    ]
  },
  {
    id: "b2-day-10",
    dayNumber: 30,
    level: "B2",
    title: "B2 Grammar Synthesis & Master Review",
    germanTitle: "B2 Grammatik-Synthese: Das große Abschluss-Review",
    category: "Mastery Review",
    summary: "Congratulations on completing the B2 German Grammar Challenge! You have mastered the full spectrum of advanced German syntax: Konjunktiv I & II, Extended Participles, Passive Alternatives, Funktionsverbgefüge, Nominalstil, and complex sentence topologies.",
    ruleExplanation: [
      "Konjunktiv I: Er behaupte, sie sei, man habe.",
      "Extended Participles: 'die vom Ausschuss beschlossenen Maßnahmen'.",
      "Passive Alternatives: sein + zu + Infinitiv / sich lassen + Infinitiv.",
      "Funktionsverbgefüge: zur Verfügung stellen / in Betracht ziehen / eine Entscheidung treffen."
    ],
    formula: "B2 Mastery Achieved: Fully prepared for Goethe-Zertifikat B2 & TELC B2!",
    examples: [
      { de: "Angesichts der veränderten Rahmenbedingungen ist davon auszugehen, dass die vorgeschlagenen Maßnahmen unverzüglich zur Anwendung kommen werden.", en: "In view of the altered framework conditions, it is to be assumed that the proposed measures will be applied immediately.", highlight: "B2 Master Level" }
    ],
    drills: [
      {
        id: "b2-d30-q1",
        type: "multiple_choice",
        prompt: "Identify the sentence demonstrating flawless B2 academic grammar:",
        questionSentence: "Welcher Satz ist stilistisch und grammatisch vollkommen einwandfrei?",
        englishTranslation: "Which sentence is stylistically and grammatically completely flawless?",
        options: [
          "Angesichts der vorliegenden Ergebnisse lässt sich diese Hypothese nicht länger aufrechterhalten.",
          "Angesichts den vorliegenden Ergebnissen lässt sich diese Hypothese nicht länger aufrechtzuerhalten.",
          "Wegen die vorliegende Ergebnisse kann man nicht diese Hypothese aufrechterhalten.",
          "Angesichts der vorliegenden Ergebnisse lässt diese Hypothese sich nicht aufrechterhalten werden."
        ],
        correctAnswer: "Angesichts der vorliegenden Ergebnisse lässt sich diese Hypothese nicht länger aufrechterhalten.",
        explanation: "'Angesichts' + Genitive plural ('der vorliegenden Ergebnisse') + 'lässt sich' + active infinitive ('aufrechterhalten')."
      }
    ]
  }
];
