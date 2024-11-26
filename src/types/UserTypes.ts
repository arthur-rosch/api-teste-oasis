import { ObjectType, Field } from 'type-graphql';
import { Post } from './PostTypes';
import { Comment } from './CommentTypes';  

@ObjectType()
export class User {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @Field(() => [Comment], { nullable: true }) 
  comments?: Comment[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
