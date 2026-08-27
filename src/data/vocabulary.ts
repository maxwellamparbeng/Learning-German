import vocabJson from "./vocabulary.json";
import { TELC_B1_VOCABULARY_DATA } from "./telc_b1_vocabulary";
import { TELC_B2_VOCABULARY_DATA } from "./telc_b2_vocabulary";
import { USER_VOCABULARY_DATA } from "./user_vocabulary";
import verbLevels from "./verb_levels.json";
import { generateVerbForms, cleanGermanWord, NON_VERB_WORDS } from "../utils/verbConjugator";

export interface VocabularyExample {
  de: string;
  en: string;
}

export interface VocabularyEntry {
  id: string;
  german_word: string;
  forms: string | null;
  english_translation: string;
  examples: VocabularyExample[];
  
  // Backward compatibility fields
  word: string;
  type: string;
  level: "A1" | "A2" | "B1" | "B2";
  theme: string;
}

function getWordType(germanWord: string): string {
  const cleanWord = germanWord.trim().toLowerCase();
  if (NON_VERB_WORDS.has(cleanWord)) {
    return "Other / Adjective";
  }
  if (
    cleanWord.startsWith("der ") || 
    cleanWord.startsWith("die ") || 
    cleanWord.startsWith("das ") || 
    cleanWord.startsWith("die/der ") || 
    cleanWord.startsWith("der/die ") || 
    cleanWord.startsWith("das/die ")
  ) {
    return "Noun (Substantiv)";
  }
  if (
    cleanWord.startsWith("sich ") || 
    cleanWord.endsWith("en") || 
    cleanWord.endsWith("eln") || 
    cleanWord.endsWith("ern")
  ) {
    return "Verb";
  }
  return "Other / Adjective";
}

