import {
  Resolver,
  Query,
  Arg,
  Int,
  UseMiddleware,
  Mutation,
} from 'type-graphql';
import {
  createEntity,
  findAllEntities,
  findEntityById,
  updateEntity,
} from '../../utils/typeorm';
import { InjectRepository } from "typeorm-typedi-extensions";
import { ErrorHandler } from '../../middlewares/errorHandler';
import Word from '../../models/Word';
import { EntityNotFoundError } from '../../utils/customErrors';
import { WordInput } from '../types/word';
import { Repository } from 'typeorm';
import Language from '../../models/Language';
import Level from '../../models/Level';

@Resolver()
class WordResolver {
  constructor(
    @InjectRepository(Language) private readonly languageRepository: Repository<Language>,
    @InjectRepository(Level) private readonly levelRepository: Repository<Level>,
  ) {}

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
  @Mutation(() => Word)
  async createWord(@Arg('word') wordInput: WordInput): Promise<Word | null> {
    const language = await this.languageRepository.findOne({
      cache: 1000,
      where: { language: { code: wordInput.language_code } },
    })
    console.log(language)
    return await createEntity(Word, wordInput);
  }
}

export default WordResolver;
