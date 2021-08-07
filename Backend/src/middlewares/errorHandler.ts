import { MiddlewareFn } from 'type-graphql';
import { GQLContext } from 'types/gqlContext';
import { CustomError } from '../utils/customErrors';

export const ErrorHandler: MiddlewareFn<GQLContext> = async (_, next) => {
  try {
    return await next();
  } catch (error) {
    console.error(error);
    const handledError = error instanceof CustomError;

    if (handledError) {
      const { message, code, status } = error;
      throw new CustomError(message, code, status);
    }

    throw new CustomError(
      'Unhandled error exception',
      'INTERNAL_ERROR',
      500
    );
  }
};
