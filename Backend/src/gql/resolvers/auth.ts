import { Resolver, Ctx, Arg, Query } from 'type-graphql';
import { Service } from 'typedi';
import User from '../../models/User';
import { GQLContext } from '../../types/gqlContext';

@Service()
@Resolver()
export class AuthResolver {
  @Query(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: GQLContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    //const valid = await bcrypt.compare(password, user.password);
    const valid = password === user.password;
    if (!valid) {
      return null;
    }
    ctx.req.session.userId = user.id.toString();
    ctx.req.session.save()
    console.log(ctx.req.session);
    return user;
  }
}

export default AuthResolver;
