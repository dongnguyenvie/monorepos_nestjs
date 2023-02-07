import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { DeleteByIdInput, DeleteOutput } from '@shared/dtos';

@InputType()
export class DeleteBlogInput extends DeleteByIdInput {}

@ObjectType()
export class DeleteBlogOutput extends DeleteOutput {}
