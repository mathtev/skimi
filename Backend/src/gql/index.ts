import LanguageResolver from "./resolvers/language";
import LessonResolver from "./resolvers/lesson";
import LevelResolver from "./resolvers/level";
import TranslationResolver from "./resolvers/translation";
import WordResolver from "./resolvers/word";

export const RESOLVERS = [
  LessonResolver, WordResolver, LanguageResolver, LevelResolver, TranslationResolver
] as const;