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
exports.PaginationInput = void 0;
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
let PaginationInput = class PaginationInput {
    constructor() {
        this.skip = 0;
        this.take = 10;
    }
};
exports.PaginationInput = PaginationInput;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PaginationInput.prototype, "skip", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Number)
], PaginationInput.prototype, "take", void 0);
exports.PaginationInput = PaginationInput = __decorate([
    (0, type_graphql_1.InputType)()
], PaginationInput);
