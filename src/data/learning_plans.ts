export interface LearningUnit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  grammarFocus: string;
  themes: string[]; // Corresponding themes in the app
  keyPhrases: { german: string; english: string }[];
  actionItems: string[];
  estimatedHours: string;
}

export interface LevelPlan {
  level: "A1" | "A2" | "B1" | "B2";
  title: string;
  subtitle: string;
  badge: string;
  colorTheme: {
    badgeBg: string;
    badgeText: string;
    border: string;
    bgGradient: string;
    accentBg: string;
    activeTabBg: string;
    progressBg: string;
  };
  cefrTitle: string;
  estimatedHours: string;
  targetOutcome: string;
  grammarHighlights: string[];
  units: LearningUnit[];
}

export const LEARNING_PLANS: Record<"A1" | "A2" | "B1" | "B2", LevelPlan> = {
  A1: {
    level: "A1",
    title: "A1 • Beginner Foundations (Grundlagen)",
    subtitle: "Build core vocabulary, basic sentence structure, and everyday conversation confidence.",
    badge: "🌱 A1 Beginner",
    colorTheme: {
      badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
      badgeText: "text-emerald-700",
      border: "border-emerald-200",
      bgGradient: "from-emerald-50 via-teal-50/30 to-white",
      accentBg: "bg-emerald-600",
      activeTabBg: "bg-emerald-600 text-white shadow-emerald-200",
      progressBg: "bg-emerald-500",
    },
    cefrTitle: "CEFR A1 Breakthrough",
    estimatedHours: "60 - 80 Hours",
    targetOutcome: "Can understand and use familiar everyday expressions and basic phrases aimed at satisfying concrete needs. Can introduce yourself and ask/answer personal questions.",
    grammarHighlights: [
      "Present Tense (Präsens) regular verbs & key irregulars (sein, haben)",
      "Personal Pronouns (ich, du, er/sie/es, wir, ihr, sie/Sie)",
      "Noun Genders & Articles (der, die, das / ein, eine)",
      "Nominative & Accusative Cases (den, einen, keinen)",
      "Basic Word Order (Verb in 2nd position, Ja/Nein questions in 1st)",
      "Possessive Articles (mein, dein, sein, ihr)",
      "Modal Verbs (können, müssen, wollen, möchten)"
    ],
    units: [
      {
        id: "a1-u1",
        unitNumber: 1,
        title: "Unit 1: Introductions & Personal Details (Sich vorstellen)",
        description: "Master greetings, introducing yourself and others, stating your origin, age, and languages.",
        grammarFocus: "Present tense of 'sein' & 'haben', Alphabet, Numbers 1-100, W-Questions (Wer, Wie, Woher, Wo)",
        themes: [
          "Personal Details (Sich vorstellen) 👤",
          "Family & Friends (Familie & Freunde) 👥"
        ],
        keyPhrases: [
          { german: "Hallo, ich heiße Thomas.", english: "Hello, my name is Thomas." },
          { german: "Woher kommst du?", english: "Where do you come from?" },
          { german: "Ich wohne in Berlin.", english: "I live in Berlin." },
          { german: "Wie alt bist du?", english: "How old are you?" },
          { german: "Ich spreche Englisch und ein bisschen Deutsch.", english: "I speak English and a little German." }
        ],
        actionItems: [
          "Learn 25 personal details vocabulary items",
          "Practice introducing yourself aloud in Pronunciation Practice",
          "Master numbers 1 to 100",
          "Complete Unit 1 Quiz challenge"
        ],
        estimatedHours: "8 - 10 hours"
      },
      {
        id: "a1-u2",
        unitNumber: 2,
        title: "Unit 2: Family, Friends & Relationships (Familie & Freunde)",
        description: "Talk about your family members, marital status, children, and close friends.",
        grammarFocus: "Possessive articles (mein, dein, sein, ihr), Plural forms of nouns, Negation with 'nicht' vs 'kein'",
        themes: [
          "Family & Friends (Familie & Freunde) 👥",
          "Personal Details (Sich vorstellen) 👤"
        ],
        keyPhrases: [
          { german: "Das ist meine Mutter.", english: "This is my mother." },
          { german: "Hast du Geschwister?", english: "Do you have siblings?" },
          { german: "Mein Bruder ist 25 Jahre alt.", english: "My brother is 25 years old." },
          { german: "Wir sind eine große Familie.", english: "We are a large family." }
        ],
        actionItems: [
          "Learn 20 family relationship terms",
          "Practice possessive pronouns (mein/meine, dein/deine)",
          "Describe your family members in German"
        ],
        estimatedHours: "8 - 10 hours"
      },
      {
        id: "a1-u3",
        unitNumber: 3,
        title: "Unit 3: Daily Routine & Telling Time (Tagesablauf & Uhrzeit)",
        description: "Describe your daily schedule, specify times, days of the week, and appointments.",
        grammarFocus: "Separable verbs (aufstehen, einkaufen, ankommen), Telling time (offiziell & inoffiziell), Days of the week",
        themes: [
          "Daily Routine, Leisure & Time (Alltag, Freizeit & Tagesablauf) ⏰"
        ],
        keyPhrases: [
          { german: "Wie viel Uhr ist es?", english: "What time is it?" },
          { german: "Ich stehe um sieben Uhr auf.", english: "I wake up at seven o'clock." },
          { german: "Am Montag habe ich einen Deutschkurs.", english: "On Monday I have a German course." },
          { german: "Wann stehst du morgens auf?", english: "When do you get up in the morning?" }
        ],
        actionItems: [
          "Practice telling the time in German",
          "Master 15 common separable verbs",
          "Build a complete daily schedule narrative"
        ],
        estimatedHours: "8 - 10 hours"
      },
      {
        id: "a1-u4",
        unitNumber: 4,
        title: "Unit 4: Food, Drink & Dining Out (Essen & Trinken)",
        description: "Order food and drinks in restaurants, express food likes/dislikes, and grocery shop.",
        grammarFocus: "Accusative Case (Direct object: den/einen/keinen), Modal verb 'möchten' & 'mögen'",
        themes: [
          "Food, Drink & Dining (Essen & Trinken) 🍽️"
        ],
        keyPhrases: [
          { german: "Ich möchte einen Kaffee, bitte.", english: "I would like a coffee, please." },
          { german: "Guten Appetit!", english: "Bon appétit!" },
          { german: "Was isst du gern zum Frühstück?", english: "What do you like to eat for breakfast?" },
          { german: "Die Rechnung, bitte!", english: "The bill, please!" }
        ],
        actionItems: [
          "Learn 30 essential food and beverage words with articles",
          "Practice ordering food in a restaurant scenario",
          "Understand Accusative gender changes (der -> den)"
        ],
        estimatedHours: "8 - 10 hours"
      },
      {
        id: "a1-u5",
        unitNumber: 5,
        title: "Unit 5: Housing, Living & Rooms (Wohnen)",
        description: "Describe your home, apartment, furniture, rooms, and renting situation.",
        grammarFocus: "Adjective predicates (Das Zimmer ist hell), Prepositions of place (in, auf, an + Dativ basics)",
        themes: [
          "Housing & Living (Wohnen) 🏠",
          "Home & Living 🏠"
        ],
        keyPhrases: [
          { german: "Ich wohne in einer gemütlichen Wohnung.", english: "I live in a cozy apartment." },
          { german: "Das Wohnzimmer ist sehr groß.", english: "The living room is very large." },
          { german: "Wie viele Zimmer hat das Haus?", english: "How many rooms does the house have?" },
          { german: "In der Küche steht ein Tisch.", english: "There is a table in the kitchen." }
        ],
        actionItems: [
          "Learn 25 furniture and room vocabulary items",
          "Describe your bedroom or apartment layout",
          "Practice reading short housing rental ads"
        ],
        estimatedHours: "8 - 10 hours"
      },
      {
        id: "a1-u6",
        unitNumber: 6,
        title: "Unit 6: Shopping & Clothes (Einkaufen & Kleidung)",
        description: "Buy clothing, ask for prices, state sizes and colors, and pay at the store.",
        grammarFocus: "Demonstrative pronouns (dieser, diese, dieses), Currency & Prices (Euro, Cent), Plurals",
        themes: [
          "Shopping & Clothes (Einkaufen & Kleidung) 🛍️",
          "Money & Shopping 💳"
        ],
        keyPhrases: [
          { german: "Wie viel kostet das Hemd?", english: "How much does the shirt cost?" },
          { german: "Ich suche eine Hose in Größe M.", english: "I am looking for pants in size M." },
          { german: "Kann ich mit Karte bezahlen?", english: "Can I pay by card?" },
          { german: "Das ist sehr günstig.", english: "That is very inexpensive." }
        ],
        actionItems: [
          "Learn colors and clothing items in German",
          "Practice asking for prices and paying",
          "Complete shopping flashcards"
        ],
        estimatedHours: "8 - 10 hours"
      },
      {
        id: "a1-u7",
        unitNumber: 7,
        title: "Unit 7: Directions, Travel & Transport (Orientierung & Reisen)",
        description: "Ask for and give directions, navigate public transportation, and travel.",
        grammarFocus: "Imperative mood (Gehen Sie geradeaus!), Prepositions with Dative (nach, zu, mit)",
        themes: [
          "Directions & Travel (Orientierung & Reisen) 🗺️",
          "Travel & Transport 🚗"
        ],
        keyPhrases: [
          { german: "Entschuldigung, wo ist der Bahnhof?", english: "Excuse me, where is the train station?" },
          { german: "Gehen Sie geradeaus und dann nach links.", english: "Go straight ahead and then left." },
          { german: "Ich fahre mit dem Bus zur Arbeit.", english: "I take the bus to work." },
          { german: "Eine Fahrkarte nach München, bitte.", english: "One ticket to Munich, please." }
        ],
        actionItems: [
          "Learn directional vocabulary (links, rechts, geradeaus)",
          "Practice ordering transport tickets",
          "Master transport prepositions (mit dem Zug / mit der U-Bahn)"
        ],
        estimatedHours: "8 - 10 hours"
      },
      {
        id: "a1-u8",
        unitNumber: 8,
        title: "Unit 8: Work & Office Life (Beruf & Arbeit)",
        description: "Talk about occupations, office tasks, work schedules, and school.",
        grammarFocus: "Modal verbs (müssen, können, dürfen), Feminine occupation suffix '-in' (Arzt -> Ärztin)",
        themes: [
          "Work & Office (Beruf & Arbeit) 💼",
          "Work & Education 💼"
        ],
        keyPhrases: [
          { german: "Was bist du von Beruf?", english: "What is your profession?" },
          { german: "Ich arbeite als Ingenieur bei einer Firma.", english: "I work as an engineer at a company." },
          { german: "Ich muss heute viele E-Mails schreiben.", english: "I have to write many emails today." },
          { german: "Mein Kollege ist sehr nett.", english: "My colleague is very nice." }
        ],
        actionItems: [
          "Learn 20 job names in masculine and feminine forms",
          "Practice expressing obligations using 'müssen'",
          "Review all A1 vocabulary and take the A1 Final Evaluation Quiz"
        ],
        estimatedHours: "8 - 10 hours"
      }
    ]
  },

  A2: {
    level: "A2",
    title: "A2 • Elementary Communication (Erweiterung)",
    subtitle: "Discuss past events, make plans, express feelings, navigate health visits, and write simple messages.",
    badge: "🌿 A2 Elementary",
    colorTheme: {
      badgeBg: "bg-amber-100 text-amber-800 border-amber-300",
      badgeText: "text-amber-700",
      border: "border-amber-200",
      bgGradient: "from-amber-50 via-orange-50/30 to-white",
      accentBg: "bg-amber-600",
      activeTabBg: "bg-amber-600 text-white shadow-amber-200",
      progressBg: "bg-amber-500",
    },
    cefrTitle: "CEFR A2 Waystage",
    estimatedHours: "80 - 100 Hours",
    targetOutcome: "Can understand sentences and frequently used expressions related to areas of most immediate relevance (e.g. personal info, shopping, geography, employment). Can communicate in simple, routine tasks.",
    grammarHighlights: [
      "Perfect Tense (Perfekt with haben / sein and Partizip II)",
      "Simple Past (Präteritum of sein, haben, and modal verbs)",
      "Dative Case (Indirect Object: dem, der, dem, den + n)",
      "Two-Way Prepositions (Wechselpräpositionen with Dativ vs Akkusativ)",
      "Subordinate Clauses with 'weil', 'dass', 'wenn' (Verb at the end)",
      "Comparatives & Superlatives (schneller, am schnellsten)",
      "Reflexive Verbs (sich freuen, sich waschen)"
    ],
    units: [
      {
        id: "a2-u1",
        unitNumber: 1,
        title: "Unit 1: Talking About the Past (Vergangenheit & Perfekt)",
        description: "Narrate past activities, weekend experiences, vacations, and historical events.",
        grammarFocus: "Perfekt tense auxiliaries (haben vs sein), Past participle formation (ge-...-t / ge-...-en)",
        themes: [
          "Daily Routine, Leisure & Time (Alltag, Freizeit & Tagesablauf) ⏰",
          "Verbs & Actions ⚡"
        ],
        keyPhrases: [
          { german: "Was hast du am Wochenende gemacht?", english: "What did you do on the weekend?" },
          { german: "Ich bin nach Berlin gefahren.", english: "I traveled to Berlin." },
          { german: "Gestern habe ich ein interessantes Buch gelesen.", english: "Yesterday I read an interesting book." },
          { german: "Wir haben sehr viel gelacht.", english: "We laughed a lot." }
        ],
        actionItems: [
          "Master Perfekt forms for 30 frequent German verbs",
          "Write or speak a 5-sentence summary of your last weekend",
          "Identify when to use 'haben' vs 'sein' in past tense"
        ],
        estimatedHours: "10 - 12 hours"
      },
      {
        id: "a2-u2",
        unitNumber: 2,
        title: "Unit 2: Health, Doctor Visits & Body Care (Gesundheit & Arzt)",
        description: "Describe symptoms, body parts, understand prescriptions, and seek medical help.",
        grammarFocus: "Imperative mood (Sie / du / ihr), Modal verb 'sollen', Possessives in Dative case",
        themes: [
          "Health & Well-being (Gesundheit & Körper) 🏥"
        ],
        keyPhrases: [
          { german: "Ich habe starke Kopfschmerzen.", english: "I have a severe headache." },
          { german: "Sie sollten viel Wasser trinken und sich ausruhen.", english: "You should drink plenty of water and rest." },
          { german: "Mir tut der Rücken weh.", english: "My back hurts." },
          { german: "Gute Besserung!", english: "Get well soon!" }
        ],
        actionItems: [
          "Learn 25 body parts and health condition terms",
          "Simulate a doctor-patient dialogue in German",
          "Practice giving medical advice using 'sollen'"
        ],
        estimatedHours: "10 - 12 hours"
      },
      {
        id: "a2-u3",
        unitNumber: 3,
        title: "Unit 3: Travel, Vacation & Accommodation (Reisen & Urlaub)",
        description: "Book hotel rooms, navigate airports and stations, describe holiday plans.",
        grammarFocus: "Two-way prepositions (an, auf, hinter, in, neben, über, unter, vor, zwischen), Wo? (+Dativ) vs Wohin? (+Akkusativ)",
        themes: [
          "Directions & Travel (Orientierung & Reisen) 🗺️"
        ],
        keyPhrases: [
          { german: "Ich fahre im Sommer an den Strand.", english: "I am going to the beach in summer." },
          { german: "Wir haben ein Doppelzimmer mit Frühstück gebucht.", english: "We booked a double room with breakfast." },
          { german: "Der Zug hat zwanzig Minuten Verspätung.", english: "The train is delayed by twenty minutes." },
          { german: "Ich wünsche dir eine gute Reise!", english: "Have a nice trip!" }
        ],
        actionItems: [
          "Practice hotel booking dialogues",
          "Master Dativ vs Akkusativ with spatial prepositions",
          "Learn 20 travel and transport terms"
        ],
        estimatedHours: "10 - 12 hours"
      },
      {
        id: "a2-u4",
        unitNumber: 4,
        title: "Unit 4: Media, Technology & Online Life (Medien & Technik)",
        description: "Discuss smartphones, computers, social media, internet usage, and apps.",
        grammarFocus: "Subordinate clauses with 'dass' and 'weil' (Verb at the end), Verbs with fixed prepositions",
        themes: [
          "Tech & Communication (Medien & Technik) 💻"
        ],
        keyPhrases: [
          { german: "Ich glaube, dass das Internet sehr nützlich ist.", english: "I believe that the internet is very useful." },
          { german: "Ich nutze mein Smartphone, weil es praktisch ist.", english: "I use my smartphone because it is practical." },
          { german: "Schick mir bitte eine Nachricht auf WhatsApp.", english: "Please send me a message on WhatsApp." }
        ],
        actionItems: [
          "Practice forming sentences with 'weil' and 'dass'",
          "Learn 20 tech and media vocabulary words",
          "Debate pros and cons of social media in German"
        ],
        estimatedHours: "10 - 12 hours"
      },
      {
        id: "a2-u5",
        unitNumber: 5,
        title: "Unit 5: Socializing, Invitations & Free Time (Einladungen & Feiern)",
        description: "Invite friends, organize events, accept/decline offers, and talk about celebrations.",
        grammarFocus: "Time prepositions (um, am, im, von...bis, seit, für), Subordinate clauses with 'wenn'",
        themes: [
          "Daily Routine, Leisure & Time (Alltag, Freizeit & Tagesablauf) ⏰",
          "Culture & Art (Kultur & Kunst) 🎨"
        ],
        keyPhrases: [
          { german: "Hast du Lust, morgen ins Kino zu gehen?", english: "Do you feel like going to the cinema tomorrow?" },
          { german: "Ich lade dich herzlich zu meiner Geburtstagsfeier ein.", english: "I warmly invite you to my birthday party." },
          { german: "Vielen Dank für die Einladung, ich komme gerne!", english: "Thank you for the invitation, I'd love to come!" },
          { german: "Wenn es regnet, bleiben wir zu Hause.", english: "If it rains, we stay at home." }
        ],
        actionItems: [
          "Practice inviting, accepting, and declining invitations",
          "Master temporal prepositions (seit, für, ab)",
          "Learn celebration and event vocabulary"
        ],
        estimatedHours: "10 - 12 hours"
      },
      {
        id: "a2-u6",
        unitNumber: 6,
        title: "Unit 6: Shopping, Consumer Life & Comparisons (Konsum & Vergleich)",
        description: "Compare products, discuss brands, handle sales, and express preferences.",
        grammarFocus: "Adjective endings after indefinite articles (ein guter Freund, eine schöne Stadt), Comparatives (größer als)",
        themes: [
          "Shopping & Clothes (Einkaufen & Kleidung) 🛍️"
        ],
        keyPhrases: [
          { german: "Dieses Hemd ist schöner als das andere.", english: "This shirt is nicer than the other one." },
          { german: "Ich trage am liebsten schwarze Kleidung.", english: "I prefer wearing black clothes most of all." },
          { german: "Gibt es einen Rabatt auf diese Hose?", english: "Is there a discount on these pants?" }
        ],
        actionItems: [
          "Learn 20 shopping and fashion terms",
          "Practice comparative forms (schneller, besser, mehr)",
          "Compare two items or cities in German"
        ],
        estimatedHours: "10 - 12 hours"
      },
      {
        id: "a2-u7",
        unitNumber: 7,
        title: "Unit 7: Environment, Nature & Animals (Umwelt & Natur)",
        description: "Discuss weather, nature, animals, recycling, and environmental habits.",
        grammarFocus: "Reflexive verbs in Accusative & Dative (sich freuen über, sich interessieren für)",
        themes: [
          "Nature & Environment (Natur & Umwelt) 🌳"
        ],
        keyPhrases: [
          { german: "Wir müssen die Natur und die Umwelt schützen.", english: "We must protect nature and the environment." },
          { german: "Ich freue mich auf das schöne Wetter.", english: "I am looking forward to the nice weather." },
          { german: "Mülltrennung ist sehr wichtig in Deutschland.", english: "Waste separation is very important in Germany." }
        ],
        actionItems: [
          "Learn weather and environmental terms",
          "Practice reflexive verbs with prepositional objects",
          "Discuss eco-friendly habits in German"
        ],
        estimatedHours: "10 - 12 hours"
      },
      {
        id: "a2-u8",
        unitNumber: 8,
        title: "Unit 8: Work Life & Professional Letters (Berufsleben & E-Mails)",
        description: "Write simple emails, talk about previous jobs, and participate in work meetings.",
        grammarFocus: "Simple Past (Präteritum) of modal verbs (musste, konnte, wollte), Formal letter greetings & sign-offs",
        themes: [
          "Work & Office (Beruf & Arbeit) 💼"
        ],
        keyPhrases: [
          { german: "Sehr geehrte Damen und Herren,", english: "Dear Sir or Madam," },
          { german: "Ich schicke Ihnen meine Bewerbungsunterlagen.", english: "I am sending you my application documents." },
          { german: "Mit freundlichen Grüßen,", english: "Sincerely," },
          { german: "Gestern musste ich bis 18 Uhr im Büro bleiben.", english: "Yesterday I had to stay in the office until 6 PM." }
        ],
        actionItems: [
          "Write a formal A2 email to a colleague or landlord",
          "Master past modal forms (musste, konnte, durfte)",
          "Take the A2 Final Evaluation Quiz"
        ],
        estimatedHours: "10 - 12 hours"
      }
    ]
  },

  B1: {
    level: "B1",
    title: "B1 • Independent Fluency (Mittelstufe / TELC B1)",
    subtitle: "Express opinions fluently, debate topics, handle unexpected situations, and prepare for official B1 exams.",
    badge: "📘 B1 Intermediate",
    colorTheme: {
      badgeBg: "bg-blue-100 text-blue-800 border-blue-300",
      badgeText: "text-blue-700",
      border: "border-blue-200",
      bgGradient: "from-blue-50 via-sky-50/30 to-white",
      accentBg: "bg-blue-600",
      activeTabBg: "bg-blue-600 text-white shadow-blue-200",
      progressBg: "bg-blue-500",
    },
    cefrTitle: "CEFR B1 Threshold / TELC B1",
    estimatedHours: "100 - 150 Hours",
    targetOutcome: "Can understand main points of clear standard input on familiar matters. Can deal with most situations while traveling, produce simple connected text, and describe experiences, dreams, hopes & ambitions.",
    grammarHighlights: [
      "Passive Voice (Passiv with werden + Partizip II in Present & Past)",
      "Subjunctive II (Konjunktiv II for politeness, wishes, hypotheticals: hätte, wäre, würde)",
      "Genitive Case & Prepositions (wegen, trotz, während, anstatt + Genitiv)",
      "Relative Clauses in all cases (der, die, das, dem, den, denen, dessen)",
      "Two-part Connectors (sowohl... als auch, weder... noch, entweder... oder)",
      "Infinitives with 'zu' / 'um... zu' / 'ohne... zu'",
      "Indirect Speech & Reported Statements"
    ],
    units: [
      {
        id: "b1-u1",
        unitNumber: 1,
        title: "Unit 1: Everyday Life, Emotions & Office Routine (Alltag & Büro)",
        description: "Express joys, frustrations, office interactions, and make polite requests.",
        grammarFocus: "Konjunktiv II of politeness (Könnten Sie... / Es wäre schön, wenn...), Reflexive verbs in detail",
        themes: [
          "Daily Routine, Leisure & Time (Alltag, Freizeit & Tagesablauf) ⏰",
          "Work & Office (Beruf & Arbeit) 💼"
        ],
        keyPhrases: [
          { german: "Es wäre nett, wenn wir uns morgen treffen könnten.", english: "It would be nice if we could meet tomorrow." },
          { german: "Es ärgert mich, wenn Termine verschoben werden.", english: "It annoys me when appointments are postponed." },
          { german: "Ich würde mich sehr freuen, von Ihnen zu hören.", english: "I would be very pleased to hear from you." }
        ],
        actionItems: [
          "Practice polite requests using Konjunktiv II",
          "Learn 25 B1 core office & daily life phrases",
          "Simulate workplace communication scenarios"
        ],
        estimatedHours: "12 - 15 hours"
      },
      {
        id: "b1-u2",
        unitNumber: 2,
        title: "Unit 2: Food Culture, Cooking & Restaurants (Kulinarik & Kochen)",
        description: "Discuss recipes, dietary habits, restaurant service, and culinary traditions.",
        grammarFocus: "Passive Voice in Present Tense (Das Gericht wird frisch zubereitet), Relative clauses",
        themes: [
          "Food, Drink & Dining (Essen & Trinken) 🍽️"
        ],
        keyPhrases: [
          { german: "Das Fleisch wird bei schwacher Hitze gebraten.", english: "The meat is fried over low heat." },
          { german: "Ein Gericht, das mir besonders schmeckt, ist Schnitzel.", english: "A dish that I particularly like is schnitzel." },
          { german: "Immer mehr Menschen ernähren sich vegetarisch.", english: "More and more people eat a vegetarian diet." }
        ],
        actionItems: [
          "Master Present Passive construction (werden + Partizip II)",
          "Describe a traditional recipe step-by-step",
          "Express opinions on food trends and nutrition"
        ],
        estimatedHours: "12 - 15 hours"
      },
      {
        id: "b1-u3",
        unitNumber: 3,
        title: "Unit 3: Career, Job Market & Workplace Correspondence (Karriere & Berufe)",
        description: "Conduct telephone calls, negotiate appointments, write formal business letters and applications.",
        grammarFocus: "Connectors (deshalb, trotzdem, obwohl), Genitive prepositions (während, wegen, trotz)",
        themes: [
          "Work & Office (Beruf & Arbeit) 💼"
        ],
        keyPhrases: [
          { german: "Ich rufe an, um einen Termin zu vereinbaren.", english: "I am calling to arrange an appointment." },
          { german: "Obwohl das Projekt schwierig war, haben wir es geschafft.", english: "Although the project was difficult, we succeeded." },
          { german: "Wegen des schlechten Wetters wurde das Treffen abgesagt.", english: "Because of the bad weather, the meeting was canceled." }
        ],
        actionItems: [
          "Practice professional business telephone conversations",
          "Write a formal B1 internship/job application email",
          "Master Genitive prepositions (wegen, trotz, während)"
        ],
        estimatedHours: "12 - 15 hours"
      },
      {
        id: "b1-u4",
        unitNumber: 4,
        title: "Unit 4: Education, Learning Methods & Lifelong Learning (Lernen & Bildung)",
        description: "Give recommendations, discuss effective study habits, and continuous education.",
        grammarFocus: "Infinitives with 'zu' (Es ist wichtig, regelmäßig zu lernen), Two-part connectors (sowohl... als auch)",
        themes: [
          "Science & Education (Wissenschaft & Bildung) 🎓"
        ],
        keyPhrases: [
          { german: "Ich empfehle dir, jeden Tag zwanzig Minuten zu üben.", english: "I recommend that you practice twenty minutes every day." },
          { german: "Diese Methode ist sowohl effektiv als auch unterhaltsam.", english: "This method is both effective and entertaining." },
          { german: "Ich interessiere mich sehr für Sprachkurse an der Volkshochschule.", english: "I am very interested in language courses at the adult education center." }
        ],
        actionItems: [
          "Master Infinitive + zu clauses",
          "Give structured learning recommendations to peers",
          "Discuss adult education and university opportunities"
        ],
        estimatedHours: "12 - 15 hours"
      },
      {
        id: "b1-u5",
        unitNumber: 5,
        title: "Unit 5: Cities, Urban Planning & Sustainability (Städte & Nachhaltigkeit)",
        description: "Present cities, discuss green urban design, travel highlights, and local activities.",
        grammarFocus: "Adjective declension in all cases, Indirect questions (Ich möchte wissen, ob...)",
        themes: [
          "Directions & Travel (Orientierung & Reisen) 🗺️",
          "Nature & Environment (Natur & Umwelt) 🌳"
        ],
        keyPhrases: [
          { german: "Die Stadt zeichnet sich durch viele grüne Parks aus.", english: "The city stands out due to its many green parks." },
          { german: "Könnten Sie mir sagen, ob das Museum geöffnet ist?", english: "Could you tell me if the museum is open?" },
          { german: "Ich schlage vor, dass wir eine Stadtführung machen.", english: "I suggest that we do a guided city tour." }
        ],
        actionItems: [
          "Prepare a 2-minute presentation about your favorite city",
          "Formulate polite proposals for group activities",
          "Master adjective declension with definite and indefinite articles"
        ],
        estimatedHours: "12 - 15 hours"
      },
      {
        id: "b1-u6",
        unitNumber: 6,
        title: "Unit 6: Health, Prevention & Well-being (Gesundheit & Prävention)",
        description: "Discuss fitness, remedies, power naps, stress reduction, and healthy lifestyle choices.",
        grammarFocus: "Clauses with 'damit' vs 'um... zu', Modal verbs in past tense",
        themes: [
          "Health & Well-being (Gesundheit & Körper) 🏥"
        ],
        keyPhrases: [
          { german: "Man sollte regelmäßig Sport treiben, um fit zu bleiben.", english: "One should exercise regularly to stay fit." },
          { german: "Ein kurzer Powernap hilft dabei, die Konzentration zu steigern.", english: "A short power nap helps to increase concentration." },
          { german: "Ich trinke Kräutertee, damit die Halsschmerzen verschwinden.", english: "I drink herbal tea so that the sore throat disappears." }
        ],
        actionItems: [
          "Differentiate purpose clauses with 'damit' vs 'um... zu'",
          "Give health and lifestyle advice in German",
          "Discuss pros & cons of alternative remedies"
        ],
        estimatedHours: "12 - 15 hours"
      },
      {
        id: "b1-u7",
        unitNumber: 7,
        title: "Unit 7: Life Challenges, Cultural Norms & Small Talk (Leben & Kultur)",
        description: "Navigate cultural differences, engage in fluent small talk, and overcome daily challenges.",
        grammarFocus: "Temporal connectors (als vs wenn, bevor, nachdem, während), Indirect speech",
        themes: [
          "Culture & Art (Kultur & Kunst) 🎨",
          "Family & Friends (Familie & Freunde) 👥"
        ],
        keyPhrases: [
          { german: "In Deutschland wird Pünktlichkeit sehr geschätzt.", english: "In Germany, punctuality is highly valued." },
          { german: "Nachdem ich angekommen war, habe ich meine Koffer ausgepackt.", english: "After I had arrived, I unpacked my suitcases." },
          { german: "Wie läuft es bei dir in der Arbeit?", english: "How are things going for you at work?" }
        ],
        actionItems: [
          "Practice small talk topics with native natural flow",
          "Master temporal sentence structure with 'nachdem' & 'bevor'",
          "Discuss cultural habits and etiquette in German-speaking countries"
        ],
        estimatedHours: "12 - 15 hours"
      },
      {
        id: "b1-u8",
        unitNumber: 8,
        title: "Unit 8: History, Inventions, Books & Media (Geschichte & Medien)",
        description: "Summarize books or movies, discuss historic events, inventions, and research funding.",
        grammarFocus: "Past Passive (Die Mauer wurde 1989 geöffnet), Participle adjectives",
        themes: [
          "Culture & Art (Kultur & Kunst) 🎨",
          "Science & Education (Wissenschaft & Bildung) 🎓"
        ],
        keyPhrases: [
          { german: "Das Buch handelt von einer spannenden Geschichte.", english: "The book is about an exciting story." },
          { german: "Diese wichtige Erfindung hat das tägliche Leben verändert.", english: "This important invention changed daily life." },
          { german: "In den Nachrichten wurde über neue wissenschaftliche Studien berichtet.", english: "The news reported on new scientific studies." }
        ],
        actionItems: [
          "Summarize the plot of a book or film in German",
          "Master Past Passive voice (wurde + Partizip II)",
          "Take the comprehensive B1 TELC Practice Evaluation"
        ],
        estimatedHours: "12 - 15 hours"
      }
    ]
  },

  B2: {
    level: "B2",
    title: "B2 • Advanced Professional & Academic Proficiency (Oberstufe)",
    subtitle: "Articulate complex ideas, negotiate, write academic and business reports, and master idiomatic nuance.",
    badge: "🎓 B2 Upper-Intermediate",
    colorTheme: {
      badgeBg: "bg-purple-100 text-purple-800 border-purple-300",
      badgeText: "text-purple-700",
      border: "border-purple-200",
      bgGradient: "from-purple-50 via-fuchsia-50/30 to-white",
      accentBg: "bg-purple-600",
      activeTabBg: "bg-purple-600 text-white shadow-purple-200",
      progressBg: "bg-purple-500",
    },
    cefrTitle: "CEFR B2 Vantage / Goethe & TELC B2",
    estimatedHours: "150 - 200 Hours",
    targetOutcome: "Can understand complex texts on concrete and abstract topics. Can interact with native speakers with a degree of fluency and spontaneity. Can produce clear, detailed text on a wide range of subjects.",
    grammarHighlights: [
      "Passive Alternatives (Passiversatzformen: lässt sich, ist zu + Infinitiv, -bar)",
      "Noun-Verb Combinations (Funktionsverbgefüge: in Betracht ziehen, Einfluss nehmen)",
      "Advanced Subjunctive I & II (Konjunktiv I for press quotes, Konjunktiv II for past hypotheticals)",
      "Extended Participle Attributes (die schwer zu lösende Aufgabe)",
      "Complex Conjunctions (indem, sodass, solange, angenommen dass, je... desto)",
      "Nominal Style vs Verbal Style (Nominalstil vs Verbalstil)",
      "Modal Particles (ja, doch, halt, eben, schon) for natural flow"
    ],
    units: [
      {
        id: "b2-u1",
        unitNumber: 1,
        title: "Unit 1: Society, Law & Political Systems (Staat, Recht & Politik)",
        description: "Analyze societal frameworks, debate legal regulations, political news, and civic duties.",
        grammarFocus: "Passive replacements (lässt sich erklären, ist nachzuweisen), Genitive prepositions (aufgrund, hinsichtlich, bezüglich)",
        themes: [
          "Society & Law (Gesellschaft & Staat) ⚖️"
        ],
        keyPhrases: [
          { german: "Es steht außer Zweifel, dass Gesetze angepasst werden müssen.", english: "It is beyond doubt that laws must be adapted." },
          { german: "Hinsichtlich der neuen Regelungen gibt es unterschiedliche Meinungen.", english: "Regarding the new regulations, there are differing opinions." },
          { german: "Unter Berücksichtigung aller juristischen Aspekte...", english: "Taking into account all legal aspects..." }
        ],
        actionItems: [
          "Learn 30 formal political and legal B2 vocabulary terms",
          "Use Passive alternatives ('lässt sich lösen', 'ist machbar')",
          "Debate current social policies in written or spoken form"
        ],
        estimatedHours: "15 - 20 hours"
      },
      {
        id: "b2-u2",
        unitNumber: 2,
        title: "Unit 2: Science, Technology & Research (Wissenschaft & Forschung)",
        description: "Evaluate scientific studies, AI developments, technological ethics, and research data.",
        grammarFocus: "Nominal style (Nominalstil), Extended participial attributes (die neu entwickelte Technologie)",
        themes: [
          "Science & Education (Wissenschaft & Bildung) 🎓",
          "Tech & Communication (Medien & Technik) 💻"
        ],
        keyPhrases: [
          { german: "Durch die Durchführung von Experimenten konnte die Hypothese bestätigt werden.", english: "Through the execution of experiments, the hypothesis was confirmed." },
          { german: "Künstliche Intelligenz verändert die Arbeitswelt nachhaltig.", english: "Artificial intelligence is changing the working world permanently." },
          { german: "Es bedarf weiterer wissenschaftlicher Untersuchungen.", english: "Further scientific investigations are required." }
        ],
        actionItems: [
          "Convert verbal sentences into academic Nominalstil",
          "Analyze scientific reports and data visualizer summaries",
          "Present a 3-minute technical speech"
        ],
        estimatedHours: "15 - 20 hours"
      },
      {
        id: "b2-u3",
        unitNumber: 3,
        title: "Unit 3: Economy, Finance & Consumer Rights (Wirtschaft & Finanzen)",
        description: "Discuss financial markets, consumer protection, economic forecasts, and corporate strategies.",
        grammarFocus: "Noun-Verb Combinations (Funktionsverbgefüge: Entscheidungen treffen, zur Verfügung stehen)",
        themes: [
          "Shopping, Money & Finance (Wirtschaft & Finanzen) 📈",
          "Shopping & Clothes (Einkaufen & Kleidung) 🛍️"
        ],
        keyPhrases: [
          { german: "Wir müssen eine wichtige Entscheidung hinsichtlich der Investition treffen.", english: "We must make an important decision regarding the investment." },
          { german: "Die Inflation hat erhebliche Auswirkungen auf die Kaufkraft.", english: "Inflation has significant effects on purchasing power." },
          { german: "Verbraucher haben das Recht, mangelhafte Ware zu reklamieren.", english: "Consumers have the right to complain about defective goods." }
        ],
        actionItems: [
          "Master 25 essential B2 Noun-Verb collocations",
          "Read and summarize economic news articles",
          "Draft a formal commercial dispute or complaint"
        ],
        estimatedHours: "15 - 20 hours"
      },
      {
        id: "b2-u4",
        unitNumber: 4,
        title: "Unit 4: Migration, Integration & Work Culture (Integration & Ämter)",
        description: "Navigate administrative bureaucracy, discuss immigration policies, and professional integration.",
        grammarFocus: "Konjunktiv I for press quotes, Connectors (indem, sodass, je... desto, vorausgesetzt dass)",
        themes: [
          "Work & Office (Beruf & Arbeit) 💼",
          "Society & Law (Gesellschaft & Staat) ⚖️"
        ],
        keyPhrases: [
          { german: "Je besser die Sprachkenntnisse sind, desto höher sind die Erfolgschancen.", english: "The better the language skills, the higher the chances of success." },
          { german: "Die Behörde teilte mit, der Antrag sei rechtzeitig eingegangen.", english: "The authority announced that the application was received on time." },
          { german: "Integration gelingt am besten durch gegenseitige Wertschätzung.", english: "Integration succeeds best through mutual appreciation." }
        ],
        actionItems: [
          "Write formal B2 correspondence to official authorities",
          "Practice reported speech with Konjunktiv I",
          "Discuss workplace diversity and cultural integration"
        ],
        estimatedHours: "15 - 20 hours"
      },
      {
        id: "b2-u5",
        unitNumber: 5,
        title: "Unit 5: Art, Culture, History & Literature (Kunst & Kulturgeschichte)",
        description: "Analyze historical eras, literary works, cultural philosophy, and architectural design.",
        grammarFocus: "Advanced relative clauses with wovon, worüber, dessen, deren",
        themes: [
          "Culture & Art (Kultur & Kunst) 🎨"
        ],
        keyPhrases: [
          { german: "Ein Kunstwerk, dessen Bedeutung bis heute kontrovers diskutiert wird.", english: "A artwork whose meaning is controversially discussed to this day." },
          { german: "Historische Ereignisse prägen das kollektive Gedächtnis einer Gesellschaft.", english: "Historical events shape the collective memory of a society." },
          { german: "Die Ausstellung präsentiert Meisterwerke des 19. Jahrhunderts.", english: "The exhibition presents 19th-century masterpieces." }
        ],
        actionItems: [
          "Write a detailed film or book review in German",
          "Use relative pronouns 'dessen' and 'deren' seamlessly",
          "Discuss historical milestones and cultural heritage"
        ],
        estimatedHours: "15 - 20 hours"
      },
      {
        id: "b2-u6",
        unitNumber: 6,
        title: "Unit 6: Climate Change, Ecology & Energy Transition (Umwelt & Energie)",
        description: "Debate climate initiatives, renewable energy, biodiversity, and sustainability policies.",
        grammarFocus: "Causal, concessive & consecutive connectors (trotz, ungeachtet, infolge, sodass)",
        themes: [
          "Nature & Environment (Natur & Umwelt) 🌳"
        ],
        keyPhrases: [
          { german: "Infolge des Klimawandels nehmen weltweite Wetterextreme zu.", english: "As a result of climate change, global weather extremes are increasing." },
          { german: "Ungeachtet der hohen Kosten muss die Energiewende umgesetzt werden.", english: "Regardless of the high costs, the energy transition must be implemented." },
          { german: "Nachhaltiges Handeln erfordert eine weltweite Zusammenarbeit.", english: "Sustainable action requires worldwide cooperation." }
        ],
        actionItems: [
          "Deliver a structured presentation on green technology or climate policy",
          "Master complex concessive & causal connectors",
          "Debate energy transition challenges in German"
        ],
        estimatedHours: "15 - 20 hours"
      },
      {
        id: "b2-u7",
        unitNumber: 7,
        title: "Unit 7: Psychology, Emotions & Fine Nuance (Gefühle & Charakter)",
        description: "Express subtle emotions, personality traits, diplomatic disagreement, and modal nuance.",
        grammarFocus: "German Modal Particles (ja, doch, halt, eben, schon, mal) for authentic native conversational rhythm",
        themes: [
          "Feelings & Personality (Gefühle & Persönlichkeit) 💭",
          "Family & Friends (Familie & Freunde) 👥"
        ],
        keyPhrases: [
          { german: "Das ist nun mal eine Tatsache, die man nicht ignorieren kann.", english: "That is simply a fact that one cannot ignore." },
          { german: "Ich stimme Ihnen in vielen Punkten zu, jedoch würde ich zu bedenken geben...", english: "I agree with you on many points, however I would point out..." },
          { german: "Er zeigt außergewöhnliche Belastbarkeit und Empathie.", english: "He demonstrates extraordinary resilience and empathy." }
        ],
        actionItems: [
          "Master the subtle usage of modal particles in dialogue",
          "Practice diplomatic disagreement and negotiation strategies",
          "Take the B2 Final Comprehensive Evaluation Quiz"
        ],
        estimatedHours: "15 - 20 hours"
      }
    ]
  }
};
