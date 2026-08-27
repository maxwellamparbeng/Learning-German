import { convertRawB2Vocabulary, VocabularyEntry } from "./telc_helper";

const RAW_P5: [string, string, string, string, string][] = [
  // === Arbeit, Beruf & Karriere 💼 ===
  ["die Abfindung", "severance payment", "Nach der Vertragsauflösung erhielt der Mitarbeiter eine angemessene Abfindung.", "After the contract termination, the employee received a fair severance payment.", "Arbeit & Beruf 💼"],
  ["das Anforderungsprofil", "job requirements profile", "Das Anforderungsprofil setzt verhandlungssichere Deutschkenntnisse voraus.", "The job requirements profile presupposes business-fluent German skills.", "Arbeit & Beruf 💼"],
  ["der Berufseinsteiger", "young professional / career entrant", "Für Berufseinsteiger bietet das Traineeprogramm hervorragende Aufstiegschancen.", "The trainee program offers excellent career entry opportunities for young professionals.", "Arbeit & Beruf 💼"],
  ["das Mitspracherecht", "right of co-determination / say", "Der Betriebsrat fordert mehr Mitspracherecht bei strategischen Personalentscheidungen.", "The works council demands more say in strategic staffing decisions.", "Arbeit & Beruf 💼"],
  ["die Qualifikationsmaßnahme", "qualification measure", "Durch gezielte Qualifikationsmaßnahmen erhöhen sich die Berufschancen.", "Targeted qualification measures increase job opportunities.", "Arbeit & Beruf 💼"],
  ["die Selbstständigkeit", "self-employment / independence", "Der Schritt in die Selbstständigkeit erfordert Mut und einen soliden Finanzplan.", "Taking the step into self-employment requires courage and a solid financial plan.", "Arbeit & Beruf 💼"],
  ["sich qualifizieren für", "to qualify for", "Durch das Zertifikat qualifiziert sich der Entwickler für höhere Aufgaben.", "Through the certificate, the developer qualifies for higher tasks.", "Arbeit & Beruf 💼"],

  // === Ausbildung & Hochschule 🎓 ===
  ["die Abschlussarbeit", "final thesis", "Sie schreibt derzeit ihre Abschlussarbeit über erneuerbare Energien.", "She is currently writing her final thesis on renewable energies.", "Ausbildung & Schule 🎓"],
  ["die Zulassungsvoraussetzung", "admission requirement", "Gute Sprachkenntnisse gelten als zentrale Zulassungsvoraussetzung.", "Good language skills are considered a central admission requirement.", "Ausbildung & Schule 🎓"],
  ["der Studiengang", "degree program", "Der interdisziplinäre Studiengang erfreut sich wachsender Beliebtheit.", "The interdisciplinary degree program enjoys growing popularity.", "Ausbildung & Schule 🎓"],
  ["das Auslandssemester", "semester abroad", "Ein Auslandssemester erweitert den Horizont und stärkt die Interkulturalität.", "A semester abroad broadens horizons and strengthens interculturality.", "Ausbildung & Schule 🎓"],

  // === Wirtschaft & Verbraucher 📈 / 🛒 ===
  ["der Konkurrenzdruck", "competitive pressure", "Der globale Konkurrenzdruck zwingt Unternehmen zu ständiger Innovation.", "Global competitive pressure forces companies to innovate constantly.", "Wirtschaft & Finanzen 📈"],
  ["das Marktforschungsinstitut", "market research institute", "Ein unabhängiges Marktforschungsinstitut analysierte die Konsumtrends.", "An independent market research institute analyzed consumer trends.", "Wirtschaft & Finanzen 📈"],
  ["die Preis-Leistungs-Verhältnis", "price-performance ratio", "Das Smartphone bietet ein hervorragendes Preis-Leistungs-Verhältnis.", "The smartphone offers an excellent price-performance ratio.", "Einkaufen & Verbraucherschutz 🛒"],
  ["die Zahlungsunfähigkeit", "insolvency / inability to pay", "Fehlende Einnahmen führten schließlich zur Zahlungsunfähigkeit.", "A lack of revenue eventually led to insolvency.", "Wirtschaft & Finanzen 📈"],

  // === Gesellschaft, Medien & Politik ⚖️ / 💻 ===
  ["die Chancengleichheit", "equal opportunity", "Bildungsinstitutionen sollten Chancengleichheit für alle Kinder gewährleisten.", "Educational institutions should guarantee equal opportunity for all children.", "Staat, Recht & Politik ⚖️"],
  ["das Mitspracherecht", "voice / right to co-determine", "Bürger fordern mehr Mitspracherecht bei kommunalen Bauvorhaben.", "Citizens demand more say in municipal construction projects.", "Staat, Recht & Politik ⚖️"],
  ["die Zensur", "censorship", "In einer freien Demokratie ist staatliche Zensur grundsätzlich untersagt.", "In a free democracy, state censorship is fundamentally prohibited.", "Medien & Kommunikation 💻"],
  ["die Urheberrechtsverletzung", "copyright infringement", "Das unberechtigte Kopieren von Software stellt eine Urheberrechtsverletzung dar.", "Unauthorized copying of software constitutes a copyright infringement.", "Medien & Kommunikation 💻"],

  // === Umwelt & Gesundheit 🌳 / 🏥 ===
  ["das Umweltbewusstsein", "environmental awareness", "Das Umweltbewusstsein in der Bevölkerung ist in den letzten Jahren gewachsen.", "Environmental awareness among the population has grown in recent years.", "Umwelt, Natur & Wetter 🌳"],
  ["das Naturschutzgebiet", "nature reserve", "Im Naturschutzgebiet ist das Verlassen der gekennzeichneten Wege verboten.", "In the nature reserve, leaving the marked trails is prohibited.", "Umwelt, Natur & Wetter 🌳"],
  ["die Gesundheitsvorsorge", "health care prevention", "Regelmäßige Sportaktivitäten gehören zur aktiven Gesundheitsvorsorge.", "Regular sports activities belong to active health care prevention.", "Gesundheit & Körper 🏥"],
  ["die Ausgewogenheit", "balance / equilibrium", "Mentaler Erfolg erfordert eine Ausgewogenheit zwischen Arbeit und Erholung.", "Mental success requires a balance between work and rest.", "Gesundheit & Körper 🏥"]
];

export const TELC_B2_P5: VocabularyEntry[] = convertRawB2Vocabulary(RAW_P5);
