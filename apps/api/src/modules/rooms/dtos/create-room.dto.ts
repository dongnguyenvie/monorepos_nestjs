import { UserEntity } from '@modules/users/entity/user.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CreateOutput } from '@shared/dtos';

@InputType()
export class CreateRoomInput {
  @Field({})
  topic!: string;

  @Field({})
  capacity!: number;

  @Field({ nullable: true })
  description?: string;

  @Field({})
  language!: string;

  // creator: UserEntity;
}

@ObjectType()
export class CreateRoomOutput extends CreateOutput {}
