import {
  Resolver,
  Query,
  Ctx
} from "type-graphql";
import { findEntityOrThrow, updateEntity } from "../../utils/typeorm";
import { GQLContext } from "types/gqlContext";
import Lesson from "../../models/Lesson";


@Resolver()
class LessonResolver {
  @Query(() => Lesson)
  async getLesson(@Ctx() ctx: GQLContext) {
    const lesson = await Lesson.find()
    console.log('bbbbb',lesson)

    return lesson;
  }
}

export default LessonResolver;