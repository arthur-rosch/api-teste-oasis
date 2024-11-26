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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.PostsByCategory = void 0;
const type_graphql_1 = require("type-graphql");
const type_graphql_2 = require("./type-graphql");
const UserTypes_1 = require("./UserTypes");
const CommentTypes_1 = require("./CommentTypes");
let PostsByCategory = class PostsByCategory {
};
exports.PostsByCategory = PostsByCategory;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_2.Category),
    __metadata("design:type", String)
], PostsByCategory.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Post]),
    __metadata("design:type", Array)
], PostsByCategory.prototype, "posts", void 0);
exports.PostsByCategory = PostsByCategory = __decorate([
    (0, type_graphql_1.ObjectType)()
], PostsByCategory);
let Post = class Post {
};
exports.Post = Post;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Post.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_2.Category),
    __metadata("design:type", String)
], Post.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Post.prototype, "published", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Post.prototype, "authorId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => UserTypes_1.User),
    __metadata("design:type", UserTypes_1.User)
], Post.prototype, "author", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [CommentTypes_1.Comment], { nullable: true }),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Post.prototype, "updatedAt", void 0);
exports.Post = Post = __decorate([
    (0, type_graphql_1.ObjectType)()
], Post);
