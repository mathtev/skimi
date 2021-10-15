import { Resolver, Query, Arg, Int, UseMiddleware } from 'type-graphql';
import { findAllEntities, findEntityById, updateEntity } from '../../utils/typeorm';
import Lesson from '../../models/Lesson';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { Service } from 'typedi';

@Service()
@Resolver()
class LessonResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => Lesson)
  async getLesson(
    @Arg('id', () => Int) id: number
  ): Promise<Lesson> {
    const lesson = await findEntityById(Lesson, id);
    return lesson;
  }
  
  @UseMiddleware([ErrorHandler])
  @Query(() => [Lesson])
  async getAllLessons(): Promise<Lesson[]> {
    const lessons = await findAllEntities(Lesson);
    return lessons;
  }
}

export default LessonResolver;
