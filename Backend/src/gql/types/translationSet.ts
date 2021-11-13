import { Field, ID, InputType, Int } from 'type-graphql';
import Set from '../../models/Set';
import TranslationSet from '../../models/TranslationSet';

@InputType()
export class TranslationSetInput implements Partial<TranslationSet> {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => Int)
  skill: number;

  @Field(() => Int, { nullable: true })
  translationId: number;

  @Field(() => Int, { nullable: true })
  setId: number;
}
