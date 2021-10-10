import { Resolver, Query, UseMiddleware, Arg, Int, Mutation } from 'type-graphql';
import { createEntity, findAllEntities } from '../../utils/typeorm';
import { ErrorHandler } from '../../middlewares/errorHandler';
import Translation from '../../models/Translation';
import { TranslationInput } from '../types/translation';

@Resolver()
class TranslationResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => [Translation])
  async translations(@Arg('wordId', () => Int) wordId: number): Promise<Translation[]> {
    const result = await findAllEntities(Translation, { 
      where: [ 
        { de_word_id: wordId }
      ]
    });
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Mutation(() => Translation)
  async createTranslation(@Arg('translation') translationInput: TranslationInput): Promise<Translation> {
    const result = await createEntity(Translation, translationInput);
    return result;
  }
}

export default TranslationResolver;