function getWordTheme(germanWord: string, englishTranslation: string, level: string): string {
  const g = germanWord.toLowerCase();
  const e = englishTranslation.toLowerCase();

  // Food & Dining
  let theme = "General & Abstract 💬";
  if (
    g.includes("salat") || g.includes("salz") || g.includes("zitrone") || g.includes("zwiebel") ||
    g.includes("reis") || g.includes("steak") || g.includes("zucker") || g.includes("speisekarte") ||
    g.includes("vorspeise") || g.includes("kochen") || g.includes("essen") || g.includes("trinken") ||
    g.includes("restaurant") || g.includes("kaffee") || g.includes("tee") || g.includes("brot") ||
    g.includes("obst") || g.includes("gemüse") || g.includes("butter") || g.includes("käse") ||
    g.includes("fleisch") || g.includes("suppe") || g.includes("backen") ||
    e.includes("salad") || e.includes("salt") || e.includes("lemon") || e.includes("onion") ||
    e.includes("rice") || e.includes("steak") || e.includes("sugar") || e.includes("menu") ||
    e.includes("appetizer") || e.includes("cook") || e.includes("eat") || e.includes("drink") ||
    e.includes("restaurant") || e.includes("coffee") || e.includes("tea") || e.includes("bread") ||
    e.includes("fruit") || e.includes("vegetable") || e.includes("butter") || e.includes("cheese") ||
    e.includes("meat") || e.includes("soup") || e.includes("hungry") || e.includes("thirsty")
  ) {
    theme = "Food, Drink & Dining (Essen & Trinken) 🍽️";
  }

  // Travel & Transport
  else if (
    g.includes("panne") || g.includes("passagier") || g.includes("reisen") || g.includes("reise") ||
    g.includes("speisewagen") || g.includes("taxi") || g.includes("ticket") || g.includes("u-bahn") ||
    g.includes("umleitung") || g.includes("zug") || g.includes("bahnhof") || g.includes("flughafen") ||
    g.includes("flugh") || g.includes("flieger") || g.includes("bus") || g.includes("auto") ||
    g.includes("fahrrad") || g.includes("fahren") || g.includes("abholen") || g.includes("gepäck") ||
    g.includes("koffer") || g.includes("hotel") || g.includes("stau") || g.includes("gas") ||
    g.includes("tanken") || g.includes("tankstelle") ||
    e.includes("breakdown") || e.includes("puncture") || e.includes("passenger") || e.includes("travel") ||
    e.includes("trip") || e.includes("journey") || e.includes("taxi") || e.includes("subway") ||
    e.includes("underground") || e.includes("detour") || e.includes("train") || e.includes("station") ||
    e.includes("airport") || e.includes("flight") || e.includes("bus") || e.includes("car") ||
    e.includes("bicycle") || e.includes("drive") || e.includes("luggage") || e.includes("suitcase") ||
    e.includes("traffic") || e.includes("gas station") || e.includes("refuel")
  ) {
    theme = "Directions & Travel (Orientierung & Reisen) 🗺️";
  }

  // Work & Education
  else if (
    g.includes("abitur") || g.includes("schulung") || g.includes("zeugnis") || g.includes("lehre") ||
    g.includes("lernen") || g.includes("arbeiten") || g.includes("arbeit") || g.includes("schule") ||
    g.includes("universität") || g.includes("studium") || g.includes("beruf") || g.includes("job") ||
    g.includes("kollege") || g.includes("büro") || g.includes("chef") || g.includes("gehalt") ||
    g.includes("vertrag") || g.includes("kündigen") || g.includes("bewerbung") || g.includes("lebenslauf") ||
    g.includes("prüfung") || g.includes("note") || g.includes("klasse") || g.includes("unterricht") ||
    g.includes("studieren") || g.includes("tätigkeit") || g.includes("vollzeit") ||
    e.includes("graduation") || e.includes("school") || e.includes("certificate") || e.includes("work") ||
    e.includes("job") || e.includes("office") || e.includes("career") || e.includes("university") ||
    e.includes("study") || e.includes("contract") || e.includes("colleague") || e.includes("salary") ||
    e.includes("boss") || e.includes("resume") || e.includes("exam") || e.includes("grade") ||
    e.includes("class") || e.includes("teach") || e.includes("lesson") || e.includes("occupation") ||
    e.includes("full-time") || e.includes("activity")
  ) {
    theme = "Work & Office (Beruf & Arbeit) 💼";
  }

  // Health & Medical
  else if (
    g.includes("ohr") || g.includes("rezept") || g.includes("salbe") || g.includes("verband") ||
    g.includes("stirn") || g.includes("arzt") || g.includes("krank") || g.includes("gesund") ||
    g.includes("schmerz") || g.includes("medikament") || g.includes("apotheke") || g.includes("fieber") ||
    g.includes("husten") || g.includes("schnupfen") || g.includes("verletz") || g.includes("krankenhaus") ||
    g.includes("praxis") || g.includes("tablette") || g.includes("pille") || g.includes("zahnarzt") ||
    g.includes("pflegen") || g.includes("versicherung") || g.includes("wunde") ||
    e.includes("ear") || e.includes("prescription") || e.includes("ointment") || e.includes("bandage") ||
    e.includes("forehead") || e.includes("doctor") || e.includes("sick") || e.includes("ill") ||
    e.includes("healthy") || e.includes("health") || e.includes("pain") || e.includes("medicine") ||
    e.includes("drug") || e.includes("pharmacy") || e.includes("fever") || e.includes("cough") ||
    e.includes("hospital") || e.includes("pill") || e.includes("tablet") || e.includes("dentist") ||
    e.includes("care") || e.includes("wound")
  ) {
    theme = "Health & Well-being (Gesundheit & Körper) 🏥";
  }

  // Home & Living
  else if (
    g.includes("obergeschoss") || g.includes("sofa") || g.includes("stock") || g.includes("stockwerk") ||
    g.includes("zimmer") || g.includes("wohnen") || g.includes("haus") || g.includes("wohnung") ||
    g.includes("miete") || g.includes("vermieter") || g.includes("umziehen") || g.includes("möbel") ||
    g.includes("schlüssel") || g.includes("tür") || g.includes("fenster") || g.includes("küche") ||
    g.includes("bad") || g.includes("schlafzimmer") || g.includes("keller") || g.includes("garten") ||
    g.includes("balkon") || g.includes("heizung") || g.includes("licht") || g.includes("sauber") ||
    g.includes("reinigen") || g.includes("reinigung") || g.includes("staub") || g.includes("bett") ||
    g.includes("tisch") || g.includes("stuhl") || g.includes("schloss") || g.includes("schrank") ||
    e.includes("floor") || e.includes("story") || e.includes("room") || e.includes("live") ||
    e.includes("house") || e.includes("apartment") || e.includes("flat") || e.includes("rent") ||
    e.includes("move") || e.includes("furniture") || e.includes("key") || e.includes("door") ||
    e.includes("window") || e.includes("kitchen") || e.includes("bath") || e.includes("bedroom") ||
    e.includes("cellar") || e.includes("garden") || e.includes("balcony") || e.includes("heating") ||
    e.includes("light") || e.includes("clean") || e.includes("dry-clean") || e.includes("dust") ||
    e.includes("bed") || e.includes("table") || e.includes("chair") || e.includes("lock") ||
    e.includes("cupboard") || e.includes("castle") || e.includes("sofa") || e.includes("upstairs")
  ) {
    theme = "Housing & Living (Wohnen) 🏠";
  }

  // Money & Shopping
  else if (
    g.includes("überweisen") || g.includes("geld") || g.includes("kaufen") || g.includes("bezahlen") ||
    g.includes("preis") || g.includes("kosten") || g.includes("billig") || g.includes("teuer") ||
    g.includes("rabatt") || g.includes("konto") || g.includes("bank") || g.includes("bar") ||
    g.includes("kreditkarte") || g.includes("einkaufen") || g.includes("laden") || g.includes("geschäft") ||
    g.includes("tasche") || g.includes("tüte") || g.includes("zoll") || g.includes("wertvoll") ||
    e.includes("transfer") || e.includes("money") || e.includes("buy") || e.includes("pay") ||
    e.includes("price") || e.includes("cost") || e.includes("cheap") || e.includes("expensive") ||
    e.includes("discount") || e.includes("account") || e.includes("bank") || e.includes("cash") ||
    e.includes("credit card") || e.includes("shop") || e.includes("store") || e.includes("bag") ||
    e.includes("pocket") || e.includes("valuable")
  ) {
    theme = "Shopping & Clothes (Einkaufen & Kleidung) 🛍️";
  }

  // Tech & Communication
  else if (
    g.includes("software") || g.includes("taste") || g.includes("tastatur") || g.includes("verbindung") ||
    g.includes("wort") || g.includes("wörterbuch") || g.includes("computer") || g.includes("handy") ||
    g.includes("telefon") || g.includes("anrufen") || g.includes("e-mail") || g.includes("internet") ||
    g.includes("website") || g.includes("passwort") || g.includes("daten") || g.includes("sichern") ||
    g.includes("speichern") || g.includes("bildschirm") || g.includes("drucker") || g.includes("chat") ||
    g.includes("online") || g.includes("digital") || g.includes("app") || g.includes("kamera") ||
    g.includes("techno") || g.includes("netz") || g.includes("link") || g.includes("klicken") ||
    g.includes("surfen") || g.includes("posten") || g.includes("teilen") || g.includes("senden") ||
    g.includes("empfangen") || g.includes("installieren") || g.includes("löschen") ||
    e.includes("software") || e.includes("button") || e.includes("keyboard") || e.includes("connection") ||
    e.includes("word") || e.includes("dictionary") || e.includes("computer") || e.includes("phone") ||
    e.includes("call") || e.includes("email") || e.includes("internet") || e.includes("website") ||
    e.includes("password") || e.includes("data") || e.includes("backup") || e.includes("save") ||
    e.includes("screen") || e.includes("printer") || e.includes("chat") || e.includes("online") ||
    e.includes("digital") || e.includes("app") || e.includes("camera") || e.includes("tech") ||
    e.includes("net") || e.includes("link") || e.includes("click") || e.includes("surf") ||
    e.includes("share") || e.includes("send") || e.includes("receive") || e.includes("install") ||
    e.includes("delete")
  ) {
    theme = "Tech & Communication (Medien & Technik) 💻";
  }

  // People & Relationships
  else if (
    g.includes("papa") || g.includes("person") || g.includes("umarmen") || g.includes("verwandt") ||
    g.includes("kind") || g.includes("eltern") || g.includes("vater") || g.includes("mutter") ||
    g.includes("freund") || g.includes("familie") || g.includes("baby") || g.includes("sohn") ||
    g.includes("tochter") || g.includes("oma") || g.includes("opa") || g.includes("frau") ||
    g.includes("mann") || g.includes("heiraten") || g.includes("liebe") || g.includes("kuss") ||
    g.includes("danken") || g.includes("helfen") || g.includes("schenken") || g.includes("einladen") ||
    g.includes("zusagen") ||
    e.includes("dad") || e.includes("papa") || e.includes("person") || e.includes("hug") ||
    e.includes("embrace") || e.includes("related") || e.includes("child") || e.includes("parents") ||
    e.includes("father") || e.includes("mother") || e.includes("friend") || e.includes("family") ||
    e.includes("son") || e.includes("daughter") || e.includes("grandma") || e.includes("grandpa") ||
    e.includes("woman") || e.includes("wife") || e.includes("husband") || e.includes("man") ||
    e.includes("marry") || e.includes("love") || e.includes("kiss") || e.includes("thank") ||
    e.includes("help") || e.includes("invite")
  ) {
    theme = "Family & Friends (Familie & Freunde) 👥";
  }

  // Leisure & Hobbies
  else if (
    g.includes("party") || g.includes("puppe") || g.includes("sammeln") || g.includes("tanzen") ||
    g.includes("zoo") || g.includes("freizeit") || g.includes("hobby") || g.includes("sport") ||
    g.includes("spiel") || g.includes("spielen") || g.includes("musik") || g.includes("film") ||
    g.includes("kino") || g.includes("theater") || g.includes("konzert") || g.includes("museum") ||
    g.includes("lesen") || g.includes("buch") || g.includes("malen") || g.includes("zeichnen") ||
    g.includes("wandern") || g.includes("spazieren") || g.includes("urlaub") || g.includes("feiern") ||
    g.includes("sieg") || g.includes("ausgehen") || g.includes("ausflug") || g.includes("gitarre") ||
    g.includes("klavier") || g.includes("singen") || g.includes("basteln") || g.includes("fotograf") ||
    g.includes("verein") || g.includes("club") || g.includes("schwimm") || g.includes("jogg") ||
    g.includes("laufen") || g.includes("tennis") || g.includes("fußball") ||
    e.includes("party") || e.includes("doll") || e.includes("puppet") || e.includes("collect") ||
    e.includes("gather") || e.includes("dance") || e.includes("zoo") || e.includes("leisure") ||
    e.includes("hobby") || e.includes("sport") || e.includes("game") || e.includes("play") ||
    e.includes("music") || e.includes("film") || e.includes("movie") || e.includes("cinema") ||
    e.includes("theater") || e.includes("concert") || e.includes("museum") || e.includes("read") ||
    e.includes("book") || e.includes("paint") || e.includes("draw") || e.includes("hike") ||
    e.includes("walk") || e.includes("holiday") || e.includes("celebrate") || e.includes("victory") ||
    e.includes("guitar") || e.includes("piano") || e.includes("sing") || e.includes("craft") ||
    e.includes("photo") || e.includes("club") || e.includes("swim") || e.includes("jog") ||
    e.includes("run") || e.includes("tennis") || e.includes("soccer") || e.includes("football")
  ) {
    theme = "Daily Routine, Leisure & Time (Alltag, Freizeit & Tagesablauf) ⏰";
  }

  // Nature & Environment
  else if (
    g.includes("tal") || g.includes("tier") || g.includes("haustier") || g.includes("vogel") ||
    g.includes("umwelt") || g.includes("natur") || g.includes("wetter") || g.includes("sonne") ||
    g.includes("regen") || g.includes("wind") || g.includes("schnee") || g.includes("wald") ||
    g.includes("berg") || g.includes("see") || g.includes("meer") || g.includes("strand") ||
    g.includes("baum") || g.includes("blume") || g.includes("pflanze") || g.includes("hund") ||
    g.includes("katze") || g.includes("pferd") || g.includes("kuh") ||
    e.includes("valley") || e.includes("animal") || e.includes("pet") || e.includes("bird") ||
    e.includes("environment") || e.includes("nature") || e.includes("weather") || e.includes("sun") ||
    e.includes("rain") || e.includes("wind") || e.includes("snow") || e.includes("forest") ||
    e.includes("mountain") || e.includes("lake") || e.includes("sea") || e.includes("beach") ||
    e.includes("tree") || e.includes("flower") || e.includes("plant") || e.includes("dog") ||
    e.includes("cat") || e.includes("horse") || e.includes("cow")
  ) {
    theme = "Nature & Environment (Natur & Umwelt) 🌳";
  }

  // Society & Law
  else if (
    g.includes("organisation") || g.includes("richter") || g.includes("strafe") || g.includes("täter") ||
    g.includes("zustimmung") || g.includes("zeuge") || g.includes("unfall") || g.includes("staat") ||
    g.includes("recht") || g.includes("polizei") || g.includes("gericht") || g.includes("gesetz") ||
    g.includes("bürger") || g.includes("wahl") || g.includes("ausweis") || g.includes("pass") ||
    e.includes("organization") || e.includes("judge") || e.includes("punishment") || e.includes("fine") ||
    e.includes("penalty") || e.includes("culprit") || e.includes("offender") || e.includes("perpetrator") ||
    e.includes("approval") || e.includes("consent") || e.includes("witness") || e.includes("accident") ||
    e.includes("state") || e.includes("law") || e.includes("police") || e.includes("court") ||
    e.includes("citizen") || e.includes("vote") || e.includes("id") || e.includes("passport") ||
    e.includes("customs")
  ) {
    theme = "Society & Law (Gesellschaft & Staat) ⚖️";
  }

  // Verbs & Actions
  else if (
    g.startsWith("sich ") || g.endsWith("en") || g.endsWith("eln") || g.endsWith("ern")
  ) {
    theme = "Verbs & Actions ⚡";
  }

  // If level is A1, map to the 10 custom A1 themes requested!
  if (level === "A1") {
    return getA1Theme(germanWord, englishTranslation, theme);
  }

  return theme;
}

