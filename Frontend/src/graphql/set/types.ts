import { Translation } from "../translation/types";
import { TranslationSet } from "../translationSet/types";

export interface Set {
  progress: number;
  id: number;
  name: string;
  createdAt: Date;
  translations?: Translation[];
  translationSetGroup: TranslationSet[];
}

export interface CreateSetRequest {
  id?: number;
  name: string;
  createdAt: Date;
}

export interface SetResponse {
  set: Set;
}

export interface Sets {
  sets: Set[];
}
