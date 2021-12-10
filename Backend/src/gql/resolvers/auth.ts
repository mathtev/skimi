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
import Profile from '../../models/Profile';
import User from '../../models/User';
import { GQLContext } from '../../types/gqlContext';
import {
  UserEmailNotFoundError,
  UserNotFoundError,
} from '../../utils/customErrors';
import { createEntity } from '../../utils/typeorm';
import { UserInput } from '../types/user';
import bcrypt from "bcryptjs";


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

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid password');
    }

    ctx.req.session.userId = user.id;

    return user;
  }

  @UseMiddleware([ErrorHandler])
  @Mutation(() => User, { nullable: true })
  async register(@Arg('userInput') userInput: UserInput): Promise<User> {
    const user = await User.findOne({
      where: [{ email: userInput.email }, { login: userInput.login }],
    });
    if (user) {
      throw new Error('user already exists');
    }

    userInput.password = await bcrypt.hash(userInput.password, 12);

    const result = await createEntity(User, userInput);

    if (!result) {
      throw new Error('coult not create user');
    }

    await createEntity(Profile, { userId: result.id, name: '' });

    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: GQLContext): Promise<boolean> {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.log('oh my', err);
          return rej(false);
        }
        ctx.res.clearCookie('rds');
        return res(true);
      })
    );
  }
}

export default AuthResolver;
