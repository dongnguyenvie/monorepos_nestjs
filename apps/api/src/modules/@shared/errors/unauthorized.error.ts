import { HttpStatusCode, UNAUTHORIZED } from '@noinghe/shared/dist/constants';
import { ApolloError } from 'apollo-server-express';

export class SvUnauthorizedError extends ApolloError {
  constructor(message = UNAUTHORIZED, extensions?: Record<string, any>) {
    super(message, String(HttpStatusCode.Unauthorized), extensions);
  }
}
