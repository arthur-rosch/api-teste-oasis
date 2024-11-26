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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../utils/prisma");
const auth_1 = require("../utils/auth");
const UserInput_1 = require("../inputs/UserInput");
const UserResponse_1 = require("../types/UserResponse");
const UserTypes_1 = require("../types/UserTypes");
let UserResolver = class UserResolver {
    async me({ user }) {
        if (!user)
            return null;
        return prisma_1.prisma.user.findUnique({
            where: { id: user.id },
            include: {
                posts: true,
                comments: true
            }
        });
    }
    async register({ email, password, name }) {
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 12);
        const user = await prisma_1.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        return {
            user,
            token: (0, auth_1.generateToken)(user),
        };
    }
    async login({ email, password }) {
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new Error('Invalid credentials');
        const valid = await (0, bcryptjs_1.compare)(password, user.password);
        if (!valid)
            throw new Error('Invalid credentials');
        return {
            user,
            token: (0, auth_1.generateToken)(user),
        };
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, type_graphql_1.Query)(() => UserTypes_1.User, { nullable: true }),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput_1.LoginInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
exports.UserResolver = UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
