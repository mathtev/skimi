import { Resolver, Query, UseMiddleware } from 'type-graphql';
import { findAllEntities } from '../../utils/typeorm';
import Language from '../../models/Language';
import { ErrorHandler } from '../../middlewares/errorHandler';

@Resolver()
class LanguageResolver {
  @UseMiddleware([ErrorHandler])
  @Query(() => [Language])
  async languages(): Promise<Language[]> {
    const result = await findAllEntities(Language);
    return result;
  }
}

export default LanguageResolver;
