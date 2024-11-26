import 'reflect-metadata';
import dotenv from 'dotenv';
import express, { Application, Request } from 'express';
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

  const corstOpts = {
    origin: '*',
  }
  
  // @ts-ignore
  app.use(cors(corstOpts))

  const schema = await buildSchema({
    resolvers: [UserResolver, PostResolver, CommentResolver],
    authChecker,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }): Context => {
      // @ts-ignore
      const token = req.headers.authorization?.split(' ')[1];
      const user = token ? verifyToken(token) : null;
      return { user };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

bootstrap().catch(console.error);
