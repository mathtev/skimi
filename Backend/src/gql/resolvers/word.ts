import {
  Resolver,
  Query,
  Arg,
  UseMiddleware,
  Mutation,
  Int,
  FieldResolver,
  Root,
  Ctx,
} from 'type-graphql';
import {
  createEntity,
  deleteEntity,
  findAllEntities,
  findEntityById,
} from '../../utils/typeorm';
import { ErrorHandler } from '../../middlewares/errorHandler';
import Word from '../../models/Word';
import { WordInput } from '../types/word';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Service } from 'typedi';
import Translation from '../../models/Translation';
import { GQLContext } from '../../types/gqlContext';

@Service()
@Resolver((of) => Word)
class WordResolver {
  constructor(
    @InjectRepository(Translation)
    private readonly translationRepository: Repository<Translation>
  ) {}

  @UseMiddleware([ErrorHandler])
  @Query(() => Word)
  async word(@Arg('id', () => Int) id: number): Promise<Word> {
    const result = await findEntityById(Word, id);
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Query(() => [Word])
  async words(
    @Arg('languageId', () => Int, { nullable: true }) languageId: number,
    @Ctx() ctx: GQLContext
  ): Promise<Word[]> {
    if (!languageId) languageId = 1;
    const result = await findAllEntities(Word, {
      where: [{ languageId }],
    });
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Mutation(() => Word)
  async addWord(@Arg('word') wordInput: WordInput): Promise<Word> {
    const result = await createEntity(Word, wordInput);
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Mutation(() => Word)
  async deleteWord(@Arg('wordId', () => Int) wordId: number): Promise<Word> {
    const result = deleteEntity(Word, wordId);
    return result;
  }

  @FieldResolver()
  async translations(@Root() word: Word) {
    const result = await findAllEntities(Translation, {
      where: [{ enWordId: word.id }],
      relations: ['wordTo'],
    });
    return result;
  }

  @UseMiddleware([ErrorHandler])
  @Query(() => [Word])
  async searchWords(
    @Arg('searchTerm', () => String, { nullable: true })
    searchTerm: string | null,
    @Arg('languageId', () => Int)
    languageId: number
  ): Promise<Word[]> {
    let whereSQL = 'word.languageId = :languageId';
    if (searchTerm) {
      whereSQL += ' AND (word.name ILIKE :searchTerm)';
    }
    const result = await Word.createQueryBuilder('word')
      .select()
      .where(whereSQL, { languageId, searchTerm: `%${searchTerm}%` })
      .getMany();
    return result;
  }
}

export default WordResolver;