// Set of core A1 German words (comprehensive popular vocabulary for A1 themes)
const A1_WORDS = new Set([
  // Family & Friends
  "mutter", "vater", "eltern", "sohn", "tochter", "bruder", "schwester", "kind", "kinder", "baby", "freund", "freundin", "familie", "frau", "mann", "oma", "opa", "großmutter", "großvater", "mädchen", "junge", "tante", "onkel", "cousin", "cousine", "enkel", "enkelin", "partner", "partnerin", "ehemann", "ehefrau", "nachbar", "nachbarin", "gast", "mensch", "leute", "geschwister",
  // Food, Drink & Dining
  "essen", "trinken", "brot", "brötchen", "wasser", "milch", "kaffee", "tee", "bier", "wein", "saft", "apfelsaft", "apfel", "banane", "orange", "zitrone", "gemüse", "obst", "käse", "butter", "fleisch", "fisch", "zucker", "salz", "pfeffer", "ei", "eier", "suppe", "salat", "kartoffel", "kartoffeln", "reis", "nudeln", "kuchen", "schokolade", "eis", "wurst", "schinken", "hähnchen", "tomate", "gurke", "hunger", "durst", "restaurant", "café", "bäckerei", "frühstück", "mittagessen", "abendessen", "speisekarte", "kellner", "rechnung", "teller", "glas", "tasse", "gabel", "löffel", "messer", "besteck",
  // Housing & Living
  "haus", "wohnung", "zimmer", "küche", "bad", "badezimmer", "toilette", "wc", "tisch", "stuhl", "bett", "schrank", "schlüssel", "tür", "fenster", "licht", "miete", "balkon", "garten", "keller", "flur", "treppe", "wand", "boden", "dach", "garage", "möbel", "sofa", "sessel", "kühlschrank", "herd", "mikrowelle", "lampe", "spiegel", "teppich", "fernseher", "radio", "dusche", "badewanne", "umzug", "vermieter", "vermieterin",
  // Daily Routine & Time
  "uhr", "zeit", "tag", "tage", "woche", "wochen", "monat", "monate", "jahr", "jahre", "montag", "dienstag", "mittwoch", "donnerstag", "freitag", "samstag", "sonntag", "morgen", "vormittag", "mittag", "nachmittag", "abend", "nacht", "mitternacht", "heute", "gestern", "morgen", "übermorgen", "uhrzeit", "wecker", "aufstehen", "duschen", "frühstücken", "arbeiten", "schlafen", "spät", "früh", "pünktlich", "wochenende", "pause", "termin", "kalender", "sekunde", "minute", "stunde", "stunden", "dauer",
  // Shopping & Clothes
  "geld", "preis", "kleid", "kleidung", "hose", "hemd", "schuh", "schuhe", "jacke", "mantel", "pullover", "t-shirt", "rock", "socke", "socken", "mütze", "hut", "brille", "tasche", "geldbörse", "portemonnaie", "supermarkt", "laden", "geschäft", "markt", "kasse", "verkäufer", "verkäuferin", "euro", "cent", "rechnung", "quittung", "angebot", "rabatt", "größe", "farbe", "einkaufen", "kaufen", "verkaufen", "teuer", "billig", "günstig",
  // Directions & Travel
  "bahnhof", "flughafen", "bus", "zug", "s-bahn", "u-bahn", "straßenbahn", "tram", "auto", "fahrrad", "flugzeug", "schiff", "ticket", "fahrkarte", "fahrplan", "haltestelle", "verspätung", "ankunft", "abfahrt", "gleis", "weg", "straße", "platz", "brücke", "kreuzung", "stadt", "land", "dorf", "zentrum", "mitte", "hotel", "urlaub", "reise", "gepäck", "koffer", "karte", "pass", "ausweis", "wetter", "sonne", "regen", "schnee", "wind", "norden", "süden", "osten", "westen", "links", "rechts", "geradeaus",
  // Health & Well-being
  "arzt", "ärztin", "krank", "gesund", "krankenhaus", "krankenschwester", "apotheke", "medikament", "tablette", "rezept", "pflaster", "hilfe", "notfall", "körper", "kopf", "hand", "hände", "fuß", "füße", "bein", "beine", "arm", "arme", "rücken", "bauch", "zahn", "zähne", "haare", "nase", "auge", "augen", "ohr", "ohren", "mund", "schmerz", "schmerzen", "fieber", "husten", "schnupfen", "grippe",
  // Work & Office
  "arbeit", "beruf", "job", "büro", "chef", "chefin", "kollege", "kollegin", "schule", "lehrer", "lehrerin", "schüler", "schülerin", "student", "studentin", "universität", "klasse", "kurs", "unterricht", "lernen", "studieren", "ausbildung", "firma", "vertrag", "gehalt", "computer", "laptop", "handy", "e-mail", "brief", "nachricht", "telefon", "telefonat", "formular",
  // Hobbies & Free Time
  "hobby", "hobbys", "sport", "fußball", "tennis", "schwimmen", "musik", "gitarre", "klavier", "buch", "bücher", "kino", "film", "theater", "museum", "zeitschrift", "zeitung", "konzert", "party", "fest", "feiern", "ausflug", "park", "strand", "meer", "see", "berg", "berge", "freizeit", "spiel", "spielen", "tanzen", "singen", "lesen", "malen", "fotografieren", "foto", "fotos",
  // Personal Details
  "name", "vorname", "nachname", "adresse", "telefon", "telefonnummer", "handynummer", "alter", "geburtstag", "geburtsdatum", "geburtsort", "sprache", "sprachen", "deutsch", "deutschland", "österreich", "schweiz", "herkunft", "familienstand", "ledig", "verheiratet", "geschieden", "frage", "antwort", "pass", "ausweis", "formular", "unterschrift", "herr", "frau",
  // Essential Adjectives & Adverbs
  "gut", "schlecht", "groß", "klein", "neu", "alt", "schön", "nett", "freundlich", "jung", "müde", "glücklich", "traurig", "kalt", "warm", "heiß", "hier", "dort", "links", "rechts", "geradeaus", "schnell", "langsam", "einfach", "schwer", "schwierig", "richtig", "falsch", "viel", "wenig", "immer", "nie", "oft", "manchmal", "ja", "nein", "vielleicht", "bitte", "danke", "hallo", "tschüss"
]);

