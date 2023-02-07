import { HttpStatusCode, FORBIDDEN_ERROR } from '@noinghe/shared/dist/constants';
import { ApolloError } from 'apollo-server-express';

export class SvForbiddenError extends ApolloError {
  constructor(message = FORBIDDEN_ERROR, extensions?: Record<string, any>) {
    super(message, String(HttpStatusCode.MethodNotAllowed), extensions);
  }
}
