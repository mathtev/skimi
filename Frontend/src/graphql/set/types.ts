import { Translation } from "../translation/types";

export interface Set {
  id: number;
  name: string;
  createdAt: Date;
  translations?: Translation[]
}

export interface CreateSetRequest {
  id?: number;
  name: string;
  createdAt: Date;
}

export interface Sets {
  sets: Set[];
}
