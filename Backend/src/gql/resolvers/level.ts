import { Resolver, Query, Arg, Int, UseMiddleware } from 'type-graphql';
import { findAllEntities, findEntityById, updateEntity } from '../../utils/typeorm';
import Lesson from '../../models/Lesson';
import { ErrorHandler } from '../../middlewares/errorHandler';
import Level from '../../models/Level';

@Resolver()
class LevelResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => [Level])
  async getAllLevels(): Promise<Level[]> {
    const levels = await findAllEntities(Level);
    return levels;
  }
}

export default LevelResolver;
