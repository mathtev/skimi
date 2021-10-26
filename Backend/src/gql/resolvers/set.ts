import {
  Resolver,
  Query,
  Arg,
  Int,
  UseMiddleware,
  Mutation,
} from 'type-graphql';
import {
  createEntity,
  findAllEntities,
  findEntityById,
  updateEntity,
} from '../../utils/typeorm';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { Service } from 'typedi';
import Set from '../../models/Set';
import { SetInput } from '../types/set';

@Service()
@Resolver()
class SetResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => [Set])
  async sets(): Promise<Set[]> {
    const result = await findAllEntities(Set, {
      relations: ['translations'],
    });
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Query(() => Set)
  async set(@Arg('id', () => Int) id: number): Promise<Set> {
    const result = await findEntityById(Set, id, {
      relations: ['translations'],
    });
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Mutation(() => Set)
  async createSet(@Arg('word') setInput: SetInput): Promise<Set> {
    const result = await createEntity(Set, setInput);
    return result;
  }
}

export default SetResolver;