// Set of core A2 German words (popular vocabulary across all themes for A2 level)
const A2_WORDS = new Set([
  // Family, Friends & Relationships
  "nachbar", "nachbarin", "kollegin", "gast", "gäste", "besuch", "einladung", "geburtstag", "geschenk", "feiern", "party", "hochzeit", "bekannte", "bekannter", "verwandte", "verwandter", "neffe", "nichte", "ehepaar", "nachbarschaft", "beziehung", "kontakt", "gruppe", "verein", "mitglied", "partner", "partnerin", "single", "senior", "jugendliche", "jugendlicher",
  // Housing & Living
  "möbel", "balkon", "garten", "keller", "flur", "sofa", "sessel", "kühlschrank", "herd", "heizung", "garage", "dach", "treppe", "aufzug", "fahrstuhl", "vermieter", "vermieterin", "mieter", "mieterin", "kaution", "nebenkosten", "quadratmeter", "renovierung", "terrasse", "badewanne", "dusche", "waschmaschine", "spülmaschine", "mikrowelle", "teppich", "vorhang", "regal", "kissen", "decke", "lampe", "geschirr", "besteck", "kamin", "schreibtisch", "wohnungssuche",
  // Food, Drink & Dining
  "gemüse", "obst", "fleisch", "fisch", "suppe", "salat", "kuchen", "café", "bäckerei", "speisekarte", "vorspeise", "hauptspeise", "nachtisch", "dessert", "getränk", "gericht", "ober", "kellner", "kellnerin", "trinkgeld", "snack", "imbiss", "zutat", "rezept", "zucker", "salz", "pfeffer", "öl", "essig", "marmelade", "honig", "käse", "schinken", "wurst", "rindfleisch", "schweinefleisch", "hähnchen", "kartoffel", "kartoffeln", "reis", "nudeln", "apfelsaft", "mineralwasser", "bohne", "erbse", "pilz", "zwiebel", "knoblauch", "vorspeise",
  // Health & Medical
  "arztpraxis", "fieber", "husten", "schnupfen", "tablette", "krankenhaus", "rezept", "apotheker", "apotheke", "krankenversicherung", "versicherungskarte", "termin", "untersuchung", "verletzung", "wunde", "pflaster", "salbe", "tropfen", "schmerz", "schmerzen", "kopfschmerzen", "bauchschmerzen", "zahnschmerzen", "zahnarzt", "notfall", "krankenschwester", "krankenwagen", "gesundheit", "ernährung", "diät", "körper", "blut", "augenarzt", "erkältung", "grippe", "gewicht", "impfung",
  // Work, Career & Education
  "berufsausbildung", "firma", "werkstatt", "arbeitsplatz", "gehalt", "vertrag", "lebenslauf", "bewerbung", "vorstellungsgespräch", "praktikum", "praktikant", "kollege", "mitarbeiter", "mitarbeiterin", "chef", "chefin", "messen", "konferenz", "besprechung", "überstunden", "urlaub", "feierabend", "pause", "schulung", "weiterbildung", "zeugnis", "zertifikat", "prüfung", "ergebnis", "projekt", "aufgabe", "branche", "kunden", "vorstellungsgespräch",
  // Tech & Communication
  "computer", "handy", "e-mail", "internet", "website", "passwort", "bildschirm", "drucker", "tastatur", "maus", "datei", "ordner", "nachricht", "sms", "anruf", "telefonat", "verbindung", "netz", "wlan", "link", "download", "app", "kamera", "foto", "video", "monitor", "kabel", "akku", "soziale medien",
  // Money & Shopping
  "bankkonto", "kreditkarte", "überweisung", "rechnung", "quittung", "rabatt", "ausweis", "pass", "kasse", "bargeld", "geldautomat", "kassenbon", "garantie", "einkauf", "einkaufswagen", "tasche", "tüte", "mode", "kleidung", "größe", "sonderangebot", "preis", "kosten", "einkaufszentrum", "supermarkt", "sparpreis", "währung", "kunde", "kundin",
  // Travel & Directions
  "ausflug", "urlaub", "reise", "gepäck", "koffer", "passagier", "taxi", "u-bahn", "stau", "tankstelle", "panne", "flughafen", "flugzeug", "flug", "fahrkarte", "fahrplan", "haltestelle", "verspätung", "ankunft", "abfahrt", "gleis", "schiff", "boot", "brücke", "kreuzung", "ampel", "richtung", "auskunft", "tourist", "tourismus", "übernachtung", "unterkunft", "pension", "einzelzimmer", "doppelzimmer", "buchung", "reservierung", "stadtplan", "reisebüro", "versendung",
  // Leisure, Sports & Hobbies
  "freizeit", "hobby", "sport", "fitness", "fitnessstudio", "verein", "mannschaft", "konzert", "theater", "kino", "museum", "ausstellung", "veranstaltung", "karten", "eintrittskarte", "ticket", "schauspieler", "musik", "band", "tanz", "tanzkurs", "picknick", "wanderung", "see", "strand", "schwimmbad", "spielfeld", "ausrüstung", "fan", "publikum", "wettkampf",
  // Nature, Animals & Weather
  "wetter", "sonne", "sonnenschein", "regen", "schnee", "wind", "sturm", "gewitter", "wolke", "wolken", "temperatur", "grad", "klima", "jahreszeit", "frühling", "sommer", "herbst", "winter", "natur", "wald", "berg", "berge", "see", "fluss", "meer", "strand", "landschaft", "tier", "tiere", "pflanze", "pflanzen", "umwelt", "umweltschutz",
  // Society, Law & Documents
  "nachrichten", "zeitung", "zeitschrift", "information", "polizei", "unfall", "ordnung", "regeln", "formular", "antrag", "amt", "behörde", "pass", "ausweis", "visum", "anmeldung", "bescheinigung", "unterschrift", "post", "paket", "briefkasten", "stempel"
]);

