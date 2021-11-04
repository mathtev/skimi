import { Field, ID, InputType, Int } from "type-graphql";
import Translation from "../../models/Translation";


@InputType()
export class TranslationInput implements Partial<Translation> {
  @Field(() => Int, {nullable: true})
  id: number;

  @Field(() => Int)
  enWordId: number;
  
  @Field(() => Int)
  deWordId: number;

  @Field(() => Int)
  levelId: number;
}