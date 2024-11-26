import 'reflect-metadata';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import { PostResolver } from './resolvers/PostResolver';
import { CommentResolver } from './resolvers/CommentResolver';
import { authChecker } from './utils/authChecker';
import { Context } from './types/Context';
import { verifyToken } from './utils/auth';
import cors from 'cors'; 
import './types/type-graphql';

dotenv.config();

async function bootstrap() {
  const app: Application = express();

  // Configuração do CORS
  const corsOpts = {
    origin: '*',  // Permite todas as origens, pode ser alterado para um domínio específico
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],  // Cabeçalhos permitidos
    credentials: true,  // Permite enviar cookies e credenciais, se necessário
  };

  // Aplica o CORS ao Express
  app.use(cors(corsOpts));

  const schema = await buildSchema({
    resolvers: [UserResolver, PostResolver, CommentResolver],
    authChecker,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }): Context => {
      const token = req.headers.authorization?.split(' ')[1];
      const user = token ? verifyToken(token) : null;
      return { user };
    },
    introspection: true,  // Permite introspecção em ambientes de desenvolvimento
  });

  await server.start();
  
  // Aplica o middleware do Apollo Server ao Express
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

bootstrap().catch(console.error);
