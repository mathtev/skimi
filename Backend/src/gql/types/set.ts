import { Field, ID, InputType, Int } from 'type-graphql';
import Set from '../../models/Set';

@InputType()
export class SetInput implements Partial<Set> {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field()
  name: string;

  @Field()
  created_at: Date;

  @Field(() => [Int])
  translation_ids: number[];
}
