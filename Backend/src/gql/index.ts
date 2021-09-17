import LessonResolver from "./resolvers/lesson";
import WordResolver from "./resolvers/word";

export const RESOLVERS = [
  LessonResolver, WordResolver
] as const;