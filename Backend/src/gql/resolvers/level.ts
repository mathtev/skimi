import { Resolver, Query, Arg, Int, UseMiddleware } from 'type-graphql';
import { findAllEntities, findEntityById, updateEntity } from '../../utils/typeorm';
import Lesson from '../../models/Lesson';
import { ErrorHandler } from '../../middlewares/errorHandler';
import Level from '../../models/Level';

@Resolver()
class LevelResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => [Level])
  async levels(): Promise<Level[]> {
    const result = await findAllEntities(Level);
    return result;
  }
}

export default LevelResolver;
