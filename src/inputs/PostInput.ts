import { InputType, Field } from 'type-graphql';
import { MinLength } from 'class-validator';
import { Category } from '../types/type-graphql';


@InputType()
export class CreatePostInput {
  @Field()
  @MinLength(3)
  title: string;

  @Field()
  @MinLength(10)
  content: string;

  @Field(() => Category)
  category: Category;
}

@InputType()
export class UpdatePostInput {
  @Field({ nullable: true })
  @MinLength(3)
  title?: string;

  @Field({ nullable: true })
  @MinLength(10)
  content?: string;

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field({ nullable: true })
  published?: boolean;
}

@InputType()
export class SearchPostInput {
  @Field({ nullable: true })
  title?: string;

  @Field(() => Category, { nullable: true })
  category?: Category;
}