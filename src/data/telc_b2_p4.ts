import { convertRawB2Vocabulary, VocabularyEntry } from "./telc_helper";

const RAW_P4: [string, string, string, string, string][] = [
  // === Gefühle, Charakter & Meinung 💭 ===
  ["die Entschlossenheit", "determination / resolve", "Mit großer Entschlossenheit verfolgte sie ihr ehrgeiziges Lebensziel.", "With great determination, she pursued her ambitious goal in life.", "Gefühle, Charakter & Meinung 💭"],
  ["die Gelassenheit", "serenity / composure", "Er bewahrte selbst in hektischen Situationen eine bewundernswerte Gelassenheit.", "He maintained admirable composure even in hectic situations.", "Gefühle, Charakter & Meinung 💭"],
  ["die Skepsis", "skepticism", "Anfangs stieß das neuartige Konzept auf breite Skepsis.", "Initially, the novel concept met with widespread skepticism.", "Gefühle, Charakter & Meinung 💭"],
  ["das Durchhaltevermögen", "perseverance / stamina", "Für die Bewältigung des Marathons brauchte er enormes Durchhaltevermögen.", "To complete the marathon, he needed enormous stamina.", "Gefühle, Charakter & Meinung 💭"],
  ["die Zuversicht", "optimism / confidence", "Trotz aller Hürden blickt die Gründerin voller Zuversicht in die Zukunft.", "Despite all hurdles, the founder looks to the future with confidence.", "Gefühle, Charakter & Meinung 💭"],
  ["die Urteilskraft", "power of judgment", "Eine geschärfte Urteilskraft schützt vor voreiligen Fehlschlüssen.", "Sharpened judgment protects against hasty false conclusions.", "Gefühle, Charakter & Meinung 💭"],
  ["aufgeschlossen", "open-minded / receptive", "Sie ist kulturellen Neuerungen gegenüber stets sehr aufgeschlossen.", "She is always very open-minded towards cultural innovations.", "Gefühle, Charakter & Meinung 💭"],
  ["gewissenhaft", "conscientious / thorough", "Er erledigt alle übertragenen Aufgaben äußerst gewissenhaft.", "He carries out all assigned tasks extremely conscientiously.", "Gefühle, Charakter & Meinung 💭"],
  ["zielstrebig", "goal-oriented / determined", "Mit zielstrebigem Handeln erreichte der Student Bestnoten.", "Through goal-oriented action, the student achieved top marks.", "Gefühle, Charakter & Meinung 💭"],
  ["hinterfragen", "to scrutinize / question critically", "Kritische Denker hinterfragen Behauptungen, bevor sie sie glauben.", "Critical thinkers question claims before believing them.", "Gefühle, Charakter & Meinung 💭"],

  // === Ämter & Behörden 🏢 ===
  ["die Zuständigkeit", "jurisdiction / area of responsibility", "Die rechtliche Zuständigkeit liegt bei der kommunalen Aufsichtsbehörde.", "Legal jurisdiction lies with the municipal supervisory authority.", "Ämter & Behörden 🏢"],
  ["der Verwaltungsakt", "administrative act / formal decision", "Gegen den rechtswidrigen Verwaltungsakt legte der Bürger Widerspruch ein.", "The citizen lodged an objection against the unlawful administrative act.", "Ämter & Behörden 🏢"],
  ["die Beglaubigung", "attestation / notarization", "Für das Auslandsstudium wird eine amtliche Beglaubigung der Zeugnisse verlangt.", "An official notarization of diplomas is required for studying abroad.", "Ämter & Behörden 🏢"],
  ["das Aktenzeichen", "case reference number", "Geben Sie bei allen Schreiben immer das entsprechende Aktenzeichen an.", "Always state the corresponding reference number in all correspondence.", "Ämter & Behörden 🏢"],
  ["die Bearbeitungsgebühr", "processing fee", "Für die Erstellung des Dokumentes wird eine kleine Bearbeitungsgebühr erhoben.", "A small processing fee is charged for issuing the document.", "Ämter & Behörden 🏢"],
  ["der Einspruch", "objection / official appeal", "Gegen den Steuerbescheid legte der Buchhalter formgerecht Einspruch ein.", "The accountant properly lodged an objection against the tax assessment.", "Ämter & Behörden 🏢"],
  ["die Nachweispflicht", "duty of disclosure / burden of proof", "Der Antragsteller unterliegt bezüglich des Einkommens der Nachweispflicht.", "The applicant is subject to the duty of disclosure regarding income.", "Ämter & Behörden 🏢"],
  ["beantragen", "to apply for / request officially", "Sie möchte einen neuen Reisepass beim Einwohnermeldeamt beantragen.", "She would like to apply for a new passport at the registration office.", "Ämter & Behörden 🏢"],
  ["einreichen", "to submit documents", "Bitte reichen Sie die fehlenden Nachweise innerhalb von zwei Wochen ein.", "Please submit the missing proofs within two weeks.", "Ämter & Behörden 🏢"],
  ["bescheinigen", "to certify / attest", "Der Arzt bescheinigte dem Patienten die vollkommene Arbeitsfähigkeit.", "The doctor certified the patient's complete fitness for work.", "Ämter & Behörden 🏢"],

  // === Alltag & Freizeit 📅 ===
  ["die Zeitmanagement", "time management", "Gutes Zeitmanagement reduziert Stress und erhöht die Ausgewogenheit.", "Good time management reduces stress and increases balance.", "Alltag & Freizeit 📅"],
  ["der Ehrenamtliche", "volunteer worker", "Zahlreiche Ehrenamtliche engagieren sich tatkräftig im Tierschutzverein.", "Numerous volunteers actively participate in the animal protection association.", "Alltag & Freizeit 📅"],
  ["die Auszeit", "time-out / sabbatical", "Nach jahrelanger harter Arbeit gönnte er sich eine sechsmonatige Auszeit.", "After years of hard work, he treated himself to a six-month sabbatical.", "Alltag & Freizeit 📅"],
  ["die Lebensgestaltung", "lifestyle design / way of living", "Individuelle Lebensgestaltung gewinnt in der Moderne an Bedeutung.", "Individual lifestyle design is gaining importance in modern times.", "Alltag & Freizeit 📅"],
  ["abschalten", "to unwind / switch off", "Beim Lesen eines spannenden Buches kann ich am besten abschalten.", "Reading an exciting book is the best way for me to unwind.", "Alltag & Freizeit 📅"],
  ["auskosten", "to savor / make the most of", "Wir sollten die sonnigen Tage im Spätsommer voll und ganz auskosten.", "We should fully savor the sunny days in late summer.", "Alltag & Freizeit 📅"],

  // === Haustiere & Tiere 🐾 ===
  ["die Artenschutzmaßnahme", "species protection measure", "Strenge Artenschutzmaßnahmen sichern den Bestand bedrohter Tierarten.", "Strict species protection measures secure the population of endangered animals.", "Haustiere & Tiere 🐾"],
  ["die Tierhaltung", "animal keeping / livestock husbandry", "Artgerechte Tierhaltung erfordert ausreichend Auslauf und Pflege.", "Species-appropriate animal keeping requires adequate exercise and care.", "Haustiere & Tiere 🐾"],
  ["das Schutzgebiet", "nature reserve / sanctuary", "Das geschützte Schutzgebiet bietet seltenen Vögeln einen Nistplatz.", "The protected sanctuary provides rare birds with a nesting site.", "Haustiere & Tiere 🐾"],
  ["pflegen", "to nurse / groom / care for animals", "Sie pflegt verletzte Wildtiere mit großer Aufopferung.", "She nurses injured wild animals with great dedication.", "Haustiere & Tiere 🐾"]
];

export const TELC_B2_P4: VocabularyEntry[] = convertRawB2Vocabulary(RAW_P4);
