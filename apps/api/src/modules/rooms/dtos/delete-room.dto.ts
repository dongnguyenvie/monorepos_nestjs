import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { DeleteByIdInput } from '@shared/dtos';

@InputType()
export class DeleteRoomIntput extends DeleteByIdInput {}

@ObjectType()
export class DeleteRoomOutput {
  @Field()
  id: string;
}
