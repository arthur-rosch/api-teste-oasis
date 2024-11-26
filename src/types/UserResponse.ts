import { ObjectType, Field } from 'type-graphql';
import { User } from './UserTypes';

@ObjectType()
export class UserResponse {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}