import { Level } from "../level/types";
import { Set } from "../set/types";
import { Translation } from "../translation/types";
import { User } from "../user/types";

export interface Profile {
  id: number;
  name: string;
  userId: number;
  levelId: number;
  user: User;
  level: Level
  sets: Set;
}

