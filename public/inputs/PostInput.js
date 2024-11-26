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
exports.SearchPostInput = exports.UpdatePostInput = exports.CreatePostInput = void 0;
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const type_graphql_2 = require("../types/type-graphql");
let CreatePostInput = class CreatePostInput {
};
exports.CreatePostInput = CreatePostInput;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], CreatePostInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], CreatePostInput.prototype, "content", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_2.Category),
    __metadata("design:type", String)
], CreatePostInput.prototype, "category", void 0);
exports.CreatePostInput = CreatePostInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreatePostInput);
let UpdatePostInput = class UpdatePostInput {
};
exports.UpdatePostInput = UpdatePostInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], UpdatePostInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], UpdatePostInput.prototype, "content", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_2.Category, { nullable: true }),
    __metadata("design:type", String)
], UpdatePostInput.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdatePostInput.prototype, "published", void 0);
exports.UpdatePostInput = UpdatePostInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdatePostInput);
let SearchPostInput = class SearchPostInput {
};
exports.SearchPostInput = SearchPostInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SearchPostInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_2.Category, { nullable: true }),
    __metadata("design:type", String)
], SearchPostInput.prototype, "category", void 0);
exports.SearchPostInput = SearchPostInput = __decorate([
    (0, type_graphql_1.InputType)()
], SearchPostInput);
