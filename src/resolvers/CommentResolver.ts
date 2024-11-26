import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { prisma } from '../utils/prisma';
import { Context } from '../types/Context';
import { CreateCommentInput } from '../inputs/CommentInput';
import { Comment } from '../types/CommentTypes';

@Resolver()
export class CommentResolver {
  @Query(() => [Comment])
  async comments(@Arg('postId') postId: string) {
    return prisma.comment.findMany({
      where: { postId, approved: true },
      include: { 
        author: true,
        post: true
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Mutation(() => Comment)
  @Authorized()
  async createComment(
    @Arg('data') { postId, content }: CreateCommentInput,
    @Ctx() { user }: Context
  ) {
    if (!user) throw new Error('Not authenticated');
    return prisma.comment.create({
      data: {
        content,
        approved: true,
        post: { connect: { id: postId } },
        author: { connect: { id: user.id } },
      },
      include: {
        author: true,
        post: true
      }
    });
  }

  @Mutation(() => Comment)
  @Authorized()
  async approveComment(
    @Arg('id') id: number,
    @Ctx() { user }: Context
  ) {
    if (!user) throw new Error('Not authenticated');
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: { 
        post: true,
        author: true
      },
    });

    if (!comment || comment.post.authorId !== user.id) {
      throw new Error('Not authorized');
    }

    return prisma.comment.update({
      where: { id },
      data: { approved: true },
      include: {
        author: true,
        post: true
      }
    });
  }
}