// Set of core B1 German words (popular vocabulary across all themes for B1 level)
const B1_WORDS = new Set([
  // Work, Career & Education
  "beförderung", "teilzeit", "vollzeit", "gehaltserhöhung", "arbeitsvertrag", "gewerkschaft", "arbeitslosigkeit", "fachkraft", "vorstellungsgespräch", "überstunde", "überstunden", "selbstständigkeit", "qualifikation", "umschulung", "betriebsklima", "vorgesetzte", "vorgesetzter", "kündigung", "verhandeln", "vereinbaren", "fortbildung", "karriere", "probezeit", "schichtarbeit", "arbeitsbedingungen", "weiterbildung", "abschluss", "studienplatz", "stipendium", "dozent", "dozentin", "seminar", "vorlesung",
  // Everyday Life, Leisure & Culture
  "ereignis", "freizeitgestaltung", "gewohnheit", "tagesablauf", "erlebnis", "vernissage", "bühne", "vorstellung", "meisterwerk", "künstler", "künstlerin", "gemälde", "kabarett", "leidenschaft", "entspannen", "ausführen", "unternehmen", "ausflug", "begeisterung", "publikum", "aufführung", "schauspielhaus", "orchester", "ausstellung", "kulturangebot",
  // Travel, Transport & Mobility
  "verspätung", "anreisetag", "pauschalangebot", "hauptsaison", "nebensaison", "zollkontrolle", "kreisverkehr", "umleitung", "mietwagen", "tankfüllung", "bordkarte", "fernweh", "umsteigen", "verpassen", "verschiebung", "fluggesellschaft", "sicherheitskontrolle", "fahrtwind", "fahrverbot", "streckennetz", "verkehrsmittel", "reiserücktrittsversicherung",
  // Housing, Living & Neighborhood
  "nebenkostenabrechnung", "wohnfläche", "mietkaution", "mietvertrag", "eigentumswohnung", "renovierung", "hausordnung", "hausmeister", "mülltrennung", "umzugskarton", "maklergebühr", "einrichten", "renovieren", "nachbarschaftsstreit", "wohngemeinschaft", "untermiete", "sanierung", "ausstattung",
  // Health, Care & Medicine
  "krankmeldung", "behandlung", "symptom", "ansteckung", "medikament", "nebenwirkung", "blutdruck", "vorsorgeuntersuchung", "krankenkasse", "überweisung", "genesung", "vorbeugen", "verschreiben", "patient", "patientin", "notaufnahme", "blutbild", "allergie", "impfpass", "therapie", "heilsam", "genesen",
  // Food, Cooking & Dining
  "zutat", "zubereitung", "gewürz", "ausgewogenheit", "bio-qualität", "unverträglichkeit", "ernährung", "drei-gänge-menü", "trinkgeld", "spezialität", "köstlich", "verzehren", "geschmacksrichtung", "genuss", "zubereiten", "rezeptur", "biologisch", "feinschmecker",
  // Media, Tech & Digital
  "benachrichtigung", "datensicherheit", "datenschutz", "suchmaschine", "speicherplatz", "benutzerkonto", "anhang", "zugangsdaten", "streamen", "herunterladen", "hochladen", "recherchieren", "abstürzen", "neu starten", "einstellung", "einstellungen", "anwendung", "zugriff", "verschlüsselung", "aktualisieren",
  // Shopping, Money & Finance
  "kontoauszug", "ratenzahlung", "zins", "zinsen", "schulden", "ausgabe", "einnahme", "schnäppchen", "reklamation", "rückerstattung", "zahlungsweise", "kaufkraft", "sparen", "abbuchen", "guthaben", "überweisungsformular", "finanzierung", "einkaufskorb", "versandkosten", "zahlungsziel",
  // Family, Relationships & Feelings
  "verständnis", "mitgefühl", "dankbarkeit", "zuneigung", "eifersucht", "enttäuschung", "erleichterung", "selbstbewusstsein", "vertrauenswürdig", "verständnisvoll", "beistehen", "zusammenhalt", "versöhnung", "vertraulichkeit", "einfühlungsvermögen", "anerkennung", "geborgenheit",
  // Nature, Weather & Environment
  "klimawandel", "umweltschutz", "hochwasser", "dürre", "erneuerbare energien", "müllvermeidung", "naturschutz", "treibhauseffekt", "nachhaltig", "recyceln", "schonen", "artenschutz", "oekosystem", "öko-system", "auswirkung", "artenvielfalt", "umweltbewusstsein",
  // Society, State & Law
  "verfassung", "meinungsfreiheit", "versammlung", "bürger", "bürgerin", "behörde", "antragsteller", "bescheid", "gesetzesänderung", "wählen", "einhalten", "genehmigen", "bürokratie", "gesetzgebung", "gerechtigkeit", "chancengleichheit", "steuere Erklärung", "abstimmung",
  // Official Matters & Administration
  "zuständigkeit", "standesamt", "geburtsurkunde", "heiratsurkunde", "steuernummer", "finanzamt", "steuererklärung", "meldebescheinigung", "schalter", "wartenummer", "wartebereich", "bearbeitungszeit", "rückfrage", "beglaubigung", "aktenzeichen",
  // Pets & Animals
  "tierarzt", "tierärztin", "tierheim", "haltung", "leine", "futter", "füttern", "streicheln", "tierpflege", "artgerecht", "tierschutz"
]);

