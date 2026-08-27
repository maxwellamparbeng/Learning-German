// Comprehensive German Verb Conjugator & Forms Parser

// 1. Non-verb words that end in -en, -eln, -ern but should NOT be classified as verbs
export const NON_VERB_WORDS = new Set([
  "außen", "draußen", "drinnen", "drin, drinnen", "gestern", "selten", "einzeln",
  "modern", "neben", "oben", "offen", "betrunken", "ein bisschen", "deswegen",
  "drüben", "eben", "eigen", "meinetwegen", "inzwischen", "hinten", "innen",
  "geschieden", "mitten", "trotzdem", "außerdem", "morgen", "übermorgen",
  "schon", "zwar", "wohen", "münchen", "wien", "ostern", "weihnachten",
  "mit freundlichen grüßen", "vielleicht"
]);

// 2. Auxiliaries: Verbs that use "ist" (sein) in Perfekt
const SEIN_VERBS = new Set([
  "aufstehen", "aufwachen", "aussteigen", "einsteigen", "umsteigen",
  "fahren", "fliegen", "fliehen", "fließen", "fallen", "gehen", "gelingen",
  "geschehen", "kommen", "laufen", "reisen", "rennen", "schwimmen", "sinken",
  "springen", "steigen", "sterben", "stürzen", "wandern", "passieren",
  "entstehen", "erscheinen", "verschwinden", "zurückkommen", "zurückfahren",
  "zurückgehen", "anfahren", "abfahren", "ankommen", "abfliegen", "anfangen",
  "kaputtgehen", "weitergehen", "vorbeikommen", "mitkommen", "herkommen",
  "hinunterfahren", "herunterfahren", "mitfahren", "auswandern", "einwandern",
  "verreisen", "aufwachsen", "wachsen", "zurückkehren"
]);

// 3. Separable Prefixes in German
const SEPARABLE_PREFIXES = [
  "zurück", "zusammen", "entgegen", "weiter", "vorbei", "herunter", "hinunter",
  "heraus", "hinaus", "kennen", "sauber", "stecken", "spazieren", "statt",
  "teil", "fest", "fort", "heim", "hoch", "los", "nach", "raus", "rein",
  "weg", "wieder", "ab", "an", "auf", "aus", "bei", "ein", "mit", "vor", "zu"
];

// 4. Inseparable Prefixes
const INSEPARABLE_PREFIXES = [
  "be", "emp", "ent", "er", "ge", "ver", "zer", "miss"
];

