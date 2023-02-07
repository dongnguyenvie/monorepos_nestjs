import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { DeleteByIdInput } from '@shared/dtos';

@InputType()
export class DeleteRoleIntput extends DeleteByIdInput {}

@ObjectType()
export class DeleteRoleOutput {
  @Field()
  id: string;
}
