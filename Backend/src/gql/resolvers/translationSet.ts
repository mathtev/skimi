import {
  Resolver,
  Query,
  Arg,
  Int,
  UseMiddleware,
  Mutation,
} from 'type-graphql';
import {
  findAllEntities,
  updateEntity,
} from '../../utils/typeorm';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { Service } from 'typedi';
import TranslationSet from '../../models/TranslationSet';
import { TranslationSetInput } from '../types/translationSet';

@Service()
@Resolver()
class TranslationSetResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => [TranslationSet])
  async translationSetList(): Promise<TranslationSet[]> {
    const result = await findAllEntities(TranslationSet, {
      relations: ['translation', 'set'],
    });
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Mutation(() => TranslationSet)
  async updateTranslationSet(
    @Arg('id', () => Int) id: number, 
    @Arg('input') input: TranslationSetInput, 
    ): Promise<TranslationSet> {
    const result = updateEntity(TranslationSet, id, input);
    return result;
  }
}

export default TranslationSetResolver;
