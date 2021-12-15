import { Field, ID, InputType, Int } from 'type-graphql';
import Profile from '../../models/Profile';

@InputType()
export class ProfileInput implements Partial<Profile> {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  userId: number;
}
