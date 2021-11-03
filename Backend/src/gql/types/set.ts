import { Field, ID, InputType, Int } from 'type-graphql';
import Set from '../../models/Set';

@InputType()
export class SetInput implements Partial<Set> {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field(() => [Int])
  translationIds: number[];
}
