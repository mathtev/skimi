import { Field, ID, InputType, Int } from 'type-graphql';
import Sentence from '../../models/Set';

@InputType()
export class SentenceInput implements Partial<Sentence> {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => Int)
  translationId: number;

  @Field()
  textFrom: string;

  @Field()
  textTo: string;
}
