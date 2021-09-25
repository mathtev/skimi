import { Resolver, Query, UseMiddleware } from 'type-graphql';
import { findAllEntities } from '../../utils/typeorm';
import Language from '../../models/Language';
import { ErrorHandler } from '../../middlewares/errorHandler';

@Resolver()
class LanguageResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => [Language])
  async getAllLanguages(): Promise<Language[]> {
    const Languages = await findAllEntities(Language);
    return Languages;
  }
}

export default LanguageResolver;
