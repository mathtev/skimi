import LanguageResolver from "./resolvers/language";
import LessonResolver from "./resolvers/lesson";
import LevelResolver from "./resolvers/level";
import WordResolver from "./resolvers/word";

export const RESOLVERS = [
  LessonResolver, WordResolver, LanguageResolver, LevelResolver
] as const;