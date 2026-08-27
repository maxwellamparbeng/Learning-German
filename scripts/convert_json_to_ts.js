import fs from 'fs';
import path from 'path';

function mapCategory(cat) {
  if (!cat) return "General & Abstract 💬";
  const c = cat.trim().toLowerCase();
  if (c.includes("industry") || c.includes("business") || c.includes("professional") || c.includes("career")) return "Arbeit & Beruf 💼";
  if (c.includes("media") || c.includes("communication")) return "Medien & Kommunikation 💻";
  if (c.includes("education")) return "Ausbildung & Schule 🎓";
  if (c.includes("administration")) return "Verwaltung & Büro 🏢";
  if (c.includes("health")) return "Gesundheit & Körper 🏥";
  if (c.includes("politics") || c.includes("law")) return "Staat, Recht & Politik ⚖️";
  if (c.includes("social") || c.includes("society")) return "Gesellschaft & Soziales 👥";
  if (c.includes("technology")) return "Technologie & Digitales 💻";
  if (c.includes("academic") || c.includes("science")) return "Wissenschaft & Forschung 🔬";
  if (c.includes("environment")) return "Umwelt & Natur 🌿";
  if (c.includes("finance") || c.includes("trade")) return "Wirtschaft & Finanzen 📈";
  if (c.includes("travel")) return "Reise & Freizeit ✈️";
  if (c.includes("arts")) return "Kultur & Kunst 🎨";
  if (c.includes("furniture") || c.includes("architecture")) return "Wohnen & Alltag 🏠";
  if (c.includes("time")) return "Zeit & Dauer ⏰";
  if (c.includes("geography")) return "Geografie & Orte 🗺️";
  if (c.includes("leisure")) return "Freizeit & Sport ⚽";
  return "General & Abstract 💬";
}

function escapeStr(str) {
  if (!str) return '""';
  return JSON.stringify(str);
}

function generateExample(germanTerm, englishTranslation) {
  const clean = germanTerm.split(',')[0].trim();
  if (clean.startsWith("der ") || clean.startsWith("die ") || clean.startsWith("das ")) {
    return {
      de: `Wir müssen uns intensiv mit ${clean} beschäftigen.`,
      en: `We need to deal intensively with ${englishTranslation}.`
    };
  }
  if (clean.includes(" ")) {
    return {
      de: `Es ist wichtig, ${clean} im Alltag anzuwenden.`,
      en: `It is important to apply ${englishTranslation} in daily life.`
    };
  }
  if (clean.endsWith("en") || clean.endsWith("ern") || clean.endsWith("eln")) {
    return {
      de: `Es ist notwendig, dieses Thema gründlich zu ${clean}.`,
      en: `It is necessary to ${englishTranslation} this topic thoroughly.`
    };
  }
  return {
    de: `Die Situation ist in dieser Hinsicht sehr ${clean}.`,
    en: `The situation is very ${englishTranslation} in this regard.`
  };
}

const dataDir = path.join(process.cwd(), 'src', 'data');

let totalProcessed = 0;
const exportsList = [];

for (let i = 1; i <= 8; i++) {
  const jsonPath = path.join(dataDir, `user_json_p${i}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.log(`Skipping ${jsonPath} (not found)`);
    continue;
  }

  const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log(`Processing Part ${i}: ${rawData.length} items`);

  const rawTuples = rawData.map(item => {
    const term = item["German Term"];
    const trans = item["English Translation"];
    const cat = mapCategory(item["Context/Category"]);
    const ex = generateExample(term, trans);
    return `  [${escapeStr(term)}, ${escapeStr(trans)}, ${escapeStr(ex.de)}, ${escapeStr(ex.en)}, ${escapeStr(cat)}]`;
  });

  const varName = `RAW_USER_P${i}`;
  const exportVar = `USER_VOCAB_P${i}`;
  exportsList.push(exportVar);

  const fileContent = `import { convertRawB2Vocabulary, VocabularyEntry } from "./telc_helper";

const ${varName}: [string, string, string, string, string][] = [
${rawTuples.join(',\n')}
];

export const ${exportVar}: VocabularyEntry[] = convertRawB2Vocabulary(${varName});
`;

  const tsPath = path.join(dataDir, `user_p${i}.ts`);
  fs.writeFileSync(tsPath, fileContent, 'utf8');
  totalProcessed += rawData.length;
}

// Generate user_vocabulary.ts aggregator
const imports = exportsList.map((v, idx) => `import { ${v} } from "./user_p${idx + 1}";`).join('\n');
const spreads = exportsList.map(v => `  ...${v}`).join(',\n');

const aggregatorContent = `import { VocabularyEntry } from "./telc_helper";
${imports}

export const USER_VOCABULARY_DATA: VocabularyEntry[] = [
${spreads}
];
`;

fs.writeFileSync(path.join(dataDir, 'user_vocabulary.ts'), aggregatorContent, 'utf8');

console.log(`Successfully generated all TS files! Total processed: ${totalProcessed}`);
