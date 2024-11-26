import { ObjectType, Field } from 'type-graphql';
import { Category } from './type-graphql';
import { User } from './UserTypes';
import { Comment } from './CommentTypes';


@ObjectType()
export class PostsByCategory {
  @Field(() => Category)
  category: Category;

  @Field(() => [Post])
  posts: Post[];
}

@ObjectType()
export class Post {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => Category)
  category: Category;

  @Field()
  published: boolean;

  @Field()
  authorId: number;

  @Field(() => User) 
  author: User; 

  @Field(() => [Comment], { nullable: true }) 
  comments?: Comment[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}