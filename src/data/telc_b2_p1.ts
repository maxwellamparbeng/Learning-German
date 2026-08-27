import { convertRawB2Vocabulary, VocabularyEntry } from "./telc_helper";

const RAW_P1: [string, string, string, string, string][] = [
  // === Arbeit, Beruf & Wirtschaft 💼 ===
  ["die Stellenausschreibung", "job posting / vacancy announcement", "Die aktuelle Stellenausschreibung richtet sich an erfahrene Ingenieure.", "The current job posting is aimed at experienced engineers.", "Arbeit & Beruf 💼"],
  ["die Führungskraft", "executive / manager", "Unsere Führungskräfte nehmen an regelmäßigen Schulungen teil.", "Our managers participate in regular training sessions.", "Arbeit & Beruf 💼"],
  ["die Verhandlung", "negotiation", "Die Verhandlungen dauerten bis spät in die Nacht.", "The negotiations lasted until late at night.", "Arbeit & Beruf 💼"],
  ["die Kernkompetenz", "core competence", "Analytisches Denken zählt zu seinen wichtigsten Kernkompetenzen.", "Analytical thinking is one of his most important core competencies.", "Arbeit & Beruf 💼"],
  ["das Gehaltsgefüge", "salary structure", "Das neue Gehaltsgefüge soll mehr Transparenz schaffen.", "The new salary structure is intended to create more transparency.", "Arbeit & Beruf 💼"],
  ["die Überstundenregelung", "overtime policy", "Die Überstundenregelung ist im Tarifvertrag genau festgelegt.", "The overtime policy is precisely specified in the collective agreement.", "Arbeit & Beruf 💼"],
  ["der Werdegang", "career path / background", "Ihr beruflicher Werdegang beeindruckt den gesamten Vorstand.", "Her professional background impresses the entire board.", "Arbeit & Beruf 💼"],
  ["die Geschäftsführung", "management / executive board", "Die Geschäftsführung hat eine richtungsweisende Entscheidung getroffen.", "Management made a trend-setting decision.", "Arbeit & Beruf 💼"],
  ["die Restrukturierung", "restructuring", "Wegen der Restrukturierung wurden Abteilungen zusammengelegt.", "Because of the restructuring, departments were merged.", "Arbeit & Beruf 💼"],
  ["die Chancengleichheit", "equal opportunity", "Die Firma legt großen Wert auf Chancengleichheit am Arbeitsplatz.", "The company places great value on equal opportunity in the workplace.", "Arbeit & Beruf 💼"],
  ["die Personalabteilung", "HR department", "Bitte schicken Sie Ihre Unterlagen direkt an die Personalabteilung.", "Please send your documents directly to the HR department.", "Arbeit & Beruf 💼"],
  ["der Arbeitsmarkt", "labor market", "Auf dem digitalen Arbeitsmarkt werden IT-Experten händeringend gesucht.", "IT experts are desperately sought in the digital labor market.", "Arbeit & Beruf 💼"],
  ["die Arbeitsbelastung", "workload", "Eine dauerhaft hohe Arbeitsbelastung kann zur Überlastung führen.", "A permanently high workload can lead to burnout.", "Arbeit & Beruf 💼"],
  ["die Leistungsbeurteilung", "performance appraisal", "In der jährlichen Leistungsbeurteilung wurden Erfolge gewürdigt.", "Successes were praised in the annual performance appraisal.", "Arbeit & Beruf 💼"],
  ["verhandeln", "to negotiate", "Wir müssen die Vertragsbedingungen noch eingehend verhandeln.", "We still need to thoroughly negotiate the contract terms.", "Arbeit & Beruf 💼"],
  ["einarbeiten", "to train / induct", "Der erfahrenere Kollege arbeitet die neue Mitarbeiterin gründlich ein.", "The senior colleague is thoroughly training the new employee.", "Arbeit & Beruf 💼"],
  ["entlassen", "to dismiss / lay off", "Aufgrund der Wirtschaftskrise mussten mehrere Angestellte entlassen werden.", "Due to the economic crisis, several employees had to be laid off.", "Arbeit & Beruf 💼"],
  ["befördern", "to promote", "Nach hervorragenden Leistungen wurde sie zur Abteilungsleiterin befördert.", "After outstanding performance, she was promoted to department manager.", "Arbeit & Beruf 💼"],

  // === Wissenschaft & Forschung 🔬 ===
  ["die Erkenntnis", "finding / insight", "Neue wissenschaftliche Erkenntnisse verändern unser Weltbild.", "New scientific findings are changing our worldview.", "Wissenschaft & Forschung 🔬"],
  ["das Forschungsgebiet", "field of research", "Künstliche Intelligenz ist ihr primäres Forschungsgebiet.", "Artificial intelligence is her primary field of research.", "Wissenschaft & Forschung 🔬"],
  ["die Dissertation", "doctoral dissertation / thesis", "Er hat seine Dissertation mit der Note summa cum laude abgeschlossen.", "He completed his doctoral dissertation with highest honors.", "Wissenschaft & Forschung 🔬"],
  ["die Hypothese", "hypothesis", "Die Versuchsdaten bestätigten die ursprünglich aufgestellte Hypothese.", "The experimental data confirmed the originally established hypothesis.", "Wissenschaft & Forschung 🔬"],
  ["die Auswertung", "evaluation / analysis of data", "Die statistische Auswertung der Daten nimmt mehrere Tage in Anspruch.", "The statistical evaluation of the data takes several days.", "Wissenschaft & Forschung 🔬"],
  ["die Publikation", "publication", "Ihre Publikation erschien in einem renommierten Fachjournal.", "Her publication appeared in a renowned peer-reviewed journal.", "Wissenschaft & Forschung 🔬"],
  ["die Versuchsanordnung", "experimental setup", "Die präzise Versuchsanordnung verhinderte Messfehler.", "The precise experimental setup prevented measurement errors.", "Wissenschaft & Forschung 🔬"],
  ["die Stichprobe", "random sample", "Die Studie basiert auf einer repräsentativen Stichprobe von tausend Personen.", "The study is based on a representative sample of one thousand people.", "Wissenschaft & Forschung 🔬"],
  ["erforschen", "to research / investigate", "Wissenschaftler erforschen die Tiefsee mit modernen Tauchrobotern.", "Scientists explore the deep sea using modern diving robots.", "Wissenschaft & Forschung 🔬"],
  ["nachweisen", "to prove / detect", "Das Labor konnte den Wirkstoff im Blut einwandfrei nachweisen.", "The laboratory was able to flawlessly detect the active substance in the blood.", "Wissenschaft & Forschung 🔬"],
  ["belegen", "to substantiate / verify", "Ihre Theorie lässt sich durch historische Dokumente eindeutig belegen.", "Her theory can be clearly substantiated by historical documents.", "Wissenschaft & Forschung 🔬"],

  // === Wirtschaft & Finanzen 📈 ===
  ["die Inflation", "inflation", "Die steigende Inflation schmälert die Reallöhne der Bürger.", "Rising inflation shrinks citizens' real wages.", "Wirtschaft & Finanzen 📈"],
  ["das Börsengeschehen", "stock market activity", "Anleger verfolgen das weltweite Börsengeschehen mit großer Aufmerksamkeit.", "Investors follow global stock market activity with great attention.", "Wirtschaft & Finanzen 📈"],
  ["die Kaufkraft", "purchasing power", "Durch Preissteigerungen sinkt die Kaufkraft der Bevölkerung.", "Due to price increases, the population's purchasing power falls.", "Wirtschaft & Finanzen 📈"],
  ["der Leitzins", "key interest rate", "Die Zentralbank hat den Leitzins um einen Viertelprozentpunkt angehoben.", "The central bank raised the key interest rate by a quarter percentage point.", "Wirtschaft & Finanzen 📈"],
  ["die Investition", "investment", "Nachhaltige Investitionen sichern den langfristigen Erfolg des Unternehmens.", "Sustainable investments secure the company's long-term success.", "Wirtschaft & Finanzen 📈"],
  ["der Kapitalmarkt", "capital market", "Der globale Kapitalmarkt reagiert empfindlich auf politische Unruhen.", "The global capital market is sensitive to political turmoil.", "Wirtschaft & Finanzen 📈"],
  ["das Konsumverhalten", "consumer behavior", "Das Konsumverhalten der Verbraucher hat sich stark verändert.", "Consumer behavior has changed significantly.", "Wirtschaft & Finanzen 📈"],
  ["die Rendite", "yield / return on investment", "Immobilien bieten in guten Lagen weiterhin eine solide Rendite.", "Real estate in good locations continues to offer a solid yield.", "Wirtschaft & Finanzen 📈"],
  ["die Konjunktur", "economic cycle / condition", "Die heimische Konjunktur erholt sich schneller als erwartet.", "The domestic economy is recovering faster than expected.", "Wirtschaft & Finanzen 📈"],
  ["investieren", "to invest", "Das Startup möchte vermehrt in grüne Technologien investieren.", "The startup wants to increasingly invest in green technologies.", "Wirtschaft & Finanzen 📈"],
  ["erwirtschaften", "to generate / turn a profit", "Die Sparte erwirtschaftete einen Rekordgewinn im vierten Quartal.", "The division generated a record profit in the fourth quarter.", "Wirtschaft & Finanzen 📈"],

  // === Staat, Recht & Politik ⚖️ ===
  ["die Gesetzgebung", "legislation", "Die Parlamentarier befassen sich mit der Reform der Gesetzgebung.", "Parliamentarians are dealing with the reform of legislation.", "Staat, Recht & Politik ⚖️"],
  ["die Zivilgesellschaft", "civil society", "Eine starke Zivilgesellschaft ist das Rückgrat der Demokratie.", "A strong civil society is the backbone of democracy.", "Staat, Recht & Politik ⚖️"],
  ["die Meinungsäußerung", "expression of opinion", "Die freie Meinungsäußerung wird durch die Verfassung garantiert.", "Free expression of opinion is guaranteed by the constitution.", "Staat, Recht & Politik ⚖️"],
  ["das Grundgesetz", "Basic Law (German Constitution)", "Alle staatlichen Organe sind an das Grundgesetz gebunden.", "All state organs are bound by the Basic Law.", "Staat, Recht & Politik ⚖️"],
  ["die Rechtsprechung", "jurisprudence / case law", "Die Rechtsprechung des Bundesverfassungsgerichts gilt als wegweisend.", "The jurisprudence of the Federal Constitutional Court is considered groundbreaking.", "Staat, Recht & Politik ⚖️"],
  ["der Gesetzgeber", "legislator", "Der Gesetzgeber verlangt strengere Vorgaben für den Verbraucherschutz.", "The legislator demands stricter standards for consumer protection.", "Staat, Recht & Politik ⚖️"],
  ["die Gewaltenteilung", "separation of powers", "Die Gewaltenteilung sichert die Unabhängigkeit der Gerichte.", "The separation of powers ensures the independence of courts.", "Staat, Recht & Politik ⚖️"],
  ["verabschieden", "to pass / enact (a bill)", "Das Parlament verabschiedete den neuen Gesetzentwurf einstimmig.", "Parliament passed the new bill unanimously.", "Staat, Recht & Politik ⚖️"],
  ["in Kraft treten", "to enter into force / come into effect", "Das Abkommen wird am ersten Januar offiziell in Kraft treten.", "The treaty will officially enter into force on January 1st.", "Staat, Recht & Politik ⚖️"],
  ["anfechten", "to contest / appeal against", "Der Anwalt beschloss, das Urteil vor der nächsten Instanz anzufechten.", "The lawyer decided to appeal the verdict in the next instance.", "Staat, Recht & Politik ⚖️"]
];

export const TELC_B2_P1: VocabularyEntry[] = convertRawB2Vocabulary(RAW_P1);
