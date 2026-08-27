export interface ConversationTopic {
  id: string;
  title: string;
  level: "A1" | "A2" | "B1" | "B2";
  category: "Everyday Life" | "Food & Dining" | "Shopping" | "Travel & Places" | "Social & Culture" | "Work & Study" | "Health & Wellness" | "Tech & Society";
  emoji: string;
  german: string;
  english: string;
  keywords: string[];
}

export const POPULAR_VOICE_TOPICS: ConversationTopic[] = [
  // --- LEVEL A1 TOPICS (10) ---
  {
    id: "a1-1",
    title: "Sich vorstellen (Self Introduction)",
    level: "A1",
    category: "Everyday Life",
    emoji: "👋",
    german: "Hallo! Ich heiße Anna, komme aus Spanien und wohne seit drei Monaten in Berlin.",
    english: "Hello! My name is Anna, I come from Spain and have been living in Berlin for three months.",
    keywords: ["heißen", "kommen aus", "wohnen in", "Jahre alt", "Beruf"]
  },
  {
    id: "a1-2",
    title: "Begrüßung & Wie geht's (Greetings & Well-being)",
    level: "A1",
    category: "Everyday Life",
    emoji: "😊",
    german: "Guten Tag! Wie geht es dir heute? Mir geht es sehr gut, danke!",
    english: "Good day! How are you today? I am doing very well, thank you!",
    keywords: ["Guten Tag", "Wie geht's", "danke", "super", "müde", "auch"]
  },
  {
    id: "a1-3",
    title: "Essen & Trinken bestellen (Ordering Food & Drink)",
    level: "A1",
    category: "Food & Dining",
    emoji: "🍽️",
    german: "Hallo! Ich möchte bitte einen Kaffee mit Milch und ein Stück Apfelkuchen bestellen.",
    english: "Hello! I would like to order a coffee with milk and a piece of apple cake, please.",
    keywords: ["bestellen", "möchte", "Kaffee", "Wasser", "die Rechnung", "bitte"]
  },
  {
    id: "a1-4",
    title: "Im Supermarkt einkaufen (Grocery Shopping)",
    level: "A1",
    category: "Shopping",
    emoji: "🛒",
    german: "Entschuldigung, wo finde ich frische Milch und wie viel kosten die Tomaten?",
    english: "Excuse me, where do I find fresh milk and how much do the tomatoes cost?",
    keywords: ["einkaufen", "kosten", "wie viel", "wo ist", "Euro", "Kasse"]
  },
  {
    id: "a1-5",
    title: "Wetter & Jahreszeiten (Weather & Seasons)",
    level: "A1",
    category: "Everyday Life",
    emoji: "☀️",
    german: "Heute scheint die Sonne und es ist warm. Welches Wetter magst du am liebsten?",
    english: "Today the sun is shining and it is warm. What weather do you like best?",
    keywords: ["Sonne", "Regen", "warm", "kalt", "Grad", "Wetter"]
  },
  {
    id: "a1-6",
    title: "Familie & Haustiere (Family & Pets)",
    level: "A1",
    category: "Social & Culture",
    emoji: "👨‍👩‍👧",
    german: "Ich habe eine kleine Familie mit zwei Brüdern und einem Hund. Hast du auch Haustiere?",
    english: "I have a small family with two brothers and a dog. Do you also have pets?",
    keywords: ["Eltern", "Geschwister", "Hund", "Katze", "Familie"]
  },
  {
    id: "a1-7",
    title: "Uhrzeit & Tageszeit (Time & Schedule)",
    level: "A1",
    category: "Everyday Life",
    emoji: "⏰",
    german: "Wie viel Uhr ist es bitte? Mein Deutschkurs beginnt um 18:00 Uhr.",
    english: "What time is it please? My German course starts at 6:00 PM.",
    keywords: ["Uhrzeit", "beginnt", "morgens", "abends", "spät", "Uhr"]
  },
  {
    id: "a1-8",
    title: "Meine Wohnung & Zimmer (Home & Apartment)",
    level: "A1",
    category: "Everyday Life",
    emoji: "🏠",
    german: "Ich wohne in einer hellen Zweizimmerwohnung mit Küche und Balkon.",
    english: "I live in a bright two-room apartment with a kitchen and balcony.",
    keywords: ["Wohnung", "Zimmer", "Küche", "Tisch", "Stuhl", "gemütlich"]
  },
  {
    id: "a1-9",
    title: "Farben & Kleidung (Colors & Clothes)",
    level: "A1",
    category: "Shopping",
    emoji: "👕",
    german: "Ich trage heute eine blaue Jeans und einen roten Pullover.",
    english: "Today I am wearing blue jeans and a red sweater.",
    keywords: ["tragen", "rot", "blau", "schwarz", "Hose", "Hemd", "Schuhe"]
  },
  {
    id: "a1-10",
    title: "Zahlen & Preise (Numbers & Prices)",
    level: "A1",
    category: "Shopping",
    emoji: "💶",
    german: "Zwei Brötchen und eine Flasche Wasser kosten zusammen vier Euro fünfzig.",
    english: "Two bread rolls and a bottle of water cost four euros fifty together.",
    keywords: ["eins", "zwei", "drei", "Euro", "Cent", "bezahlen", "zusammen"]
  },

  // --- LEVEL A2 TOPICS (10) ---
  {
    id: "a2-1",
    title: "Tagesablauf & Routine (Daily Routine)",
    level: "A2",
    category: "Everyday Life",
    emoji: "☕",
    german: "Ich stehe jeden Morgen um 7 Uhr auf, trinke Kaffee und fahre mit dem Bus zur Arbeit.",
    english: "I wake up every morning at 7 AM, drink coffee and take the bus to work.",
    keywords: ["aufstehen", "zur Arbeit fahren", "kochen", "schlafen gehen", "Alltag"]
  },
  {
    id: "a2-2",
    title: "Nach dem Weg fragen (Asking Directions)",
    level: "A2",
    category: "Travel & Places",
    emoji: "🗺️",
    german: "Entschuldigung, wie komme ich am besten zum Hauptbahnhof oder zum Goetheplatz?",
    english: "Excuse me, how do I best get to the main train station or Goethe Square?",
    keywords: ["geradeaus", "links abbiegen", "rechts", "Haltestelle", "weit"]
  },
  {
    id: "a2-3",
    title: "Wochenendpläne (Weekend Activity Plans)",
    level: "A2",
    category: "Social & Culture",
    emoji: "🚴‍♂️",
    german: "Am Wochenende möchte ich im Park Fahrrad fahren und abends einen Film sehen.",
    english: "On the weekend I would like to ride my bike in the park and watch a movie in the evening.",
    keywords: ["Wochenende", "vorhaben", "treffen", "entspannen", "spazieren"]
  },
  {
    id: "a2-4",
    title: "Beim Arzt (At the Doctor's Clinic)",
    level: "A2",
    category: "Health & Wellness",
    emoji: "🩺",
    german: "Guten Tag Herr Doktor, ich habe seit gestern Halsschmerzen und leichten Kopfschmerz.",
    english: "Good day doctor, I have had a sore throat and mild headache since yesterday.",
    keywords: ["Schmerzen", "Fieber", "Rezept", "Tablette", "krank", "Besserung"]
  },
  {
    id: "a2-5",
    title: "Urlaub & Reiseerlebnisse (Vacations & Travel)",
    level: "A2",
    category: "Travel & Places",
    emoji: "✈️",
    german: "Letzten Sommer war ich am Meer in Italien. Das Essen war köstlich und die Sonne schien.",
    english: "Last summer I was at the sea in Italy. The food was delicious and the sun was shining.",
    keywords: ["Urlaub", "reisen", "Hotel", "Strand", "Flugzeug", "besichtigen"]
  },
  {
    id: "a2-6",
    title: "Kleidung kaufen im Geschäft (Shopping for Clothes)",
    level: "A2",
    category: "Shopping",
    emoji: "🛍️",
    german: "Gibt es diese schwarze Jacke auch in Größe M? Kann ich sie anprobieren?",
    english: "Is this black jacket also available in size M? Can I try it on?",
    keywords: ["anprobieren", "Größe", "Kabine", "passt gut", "zu groß", "stehen"]
  },
  {
    id: "a2-7",
    title: "Geburtstag & Einladung (Parties & Celebrations)",
    level: "A2",
    category: "Social & Culture",
    emoji: "🎂",
    german: "Ich feiere am Samstag meinen Geburtstag und möchte dich herzlich dazu einladen!",
    english: "I am celebrating my birthday on Saturday and would love to invite you!",
    keywords: ["einladen", "Geschenk", "Feier", "mitbringen", "Kuchen", "Prost"]
  },
  {
    id: "a2-8",
    title: "Wohnungssuche & Miete (Flat Hunting & Rent)",
    level: "A2",
    category: "Everyday Life",
    emoji: "🔑",
    german: "Ich suche eine ruhige Wohnung mit Einbauküche. Wie hoch ist die Warmmiete?",
    english: "I am looking for a quiet apartment with a fitted kitchen. How much is the warm rent?",
    keywords: ["Miete", "Kaution", "Nebenkosten", "Vermieter", "Lage", "Vertrag"]
  },
  {
    id: "a2-9",
    title: "Öffentlicher Nahverkehr (Public Transportation)",
    level: "A2",
    category: "Travel & Places",
    emoji: "🚆",
    german: "Fährt diese U-Bahn direkt zum Flughafen oder muss ich am Hauptbahnhof umsteigen?",
    english: "Does this subway go straight to the airport or do I need to change at central station?",
    keywords: ["Fahrkarte", "umsteigen", "Gleis", "Verspätung", "Linie", "S-Bahn"]
  },
  {
    id: "a2-10",
    title: "Hobbys & Freizeit (Hobbies & Leisure)",
    level: "A2",
    category: "Social & Culture",
    emoji: "🎨",
    german: "In meiner Freizeit spiele ich gerne Gitarre, koche für Freunde und gehe schwimmen.",
    english: "In my free time I enjoy playing guitar, cooking for friends and swimming.",
    keywords: ["Gitarre", "Sport", "schwimmen", "lesen", "kochen", "Musik"]
  },

  // --- LEVEL B1 TOPICS (10) ---
  {
    id: "b1-1",
    title: "Vorstellungsgespräch & Karriere (Job Interview)",
    level: "B1",
    category: "Work & Study",
    emoji: "💼",
    german: "Ich interessiere mich sehr für diese Stelle, da ich bereits Erfahrung im Projektmanagement habe.",
    english: "I am very interested in this position as I already have experience in project management.",
    keywords: ["Erfahrung", "Stärken", "Bewerbung", "Aufgaben", "Stelle", "Teamwork"]
  },
  {
    id: "b1-2",
    title: "Medien & Soziale Netzwerke (Digital Life & Social Media)",
    level: "B1",
    category: "Tech & Society",
    emoji: "📱",
    german: "Soziale Medien verbinden Menschen weltweit, führen aber manchmal auch zu Ablenkung.",
    english: "Social media connects people worldwide, but sometimes also leads to distraction.",
    keywords: ["Nutzen", "Vor- und Nachteile", "Bildschirmzeit", "Nachrichten", "online"]
  },
  {
    id: "b1-3",
    title: "Kulturunterschiede beim Reisen (Cultural Differences)",
    level: "B1",
    category: "Social & Culture",
    emoji: "🌍",
    german: "Wenn man in neue Länder reist, erlebt man oft überraschende Traditionen und Bräuche.",
    english: "When traveling to new countries, one often experiences surprising traditions and customs.",
    keywords: ["Tradition", "Gewohnheiten", "Kultur", "fremd", "Gastfreundschaft"]
  },
  {
    id: "b1-4",
    title: "Gesunde Ernährung & Kochen (Healthy Eating & Nutrition)",
    level: "B1",
    category: "Health & Wellness",
    emoji: "🥗",
    german: "Eine ausgewogene Ernährung mit viel frischem Gemüse ist sehr wichtig für die Gesundheit.",
    english: "A balanced diet with plenty of fresh vegetables is very important for health.",
    keywords: ["ausgewogen", "Vitamine", "kochen", "Bio-Produkte", "Diät", "Zutaten"]
  },
  {
    id: "b1-5",
    title: "Umweltschutz im Alltag (Environmental Action)",
    level: "B1",
    category: "Tech & Society",
    emoji: "🌿",
    german: "Im Alltag versuche ich Müll zu vermeiden, Plastik zu reduzieren und mehr Bus zu fahren.",
    english: "In daily life I try to avoid trash, reduce plastic and ride the bus more.",
    keywords: ["Mülltrennung", "sparen", "Recycling", "Bio", "Energie", "Zukunft"]
  },
  {
    id: "b1-6",
    title: "Filme, Bücher & Serien (Entertainment & Critique)",
    level: "B1",
    category: "Social & Culture",
    emoji: "🎬",
    german: "Ich habe neulich einen sehr bewegenden Dokumentarfilm über Naturheilkunde gesehen.",
    english: "I recently watched a very moving documentary movie about natural medicine.",
    keywords: ["Handlung", "Hauptfigur", "spannend", "empfehlenswert", "Regie", "Kino"]
  },
  {
    id: "b1-7",
    title: "Sprachenlernen & Methoden (Language Learning Tips)",
    level: "B1",
    category: "Work & Study",
    emoji: "🗣️",
    german: "Regelmäßiges Hören und Sprechen hilft mir am meisten beim Lernen der deutschen Sprache.",
    english: "Regular listening and speaking helps me the most when learning the German language.",
    keywords: ["Vokabeln", "Wortschatz", "Grammatik", "Flüssigkeit", "Übung", "Fehler"]
  },
  {
    id: "b1-8",
    title: "Online-Shopping vs. Einzelhandel (Online vs In-Store)",
    level: "B1",
    category: "Shopping",
    emoji: "📦",
    german: "Online einzukaufen ist bequem, aber der lokale Handel bietet persönliche Beratung.",
    english: "Shopping online is convenient, but local retail offers personal advice.",
    keywords: ["Lieferung", "Beratung", "Vorteile", "Bequemlichkeit", "Rücksendung"]
  },
  {
    id: "b1-9",
    title: "Stadtleben vs. Landleben (City vs Countryside)",
    level: "B1",
    category: "Everyday Life",
    emoji: "🏙️",
    german: "Die Stadt bietet ein reichhaltiges Kulturangebot, aber auf dem Land genießt man Ruhe.",
    english: "The city offers a rich cultural offering, but in the countryside one enjoys peace.",
    keywords: ["Lebensqualität", "Natur", "Verkehr", "Lärm", "Angebote", "Ruhe"]
  },
  {
    id: "b1-10",
    title: "Freundschaft & Werte (Friendship & Values)",
    level: "B1",
    category: "Social & Culture",
    emoji: "🤝",
    german: "Ein echter Freund ist für einen da, wenn man Hilfe braucht und ehrlich zuhört.",
    english: "A true friend is there for you when you need help and listens honestly.",
    keywords: ["Vertrauen", "Ehrlichkeit", "Zuneigung", "Unterstützung", "Beziehung"]
  },

  // --- LEVEL B2 TOPICS (10) ---
  {
    id: "b2-1",
    title: "Zukunft der Arbeit & KI (Future of Work & AI)",
    level: "B2",
    category: "Work & Study",
    emoji: "🤖",
    german: "Aufgrund von künstlicher Intelligenz verändern sich viele Berufsfelder und erfordern neue Kompetenzen.",
    english: "Due to artificial intelligence, many career fields are changing and require new skillsets.",
    keywords: ["Automatisierung", "Arbeitsmarkt", "Chancen", "Risiken", "Wandel", "KI"]
  },
  {
    id: "b2-2",
    title: "Klimawandel & Energiewende (Climate Change & Energy)",
    level: "B2",
    category: "Tech & Society",
    emoji: "⚡",
    german: "Erneuerbare Energien und nachhaltige Politik sind entscheidend, um Klimaziele zu erreichen.",
    english: "Renewable energies and sustainable policy are crucial to achieving climate targets.",
    keywords: ["Treibhausgase", "Nachhaltigkeit", "Emissionen", "Solarenergie", "Verantwortung"]
  },
  {
    id: "b2-3",
    title: "Work-Life-Balance & Mentale Gesundheit (Work-Life Balance)",
    level: "B2",
    category: "Health & Wellness",
    emoji: "🧘‍♂️",
    german: "Flexibles Arbeiten und Homeoffice bieten Freiheit, erfordern jedoch klare Grenzen zur Erholung.",
    english: "Flexible work and remote options offer freedom, but require clear boundaries for recovery.",
    keywords: ["Belastung", "Homeoffice", "Abgrenzung", "Wohlbefinden", "Überlastung"]
  },
  {
    id: "b2-4",
    title: "Medienkompetenz & Falschnachrichten (Media Literacy)",
    level: "B2",
    category: "Tech & Society",
    emoji: "📰",
    german: "In Zeiten digitaler Reizüberflutung ist das kritische Hinterfragen von Informationsquellen unerlässlich.",
    english: "In times of digital sensory overload, critically questioning information sources is essential.",
    keywords: ["Glaubwürdigkeit", "Manipulation", "Quelle", "Journalismus", "Falschinformation"]
  },
  {
    id: "b2-5",
    title: "Konsumkultur & Inflation (Consumer Culture & Economy)",
    level: "B2",
    category: "Shopping",
    emoji: "📈",
    german: "Steigende Lebenshaltungskosten zwingen viele Haushalte, ihr Konsumverhalten anzupassen.",
    english: "Rising living costs force many households to adapt their consumption behavior.",
    keywords: ["Kaufkraft", "Inflation", "Ausgaben", "Einsparungen", "Wirtschaft"]
  },
  {
    id: "b2-6",
    title: "Bildungssystem & lebenslanges Lernen (Education Systems)",
    level: "B2",
    category: "Work & Study",
    emoji: "🎓",
    german: "Lebenslanges Lernen ist in einer dynamischen Wissensgesellschaft die Voraussetzung für Erfolg.",
    english: "Lifelong learning in a dynamic knowledge society is the prerequisite for success.",
    keywords: ["Weiterbildung", "Schulsystem", "Digitalisierung", "Kompetenz", "Qualifikation"]
  },
  {
    id: "b2-7",
    title: "Auswandern & Integration (Immigration & Integration)",
    level: "B2",
    category: "Social & Culture",
    emoji: "🌉",
    german: "Erfolgreiche Integration erfordert Sprachkenntnisse, berufliche Chancen und gesellschaftliche Offenheit.",
    english: "Successful integration requires language skills, professional opportunities and social openness.",
    keywords: ["Toleranz", "Sprachkurs", "Teilhabe", "Vielfalt", "Bürokratie"]
  },
  {
    id: "b2-8",
    title: "Gesundheitssystem & Prävention (Healthcare Systems)",
    level: "B2",
    category: "Health & Wellness",
    emoji: "🏥",
    german: "Präventive Maßnahmen und gesunder Lebensstil entlasten das Gesundheitssystem nachhaltig.",
    english: "Preventive measures and a healthy lifestyle sustainably relieve the healthcare system.",
    keywords: ["Vorsorge", "Versorgung", "Krankenkasse", "Lebensstil", "Medizin"]
  },
  {
    id: "b2-9",
    title: "Kulturförderung & Gesellschaft (Cultural Funding)",
    level: "B2",
    category: "Social & Culture",
    emoji: "🎭",
    german: "Kunst und Kultur fördern den kritischen Dialog und stiften gesellschaftlichen Zusammenhalt.",
    english: "Art and culture foster critical dialogue and build social cohesion.",
    keywords: ["Förderung", "Meinungsfreiheit", "Vielfalt", "Theater", "Identität"]
  },
  {
    id: "b2-10",
    title: "Ethik in der modernen Technologie (Tech Ethics)",
    level: "B2",
    category: "Tech & Society",
    emoji: "🧬",
    german: "Der technische Fortschritt muss von ethischen Leitlinien begleitet werden, um Menschenwürde zu wahren.",
    english: "Technological progress must be accompanied by ethical guidelines to protect human dignity.",
    keywords: ["Ethik", "Verantwortung", "Datenschutz", "Privatsphäre", "Richtlinien"]
  }
];
