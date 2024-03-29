import { HttpStatusCode, UNKNOWN } from '@noinghe/shared/dist/constants';
import { ApolloError } from 'apollo-server-express';

export class SvUnknownError extends ApolloError {
  constructor(message = UNKNOWN, extensions?: Record<string, any>) {
    super(message, String(HttpStatusCode.BadRequest), extensions);
  }
}