// Set of core B2 German words (popular vocabulary across all themes for B2 level)
const B2_WORDS = new Set([
  // Work & Career
  "stellenausschreibung", "führungskraft", "verhandlung", "kernkompetenz", "gehaltsgefüge", "überstundenregelung", "werdegang", "geschäftsführung", "restrukturierung", "chancengleichheit", "personalabteilung", "arbeitsmarkt", "arbeitsbelastung", "leistungsbeurteilung", "abfindung", "anforderungsprofil", "berufseinsteiger", "mitspracherecht", "qualifikationsmaßnahme",
  // Science & Education
  "erkenntnis", "forschungsgebiet", "dissertation", "hypothese", "auswertung", "publikation", "versuchsanordnung", "stichprobe", "abschlussarbeit", "zulassungsvoraussetzung", "studiengang", "auslandssemester",
  // Economy & Finance
  "inflation", "börsengeschehen", "kaufkraft", "leitzins", "investition", "kapitalmarkt", "konsumverhalten", "rendite", "konjunktur", "konkurrenzdruck", "marktforschungsinstitut", "zahlungsunfähigkeit",
  // State, Law & Politics
  "gesetzgebung", "zivilgesellschaft", "meinungsäußerung", "grundgesetz", "rechtsprechung", "gesetzgeber", "gewaltenteilung", "zensur", "urheberrechtsverletzung",
  // Environment & Sustainability
  "energiewende", "co2-ausstoß", "nachhaltigkeit", "erderwärmung", "umweltbelastung", "ressourcenschonung", "artsterben", "müllverwertung", "treibhausgas", "fotovoltaikanlage", "umweltbewusstsein", "naturschutzgebiet",
  // Media & Digitalization
  "künstliche intelligenz", "cyberkriminalität", "datenverarbeitung", "algorithmus", "medienkompetenz", "fehlinformation", "berichterstattung", "schnittstelle", "digitalisierung", "verschlüsselung",
  // Health & Psychology
  "wohlbefinden", "psychische belastung", "immunsystem", "prävention", "heilungschancen", "diagnostik", "überlastung", "reha-maßnahme", "gesundheitsvorsorge", "ausgewogenheit",
  // Culture & Art
  "kulturerbe", "inszenierung", "zeitgenössische kunst", "stilmittel", "rezension", "exponat", "vernissage", "epoche",
  // Relationships & Social
  "kompromissbereitschaft", "meinungsverschiedenheit", "beziehungsdynamik", "empathie", "generationswechsel", "toleranz", "verhaltensmuster", "zusammengehörigkeitsgefühl",
  // Travel & Transport
  "verkehrswende", "ferntourismus", "infrastruktur", "globalisierung", "kulturschock", "fremdenverkehr",
  // Housing & Architecture
  "wohnungsmangel", "mietpreisbremse", "ballungsgebiet", "lebensqualität", "eigentumsquote", "sanierung",
  // Food & Gastronomy
  "nahrungsergänzung", "massentierhaltung", "lebensmittelsicherheit", "feinschmecker-küche",
  // Shopping & Consumer Protection
  "widerrufsfrist", "gewährleistung", "verbraucherschutz", "preissteigerung", "preis-leistungs-verhältnis",
  // Feelings & Personality
  "entschlossenheit", "gelassenheit", "skepsis", "durchhaltevermögen", "zuversicht", "urteilskraft",
  // Administration
  "zuständigkeit", "verwaltungsakt", "beglaubigung", "aktenzeichen", "bearbeitungsgebühr", "einspruch", "nachweispflicht",
  // Leisure & Animals
  "zeitmanagement", "ehrenamtliche", "auszeit", "lebensgestaltung", "artenschutzmaßnahme", "tierhaltung", "schutzgebiet"
]);

// Cleans German words for lookup matching
function normalizeForLookup(word: string): string {
  return word
    .replace(/^\((der|die|das|ein|eine|sich)\)\s+/i, "")
    .replace(/^(der|die|das|ein|eine|sich)\s+/i, "")
    .replace(/,.*$/, "")
    .trim()
    .toLowerCase();
}

