import { convertRawB2Vocabulary, VocabularyEntry } from "./telc_helper";

const RAW_P2: [string, string, string, string, string][] = [
  // === Umwelt, Natur & Wetter 🌳 ===
  ["die Energiewende", "energy transition", "Die Energiewende fordert den zügigen Ausbau erneuerbarer Energien.", "The energy transition demands the rapid expansion of renewable energies.", "Umwelt, Natur & Wetter 🌳"],
  ["der CO2-Ausstoß", "carbon / CO2 emissions", "Unternehmen suchen nach Wegen, ihren CO2-Ausstoß drastisch zu senken.", "Companies are looking for ways to drastically reduce their carbon emissions.", "Umwelt, Natur & Wetter 🌳"],
  ["die Nachhaltigkeit", "sustainability", "Nachhaltigkeit steht im Mittelpunkt moderner Unternehmensstrategien.", "Sustainability is at the center of modern business strategies.", "Umwelt, Natur & Wetter 🌳"],
  ["die Erderwärmung", "global warming", "Wissenschaftler warnen vor den irreversiblen Folgen der Erderwärmung.", "Scientists warn of the irreversible consequences of global warming.", "Umwelt, Natur & Wetter 🌳"],
  ["die Umweltbelastung", "environmental pollution / burden", "Plastikmüll stellt eine enorme Umweltbelastung für die Weltmeere dar.", "Plastic waste poses a huge environmental burden on the oceans.", "Umwelt, Natur & Wetter 🌳"],
  ["die Ressourcenschonung", "resource conservation", "Effiziente Recyclingverfahren tragen maßgeblich zur Ressourcenschonung bei.", "Efficient recycling procedures contribute significantly to resource conservation.", "Umwelt, Natur & Wetter 🌳"],
  ["das Artsterben", "extinction of species", "Der Verlust von Lebensräumen beschleunigt das weltweite Artsterben.", "The loss of habitats accelerates global species extinction.", "Umwelt, Natur & Wetter 🌳"],
  ["die Müllverwertung", "waste recovery / recycling", "Moderne Anlagen optimieren die Müllverwertung und Stromgewinnung.", "Modern facilities optimize waste recovery and energy generation.", "Umwelt, Natur & Wetter 🌳"],
  ["das Treibhausgas", "greenhouse gas", "Der Ausstoß von Treibhausgasen muss international reglementiert werden.", "Greenhouse gas emissions must be regulated internationally.", "Umwelt, Natur & Wetter 🌳"],
  ["die Fotovoltaikanlage", "photovoltaic solar system", "Immer mehr Hausbesitzer installieren eine Fotovoltaikanlage auf dem Dach.", "More and more homeowners are installing a photovoltaic system on the roof.", "Umwelt, Natur & Wetter 🌳"],
  ["einsparen", "to save / cut down on emissions", "Durch Isolierung lässt sich wertvolle Heizenergie einsparen.", "Through insulation, valuable heating energy can be saved.", "Umwelt, Natur & Wetter 🌳"],
  ["gefährden", "to endanger / jeopardize", "Der Raubbau an den Wäldern gefährdet das ökologische Gleichgewicht.", "The overexploitation of forests jeopardizes the ecological balance.", "Umwelt, Natur & Wetter 🌳"],
  ["kompensieren", "to compensate / offset", "Fluggäste können ihre Emissionen durch Klimaschutzprojekte kompensieren.", "Passengers can offset their emissions through climate protection projects.", "Umwelt, Natur & Wetter 🌳"],

  // === Medien & Kommunikation 💻 ===
  ["die künstliche Intelligenz", "artificial intelligence (AI)", "Die künstliche Intelligenz revolutioniert zahlreiche Wirtschaftszweige.", "Artificial intelligence is revolutionizing numerous sectors of the economy.", "Medien & Kommunikation 💻"],
  ["die Cyberkriminalität", "cybercrime", "Experten entwickeln neue Schutzmaßnahmen gegen wachsende Cyberkriminalität.", "Experts are developing new protective measures against growing cybercrime.", "Medien & Kommunikation 💻"],
  ["die Datenverarbeitung", "data processing", "Die automatisierte Datenverarbeitung beschleunigt administrative Abläufe.", "Automated data processing speeds up administrative procedures.", "Medien & Kommunikation 💻"],
  ["der Algorithmus", "algorithm", "Der Algorithmus filtert relevante Informationen aus großen Datenmengen.", "The algorithm filters relevant information from large datasets.", "Medien & Kommunikation 💻"],
  ["die Medienkompetenz", "media literacy", "In der Schule sollte die kritische Medienkompetenz gestärkt werden.", "Critical media literacy should be strengthened in school.", "Medien & Kommunikation 💻"],
  ["die Fehlinformation", "misinformation / false news", "Das Verbreiten von Fehlinformationen beeinträchtigt den öffentlichen Diskurs.", "The spread of misinformation impairs public discourse.", "Medien & Kommunikation 💻"],
  ["die Berichterstattung", "news coverage / reporting", "Die sachliche Berichterstattung informierte die Bürger neutral.", "Factual reporting informed citizens impartially.", "Medien & Kommunikation 💻"],
  ["die Schnittstelle", "interface", "Die Software verfügt über eine intuitive Schnittstelle für den Benutzer.", "The software has an intuitive interface for the user.", "Medien & Kommunikation 💻"],
  ["die Digitalisierung", "digitalization / digital transformation", "Die Digitalisierung der Verwaltung erleichtert Behördengänge enorm.", "The digitalization of administration makes visits to official agencies much easier.", "Medien & Kommunikation 💻"],
  ["die Verschlüsselung", "encryption", "Eine Ende-zu-Ende-Verschlüsselung schützt vertrauliche Nachrichten.", "End-to-end encryption protects confidential messages.", "Medien & Kommunikation 💻"],
  ["recherchieren", "to research / investigate journalistically", "Journalisten müssen Quellen sorgfältig recherchieren, bevor sie berichten.", "Journalists must carefully research sources before reporting.", "Medien & Kommunikation 💻"],
  ["übermitteln", "to transmit / convey data", "Das System übermittelt die Sensordaten in Echtzeit an den Server.", "The system transmits sensor data in real time to the server.", "Medien & Kommunikation 💻"],

  // === Gesundheit & Körper 🏥 ===
  ["das Wohlbefinden", "well-being / wellness", "Ausreichend Schlaf und Bewegung steigern das körperliche Wohlbefinden.", "Sufficient sleep and exercise boost physical well-being.", "Gesundheit & Körper 🏥"],
  ["die psychische Belastung", "mental strain / psychological stress", "Hoher Stress im Alltag führt oft zu hoher psychischer Belastung.", "High everyday stress often leads to high psychological strain.", "Gesundheit & Körper 🏥"],
  ["das Immunsystem", "immune system", "Eine ausgewogene Ernährung stärkt das körpereigene Immunsystem.", "A balanced diet strengthens the body's immune system.", "Gesundheit & Körper 🏥"],
  ["die Prävention", "prevention / prophylaxis", "Prävention spielt eine Schlüsselrolle in der modernen Medizin.", "Prevention plays a key role in modern medicine.", "Gesundheit & Körper 🏥"],
  ["die Heilungschancen", "prospects of recovery", "Eine frühzeitige Diagnose verbessert die Heilungschancen erheblich.", "An early diagnosis significantly improves prospects of recovery.", "Gesundheit & Körper 🏥"],
  ["die Diagnostik", "diagnostics", "Fortschrittliche Labordiagnostik ermöglicht punktgenaue Therapien.", "Advanced laboratory diagnostics enable pinpoint therapies.", "Gesundheit & Körper 🏥"],
  ["die Überlastung", "burnout / physical overload", "Symptome einer Überlastung sollten nicht ignoriert werden.", "Symptoms of physical or mental overload should not be ignored.", "Gesundheit & Körper 🏥"],
  ["die Reha-Maßnahme", "rehabilitation measure", "Nach der Knieoperation verordnete der Arzt eine Reha-Maßnahme.", "After the knee surgery, the doctor prescribed a rehabilitation measure.", "Gesundheit & Körper 🏥"],
  ["diagnostizieren", "to diagnose", "Der Facharzt konnte die Ursache der Beschwerden schnell diagnostizieren.", "The specialist was able to diagnose the cause of the complaints quickly.", "Gesundheit & Körper 🏥"],
  ["beeinträchtigen", "to impair / adversely affect", "Chronische Schmerzen können die Lebensqualität stark beeinträchtigen.", "Chronic pain can severely impair quality of life.", "Gesundheit & Körper 🏥"],
  ["lindern", "to alleviate / soothe", "Das Medikament half dabei, die akuten Entzündungsschmerzen zu lindern.", "The medicine helped alleviate the acute inflammation pain.", "Gesundheit & Körper 🏥"],

  // === Kunst, Kultur & Geschichte 🎨 ===
  ["das Kulturerbe", "cultural heritage", "Historische Bauwerke gehören zum unschätzbaren Kulturerbe der Menschheit.", "Historic buildings belong to humanity's invaluable cultural heritage.", "Kunst, Kultur & Geschichte 🎨"],
  ["die Inszenierung", "stage production / staging", "Die moderne Inszenierung der Oper faszinierte das Publikum.", "The modern staging of the opera fascinated the audience.", "Kunst, Kultur & Geschichte 🎨"],
  ["die zeitgenössische Kunst", "contemporary art", "Die Galerie stellt vorwiegend Werke zeitgenössischer Kunst aus.", "The gallery primarily exhibits works of contemporary art.", "Kunst, Kultur & Geschichte 🎨"],
  ["das Stilmittel", "stylistic device / rhetorical device", "Metaphern sind ein häufig genutztes Stilmittel in der Poesie.", "Metaphors are a frequently used stylistic device in poetry.", "Kunst, Kultur & Geschichte 🎨"],
  ["die Rezension", "review / critique", "Der Literaturkritiker verfasste eine begeisterte Rezension über den Roman.", "The literary critic wrote an enthusiastic review of the novel.", "Kunst, Kultur & Geschichte 🎨"],
  ["das Exponat", "exhibit / museum piece", "Das wertvolle Exponat wird hinter Panzerglas geschützt.", "The valuable exhibit is protected behind bulletproof glass.", "Kunst, Kultur & Geschichte 🎨"],
  ["die Vernissage", "art exhibition opening", "Zahlreiche Prominente besuchten die Vernissage am Freitagabend.", "Numerous celebrities attended the art opening on Friday evening.", "Kunst, Kultur & Geschichte 🎨"],
  ["die Epoche", "era / epoch", "Das Museum widmet eine Sonderausstellung der Epoche des Barock.", "The museum dedicates a special exhibition to the Baroque era.", "Kunst, Kultur & Geschichte 🎨"],
  ["interpretieren", "to interpret / analyze literary text", "Die Schüler lernten, das Gedicht schrittweise zu interpretieren.", "The students learned to interpret the poem step by step.", "Kunst, Kultur & Geschichte 🎨"],
  ["würdigen", "to honor / commemorate / pay tribute to", "In der Festrede wurde das Lebenswerk des Künstlers gebührend gewürdigt.", "In the keynote speech, the artist's life work was duly honored.", "Kunst, Kultur & Geschichte 🎨"]
];

export const TELC_B2_P2: VocabularyEntry[] = convertRawB2Vocabulary(RAW_P2);