// 5. Irregular / Strong German Base Verbs Dictionary
// Key: base infinitive verb -> [3rd pres, 3rd präteritum, partizip II, default aux ("hat" or "ist")]
const STRONG_VERBS_DICT: Record<string, [string, string, string, "hat" | "ist"]> = {
  "backen": ["bäckt", "buk", "gebacken", "hat"],
  "befehlen": ["befiehlt", "befahl", "befohlen", "hat"],
  "beginnen": ["beginnt", "begann", "begonnen", "hat"],
  "beißen": ["beißt", "biss", "gebissen", "hat"],
  "bekommen": ["bekommt", "bekam", "bekommen", "hat"],
  "beraten": ["berät", "beriet", "beraten", "hat"],
  "beschließen": ["beschließt", "beschloss", "beschlossen", "hat"],
  "beschreiben": ["beschreibt", "beschrieb", "beschrieben", "hat"],
  "besitzen": ["besitzt", "besaß", "besessen", "hat"],
  "bestehen": ["besteht", "bestand", "gestanden", "hat"],
  "betragen": ["beträgt", "betrug", "betragen", "hat"],
  "bewerben": ["bewirbt", "bewarb", "beworben", "hat"],
  "biegen": ["biegt", "bog", "gebogen", "hat"],
  "bieten": ["bietet", "bot", "geboten", "hat"],
  "binden": ["bindet", "band", "gebunden", "hat"],
  "bitten": ["bittet", "bat", "gebeten", "hat"],
  "blasen": ["bläst", "blies", "geblasen", "hat"],
  "bleiben": ["bleibt", "blieb", "geblieben", "ist"],
  "braten": ["brät", "briet", "gebraten", "hat"],
  "brechen": ["bricht", "brach", "gebrochen", "hat"],
  "brennen": ["brennt", "brannte", "gebrannt", "hat"],
  "bringen": ["bringt", "brachte", "gebracht", "hat"],
  "denken": ["denkt", "dachte", "gedacht", "hat"],
  "dürfen": ["darf", "durfte", "gedurft", "hat"],
  "empfangen": ["empfängt", "empfing", "empfangen", "hat"],
  "empfehlen": ["empfiehlt", "empfahl", "empfohlen", "hat"],
  "empfinden": ["empfindet", "empfand", "empfunden", "hat"],
  "entscheiden": ["entscheidet", "entschied", "entschieden", "hat"],
  "entsprechen": ["entspricht", "entsprach", "entsprochen", "hat"],
  "entstehen": ["entsteht", "entstand", "entstanden", "ist"],
  "erfahren": ["erfährt", "erfuhr", "erfahren", "hat"],
  "erfinden": ["erfindet", "erfand", "erfunden", "hat"],
  "erhalten": ["erhält", "erhielt", "erhalten", "hat"],
  "erkennen": ["erkennt", "erkannte", "erkannt", "hat"],
  "erscheinen": ["erscheint", "erschien", "erschienen", "ist"],
  "erschrecken": ["erschrickt", "erschrak", "erschrocken", "ist"],
  "erziehen": ["erzieht", "erzog", "erzogen", "hat"],
  "essen": ["isst", "aß", "gegessen", "hat"],
  "fahren": ["fährt", "fuhr", "gefahren", "ist"],
  "fallen": ["fällt", "fiel", "gefallen", "ist"],
  "fangen": ["fängt", "fing", "gefangen", "hat"],
  "finden": ["findet", "fand", "gefunden", "hat"],
  "fliegen": ["fliegt", "flog", "geflogen", "ist"],
  "fliehen": ["flieht", "floh", "geflohen", "ist"],
  "fließen": ["fließt", "floss", "geflossen", "ist"],
  "fressen": ["frisst", "fraß", "gefressen", "hat"],
  "frieren": ["friert", "fror", "gefroren", "hat"],
  "geben": ["gibt", "gab", "gegeben", "hat"],
  "gefallen": ["gefällt", "gefiel", "gefallen", "hat"],
  "gehen": ["geht", "ging", "gegangen", "ist"],
  "gelingen": ["gelingt", "gelang", "gelungen", "ist"],
  "gelten": ["gilt", "galt", "gegolten", "hat"],
  "genießen": ["genießt", "genoss", "genossen", "hat"],
  "geraten": ["gerät", "geriet", "geraten", "ist"],
  "geschehen": ["geschieht", "geschah", "geschehen", "ist"],
  "gewinnen": ["gewinnt", "gewann", "gewonnen", "hat"],
  "gießen": ["gießt", "goss", "gegossen", "hat"],
  "gleichen": ["gleicht", "glich", "geglichen", "hat"],
  "gleiten": ["gleitet", "glitt", "geglitten", "ist"],
  "graben": ["gräbt", "grub", "gegraben", "hat"],
  "greifen": ["greift", "griff", "gegriffen", "hat"],
  "haben": ["hat", "hatte", "gehabt", "hat"],
  "halten": ["hält", "hielt", "gehalten", "hat"],
  "hängen": ["hängt", "hing", "gehangen", "hat"],
  "heben": ["hebt", "hob", "gehoben", "hat"],
  "heißen": ["heißt", "hieß", "geheißen", "hat"],
  "helfen": ["hilft", "half", "geholfen", "hat"],
  "kennen": ["kennt", "kannte", "gekannt", "hat"],
  "klingen": ["klingt", "klang", "geklungen", "hat"],
  "kommen": ["kommt", "kam", "gekommen", "ist"],
  "können": ["kann", "konnte", "gekonnt", "hat"],
  "laden": ["lädt", "lud", "geladen", "hat"],
  "lassen": ["lässt", "ließ", "gelassen", "hat"],
  "laufen": ["läuft", "lief", "gelaufen", "ist"],
  "leiden": ["leidet", "litt", "gelitten", "hat"],
  "leihen": ["leiht", "lieh", "geliehen", "hat"],
  "lesen": ["liest", "las", "gelesen", "hat"],
  "liegen": ["liegt", "lag", "gelegen", "hat"],
  "lügen": ["lügt", "log", "gelogen", "hat"],
  "messen": ["misst", "maß", "gemessen", "hat"],
  "mögen": ["mag", "mochte", "gemocht", "hat"],
  "müssen": ["muss", "musste", "gemusst", "hat"],
  "nehmen": ["nimmt", "nahm", "genommen", "hat"],
  "nennen": ["nennt", "nannte", "genannt", "hat"],
  "pfeifen": ["pfeift", "pfiff", "gepfeiffen", "hat"],
  "raten": ["rät", "riet", "geraten", "hat"],
  "reiben": ["reibt", "rieb", "gerieben", "hat"],
  "reißen": ["reißt", "riss", "gerissen", "hat"],
  "reiten": ["reitet", "ritt", "geritten", "ist"],
  "rennen": ["rennt", "rannte", "gerannt", "ist"],
  "riechen": ["riecht", "roch", "gerochen", "hat"],
  "rufen": ["ruft", "rief", "gerufen", "hat"],
  "schaffen": ["schafft", "schuf", "geschaffen", "hat"],
  "scheinen": ["scheint", "schien", "geschienen", "hat"],
  "schieben": ["schiebt", "schob", "geschoben", "hat"],
  "schießen": ["schießt", "schoss", "geschossen", "hat"],
  "schlafen": ["schläft", "schlief", "geschlafen", "hat"],
  "schlagen": ["schlägt", "schlug", "geschlagen", "hat"],
  "schließen": ["schließt", "schloss", "geschlossen", "hat"],
  "schmeißen": ["schmeißt", "schmiss", "geschmissen", "hat"],
  "schneiden": ["schneidet", "schnitt", "geschnitten", "hat"],
  "schreiben": ["schreibt", "schrieb", "geschrieben", "hat"],
  "schreien": ["schreit", "schrie", "geschrien", "hat"],
  "schweigen": ["schweigt", "schwieg", "geschwiegen", "hat"],
  "schwellen": ["schwillt", "schwoll", "geschwollen", "ist"],
  "schwimmen": ["schwimmt", "schwamm", "geschwommen", "ist"],
  "sehen": ["sieht", "sah", "gesehen", "hat"],
  "sein": ["ist", "war", "gewesen", "ist"],
  "singen": ["singt", "sang", "gesungen", "hat"],
  "sinken": ["sinkt", "sank", "gesunken", "ist"],
  "sitzen": ["sitzt", "saß", "gesessen", "hat"],
  "sollen": ["soll", "sollte", "gesollt", "hat"],
  "sprechen": ["spricht", "sprach", "gesprochen", "hat"],
  "springen": ["springt", "sprang", "gesprungen", "ist"],
  "stechen": ["sticht", "stach", "gestochen", "hat"],
  "stehen": ["steht", "stand", "gestanden", "hat"],
  "stehlen": ["stiehlt", "stahl", "gestohlen", "hat"],
  "steigen": ["steigt", "stieg", "gestiegen", "ist"],
  "sterben": ["stirbt", "starb", "gestorben", "ist"],
  "stinken": ["stinkt", "stank", "gestunken", "hat"],
  "stoßen": ["stößt", "stieß", "gestoßen", "hat"],
  "streichen": ["streicht", "strich", "gestrichen", "hat"],
  "streiten": ["streitet", "stritt", "gestritten", "hat"],
  "tragen": ["trägt", "trug", "getragen", "hat"],
  "treffen": ["trifft", "traf", "getroffen", "hat"],
  "treiben": ["treibt", "trieb", "getrieben", "hat"],
  "treten": ["tritt", "trat", "getreten", "hat"],
  "trinken": ["trinkt", "trank", "getrunken", "hat"],
  "trügen": ["trügt", "trog", "getrogen", "hat"],
  "tun": ["tut", "tat", "getan", "hat"],
  "unterbrechen": ["unterbricht", "unterbrach", "unterbrochen", "hat"],
  "unterhalten": ["unterhält", "unterhielt", "unterhalten", "hat"],
  "unterscheiden": ["unterscheidet", "unterschied", "unterschieden", "hat"],
  "unterschreiben": ["unterschreibt", "unterschrieb", "unterschrieben", "hat"],
  "verbieten": ["verbietet", "verbot", "verboten", "hat"],
  "verbinden": ["verbindet", "verband", "verbunden", "hat"],
  "verbringen": ["verbringt", "verbrachte", "verbracht", "hat"],
  "vergessen": ["vergisst", "vergaß", "vergessen", "hat"],
  "vergleichen": ["vergleicht", "verglich", "verglichen", "hat"],
  "verlassen": ["verlässt", "verließ", "verlassen", "hat"],
  "verlieren": ["verliert", "verlor", "verloren", "hat"],
  "vermeiden": ["vermeidet", "vermied", "vermieden", "hat"],
  "verraten": ["verrät", "verriet", "verraten", "hat"],
  "verschieben": ["verschiebt", "verschob", "verschoben", "hat"],
  "verschwinden": ["verschwindet", "verschwand", "verschwunden", "ist"],
  "versprechen": ["verspricht", "versprach", "versprochen", "hat"],
  "verstehen": ["versteht", "verstand", "verstanden", "hat"],
  "vertreten": ["vertritt", "vertrat", "vertreten", "hat"],
  "verzeihen": ["verzeiht", "verzieh", "verziehen", "hat"],
  "wachsen": ["wächst", "wuchs", "gewachsen", "ist"],
  "waschen": ["wäscht", "wusch", "gewaschen", "hat"],
  "weisen": ["weist", "wies", "gewiesen", "hat"],
  "wenden": ["wendet", "wandte", "gewandt", "hat"],
  "werben": ["wirbt", "warb", "geworben", "hat"],
  "werden": ["wird", "wurde", "geworden", "ist"],
  "werfen": ["wirft", "warf", "geworfen", "hat"],
  "wiegen": ["wiegt", "wog", "gewogen", "hat"],
  "wissen": ["weiß", "wusste", "gewusst", "hat"],
  "wollen": ["will", "wollte", "gewollt", "hat"],
  "ziehen": ["zieht", "zog", "gezogen", "hat"],
  "zwingen": ["zwingt", "zwang", "gezwungen", "hat"]
};

