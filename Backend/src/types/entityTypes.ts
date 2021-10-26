import Language from "../models/Language";
import Level from "../models/Level";
import Profile from "../models/Profile";
import Sentence from "../models/Sentence";
import Set from "../models/Set";
import Translation from "../models/Translation";
import User from "../models/User";
import Word from "../models/Word";


export type EntityTypes =
  | typeof Level
  | typeof Language
  | typeof Translation
  | typeof Set
  | typeof Sentence
  | typeof User
  | typeof Profile
  | typeof Word;

export type EntityInstance =
  | Word
  | Level
  | Language
  | Translation
  | Sentence
  | User
  | Profile
  | Set;

export const entities: { [key: string]: EntityTypes } = {
  Word,
  Level,
  Language,
  Translation,
  User,
  Profile,
  Sentence,
  Set,
};