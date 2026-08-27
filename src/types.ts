export interface KeyPhrase {
  german: string;
  english: string;
}

export interface LessonContext {
  unitId: string;
  unitTitle: string;
  level: string;
  grammarFocus: string;
  starterText: string;
  keyPhrases: KeyPhrase[];
}
