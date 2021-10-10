import {
  Resolver,
  Query,
  Arg,
  UseMiddleware,
  Mutation,
  Int,
} from 'type-graphql';
import {
  createEntity,
  findAllEntities,
  findEntityById,
} from '../../utils/typeorm';
import { ErrorHandler } from '../../middlewares/errorHandler';
import Word from '../../models/Word';
import { EntityNotFoundError } from '../../utils/customErrors';
import { WordInput } from '../types/word';

@Resolver()
class WordResolver {
  // @UseMiddleware([ErrorHandler])
  // @Query(() => Word)
  // async Word(
  //   @Arg('name')
  //   name: string
  // ): Promise<Word> {
  //   const word = await Word.createQueryBuilder('word')
  //     .select()
  //     .where('word.name = :name', { name })
  //     .getOne();
  //   if (!word) {
  //     throw new EntityNotFoundError(typeof Word.name);
  //   }
  //   return word;
  // }

  @UseMiddleware([ErrorHandler])
  @Query(() => Word)
  async word(@Arg('id', () => Int) id: number): Promise<Word> {
    const result = await findEntityById(Word, id);
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Query(() => [Word])
  async words(
    @Arg('language_id', () => Int) language_id: number
  ): Promise<Word[]> {
    const result = await findAllEntities(Word, {
      where: [{ language_id }],
      relations: ['translations']
    });
    console.log(result[0].translations[0].word)
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Mutation(() => Word)
  async createWord(@Arg('word') wordInput: WordInput): Promise<Word> {
    const result = await createEntity(Word, wordInput);
    return result;
  }
}

export default WordResolver;
