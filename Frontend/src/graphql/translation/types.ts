import { Level } from '../level/types';
import { Sentence } from '../sentence/types';
import { Word } from '../word/types';

export interface Translation {
  id: number;
  levelId: number;
  wordTo: Word;
  wordFrom: Word;
  level: Level;
  sentences: Sentence[];
}

export interface Translations {
  translations: Translation[];
}
