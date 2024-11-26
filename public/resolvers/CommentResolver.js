"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentResolver = void 0;
const type_graphql_1 = require("type-graphql");
const prisma_1 = require("../utils/prisma");
const CommentInput_1 = require("../inputs/CommentInput");
const CommentTypes_1 = require("../types/CommentTypes");
let CommentResolver = class CommentResolver {
    async comments(postId) {
        return prisma_1.prisma.comment.findMany({
            where: { postId, approved: true },
            include: {
                author: true,
                post: true
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createComment({ postId, content }, { user }) {
        if (!user)
            throw new Error('Not authenticated');
        return prisma_1.prisma.comment.create({
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
    async approveComment(id, { user }) {
        if (!user)
            throw new Error('Not authenticated');
        const comment = await prisma_1.prisma.comment.findUnique({
            where: { id },
            include: {
                post: true,
                author: true
            },
        });
        if (!comment || comment.post.authorId !== user.id) {
            throw new Error('Not authorized');
        }
        return prisma_1.prisma.comment.update({
            where: { id },
            data: { approved: true },
            include: {
                author: true,
                post: true
            }
        });
    }
};
exports.CommentResolver = CommentResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [CommentTypes_1.Comment]),
    __param(0, (0, type_graphql_1.Arg)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "comments", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => CommentTypes_1.Comment),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CommentInput_1.CreateCommentInput, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "createComment", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => CommentTypes_1.Comment),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "approveComment", null);
exports.CommentResolver = CommentResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CommentResolver);
