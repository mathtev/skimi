import { Field, ID, InputType } from "type-graphql";
import { Word } from "../../models";

@InputType()
export class WordInput implements Partial<Word> {
  @Field()
  name: string;

  @Field()
  language_code: string;

  @Field()
  level_code: string;
}