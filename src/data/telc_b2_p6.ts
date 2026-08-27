import { convertRawB2Vocabulary, VocabularyEntry } from "./telc_helper";

const RAW_P6: [string, string, string, string, string][] = [
  // === Arbeit, Beruf & Wirtschaft 💼 ===
  ["abbauen", "to reduce / to dismantle", "Das Unternehmen musste wegen der Krise mehrere Stellen und Kosten abbauen.", "The company had to reduce several jobs and costs due to the crisis.", "Arbeit & Beruf 💼"],
  ["der Ablauf, ¨-e", "process / procedure", "Der genaue Ablauf der Konferenz wird morgen bekannt gegeben.", "The exact procedure for the conference will be announced tomorrow.", "Arbeit & Beruf 💼"],
  ["ablehnen", "to reject / to decline", "Der Leiter musste das unvollständige Angebot schweren Herzens ablehnen.", "The manager reluctantly had to decline the incomplete offer.", "Arbeit & Beruf 💼"],
  ["die Abteilung, -en", "department", "Die Abteilung für Marketing hat ihr Jahresziel erfolgreich erreicht.", "The marketing department successfully achieved its annual goal.", "Arbeit & Beruf 💼"],
  ["abwesend", "absent", "Wegen Krankheit war die Kollegin heute bei der Teambesprechung abwesend.", "Due to illness, the colleague was absent from the team meeting today.", "Arbeit & Beruf 💼"],
  ["die Anforderung, -en", "requirement", "Die neue Stelle stellt hohe Anforderungen an die Sprachkenntnisse.", "The new position places high requirements on language skills.", "Arbeit & Beruf 💼"],
  ["angemessen", "appropriate / reasonable", "Für diese anspruchsvolle Arbeit verlangt er eine angemessene Vergütung.", "For this demanding work, he expects appropriate compensation.", "Arbeit & Beruf 💼"],
  ["der Ansprechpartner, -", "contact person", "Herr Schmidt ist bei Fragen zum Vertrag Ihr persönlicher Ansprechpartner.", "Mr. Schmidt is your personal contact person for questions regarding the contract.", "Arbeit & Beruf 💼"],
  ["das Arbeitszeugnis, -se", "work reference", "Nach der Kündigung bat sie um ein qualifiziertes Arbeitszeugnis.", "After resigning, she asked for a qualified work reference.", "Arbeit & Beruf 💼"],
  ["auffordern", "to request / to call upon", "Der Chef forderte die Angestellten auf, pünktlich zur Konferenz zu erscheinen.", "The boss requested the employees to show up punctually for the conference.", "Arbeit & Beruf 💼"],
  ["die Aufgabe, -n", "task / duty", "Zu meinen Hauptaufgaben gehört die Betreuung internationaler Kunden.", "One of my main tasks is looking after international clients.", "Arbeit & Beruf 💼"],
  ["ausbilden", "to train / to educate", "Der Betrieb bildet jedes Jahr fünf neue Lehrlinge aus.", "The company trains five new apprentices every year.", "Arbeit & Beruf 💼"],

  // === Medien & Kommunikation 💻 ===
  ["die Abbildung, -en", "illustration / figure", "Die Abbildung auf Seite 12 verdeutlicht den komplexen Prozess anschaulich.", "The figure on page 12 clearly illustrates the complex process.", "Medien & Kommunikation 💻"],
  ["abonnieren", "to subscribe to", "Viele Leser abonnieren das digitale Fachmagazin für aktuelle Nachrichten.", "Many readers subscribe to the digital trade magazine for current news.", "Medien & Kommunikation 💻"],
  ["der Absender, -", "sender", "Der Absender muss seine Kontaktdaten oben links auf dem Brief angeben.", "The sender must state their contact details on the top left of the letter.", "Medien & Kommunikation 💻"],
  ["angeben", "to state / to specify", "Bitte geben Sie Ihre vollständige Adresse im Formular an.", "Please state your complete address in the form.", "Medien & Kommunikation 💻"],
  ["die Anzeige, -n", "advertisement / report", "Das Unternehmen hat eine Anzeige in der Tageszeitung geschaltet.", "The company placed an advertisement in the daily newspaper.", "Medien & Kommunikation 💻"],

  // === Ausbildung & Schule 🎓 ===
  ["die Abkürzung, -en", "abbreviation / shortcut", "In offiziellen Dokumenten sollte man diese Abkürzung nicht verwenden.", "You should not use this abbreviation in official documents.", "Ausbildung & Schule 🎓"],
  ["das Abitur", "A-levels / school-leaving exam", "Nach dem Abitur möchte sie an der Universität Medizin studieren.", "After completing her A-levels, she wants to study medicine at university.", "Ausbildung & Schule 🎓"],
  ["die Ausbildung, -en", "vocational training", "Nach der Schule hat er eine dreijährige Ausbildung zum Elektriker gemacht.", "After school, he completed three years of vocational training as an electrician.", "Ausbildung & Schule 🎓"],
  ["der Ausdruck, ¨-e", "expression", "In dieser Fachliteratur kommen viele komplexe Ausdrücke vor.", "Many complex expressions occur in this specialized literature.", "Ausbildung & Schule 🎓"],

  // === Staat, Recht & Politik ⚖️ ===
  ["abstimmen", "to vote / to coordinate", "Die Abgeordneten werden heute über den neuen Gesetzentwurf abstimmen.", "The MPs will vote on the new bill today.", "Staat, Recht & Politik ⚖️"],
  ["anfordern", "to request / to demand", "Sie können die fehlenden Unterlagen direkt beim Amt anfordern.", "You can request the missing documents directly from the office.", "Staat, Recht & Politik ⚖️"],
  ["die Anklage, -n", "accusation / indictment", "Die Staatsanwaltschaft erhob Anklage wegen Steuerhinterziehung.", "The prosecutor's office brought an indictment for tax evasion.", "Staat, Recht & Politik ⚖️"],
  ["der Antrag, ¨-e", "application / motion", "Er hat gestern einen Antrag auf Wohngeld eingereicht.", "He submitted an application for housing benefit yesterday.", "Staat, Recht & Politik ⚖️"],

  // === Gesellschaft & Soziales 👥 ===
  ["achten auf (+ Akk)", "to pay attention to", "Beim Autofahren sollte man besonders auf die Verkehrsschilder achten.", "When driving, one should pay special attention to the road signs.", "Gesellschaft & Soziales 👥"],
  ["die Anerkennung", "recognition / approval", "Die ausländische Qualifikation erhielt volle Anerkennung von der Behörde.", "The foreign qualification received full recognition from the authority.", "Gesellschaft & Soziales 👥"],
  ["angewiesen auf (+ Akk)", "reliant on", "Viele ältere Menschen sind im Alltag auf fremde Hilfe angewiesen.", "Many elderly people are reliant on external help in daily life.", "Gesellschaft & Soziales 👥"],
  ["die Arbeitslosigkeit", "unemployment", "Die Regierung ergreift Maßnahmen zur Bekämpfung der Arbeitslosigkeit.", "The government is taking measures to combat unemployment.", "Gesellschaft & Soziales 👥"],
  ["auffallen", "to stand out / to notice", "Ihm fiel sofort auf, dass in dem Bericht wichtige Zahlen fehlten.", "He noticed immediately that important numbers were missing in the report.", "Gesellschaft & Soziales 👥"],
  ["die Auswirkung, -en", "impact / effect", "Die Reform wird spürbare Auswirkungen auf die gesamte Gesellschaft haben.", "The reform will have noticeable impacts on the entire society.", "Gesellschaft & Soziales 👥"],

  // === Gesundheit & Körper 🏥 ===
  ["abnehmen", "to decrease / to lose weight", "Durch regelmäßigen Sport und eine gesunde Ernährung konnte er nachhaltig abnehmen.", "Through regular exercise and a healthy diet, he was able to lose weight sustainably.", "Gesundheit & Körper 🏥"],

  // === Wissenschaft & Forschung 🔬 ===
  ["anwenden", "to apply / to use", "Die neue Methode lässt sich in der Praxis leicht anwenden.", "The new method can be easily applied in practice.", "Wissenschaft & Forschung 🔬"],

  // === General & Abstract 💬 ===
  ["abbrechen", "to cancel / to break off", "Aufgrund des schlechten Wetters mussten die Veranstalter das Konzert abbrechen.", "Due to bad weather, the organizers had to cancel the concert.", "General & Abstract 💬"],
  ["die Absicht, -en", "intention", "Es war nicht meine Absicht, Sie mit dieser Bemerkung zu kränken.", "It was not my intention to offend you with this remark.", "General & Abstract 💬"],
  ["die Angelegenheit, -en", "matter / affair", "Der Anwalt kümmert sich persönlich um diese vertrauliche Angelegenheit.", "The lawyer handles this confidential matter personally.", "General & Abstract 💬"],
  ["annehmen", "to accept / to assume", "Ich nehme an, dass das Treffen wie geplant um zehn Uhr stattfindet.", "I assume that the meeting takes place at ten o'clock as planned.", "General & Abstract 💬"],
  ["anspruchsvoll", "demanding / sophisticated", "Das Projekt ist sehr anspruchsvoll und erfordert fachliches Know-how.", "The project is very demanding and requires technical expertise.", "General & Abstract 💬"],
  ["aufheben", "to lift / to cancel / to keep", "Das Gericht beschloss, die Einschränkungen per sofort aufzuheben.", "The court decided to lift the restrictions with immediate effect.", "General & Abstract 💬"],
  ["aufhören", "to stop / to cease", "Sie möchte mit dem Rauchen aufhören, um ihre Gesundheit zu verbessern.", "She wants to stop smoking in order to improve her health.", "General & Abstract 💬"],
  ["auseinandersetzen, sich mit (+ Dat)", "to deal with / grapple with", "Man muss sich intensiv mit den Ursachen des Klimawandels auseinandersetzen.", "One must grapple intensively with the causes of climate change.", "General & Abstract 💬"]
];

export const TELC_B2_P6: VocabularyEntry[] = convertRawB2Vocabulary(RAW_P6);
