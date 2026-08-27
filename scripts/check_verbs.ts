import { VOCABULARY_DATA } from '../src/data/vocabulary.ts';

console.log('Total entries:', VOCABULARY_DATA.length);

const verbs = VOCABULARY_DATA.filter(v => v.type === 'Verb');
console.log('Total verbs:', verbs.length);

const verbsWithForms = verbs.filter(v => v.forms && v.forms.includes(','));
console.log('Verbs with comma forms:', verbsWithForms.length);

const verbsWithoutForms = verbs.filter(v => !v.forms || !v.forms.includes(','));
console.log('Verbs needing forms:', verbsWithoutForms.length);

// Print sample of verbs without forms
console.log('Sample verbs without forms:');
verbsWithoutForms.slice(0, 30).forEach(v => {
  console.log(`- Word: "${v.german_word}" | Forms: "${v.forms}" | Trans: "${v.english_translation}"`);
});

