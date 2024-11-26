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
exports.PostResolver = void 0;
const type_graphql_1 = require("type-graphql");
const prisma_1 = require("../utils/prisma");
const PostInput_1 = require("../inputs/PostInput");
const PaginationInput_1 = require("../inputs/PaginationInput");
const PostTypes_1 = require("../types/PostTypes");
const type_graphql_2 = require("../types/type-graphql");
let PostResolver = class PostResolver {
    async posts(pagination) {
        return prisma_1.prisma.post.findMany({
            skip: (pagination === null || pagination === void 0 ? void 0 : pagination.skip) || 0,
            take: (pagination === null || pagination === void 0 ? void 0 : pagination.take) || 50,
            include: { author: true },
            orderBy: { createdAt: 'desc' },
            where: { published: true },
        });
    }
    async postsByCategory(category) {
        return prisma_1.prisma.post.findMany({
            where: {
                category,
                published: true
            },
            include: { author: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async postsGroupedByCategory() {
        const posts = await prisma_1.prisma.post.findMany({
            where: { published: true },
            include: { author: true },
            orderBy: { createdAt: 'desc' },
        });
        const groupedPosts = Object.values(type_graphql_2.Category).map(category => ({
            category,
            posts: posts.filter(post => post.category === category),
        }));
        return groupedPosts;
    }
    async searchPosts({ title, category }) {
        return prisma_1.prisma.post.findMany({
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
    async post(id) {
        return prisma_1.prisma.post.findUnique({
            where: { id },
            include: { author: true, comments: true },
        });
    }
    async createPost({ title, content, category }, { user }) {
        if (!user)
            throw new Error('Not authenticated');
        return prisma_1.prisma.post.create({
            data: {
                title,
                content,
                category,
                author: { connect: { id: user.id } },
            },
        });
    }
    async updatePost(id, data, { user }) {
        if (!user)
            throw new Error('Not authenticated');
        const post = await prisma_1.prisma.post.findUnique({ where: { id } });
        if (!post || post.authorId !== user.id)
            throw new Error('Not authorized');
        return prisma_1.prisma.post.update({
            where: { id },
            data,
        });
    }
    async deletePost(id, { user }) {
        if (!user)
            throw new Error('Not authenticated');
        const post = await prisma_1.prisma.post.findUnique({ where: { id } });
        if (!post || post.authorId !== user.id)
            throw new Error('Not authorized');
        await prisma_1.prisma.post.delete({ where: { id } });
        return true;
    }
};
exports.PostResolver = PostResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [PostTypes_1.Post]),
    __param(0, (0, type_graphql_1.Arg)('data', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PaginationInput_1.PaginationInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
__decorate([
    (0, type_graphql_1.Query)(() => [PostTypes_1.Post]),
    __param(0, (0, type_graphql_1.Arg)('category', () => type_graphql_2.Category)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "postsByCategory", null);
__decorate([
    (0, type_graphql_1.Query)(() => [PostTypes_1.PostsByCategory]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "postsGroupedByCategory", null);
__decorate([
    (0, type_graphql_1.Query)(() => [PostTypes_1.Post]),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PostInput_1.SearchPostInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "searchPosts", null);
__decorate([
    (0, type_graphql_1.Query)(() => PostTypes_1.Post, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "post", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => PostTypes_1.Post),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PostInput_1.CreatePostInput, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => PostTypes_1.Post),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Arg)('data')),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, PostInput_1.UpdatePostInput, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
exports.PostResolver = PostResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PostResolver);
