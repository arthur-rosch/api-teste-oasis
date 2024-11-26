import { ObjectType, Field } from 'type-graphql';
import { User } from './UserTypes';
import { Post } from './PostTypes';

@ObjectType()
export class Comment {
  @Field()
  id: number;

  @Field()
  content: string;

  @Field()
  approved: boolean;

  @Field(() => Post)
  post: Post;

  @Field()
  postId: string;

  @Field(() => User,  { nullable: true })
  author: User;

  @Field()
  authorId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}