import { Field, ID, InputType } from "type-graphql";
import { Translation, Word } from "../../models";

@InputType()
export class TranslationInput implements Partial<Translation> {

  @Field(() => ID)
  en_word_id: number;
  
  @Field(() => ID)
  de_word_id: number;
}