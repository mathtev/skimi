import {
  Resolver,
  Query,
  Arg,
  UseMiddleware,
  Mutation,
  Int,
  FieldResolver,
  Root,
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
import { Translation } from '../../models';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Service } from 'typedi';

@Service()
@Resolver(of => Word)
class WordResolver {
  constructor(
    @InjectRepository(Translation) private readonly translationRepository: Repository<Translation>,
  ) {}

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
    });
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Mutation(() => Word)
  async addWord(@Arg('word') wordInput: WordInput): Promise<Word> {
    const result = await createEntity(Word, wordInput);
    return result;
  }

  @FieldResolver()
  async translations(@Root() word: Word) {
    const result = await findAllEntities(Translation, {
      where: [{ en_word_id: word.id }],
      relations: ['word']
    });
    return result;
  }

}

export default WordResolver;
