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


  app.use(cors({
    origin: 'https://teste-oasis.vercel.app', // Permite uma origem específica
    methods: ['GET', 'POST', 'OPTIONS'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos na requisição
    credentials: true, // Permite envio de cookies ou credenciais
  }));


  // Criação do schema GraphQL
  const schema = await buildSchema({
    resolvers: [UserResolver, PostResolver, CommentResolver],
    authChecker,
  });

  
  const server = new ApolloServer({ schema });
  await server.start();

  
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

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
  });
}

bootstrap().catch(console.error);
