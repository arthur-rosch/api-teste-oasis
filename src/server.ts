import 'reflect-metadata';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import { PostResolver } from './resolvers/PostResolver';
import { CommentResolver } from './resolvers/CommentResolver';
import { authChecker } from './utils/authChecker';
import { verifyToken } from './utils/auth';
import cors from 'cors';

dotenv.config();

async function bootstrap() {
  const app: Application = express();

  // Configuração de CORS com ambiente dinâmico
  const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Permite envio de cookies, se necessário
  };

  // Aplica o middleware de CORS
  app.use(cors(corsOptions));

  // Criação do schema GraphQL
  const schema = await buildSchema({
    resolvers: [UserResolver, PostResolver, CommentResolver],
    authChecker,
  });

  // Configuração do Apollo Server
  const server = new ApolloServer({ schema });
  await server.start();

  // Middleware Apollo com contexto e JSON parser
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.split(' ')[1];
        const user = token ? verifyToken(token) : null;
        return { user };
      },
    }),
  );

  // Inicializa o servidor
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
  });
}

bootstrap().catch(console.error);
