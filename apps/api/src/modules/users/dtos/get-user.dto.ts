import { UserEntity } from '@modules/users/entity/user.entity';
import { InputType, ObjectType } from '@nestjs/graphql';
import { GetByIdInput } from '@shared/dtos';

@InputType()
export class GetUserInput extends GetByIdInput {}

@ObjectType()
export class GetUserOutput extends UserEntity {}
