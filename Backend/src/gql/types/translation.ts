import { Field, ID, InputType } from "type-graphql";
import { Translation, Word } from "../../models";

@InputType()
export class TranslationInput implements Partial<Translation> {

  @Field()
  en_word_id: number;
  
  @Field()
  de_word_id: number;
}