import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import { PostResolver } from './resolvers/PostResolver';
import { CommentResolver } from './resolvers/CommentResolver';
import { authChecker } from './utils/authChecker';
import { Context } from './types/Context';
import { verifyToken } from './utils/auth';
import './types/type-graphql'

dotenv.config();

async function bootstrap() {
  const app = express();

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
  });

  //teste

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

bootstrap().catch(console.error);