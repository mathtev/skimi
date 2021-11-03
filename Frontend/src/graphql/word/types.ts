import { Translation, Translations } from "../translation/types";

export interface Word {
  id: number;
  name: string;
  languageId: number;
  translations?: Translation[];
}

export interface AddWordRequest {
  id?: number;
  name: string;
  languageId: number;
}

export interface Words {
  words: Word[];
}
