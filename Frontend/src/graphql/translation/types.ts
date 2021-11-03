import { Level } from "../level/types";
import { Word } from "../word/types";

export interface Translation {
  id: number;
  levelId: number;
  wordTo: Word;
  wordFrom: Word;
  level: Level;
}

export interface Translations {
  translations: Translation[];
}
