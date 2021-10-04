import { Field, ID, InputType } from "type-graphql";
import { Translation, Word } from "../../models";

@InputType()
export class TranslationInput implements Partial<Translation> {

  @Field(() => ID)
  word1_id: number;
  
  @Field(() => ID)
  word2_id: number;
}