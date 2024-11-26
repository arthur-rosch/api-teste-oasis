"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./resolvers/UserResolver");
const PostResolver_1 = require("./resolvers/PostResolver");
const CommentResolver_1 = require("./resolvers/CommentResolver");
const authChecker_1 = require("./utils/authChecker");
const auth_1 = require("./utils/auth");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
async function bootstrap() {
    const app = (0, express_1.default)();
    // Criação do schema GraphQL
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [UserResolver_1.UserResolver, PostResolver_1.PostResolver, CommentResolver_1.CommentResolver],
        authChecker: authChecker_1.authChecker,
    });
    // Configuração do Apollo Server
    const server = new server_1.ApolloServer({ schema });
    await server.start();
    // Middleware Apollo com contexto e JSON parser
    app.use('/graphql', express_1.default.json(), (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => {
            var _a;
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            const user = token ? (0, auth_1.verifyToken)(token) : null;
            return { user };
        },
    }));
    app.use('/graphql', 
    // highlight-start
    (0, cors_1.default)({
        origin: "*",
    }), 
    // highlight-end
    express_1.default.json(), (0, express4_1.expressMiddleware)(server));
    // Inicializa o servidor
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
    });
}
bootstrap().catch(console.error);
