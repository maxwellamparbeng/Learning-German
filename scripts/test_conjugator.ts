import { VOCABULARY_DATA } from '../src/data/vocabulary.ts';
import { generateVerbForms, cleanGermanWord, NON_VERB_WORDS } from '../src/utils/verbConjugator';

const verbs = VOCABULARY_DATA.filter(v => v.type === 'Verb' && !NON_VERB_WORDS.has(v.german_word.trim().toLowerCase()));

console.log('Total real verbs evaluated:', verbs.length);

let filledCount = 0;
let cleanedCount = 0;

verbs.forEach((v, index) => {
  const { cleanWord, forms: embeddedForms } = cleanGermanWord(v.german_word);
  const finalForms = v.forms || embeddedForms || generateVerbForms(cleanWord);

  if (v.german_word !== cleanWord) cleanedCount++;
  if (finalForms) filledCount++;

  if (index < 40) {
    console.log(`${index + 1}. [${v.german_word}] => Clean: "${cleanWord}" | Forms: "${finalForms}"`);
  }
});

console.log(`Total verbs with forms guaranteed: ${filledCount}/${verbs.length}`);
console.log(`Total words cleaned of embedded forms: ${cleanedCount}`);
