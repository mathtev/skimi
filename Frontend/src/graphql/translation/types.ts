import { Level } from "../level/types";
import { Word } from "../word/types";

export interface Translation {
  id: number;
  word1_id: number;
  word2_id: number;
  level_id: number;
  word_to: Word;
  word_from: Word;
  level: Level;
}

export interface Translations {
  translations: Translation[];
}
