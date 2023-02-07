import { HttpStatusCode, RECORD_LOCKED } from '@noinghe/shared/dist/constants';
import { ApolloError } from 'apollo-server-express';

export class SvLockError extends ApolloError {
  constructor(message = RECORD_LOCKED, extensions?: Record<string, any>) {
    super(message, String(HttpStatusCode.Locked), extensions);
  }
}
