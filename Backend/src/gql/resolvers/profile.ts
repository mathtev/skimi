import {
  Resolver,
  Query,
  UseMiddleware,
  Arg,
} from 'type-graphql';
import {
  findAllEntities,
} from '../../utils/typeorm';
import { ErrorHandler } from '../../middlewares/errorHandler';
import Profile from '../../models/Profile';
import { Service } from 'typedi';

@Service()
@Resolver()
class ProfileResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => [Profile])
  async profile(@Arg("id") id: number): Promise<Profile[]> {
    const result = await findAllEntities(Profile, {
      relations: ['user', 'level'],
    });
    return result;
  }
}

export default ProfileResolver;
