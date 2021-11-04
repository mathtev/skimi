import { Field, ID, InputType, Int } from 'type-graphql';
import Word from '../../models/Word';

@InputType()
export class WordInput implements Partial<Word> {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  languageId: number;
}
