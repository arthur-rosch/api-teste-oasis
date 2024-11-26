import { Resolver, Query, Mutation, Arg, Ctx, Authorized, Int } from 'type-graphql';
import { prisma } from '../utils/prisma';
import { Context } from '../types/Context';
import { CreatePostInput, UpdatePostInput, SearchPostInput } from '../inputs/PostInput';
import { PaginationInput } from '../inputs/PaginationInput';
import { Post, PostsByCategory } from '../types/PostTypes';
import { Category } from '../types/type-graphql';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(@Arg('data', { nullable: true }) pagination?: PaginationInput) {
    return prisma.post.findMany({
      skip: pagination?.skip || 0,
      take: pagination?.take || 50,
      include: { author: true },
      orderBy: { createdAt: 'desc' },
      where: { published: true },
    });
  }

  @Query(() => [Post])
  async postsByCategory(@Arg('category', () => Category) category: Category) {
    return prisma.post.findMany({
      where: { 
        category,
        published: true 
      },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Query(() => [PostsByCategory])
  async postsGroupedByCategory() {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    });

    const groupedPosts = Object.values(Category).map(category => ({
      category,
      posts: posts.filter(post => post.category === category),
    }));

    return groupedPosts;
  }

  @Query(() => [Post])
  async searchPosts(@Arg('data') { title, category }: SearchPostInput) {
    return prisma.post.findMany({
      where: {
        AND: [
          { published: true },
          title ? { title: { contains: title, mode: 'insensitive' } } : {},
          category ? { category } : {},
        ],
      },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg('id') id: string) {
    return prisma.post.findUnique({
      where: { id },
      include: { author: true, comments: true },
    });
  }

  @Mutation(() => Post)
  @Authorized()
  async createPost(
    @Arg('data') { title, content, category }: CreatePostInput,
    @Ctx() { user }: Context
  ) {
    if (!user) throw new Error('Not authenticated');
    return prisma.post.create({
      data: {
        title,
        content,
        category,
        author: { connect: { id: user.id } },
      },
    });
  }

  @Mutation(() => Post)
  @Authorized()
  async updatePost(
    @Arg('id') id: string,
    @Arg('data') data: UpdatePostInput,
    @Ctx() { user }: Context
  ) {
    if (!user) throw new Error('Not authenticated');
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post || post.authorId !== user.id) throw new Error('Not authorized');

    return prisma.post.update({
      where: { id },
      data,
    });
  }

  @Mutation(() => Boolean)
  @Authorized()
  async deletePost(
    @Arg('id') id: string,
    @Ctx() { user }: Context
  ) {
    if (!user) throw new Error('Not authenticated');
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post || post.authorId !== user.id) throw new Error('Not authorized');

    await prisma.post.delete({ where: { id } });
    return true;
  }
}