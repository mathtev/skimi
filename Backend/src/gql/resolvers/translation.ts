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
import { Service } from 'typedi';
import Word from '../../models/Word';

// ogarnięcoe translacji - 3 dni        done 2 dni
// dodawanie zdań - 2 dni               done 2 dni
// dodanie nowego typu nauki - 14 dni
// rejestracja - 1 dnień
// stylowanie - 4 dni
// napisanie pracy - 20 dni

// razem: 44 dni
// zostało: 12 + 25 + 10 = 47

@Service()
@Resolver()
class TranslationResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => [Translation])
  async translations(): Promise<Translation[]> {
    const result = await findAllEntities(Translation, {
      relations: ['wordFrom', 'wordTo', 'level', 'sentences'],
    });
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Mutation(() => Translation)
  async createTranslation(
    @Arg('levelId', () => Int) levelId: number,
    @Arg('nameFrom') nameFrom: string,
    @Arg('nameTo') nameTo: string,
    @Arg('languageFromId', () => Int) languageFromId: number,
    @Arg('languageToId', () => Int) languageToId: number
  ): Promise<Translation> {
    let wordFrom = await Word.findOne({ where: { name: nameFrom } });
    let wordTo = await Word.findOne({ where: { name: nameTo } });

    if (!wordFrom) {
      const wordInput = { name: nameFrom, languageId: languageFromId };
      wordFrom = await createEntity(Word, wordInput);
    }
    if (!wordTo) {
      const wordInput = { name: nameTo, languageId: languageToId };
      wordTo = await createEntity(Word, wordInput);
    }
    const result = await createEntity(Translation, {
      levelId,
      enWordId: wordFrom.id,
      deWordId: wordTo.id,
    });
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
