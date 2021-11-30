import { Resolver, Query, Arg, Int, UseMiddleware, Ctx } from 'type-graphql';
import {
  findAllEntities,
  findEntityById,
  updateEntity,
} from '../../utils/typeorm';
import { ErrorHandler } from '../../middlewares/errorHandler';
import Level from '../../models/Level';
import { Service } from 'typedi';
import { GQLContext } from '../../types/gqlContext';
import TranslationSet from '../../models/TranslationSet';
import { EntityNotFoundError } from '../../utils/customErrors';

@Service()
@Resolver()
class LevelResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => [Level])
  async levels(): Promise<Level[]> {
    const result = await findAllEntities(Level);
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Query(() => Level)
  async getUserLevel(@Ctx() ctx: GQLContext): Promise<Level> {
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

    let userEval = entities.reduce(
      (sum, entity) =>
        sum + (entity.skill / 100) * entity.translation.level.difficulty + 0.49,
      0
    );
    userEval = Math.round(userEval / entities.length);
    if (userEval < 1) {
      userEval = 1;
    }

    const result = await Level.findOne({where: {difficulty: userEval}});

    if(!result) {
      throw EntityNotFoundError;
    }

    return result;
  }
}

export default LevelResolver;
