import { Translation } from "../translation/types";

export interface Set {
  id: number;
  name: string;
  created_at: string;
  translations?: Translation[]
}

export interface CreateSetRequest {
  id?: number;
  name: string;
  created_at: string;
}

export interface Sets {
  sets: Set[];
}
