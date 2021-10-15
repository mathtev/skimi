import { Translation, Translations } from "../translation/types";

export interface Word {
  id: number;
  name: string;
  languageId: number;
  levelId: number;
  translations: Translation[];
}

export interface Words {
  words: Word[];
}