// Maps an A1 word to exactly one of the 10 custom themes requested
function getA1Theme(germanWord: string, englishTranslation: string, originalTheme: string): string {
  const g = germanWord.toLowerCase();
  const e = englishTranslation.toLowerCase();
  const t = originalTheme.toLowerCase();

  // Food, Drink & Dining (Essen & Trinken)
  if (
    t.includes("food") || t.includes("dining") ||
    g.includes("essen") || g.includes("trink") || g.includes("brot") || g.includes("wasser") || g.includes("kaffee") || g.includes("tee") || g.includes("kartoffel") || g.includes("reis") || g.includes("salat") || g.includes("kuchen") || g.includes("obst") || g.includes("gemüse") || g.includes("fleisch") || g.includes("fisch") || g.includes("käse") || g.includes("butter") || g.includes("zucker") || g.includes("salz") || g.includes("ei") || g.includes("suppe") || g.includes("saft") || g.includes("bier") || g.includes("wein") || g.includes("brötchen") || g.includes("wurst") || g.includes("schinken") || g.includes("teller") || g.includes("glas") || g.includes("tasse") || g.includes("besteck") || g.includes("speisekarte") || g.includes("kellner") || g.includes("rechnung") ||
    e.includes("eat") || e.includes("drink") || e.includes("bread") || e.includes("water") || e.includes("coffee") || e.includes("tea") || e.includes("food") || e.includes("meal") || e.includes("breakfast") || e.includes("lunch") || e.includes("dinner") || e.includes("fruit") || e.includes("vegetable") || e.includes("apple") || e.includes("banana")
  ) {
    return "Food, Drink & Dining (Essen & Trinken) 🍽️";
  }

  // Family & Friends (Familie & Freunde)
  if (
    t.includes("people") || t.includes("relationships") ||
    g.includes("mutter") || g.includes("vater") || g.includes("sohn") || g.includes("tochter") || g.includes("eltern") || g.includes("kind") || g.includes("freund") || g.includes("familie") || g.includes("oma") || g.includes("opa") || g.includes("großmutter") || g.includes("großvater") || g.includes("bruder") || g.includes("schwester") || g.includes("geschwister") || g.includes("onkel") || g.includes("tante") || g.includes("cousin") || g.includes("nachbar") || g.includes("ehefrau") || g.includes("ehemann") || g.includes("partner") || g.includes("mädchen") || g.includes("junge") || g.includes("baby") ||
    e.includes("mother") || e.includes("father") || e.includes("son") || e.includes("daughter") || e.includes("parents") || e.includes("child") || e.includes("friend") || e.includes("family") || e.includes("wife") || e.includes("husband") || e.includes("brother") || e.includes("sister") || e.includes("uncle") || e.includes("aunt") || e.includes("girl") || e.includes("boy")
  ) {
    return "Family & Friends (Familie & Freunde) 👥";
  }

  // Daily Routine, Leisure & Time (Alltag, Freizeit & Tagesablauf)
  if (
    t.includes("leisure") || t.includes("hobbies") || t.includes("routine") || t.includes("alltag") || t.includes("freizeit") || t.includes("tagesablauf") || t.includes("uhrzeit") ||
    g.includes("hobby") || g.includes("sport") || g.includes("spiel") || g.includes("sing") || g.includes("tanz") || g.includes("musik") || g.includes("buch") || g.includes("les") || g.includes("kino") || g.includes("theater") || g.includes("museum") || g.includes("konzert") || g.includes("party") || g.includes("ausflug") || g.includes("urlaub") || g.includes("strand") || g.includes("malen") || g.includes("fußball") || g.includes("tennis") || g.includes("schwimm") || g.includes("gitarre") || g.includes("klavier") || g.includes("zeitschrift") || g.includes("zeitung") || g.includes("foto") ||
    g.includes("uhr") || g.includes("zeit") || g.includes("tag") || g.includes("woch") || g.includes("monat") || g.includes("jahr") || g.includes("montag") || g.includes("dienstag") || g.includes("mittwoch") || g.includes("donnerstag") || g.includes("freitag") || g.includes("samstag") || g.includes("sonntag") || g.includes("morg") || g.includes("abend") || g.includes("nacht") || g.includes("schlaf") || g.includes("aufsteh") || g.includes("duschen") || g.includes("wecker") || g.includes("spät") || g.includes("früh") || g.includes("heute") || g.includes("gestern") || g.includes("übermorgen") || g.includes("termin") || g.includes("pause") || g.includes("minute") || g.includes("stunde") || g.includes("sekunde") || g.includes("kalender") ||
    e.includes("hobby") || e.includes("sport") || e.includes("play") || e.includes("sing") || e.includes("dance") || e.includes("music") || e.includes("book") || e.includes("read") || e.includes("movie") || e.includes("cinema") || e.includes("vacation") || e.includes("holiday") || e.includes("football") || e.includes("soccer") || e.includes("guitar") || e.includes("piano") || e.includes("swim") ||
    e.includes("o'clock") || e.includes("time") || e.includes("day") || e.includes("week") || e.includes("month") || e.includes("year") || e.includes("monday") || e.includes("morning") || e.includes("evening") || e.includes("night") || e.includes("sleep") || e.includes("wake") || e.includes("hour") || e.includes("minute") || e.includes("today") || e.includes("yesterday") || e.includes("tomorrow") || e.includes("clock") || e.includes("appointment")
  ) {
    return "Daily Routine, Leisure & Time (Alltag, Freizeit & Tagesablauf) ⏰";
  }

  // Housing & Living (Wohnen)
  if (
    t.includes("home") || t.includes("living") ||
    g.includes("haus") || g.includes("wohnung") || g.includes("zimmer") || g.includes("küche") || g.includes("bad") || g.includes("tisch") || g.includes("stuhl") || g.includes("bett") || g.includes("schrank") || g.includes("schlüssel") || g.includes("tür") || g.includes("fenster") || g.includes("balkon") || g.includes("garten") || g.includes("keller") || g.includes("flur") || g.includes("sofa") || g.includes("sessel") || g.includes("kühlschrank") || g.includes("herd") || g.includes("lampe") || g.includes("spiegel") || g.includes("teppich") || g.includes("fernseher") || g.includes("radio") || g.includes("badewanne") || g.includes("miete") || g.includes("möbel") ||
    e.includes("house") || e.includes("apartment") || e.includes("room") || e.includes("kitchen") || e.includes("bath") || e.includes("table") || e.includes("chair") || e.includes("bed") || e.includes("cabinet") || e.includes("key") || e.includes("door") || e.includes("window") || e.includes("balcony") || e.includes("garden") || e.includes("sofa") || e.includes("fridge") || e.includes("rent") || e.includes("furniture")
  ) {
    return "Housing & Living (Wohnen) 🏠";
  }

  // Health & Well-being (Gesundheit & Körper)
  if (
    t.includes("health") || t.includes("medical") ||
    g.includes("arzt") || g.includes("ärztin") || g.includes("krank") || g.includes("gesund") || g.includes("kopf") || g.includes("hand") || g.includes("fuß") || g.includes("schmerz") || g.includes("apotheke") || g.includes("körper") || g.includes("bein") || g.includes("arm") || g.includes("rücken") || g.includes("bauch") || g.includes("zahn") || g.includes("nase") || g.includes("fieber") || g.includes("husten") || g.includes("schnupfen") || g.includes("medikament") || g.includes("tablette") || g.includes("rezept") || g.includes("pflaster") || g.includes("hilfe") || g.includes("notfall") || g.includes("auge") || g.includes("ohr") || g.includes("mund") ||
    e.includes("doctor") || e.includes("sick") || e.includes("healthy") || e.includes("head") || e.includes("hand") || e.includes("foot") || e.includes("pain") || e.includes("pharmacy") || e.includes("body") || e.includes("leg") || e.includes("arm") || e.includes("back") || e.includes("tooth") || e.includes("fever") || e.includes("medicine") || e.includes("hospital") || e.includes("eye") || e.includes("ear") || e.includes("mouth")
  ) {
    return "Health & Well-being (Gesundheit & Körper) 🏥";
  }

  // Shopping & Clothes (Einkaufen & Kleidung)
  if (
    t.includes("money") || t.includes("shopping") ||
    g.includes("kauf") || g.includes("einkauf") || g.includes("preis") || g.includes("geld") || g.includes("teuer") || g.includes("billig") || g.includes("kleid") || g.includes("hose") || g.includes("hemd") || g.includes("schuh") || g.includes("jacke") || g.includes("mantel") || g.includes("pullover") || g.includes("rock") || g.includes("socke") || g.includes("mütze") || g.includes("brille") || g.includes("tasche") || g.includes("kasse") || g.includes("verkäufer") || g.includes("euro") || g.includes("rabatt") || g.includes("angebot") || g.includes("quittung") || g.includes("supermarkt") || g.includes("laden") || g.includes("geschäft") ||
    e.includes("buy") || e.includes("shop") || e.includes("price") || e.includes("money") || e.includes("expensive") || e.includes("cheap") || e.includes("dress") || e.includes("pants") || e.includes("shirt") || e.includes("shoe") || e.includes("jacket") || e.includes("coat") || e.includes("glasses") || e.includes("bag") || e.includes("store") || e.includes("market")
  ) {
    return "Shopping & Clothes (Einkaufen & Kleidung) 🛍️";
  }

  // Directions & Travel (Orientierung & Reisen)
  if (
    t.includes("travel") || t.includes("transport") ||
    g.includes("reisen") || g.includes("fahr") || g.includes("bus") || g.includes("zug") || g.includes("bahnhof") || g.includes("flughafen") || g.includes("auto") || g.includes("weg") || g.includes("straß") || g.includes("stadt") || g.includes("land") || g.includes("hotel") || g.includes("wetter") || g.includes("sonn") || g.includes("regen") || g.includes("haltestelle") || g.includes("bahn") || g.includes("flugzeug") || g.includes("schiff") || g.includes("fahrkarte") || g.includes("verspätung") || g.includes("ankunft") || g.includes("abfahrt") || g.includes("gleis") || g.includes("zentrum") || g.includes("brücke") || g.includes("kreuzung") || g.includes("platz") || g.includes("karte") || g.includes("pass") || g.includes("ausweis") || g.includes("ticket") ||
    e.includes("travel") || e.includes("drive") || e.includes("bus") || e.includes("train") || e.includes("station") || e.includes("airport") || e.includes("car") || e.includes("way") || e.includes("street") || e.includes("city") || e.includes("country") || e.includes("hotel") || e.includes("weather") || e.includes("sun") || e.includes("rain") || e.includes("plane") || e.includes("ticket") || e.includes("arrival") || e.includes("departure") || e.includes("map") || e.includes("passport")
  ) {
    return "Directions & Travel (Orientierung & Reisen) 🗺️";
  }

  // Work & Office (Beruf & Arbeit)
  if (
    t.includes("work") || t.includes("education") ||
    g.includes("arbeit") || g.includes("beruf") || g.includes("job") || g.includes("büro") || g.includes("chef") || g.includes("kolleg") || g.includes("lern") || g.includes("schul") || g.includes("lehr") || g.includes("firma") || g.includes("schüler") || g.includes("student") || g.includes("universität") || g.includes("studier") || g.includes("ausbildung") || g.includes("gehalt") || g.includes("vertrag") || g.includes("computer") || g.includes("laptop") || g.includes("e-mail") || g.includes("brief") || g.includes("nachricht") || g.includes("telefon") ||
    e.includes("work") || e.includes("job") || e.includes("office") || e.includes("learn") || e.includes("school") || e.includes("teacher") || e.includes("student") || e.includes("university") || e.includes("company") || e.includes("contract") || e.includes("salary") || e.includes("letter") || e.includes("message") || e.includes("phone")
  ) {
    return "Work & Office (Beruf & Arbeit) 💼";
  }

  // Personal Details (Sich vorstellen)
  return "Personal Details (Sich vorstellen) 👤";
}

