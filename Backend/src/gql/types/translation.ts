import { Field, ID, InputType, Int } from 'type-graphql';
import Sentence from '../../models/Sentence';
import Translation from '../../models/Translation';
import Word from '../../models/Word';
import { SentenceInput } from './sentence';
import { WordInput } from './word';

@InputType()
export class TranslationInput implements Partial<Translation> {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => Int, { nullable: true })
  enWordId: number;

  @Field(() => Int, { nullable: true })
  deWordId: number;

  @Field(() => Int)
  levelId: number;

  @Field(() => [SentenceInput], { nullable: true })
  sentences: Sentence[];
}
