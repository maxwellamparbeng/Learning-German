import { VocabularyExample, VocabularyEntry } from "./telc_helper";
import { TELC_B1_P1 } from "./telc_b1_p1";
import { TELC_B1_P2 } from "./telc_b1_p2";
import { TELC_B1_P3 } from "./telc_b1_p3";
import { TELC_B1_P4 } from "./telc_b1_p4";
import { TELC_B1_P5 } from "./telc_b1_p5";

export type { VocabularyExample, VocabularyEntry };

export const TELC_B1_VOCABULARY_DATA: VocabularyEntry[] = [
  ...TELC_B1_P1,
  ...TELC_B1_P2,
  ...TELC_B1_P3,
  ...TELC_B1_P4,
  ...TELC_B1_P5
];
