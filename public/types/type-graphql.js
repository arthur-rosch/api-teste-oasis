"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const type_graphql_1 = require("type-graphql");
var Category;
(function (Category) {
    Category["CSS"] = "CSS";
    Category["JavaScript"] = "JavaScript";
    Category["React"] = "React";
    Category["Vue"] = "Vue";
    Category["Tailwind"] = "Tailwind";
})(Category || (exports.Category = Category = {}));
(0, type_graphql_1.registerEnumType)(Category, {
    name: 'Category',
    description: 'Available blog post categories',
});
