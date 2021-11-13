import { Set } from "../set/types";
import { Translation } from "../translation/types";

export interface TranslationSet {
  id: number;
  name: string;
  createdAt: Date;
  skill: number;
  translation: Translation;
  set: Set;
}

export interface TranslationSetResponse {
  translationSet: TranslationSet;
}
