import { Word } from "../word/types";

export interface Translation {
  id: number;
  word1_id: number;
  word2_id: number;
  word: Word;
}

export interface Translations {
  translations: Translation[];
}