// Function to generate conjugated 3rd person forms for a verb
export function generateVerbForms(rawVerbWord: string): string {
  if (!rawVerbWord) return "";

  // Check if string already contains embedded forms like "halten, hält, hielt, hat gehalten"
  const commaParts = rawVerbWord.split(',').map(p => p.trim());
  if (commaParts.length >= 3) {
    // Already contains forms! Return the forms part
    return commaParts.slice(1).join(', ');
  }

  let cleanWord = rawVerbWord.trim();

  // Extract phrase prefixes like "Bescheid geben", "Lust haben", "einen Termin vereinbaren"
  let phrasePrefix = "";
  if (cleanWord.includes(" ") && !cleanWord.startsWith("sich ")) {
    const parts = cleanWord.split(" ");
    // E.g., ["Bescheid", "geben"] or ["einen", "Termin", "vereinbaren"]
    const lastWord = parts[parts.length - 1];
    if (lastWord.endsWith("en") || lastWord.endsWith("eln") || lastWord.endsWith("ern")) {
      phrasePrefix = parts.slice(0, parts.length - 1).join(" ");
      cleanWord = lastWord;
    }
  }

  // Handle reflexive verbs like "sich amüsieren" or "amüsieren, sich"
  let isReflexive = false;
  if (cleanWord.startsWith("sich ")) {
    isReflexive = true;
    cleanWord = cleanWord.replace(/^sich\s+/, "").trim();
  } else if (cleanWord.endsWith(", sich")) {
    isReflexive = true;
    cleanWord = cleanWord.replace(/,\s*sich$/, "").trim();
  }

  // Determine if verb uses "ist"
  const aux = SEIN_VERBS.has(cleanWord) || SEIN_VERBS.has(rawVerbWord.trim()) ? "ist" : "hat";

  // Check direct match in Strong Verbs Dictionary
  if (STRONG_VERBS_DICT[cleanWord]) {
    const [pres, praet, part, dictAux] = STRONG_VERBS_DICT[cleanWord];
    return formatForms(pres, praet, part, dictAux, isReflexive, phrasePrefix);
  }

  // Check Separable Prefix + Strong Verb (e.g. "aufschreiben" -> "auf" + "schreiben")
  for (const prefix of SEPARABLE_PREFIXES) {
    if (cleanWord.startsWith(prefix) && cleanWord.length > prefix.length + 2) {
      const stemVerb = cleanWord.slice(prefix.length);
      if (STRONG_VERBS_DICT[stemVerb]) {
        const [pres, praet, part, dictAux] = STRONG_VERBS_DICT[stemVerb];
        const sepPres = `${pres} ${prefix}`;
        const sepPraet = `${praet} ${prefix}`;
        const sepPart = `${prefix}${part}`;
        const finalAux = SEIN_VERBS.has(cleanWord) ? "ist" : dictAux;
        return formatForms(sepPres, sepPraet, sepPart, finalAux, isReflexive, phrasePrefix);
      }
    }
  }

  // Regular Weak Verb Rule-Based Generator
  // Check separable prefix for regular verbs
  let prefix = "";
  let baseVerb = cleanWord;
  for (const p of SEPARABLE_PREFIXES) {
    if (cleanWord.startsWith(p) && cleanWord.length > p.length + 2) {
      prefix = p;
      baseVerb = cleanWord.slice(p.length);
      break;
    }
  }

  // Calculate Stem
  let stem = baseVerb;
  if (baseVerb.endsWith("en")) {
    stem = baseVerb.slice(0, -2);
  } else if (baseVerb.endsWith("n")) {
    stem = baseVerb.slice(0, -1);
  }

  // Check stem endings for 'e' insertion (d, t, fn, gn, chn, tm, dm)
  const needsE = /[dt]$/.test(stem) || /[fgckp]n$/.test(stem) || /chn$/.test(stem);

  const presEnd = needsE ? "et" : "t";
  const praetEnd = needsE ? "ete" : "te";
  const partEnd = needsE ? "et" : "t";

  let pres = `${stem}${presEnd}`;
  let praet = `${stem}${praetEnd}`;

  if (prefix) {
    pres = `${pres} ${prefix}`;
    praet = `${praet} ${prefix}`;
  }

  // Partizip II calculation
  let part = "";
  const isInseparable = INSEPARABLE_PREFIXES.some(inp => baseVerb.startsWith(inp) && baseVerb.length > inp.length + 2);
  const isIeren = baseVerb.endsWith("ieren");

  if (prefix) {
    part = `${prefix}ge${stem}${partEnd}`;
  } else if (isInseparable || isIeren) {
    part = `${stem}${partEnd}`;
  } else {
    part = `ge${stem}${partEnd}`;
  }

  return formatForms(pres, praet, part, aux, isReflexive, phrasePrefix);
}

function formatForms(
  pres: string,
  praet: string,
  part: string,
  aux: string,
  isReflexive: boolean,
  phrasePrefix: string
): string {
  let p = pres;
  let pr = praet;
  let pa = `${aux} ${part}`;

  if (isReflexive) {
    p = `${p} sich`;
    pr = `${pr} sich`;
    pa = `${aux} sich ${part}`;
  }

  if (phrasePrefix) {
    p = `${p} ${phrasePrefix}`;
    pr = `${pr} ${phrasePrefix}`;
    pa = `${aux} ${phrasePrefix} ${part}`;
  }

  return `${p}, ${pr}, ${pa}`;
}

// Function to clean `german_word` if it has embedded forms
export function cleanGermanWord(germanWord: string): { cleanWord: string; forms: string | null } {
  if (!germanWord) return { cleanWord: "", forms: null };
  const parts = germanWord.split(',').map(s => s.trim());
  if (parts.length >= 3) {
    const cleanWord = parts[0];
    const forms = parts.slice(1).join(', ');
    return { cleanWord, forms };
  }
  return { cleanWord: germanWord.trim(), forms: null };
}
