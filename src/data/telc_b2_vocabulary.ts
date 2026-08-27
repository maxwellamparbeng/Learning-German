import { VocabularyEntry } from "./telc_helper";
import { TELC_B2_P1 } from "./telc_b2_p1";
import { TELC_B2_P2 } from "./telc_b2_p2";
import { TELC_B2_P3 } from "./telc_b2_p3";
import { TELC_B2_P4 } from "./telc_b2_p4";
import { TELC_B2_P5 } from "./telc_b2_p5";
import { TELC_B2_P6 } from "./telc_b2_p6";

export type { VocabularyEntry };

export const TELC_B2_VOCABULARY_DATA: VocabularyEntry[] = [
  ...TELC_B2_P1,
  ...TELC_B2_P2,
  ...TELC_B2_P3,
  ...TELC_B2_P4,
  ...TELC_B2_P5,
  ...TELC_B2_P6
];
