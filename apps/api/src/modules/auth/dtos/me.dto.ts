import { ObjectType } from '@nestjs/graphql';
import { ReqUser } from '@shared/dtos';

@ObjectType()
export class MeOutput extends ReqUser {}
