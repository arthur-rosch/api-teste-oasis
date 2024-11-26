import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { prisma } from '../utils/prisma';
import { generateToken } from '../utils/auth';
import { Context } from '../types/Context';
import { RegisterInput, LoginInput } from '../inputs/UserInput';
import { UserResponse } from '../types/UserResponse';
import { User } from '../types/UserTypes';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  @Authorized()
  async me(@Ctx() { user }: Context) {
    if (!user) return null;
    return prisma.user.findUnique({ 
      where: { id: user.id },
      include: {
        posts: true,
        comments: true
      }
    });
  }

  @Mutation(() => UserResponse)
  async register(@Arg('data') { email, password, name }: RegisterInput): Promise<UserResponse> {
    const hashedPassword = await hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return {
      user,
      token: generateToken(user),
    };
  }

  @Mutation(() => UserResponse)
  async login(@Arg('data') { email, password }: LoginInput): Promise<UserResponse> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const valid = await compare(password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    return {
      user,
      token: generateToken(user),
    };
  }
}