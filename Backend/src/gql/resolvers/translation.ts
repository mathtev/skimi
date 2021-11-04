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
import { Service } from 'typedi';

@Service()
@Resolver()
class TranslationResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => [Translation])
  async translations(): Promise<Translation[]> {
    const result = await findAllEntities(Translation, {
      relations: ['wordFrom', 'wordTo', 'level'],
    });
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Mutation(() => Translation)
  async createTranslation(
    @Arg('translation') translationInput: TranslationInput
  ): Promise<Translation> {
    const enWordId = translationInput.enWordId;
    const deWordId = translationInput.deWordId;

    const queryData = await Translation.createQueryBuilder('translation')
      .select('translation.id')
      .where(
        'translation.enWordId = :enWordId and translation.deWordId = :deWordId',
        { enWordId, deWordId }
      )
      .getOne();
    if (queryData) {
      translationInput.id = queryData.id;
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
