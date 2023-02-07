import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { RelationshipInput, UpdateByIdInput, UpdateOutput } from '@shared/dtos';
import { RoleEntity } from '@shared/entities';

@InputType()
export class UpdateUserByAdminInput extends UpdateByIdInput {
  @Field()
  id: string;

  @Field((_) => [RelationshipInput], { nullable: true })
  roles: RoleEntity[];
}

@ObjectType()
export class UpdateUserByAdminOutput extends UpdateOutput {}
