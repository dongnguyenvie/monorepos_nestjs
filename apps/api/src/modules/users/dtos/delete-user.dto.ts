import { InputType, ObjectType } from '@nestjs/graphql';
import { DeleteByIdInput, DeleteOutput } from '@shared/dtos';

@InputType()
export class DeleteUserInput extends DeleteByIdInput {}

@ObjectType()
export class DeleteUserOuput extends DeleteOutput {}
