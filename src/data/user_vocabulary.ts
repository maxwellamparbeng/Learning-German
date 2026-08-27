import { VocabularyEntry } from "./telc_helper";
import { USER_VOCAB_P1 } from "./user_p1";
import { USER_VOCAB_P2 } from "./user_p2";
import { USER_VOCAB_P3 } from "./user_p3";
import { USER_VOCAB_P4 } from "./user_p4";
import { USER_VOCAB_P5 } from "./user_p5";
import { USER_VOCAB_P6 } from "./user_p6";
import { USER_VOCAB_P7 } from "./user_p7";
import { USER_VOCAB_P8 } from "./user_p8";
import { B2_SPECIAL_VERBS_DATA } from "./b2_special_verbs";

export const USER_VOCABULARY_DATA: VocabularyEntry[] = [
  ...USER_VOCAB_P1,
  ...USER_VOCAB_P2,
  ...USER_VOCAB_P3,
  ...USER_VOCAB_P4,
  ...USER_VOCAB_P5,
  ...USER_VOCAB_P6,
  ...USER_VOCAB_P7,
  ...USER_VOCAB_P8,
  ...B2_SPECIAL_VERBS_DATA
];

