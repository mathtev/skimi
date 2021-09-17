import { Field, ID, InputType } from "type-graphql";
import { Word } from "../../models";

@InputType()
export class WordInput implements Partial<Word> {
  @Field()
  name: string;

  @Field(() => ID)
  language_id: number;
  
  @Field(() => ID)
  level_id: number;
}