import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CreateOutput } from '@shared/dtos';

@InputType()
export class CreateBlogInput {
  @Field({ nullable: false })
  title!: string;
}

@ObjectType()
export class CreateBlogOutput extends CreateOutput {}
