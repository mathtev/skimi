import {
  Resolver,
  Query,
  Arg,
  UseMiddleware,
  Mutation,
} from 'type-graphql';
import {
  createEntity, findAllEntities,
} from '../../utils/typeorm';
import { ErrorHandler } from '../../middlewares/errorHandler';
import Word from '../../models/Word';
import { EntityNotFoundError } from '../../utils/customErrors';
import { WordInput } from '../types/word';

@Resolver()
class WordResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => Word)
  async getWord(
    @Arg('name')
    name: string
  ): Promise<Word> {
    const word = await Word.createQueryBuilder('word')
      .select()
      .where('word.name = :name', { name })
      .getOne();
    if (!word) {
      throw new EntityNotFoundError(typeof Word.name);
    }
    return word;
  }

  @UseMiddleware([ErrorHandler])
  @Query(() => [Word])
  async getAllWords(): Promise<Word[]> {
    const Words = await findAllEntities(Word);
    return Words;
  }

  @UseMiddleware([ErrorHandler])
  @Mutation(() => Word)
  async createWord(@Arg('word') wordInput: WordInput): Promise<Word> {
    const word = await createEntity(Word, wordInput);
    return word;
  }
}

export default WordResolver;
