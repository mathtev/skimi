import { Resolver, Query, Ctx, Arg, Int } from 'type-graphql';
import { findAllEntities, findEntityById, updateEntity } from '../../utils/typeorm';
import { GQLContext } from 'types/gqlContext';
import Lesson from '../../models/Lesson';

@Resolver()
class LessonResolver {
  @Query(() => Lesson)
  async getLesson(
    @Ctx() ctx: GQLContext,
    @Arg('id', () => Int) id: number
  ): Promise<Lesson> {
    const lesson = await findEntityById(Lesson, id);
    return lesson;
  }
  @Query(() => [Lesson])
  async getAllLessons(@Ctx() ctx: GQLContext): Promise<Lesson[]> {
    const lessons = await findAllEntities(Lesson);
    return lessons;
  }
}

export default LessonResolver;
