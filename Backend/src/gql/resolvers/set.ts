import {
  Resolver,
  Query,
  Arg,
  Int,
  UseMiddleware,
  Mutation,
  Ctx,
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
import Translation from '../../models/Translation';
import { GQLContext } from '../../types/gqlContext';
import { CurrentUserNotFoundError } from '../../utils/customErrors';

@Service()
@Resolver()
class SetResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => [Set])
  async sets(): Promise<Set[]> {
    const result = await findAllEntities(Set);
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
  async createSet(@Arg('set') setInput: SetInput, @Ctx() ctx: GQLContext) {
    const userId = ctx.req.session.userId;
    if (!userId) {
      throw new CurrentUserNotFoundError(userId);
    }
    const translations = await Translation.findByIds(setInput.translationIds);
    const result = await createEntity(Set, {
      name: setInput.name,
      createdAt: setInput.createdAt,
      profileId: userId,
      translations,
    });
    return result;
  }
}

export default SetResolver;
