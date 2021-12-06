import { Resolver, Query, UseMiddleware, Arg, Ctx, Float } from 'type-graphql';
import { findAllEntities, findEntityById } from '../../utils/typeorm';
import { ErrorHandler } from '../../middlewares/errorHandler';
import Profile from '../../models/Profile';
import { Service } from 'typedi';
import { GQLContext } from '../../types/gqlContext';
import TranslationSet from '../../models/TranslationSet';
import { UserNotFoundError } from '../../utils/customErrors';

@Service()
@Resolver()
class ProfileResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => Profile)
  async currentUser(@Ctx() ctx: GQLContext): Promise<Profile> {
    const userId = ctx.req.session.userId;
    const result = await Profile.findOne({
      relations: ['user', 'level', 'sets'],
      where: { userId },
    });

    if (!result) {
      throw new UserNotFoundError(userId);
    }

    return result;
  }
}

export default ProfileResolver;
