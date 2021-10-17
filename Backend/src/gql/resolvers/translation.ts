import {
  Resolver,
  Query,
  UseMiddleware,
  Arg,
  Int,
  Mutation,
} from 'type-graphql';
import {
  createEntity,
  deleteEntity,
  findAllEntities,
} from '../../utils/typeorm';
import { ErrorHandler } from '../../middlewares/errorHandler';
import Translation from '../../models/Translation';
import { TranslationInput } from '../types/translation';
import { Connection } from 'typeorm';
import { Service } from 'typedi';

@Service()
@Resolver()
class TranslationResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => [Translation])
  async translations(
    @Arg('wordId', () => Int) wordId: number
  ): Promise<Translation[]> {
    const result = await findAllEntities(Translation, {
      where: [{ en_word_id: wordId }],
    });
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Mutation(() => Translation)
  async createTranslation(
    @Arg('translation') translationInput: TranslationInput
  ): Promise<Translation> {
    const enWordId = translationInput.en_word_id;
    const deWordId = translationInput.de_word_id;

    const queryData = await Translation.createQueryBuilder('translation')
      .select()
      .where(
        'translation.en_word_id = :enWordId and translation.de_word_id = :deWordId',
        { enWordId, deWordId }
      )
      .getOne();
    if (queryData) {
      return queryData;
    }
    const result = await createEntity(Translation, translationInput);
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Mutation(() => Translation)
  async deleteTranslation(
    @Arg('id', () => Int) id: number
  ): Promise<Translation> {
    const result = await deleteEntity(Translation, id);
    return result;
  }
}

export default TranslationResolver;
