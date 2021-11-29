import { Resolver, Query, UseMiddleware, Arg, Ctx, Float } from 'type-graphql';
import { findAllEntities, findEntityById } from '../../utils/typeorm';
import { ErrorHandler } from '../../middlewares/errorHandler';
import Profile from '../../models/Profile';
import { Service } from 'typedi';
import { GQLContext } from '../../types/gqlContext';
import TranslationSet from '../../models/TranslationSet';

@Service()
@Resolver()
class ProfileResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => Profile)
  async currentUser(@Ctx() ctx: GQLContext): Promise<Profile | null> {
    const userId = ctx.req.session.userId;
    if (!userId) {
      return null;
    }
    const result = await findEntityById(Profile, userId, {
      relations: ['user', 'level', 'sets'],
    });
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Query(() => Float)
  async getUserEval(@Ctx() ctx: GQLContext): Promise<number> {
    const userId = ctx.req.session.userId;

    const entities = await TranslationSet.createQueryBuilder('translationSet')
      .select()
      .innerJoin('translationSet.set', 'set')
      .innerJoinAndSelect('translationSet.translation', 'translation')
      .innerJoinAndSelect('translation.level', 'level')
      .innerJoin('set.profile', 'profile')
      .innerJoin('profile.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    const userEval = entities.reduce(
      (sum, entity) => sum + entity.skill / 100 * entity.translation.level.difficulty,
      0
    );
    const result = userEval / entities.length;
    return result;
  }
}

export default ProfileResolver;
