import { Field, ID, InputType, Int } from "type-graphql";
import { Translation, Word } from "../../models";

@InputType()
export class TranslationInput implements Partial<Translation> {

  @Field(() => Int)
  en_word_id: number;
  
  @Field(() => Int)
  de_word_id: number;
}