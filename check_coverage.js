import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./src/data/vocabulary.json', 'utf8'));
const vocab = data.vocabulary || [];

// Group by starting letter
const letterCounts = {};
vocab.forEach(entry => {
  const cleanWord = entry.german_word.replace(/^(der|die|das|sich)\s+/i, "");
  const firstLetter = cleanWord[0]?.toUpperCase() || '#';
  letterCounts[firstLetter] = (letterCounts[firstLetter] || 0) + 1;
});

console.log('Letter counts in existing vocabulary.json:');
console.log(JSON.stringify(letterCounts, null, 2));
