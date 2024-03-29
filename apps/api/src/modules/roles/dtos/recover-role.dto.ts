import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { RecoverByIdInput } from '@shared/dtos';

@InputType()
export class RecoverRoleIntput extends RecoverByIdInput {}

@ObjectType()
export class RecoverRoleOutput {
  @Field()
  id: string;
}
