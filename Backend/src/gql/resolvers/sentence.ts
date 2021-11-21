import { Resolver, Query, UseMiddleware, Mutation, Arg } from 'type-graphql';
import { createEntity, findAllEntities } from '../../utils/typeorm';
import Language from '../../models/Language';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { Service } from 'typedi';
import Sentence from '../../models/Sentence';
import { SentenceInput } from '../types/sentence';

@Service()
@Resolver()
class SentenceResolver {
  @UseMiddleware([ErrorHandler])
  @Mutation(() => Sentence)
  async createSentence(
    @Arg('sentence') sentenceinput: SentenceInput
  ): Promise<Sentence> {
    const result = await createEntity(Sentence, sentenceinput);
    return result;
  }
}

export default SentenceResolver;
