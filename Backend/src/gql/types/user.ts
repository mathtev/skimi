import { Field, ID, InputType, Int } from 'type-graphql';
import User from '../../models/User';

@InputType()
export class UserInput implements Partial<User> {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  login: string;
}
