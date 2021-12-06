import {
  Resolver,
  Ctx,
  Arg,
  Query,
  Mutation,
  UseMiddleware,
} from 'type-graphql';
import { Service } from 'typedi';
import { ErrorHandler } from '../../middlewares/errorHandler';
import User from '../../models/User';
import { GQLContext } from '../../types/gqlContext';
import { UserEmailNotFoundError, UserNotFoundError } from '../../utils/customErrors';

@Service()
@Resolver()
export class AuthResolver {
  @UseMiddleware([ErrorHandler])
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: GQLContext
  ): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new UserEmailNotFoundError(email);
    }

    //const valid = await bcrypt.compare(password, user.password);
    const valid = password === user.password;
    if (!valid) {
      throw new Error('Invalid password');
    }

    ctx.req.session.userId = user.id;

    return user;
  }

  @UseMiddleware([ErrorHandler])
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: GQLContext): Promise<boolean> {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy(err => {
        if (err) {
          console.log('oh my',err)
          return rej(false);
        }
        ctx.res.clearCookie("rds");
        return res(true);
      })
    );
  }
}

export default AuthResolver;
