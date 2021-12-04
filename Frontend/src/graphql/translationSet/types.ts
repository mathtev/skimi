import { Set } from "../set/types";
import { Translation } from "../translation/types";

export interface TranslationSet {
  id: number;
  skill: number;
  translation: Translation;
  set: Set;
}

export interface TranslationSetResponse {
  translationSet: TranslationSet;
}

export interface TranslationSetList {
  translationSetList: TranslationSet[];
}
