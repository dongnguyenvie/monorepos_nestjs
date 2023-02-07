import { InputType, ObjectType } from '@nestjs/graphql';
import { GetByIdInput } from '@shared/dtos';
import { RoomEntity } from '@shared/entities';

@InputType()
export class GetBlogInput extends GetByIdInput {}

@ObjectType()
export class GetBlogOutput extends RoomEntity {}
