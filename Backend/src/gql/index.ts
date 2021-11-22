import AuthResolver from './resolvers/auth';
import LanguageResolver from './resolvers/language';
import LevelResolver from './resolvers/level';
import ProfileResolver from './resolvers/profile';
import SentenceResolver from './resolvers/sentence';
import SetResolver from './resolvers/set';
import TranslationResolver from './resolvers/translation';
import TranslationSetResolver from './resolvers/translationSet';
import WordResolver from './resolvers/word';

export const RESOLVERS = [
  WordResolver,
  LanguageResolver,
  LevelResolver,
  TranslationResolver,
  SetResolver,
  ProfileResolver,
  AuthResolver,
  TranslationSetResolver,
  SentenceResolver
] as const;
