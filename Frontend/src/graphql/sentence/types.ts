import { Translation } from "../translation/types";

export interface Sentence {
  id: number;
  textFrom: string;
  textTo: string;
  translationId: number;
  translation: Translation;
}