export const VOCABULARY_DATA: VocabularyEntry[] = [
  ...(vocabJson.vocabulary as any[]).map((entry, index) => {
    const type = getWordType(entry.german_word);
    const lookupClean = normalizeForLookup(entry.german_word);
    let level: "A1" | "A2" | "B1" | "B2" = "B1";

    if (type === "Verb" && (verbLevels as any)[entry.german_word]) {
      level = (verbLevels as any)[entry.german_word];
    } else if (B2_WORDS.has(lookupClean)) {
      level = "B2";
    } else if (B1_WORDS.has(lookupClean)) {
      level = "B1";
    } else if (A1_WORDS.has(lookupClean)) {
      level = "A1";
    } else if (A2_WORDS.has(lookupClean)) {
      level = "A2";
    } else {
      let foundA1 = false;
      let foundA2 = false;
      for (const w of Array.from(A1_WORDS)) {
        if (w.length >= 4 && (lookupClean.startsWith(w) || lookupClean.endsWith(w))) {
          foundA1 = true;
          break;
        }
      }
      if (foundA1) {
        level = "A1";
      } else {
        for (const w of Array.from(A2_WORDS)) {
          if (w.length >= 4 && (lookupClean.startsWith(w) || lookupClean.endsWith(w))) {
            foundA2 = true;
            break;
          }
        }
        if (foundA2) {
          level = "A2";
        }
      }
    }

    let finalWord = entry.german_word;
    let forms = entry.forms;

    if (type === "Verb") {
      const { cleanWord, forms: embeddedForms } = cleanGermanWord(entry.german_word);
      finalWord = cleanWord;
      forms = forms || embeddedForms;
      if (!forms || !forms.includes(",")) {
        forms = generateVerbForms(cleanWord);
      }
    }

    return {
      id: `vocab-${index}`,
      ...entry,
      word: finalWord,
      german_word: finalWord,
      forms,
      type,
      level,
      theme: getWordTheme(finalWord, entry.english_translation, level),
    };
  }),
  ...TELC_B1_VOCABULARY_DATA.map((entry, index) => {
    const type = entry.type || getWordType(entry.german_word);
    let level: "A1" | "A2" | "B1" | "B2" = entry.level || "B1";

    if (type === "Verb" && (verbLevels as any)[entry.german_word]) {
      level = (verbLevels as any)[entry.german_word];
    } else {
      level = "B1";
    }

    let finalWord = entry.german_word;
    let forms = entry.forms;

    if (type === "Verb") {
      const { cleanWord, forms: embeddedForms } = cleanGermanWord(entry.german_word);
      finalWord = cleanWord;
      forms = forms || embeddedForms;
      if (!forms || !forms.includes(",")) {
        forms = generateVerbForms(cleanWord);
      }
    }

    return {
      id: `telc-${index}`,
      ...entry,
      word: finalWord,
      german_word: finalWord,
      forms,
      type,
      level,
      theme: entry.theme || getWordTheme(finalWord, entry.english_translation, level),
    };
  }),
  ...TELC_B2_VOCABULARY_DATA.map((entry, index) => {
    const type = entry.type || getWordType(entry.german_word);
    let level: "A1" | "A2" | "B1" | "B2" = entry.level || "B2";

    if (type === "Verb" && (verbLevels as any)[entry.german_word]) {
      level = (verbLevels as any)[entry.german_word];
    } else {
      level = "B2";
    }

    let finalWord = entry.german_word;
    let forms = entry.forms;

    if (type === "Verb") {
      const { cleanWord, forms: embeddedForms } = cleanGermanWord(entry.german_word);
      finalWord = cleanWord;
      forms = forms || embeddedForms;
      if (!forms || !forms.includes(",")) {
        forms = generateVerbForms(cleanWord);
      }
    }

    return {
      id: `telc-b2-${index}`,
      ...entry,
      word: finalWord,
      german_word: finalWord,
      forms,
      type,
      level,
      theme: entry.theme || getWordTheme(finalWord, entry.english_translation, level),
    };
  }),
  ...USER_VOCABULARY_DATA.map((entry, index) => {
    const type = entry.type || getWordType(entry.german_word);
    let level: "A1" | "A2" | "B1" | "B2" = entry.level || "B2";

    if (entry.level) {
      level = entry.level;
    } else if (type === "Verb" && (verbLevels as any)[entry.german_word]) {
      level = (verbLevels as any)[entry.german_word];
    } else {
      level = "B2";
    }

    let finalWord = entry.german_word;
    let forms = entry.forms;

    if (type === "Verb") {
      const { cleanWord, forms: embeddedForms } = cleanGermanWord(entry.german_word);
      finalWord = cleanWord;
      forms = forms || embeddedForms;
      if (!forms || !forms.includes(",")) {
        forms = generateVerbForms(cleanWord);
      }
    }

    return {
      id: entry.id || `user-${index}`,
      ...entry,
      word: finalWord,
      german_word: finalWord,
      forms,
      type,
      level,
      theme: entry.theme || getWordTheme(finalWord, entry.english_translation, level),
    };
  })
];

