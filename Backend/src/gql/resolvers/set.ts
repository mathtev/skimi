import {
  Resolver,
  Query,
  Arg,
  Int,
  UseMiddleware,
  Mutation,
  Ctx,
  Float,
  FieldResolver,
  Root,
} from 'type-graphql';
import {
  createEntity,
  deleteEntity,
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
import { UserNotFoundError } from '../../utils/customErrors';
import TranslationSet from '../../models/TranslationSet';

@Service()
@Resolver((of) => Set)
class SetResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => [Set])
  async sets(@Ctx() ctx: GQLContext): Promise<Set[]> {
    const userId = ctx.req.session.userId;

    const result = Set.createQueryBuilder('set')
      .select()
      .innerJoin('set.profile', 'profile')
      .innerJoin('profile.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    if (!result) {
      throw new Error('could not get sets');
    }

    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Query(() => Set)
  async set(@Arg('id', () => Int) id: number): Promise<Set> {
    const result = await findEntityById(Set, id, {
      relations: ['translations', 'translationSetList'],
    });
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Mutation(() => Set)
  async createSet(@Arg('set') setInput: SetInput, @Ctx() ctx: GQLContext) {
    const userId = ctx.req.session.userId;
    if (!userId) {
      throw new UserNotFoundError(userId);
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

  @UseMiddleware([ErrorHandler])
  @Mutation(() => Set)
  async deleteSet(@Arg('id', () => Int) id: number) {
    const result = await deleteEntity(Set, id);
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Query(() => Float)
  async getSetEval(@Arg('setId', () => Int) setId: number): Promise<number> {
    const entities = await findAllEntities(TranslationSet, {
      where: { setId },
    });
    const setEval = entities.reduce((sum, entity) => sum + entity.skill, 0);
    const result = setEval / entities.length;
    return result;
  }

  @FieldResolver()
  async progress(@Root() set: Set) {
    const entities = await findAllEntities(TranslationSet, {
      where: [{ setId: set.id }],
    });
    const setEval = entities.reduce((sum, entity) => sum + entity.skill, 0);
    const result = Math.round(setEval / entities.length);
    return result;
  }
}

export default SetResolver;
