import { InputType, Field } from 'type-graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field()
  postId: string;

  @Field()
  @MinLength(1)
  content: string;
}