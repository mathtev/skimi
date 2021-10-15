import { Field, ID, InputType } from "type-graphql";
import { Word } from "../../models";

@InputType()
export class   WordInput implements Partial<Word> {
  @Field()
  name: string;

  @Field()
  language_id: number;
  
  @Field()
  level_id: number;
}