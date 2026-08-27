import { convertRawVocabulary, VocabularyEntry } from "./telc_helper";

const RAW_P5: [string, string, string, string, string][] = [
  // === Thema 1: Arbeit & Beruf 💼 (Work & Career) ===
  ["die Beförderung", "promotion", "Nach zwei Jahren harten Einsatzes bekam sie eine Beförderung.", "After two years of hard work, she got a promotion.", "Arbeit & Beruf 💼"],
  ["die Gehaltserhöhung", "salary increase / pay raise", "Der Chef hat mir eine Gehaltserhöhung versprochen.", "The boss promised me a pay raise.", "Arbeit & Beruf 💼"],
  ["der Arbeitsvertrag", "employment contract", "Bitte lesen Sie den Arbeitsvertrag sorgfältig durch.", "Please read through the employment contract carefully.", "Arbeit & Beruf 💼"],
  ["die Überstunden", "overtime hours", "Ich muss diesen Monat viele Überstunden machen.", "I have to work a lot of overtime this month.", "Arbeit & Beruf 💼"],
  ["die Probezeit", "probationary period", "Die Probezeit dauert üblicherweise sechs Monate.", "The probationary period usually lasts six months.", "Arbeit & Beruf 💼"],
  ["die Kündigungsfrist", "notice period for resignation", "Die Kündigungsfrist beträgt drei Monate.", "The notice period is three months.", "Arbeit & Beruf 💼"],
  ["die Selbstständigkeit", "self-employment / independence", "Er wagte den Schritt in die Selbstständigkeit.", "He took the step into self-employment.", "Arbeit & Beruf 💼"],
  ["sich bewerben um", "to apply for (a job)", "Ich bewerbe mich um die Stelle als Abteilungsleiter.", "I am applying for the position as department head.", "Arbeit & Beruf 💼"],
  ["das Betriebsklima", "working atmosphere", "Das Betriebsklima in unserer Firma ist sehr gut.", "The working atmosphere in our company is very good.", "Arbeit & Beruf 💼"],
  ["die Weiterbildung", "further education / training", "Ich nehme an einer fachlichen Weiterbildung teil.", "I am taking part in a professional training course.", "Arbeit & Beruf 💼"],

  // === Thema 2: Ausbildung & Schule 🎓 (Education & School) ===
  ["der Studienplatz", "university place / spot", "Sie hat einen begehrten Studienplatz in Medizin bekommen.", "She got a coveted place to study medicine.", "Ausbildung & Schule 🎓"],
  ["das Stipendium", "scholarship / grant", "Er hat ein Stipendium für sein Auslandsstudium erhalten.", "He received a scholarship for his studies abroad.", "Ausbildung & Schule 🎓"],
  ["die Vorlesung", "university lecture", "Die Vorlesung beginnt pünktlich um 10 Uhr.", "The lecture starts punctually at 10 a.m.", "Ausbildung & Schule 🎓"],
  ["das Seminar", "seminar / workshop", "Im Seminar diskutieren wir aktuelle Forschungsthemen.", "In the seminar we discuss current research topics.", "Ausbildung & Schule 🎓"],

  // === Thema 3: Alltag & Freizeit 📅 (Everyday Life & Leisure) ===
  ["die Gewohnheit", "habit / custom", "Gute Gewohnheiten verbessern die tägliche Lebensqualität.", "Good habits improve daily quality of life.", "Alltag & Freizeit 📅"],
  ["die Freizeitgestaltung", "leisure activities", "Die Freizeitgestaltung ist im Urlaub sehr vielseitig.", "Leisure activities are very diverse on holiday.", "Alltag & Freizeit 📅"],
  ["das Erlebnis", "experience / adventure", "Die Bergwanderung war ein unvergessliches Erlebnis.", "The mountain hike was an unforgettable experience.", "Alltag & Freizeit 📅"],
  ["sich entspannen", "to relax", "Am Wochenende kann ich mich endlich entspannen.", "On the weekend I can finally relax.", "Alltag & Freizeit 📅"],
  ["unternehmen", "to undertake / do something", "Was wollt ihr am Samstag gemeinsam unternehmen?", "What do you want to do together on Saturday?", "Alltag & Freizeit 📅"],

  // === Thema 4: Kunst, Kultur & Geschichte 🎨 (Art, Culture & History) ===
  ["die Aufführung", "performance / show", "Die Theateraufführung dauerte knapp zwei Stunden.", "The theater performance lasted just under two hours.", "Kunst, Kultur & Geschichte 🎨"],
  ["das Kunstwerk", "work of art", "Das Kunstwerk wird im Museum ausgestellt.", "The work of art is exhibited in the museum.", "Kunst, Kultur & Geschichte 🎨"],
  ["die Leidenschaft", "passion", "Klassische Musik ist seine größte Leidenschaft.", "Classical music is his greatest passion.", "Kunst, Kultur & Geschichte 🎨"],
  ["das Meisterwerk", "masterpiece", "Dieses Gemälde gilt als sein größtes Meisterwerk.", "This painting is considered his greatest masterpiece.", "Kunst, Kultur & Geschichte 🎨"],

  // === Thema 5: Reisen & Verkehr 🚗 (Travel & Transportation) ===
  ["der Mietwagen", "rental car", "Wir haben am Flughafen einen Mietwagen gebucht.", "We booked a rental car at the airport.", "Reisen & Verkehr 🚗"],
  ["die Umleitung", "detour / diversion", "Wegen der Baustelle gibt es eine Umleitung.", "Because of the construction site there is a detour.", "Reisen & Verkehr 🚗"],
  ["der Kreisverkehr", "roundabout", "Nehmen Sie im Kreisverkehr die zweite Ausfahrt.", "Take the second exit at the roundabout.", "Reisen & Verkehr 🚗"],
  ["die Sicherheitskontrolle", "security check", "Die Sicherheitskontrolle am Flughafen dauerte lange.", "The security check at the airport took a long time.", "Reisen & Verkehr 🚗"],
  ["das Pauschalangebot", "package deal / tour", "Wir haben ein günstiges Pauschalangebot gefunden.", "We found an affordable package deal.", "Reisen & Verkehr 🚗"],
  ["umsteigen", "to change trains / buses", "In Frankfurt müssen wir in den ICE umsteigen.", "In Frankfurt we have to transfer to the ICE train.", "Reisen & Verkehr 🚗"],
  ["verpassen", "to miss (train / bus)", "Wenn wir uns nicht beeilen, verpassen wir den Bus.", "If we don't hurry, we will miss the bus.", "Reisen & Verkehr 🚗"],

  // === Thema 6: Wohnen & Haushalt 🏠 (Housing & Living) ===
  ["die Nebenkostenabrechnung", "utility statement / bill", "Die Nebenkostenabrechnung kommt einmal im Jahr.", "The utility statement comes once a year.", "Wohnen & Haushalt 🏠"],
  ["die Mietkaution", "security deposit", "Die Mietkaution beträgt zwei Monatsmieten.", "The security deposit is two months' rent.", "Wohnen & Haushalt 🏠"],
  ["der Hausmeister", "caretaker / janitor", "Der Hausmeister repariert die defekte Haustür.", "The caretaker is repairing the broken front door.", "Wohnen & Haushalt 🏠"],
  ["die Mülltrennung", "waste separation", "In Deutschland ist die Mülltrennung sehr wichtig.", "In Germany, waste separation is very important.", "Wohnen & Haushalt 🏠"],
  ["die Wohngemeinschaft", "shared apartment (WG)", "Viele Studenten wohnen zusammen in einer Wohngemeinschaft.", "Many students live together in a shared apartment.", "Wohnen & Haushalt 🏠"],
  ["renovieren", "to renovate / redecorate", "Im Frühjahr wollen wir das Wohnzimmer renovieren.", "In spring we want to renovate the living room.", "Wohnen & Haushalt 🏠"],

  // === Thema 7: Gesundheit & Körper 🏥 (Health & Medicine) ===
  ["die Krankmeldung", "sick note / medical note", "Reichen Sie die Krankmeldung sofort beim Arbeitgeber ein.", "Submit the sick note immediately to your employer.", "Gesundheit & Körper 🏥"],
  ["die Nebenwirkung", "side effect", "Dieses Medikament hat keine starken Nebenwirkungen.", "This medicine has no strong side effects.", "Gesundheit & Körper 🏥"],
  ["der Blutdruck", "blood pressure", "Der Arzt misst regelmäßig meinen Blutdruck.", "The doctor regularly measures my blood pressure.", "Gesundheit & Körper 🏥"],
  ["die Vorsorgeuntersuchung", "preventive check-up", "Eine jährliche Vorsorgeuntersuchung wird empfohlen.", "An annual check-up is recommended.", "Gesundheit & Körper 🏥"],
  ["die Krankenkasse", "health insurance provider", "Die Krankenkasse übernimmt die Behandlungskosten.", "The health insurance covers the treatment costs.", "Gesundheit & Körper 🏥"],
  ["vorbeugen", "to prevent / guard against", "Sport hilft dabei, Krankheiten vorzubeugen.", "Exercise helps to prevent illnesses.", "Gesundheit & Körper 🏥"],
  ["genesen", "to recover / heal", "Der Patient ist nach der Operation schnell genesen.", "The patient recovered quickly after surgery.", "Gesundheit & Körper 🏥"],

  // === Thema 8: Essen & Trinken 🍽️ (Food & Dining) ===
  ["die Zutat", "ingredient", "Welche Zutaten brauche ich für das Kuchenrezept?", "Which ingredients do I need for the cake recipe?", "Essen & Trinken 🍽️"],
  ["das Gewürz", "spice / seasoning", "Frische Gewürze geben dem Essen ein tolles Aroma.", "Fresh spices give the food a great aroma.", "Essen & Trinken 🍽️"],
  ["die ausgewogene Ernährung", "balanced diet", "Eine ausgewogene Ernährung hält gesund und fit.", "A balanced diet keeps you healthy and fit.", "Essen & Trinken 🍽️"],
  ["die Unverträglichkeit", "intolerance / allergy", "Sie hat eine Laktose-Unverträglichkeit.", "She has a lactose intolerance.", "Essen & Trinken 🍽️"],
  ["das Drei-Gänge-Menü", "three-course meal", "Zum Geburtstag gab es ein leckeres Drei-Gänge-Menü.", "For the birthday there was a delicious three-course meal.", "Essen & Trinken 🍽️"],
  ["köstlich", "delicious / exquisite", "Das Abendessen schmeckte hervorragend und köstlich.", "The dinner tasted excellent and delicious.", "Essen & Trinken 🍽️"],

  // === Thema 9: Medien & Kommunikation 💻 (Media & Tech) ===
  ["die Benachrichtigung", "notification", "Ich habe eine neue Benachrichtigung auf meinem Smartphone.", "I have a new notification on my smartphone.", "Medien & Kommunikation 💻"],
  ["der Datenschutz", "data protection / privacy", "Datenschutz ist im Internet besonders wichtig.", "Data protection is especially important on the Internet.", "Medien & Kommunikation 💻"],
  ["die Suchmaschine", "search engine", "Geben Sie den Begriff in die Suchmaschine ein.", "Enter the term into the search engine.", "Medien & Kommunikation 💻"],
  ["der Speicherplatz", "storage space", "Mein Computer hat nicht mehr genug Speicherplatz.", "My computer no longer has enough storage space.", "Medien & Kommunikation 💻"],
  ["die Zugangsdaten", "login credentials / access data", "Halten Sie Ihre Zugangsdaten immer streng geheim.", "Always keep your login credentials strictly secret.", "Medien & Kommunikation 💻"],
  ["herunterladen", "to download", "Sie können das Dokument kostenlos herunterladen.", "You can download the document for free.", "Medien & Kommunikation 💻"],
  ["recherchieren", "to research", "Er muss Informationen für sein Projekt recherchieren.", "He has to research information for his project.", "Medien & Kommunikation 💻"],

  // === Thema 10: Einkaufen & Verbraucherschutz 🛒 (Shopping & Finance) ===
  ["der Kontoauszug", "bank statement", "Ich überprüfe meine Ausgaben auf dem Kontoauszug.", "I check my expenses on the bank statement.", "Einkaufen & Verbraucherschutz 🛒"],
  ["die Ratenzahlung", "installment payment", "Wir haben das Sofa auf Ratenzahlung gekauft.", "We bought the sofa on installment payments.", "Einkaufen & Verbraucherschutz 🛒"],
  ["die Zinsen", "interest rates", "Die Zinsen für das Sparkonto sind wieder gestiegen.", "The interest rates for the savings account have risen again.", "Einkaufen & Verbraucherschutz 🛒"],
  ["das Schnäppchen", "bargain / good deal", "Diese Winterjacke war ein echtes Schnäppchen.", "This winter jacket was a real bargain.", "Einkaufen & Verbraucherschutz 🛒"],
  ["die Rückerstattung", "refund / reimbursement", "Nach der Reklamation bekam ich eine Rückerstattung.", "After the complaint I received a refund.", "Einkaufen & Verbraucherschutz 🛒"],
  ["sparen", "to save money", "Wir sparen Geld für unseren nächsten Sommerurlaub.", "We are saving money for our next summer vacation.", "Einkaufen & Verbraucherschutz 🛒"],

  // === Thema 11: Familie & Beziehungen 👥 / Gefühle 💭 ===
  ["das Verständnis", "understanding / empathy", "Vielen Dank für dein großes Verständnis.", "Thank you very much for your great understanding.", "Gefühle, Charakter & Meinung 💭"],
  ["die Dankbarkeit", "gratitude", "Ich empfinde große Dankbarkeit für eure Hilfe.", "I feel deep gratitude for your help.", "Gefühle, Charakter & Meinung 💭"],
  ["die Erleichterung", "relief", "Es war eine große Erleichterung, das Ergebnis zu erfahren.", "It was a great relief to learn the result.", "Gefühle, Charakter & Meinung 💭"],
  ["das Selbstbewusstsein", "self-confidence", "Er hat durch den Erfolg viel Selbstbewusstsein gewonnen.", "He gained a lot of self-confidence through success.", "Gefühle, Charakter & Meinung 💭"],
  ["vertrauenswürdig", "trustworthy", "Mein Kollege ist sehr ehrlich und vertrauenswürdig.", "My colleague is very honest and trustworthy.", "Gefühle, Charakter & Meinung 💭"],
  ["der Zusammenhalt", "cohesion / solidarity", "Der Zusammenhalt in unserer Familie ist sehr stark.", "The cohesion in our family is very strong.", "Familie & Beziehungen 👥"],

  // === Thema 12: Umwelt, Natur & Wetter 🌳 (Environment & Weather) ===
  ["der Klimawandel", "climate change", "Der Klimawandel ist eine weltweite Herausforderung.", "Climate change is a global challenge.", "Umwelt, Natur & Wetter 🌳"],
  ["erneuerbare Energien", "renewable energies", "Deutschland setzt verstärkt auf erneuerbare Energien.", "Germany increasingly relies on renewable energies.", "Umwelt, Natur & Wetter 🌳"],
  ["die Müllvermeidung", "waste reduction", "Müllvermeidung schützt die Umwelt und Gewässer.", "Waste reduction protects the environment and bodies of water.", "Umwelt, Natur & Wetter 🌳"],
  ["nachhaltig", "sustainable", "Wir sollten verstärkt nachhaltige Produkte kaufen.", "We should buy more sustainable products.", "Umwelt, Natur & Wetter 🌳"],
  ["recyceln", "to recycle", "Altpapier und Glas lassen sich gut recyceln.", "Waste paper and glass can be recycled easily.", "Umwelt, Natur & Wetter 🌳"],

  // === Thema 13: Staat, Recht & Politik ⚖️ / Ämter 🏢 ===
  ["die Meinungsfreiheit", "freedom of speech", "Die Meinungsfreiheit ist ein geschütztes Grundrecht.", "Freedom of speech is a protected fundamental right.", "Staat, Recht & Politik ⚖️"],
  ["die Behörde", "public authority / office", "Die Behörde ist heute bis 16 Uhr geöffnet.", "The office is open today until 4 p.m.", "Ämter & Behörden 🏢"],
  ["der Bescheid", "official decision / notice", "Der schriftliche Bescheid kommt in den nächsten Tagen.", "The official decision arrives in the next few days.", "Ämter & Behörden 🏢"],
  ["die Gesetzesänderung", "amendment to the law", "Das Parlament hat eine wichtige Gesetzesänderung beschlossen.", "Parliament decided on an important amendment to the law.", "Staat, Recht & Politik ⚖️"],
  ["einhalten", "to comply with / observe", "Man muss die Verkehrsregeln strikt einhalten.", "One must strictly comply with traffic rules.", "Staat, Recht & Politik ⚖️"],

  // === Thema 14: Haustiere & Tiere 🐾 (Pets & Animals) ===
  ["der Tierarzt / die Tierärztin", "veterinarian / vet", "Wir bringen unsere Katze regelmäßig zum Tierarzt.", "We regularly bring our cat to the vet.", "Haustiere & Tiere 🐾"],
  ["das Tierheim", "animal shelter", "Wir haben unseren Hund aus dem örtlichen Tierheim geholt.", "We got our dog from the local animal shelter.", "Haustiere & Tiere 🐾"],
  ["das Futter", "animal food / pet food", "Vergiss nicht, neues Futter für den Hund zu kaufen.", "Don't forget to buy new food for the dog.", "Haustiere & Tiere 🐾"],
  ["füttern", "to feed (animals)", "Der Junge füttert die Tiere jeden Morgen.", "The boy feeds the animals every morning.", "Haustiere & Tiere 🐾"],
  ["streicheln", "to pet / stroke", "Das Kind möchte den sanften Hund streicheln.", "The child wants to pet the gentle dog.", "Haustiere & Tiere 🐾"]
];

export const TELC_B1_P5: VocabularyEntry[] = convertRawVocabulary(RAW_P5);
