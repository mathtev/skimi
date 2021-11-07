import { Resolver, Query, UseMiddleware, Arg, Ctx } from 'type-graphql';
import { findAllEntities, findEntityById } from '../../utils/typeorm';
import { ErrorHandler } from '../../middlewares/errorHandler';
import Profile from '../../models/Profile';
import { Service } from 'typedi';
import { GQLContext } from '../../types/gqlContext';

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
}

export default ProfileResolver;
