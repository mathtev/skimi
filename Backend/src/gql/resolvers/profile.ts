import {
  Resolver,
  Query,
  UseMiddleware,
  Arg,
  Ctx,
  Float,
  Mutation,
} from 'type-graphql';
import {
  createEntity,
  findAllEntities,
  findEntityById,
} from '../../utils/typeorm';
import { ErrorHandler } from '../../middlewares/errorHandler';
import Profile from '../../models/Profile';
import { Service } from 'typedi';
import { GQLContext } from '../../types/gqlContext';
import TranslationSet from '../../models/TranslationSet';
import { UserNotFoundError } from '../../utils/customErrors';
import { ProfileInput } from '../types/profile';

@Service()
@Resolver()
class ProfileResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => Profile)
  async currentUser(@Ctx() ctx: GQLContext): Promise<Profile> {
    const userId = ctx.req.session.userId;
    const result = await Profile.findOne({
      relations: ['user', 'sets'],
      where: { userId },
    });

    if (!result) {
      throw new UserNotFoundError(userId);
    }

    return result;
  }

  @Mutation(() => Profile)
  async createProfile(
    @Arg('profileInput') profileInput: ProfileInput
  ): Promise<Profile> {
    const result = await createEntity(Profile, profileInput);

    if (!result) {
      throw new Error('could not create user profile');
    }

    return result;
  }
}

export default ProfileResolver;
