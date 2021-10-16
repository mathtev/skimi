import { Translation, Translations } from "../translation/types";

export interface Word {
  id: number;
  name: string;
  language_id: number;
  level_id: number;
  translations?: Translation[];
}

export interface AddWordRequest {
  id?: number;
  name: string;
  language_id: number;
  level_id: number;
}

export interface Words {
  words: Word[];
}
