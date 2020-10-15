// Must be at top
import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { typeOrmConfig } from './config';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';

// Importing typeDefs and resolvers
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { ACCESS_TOKEN_SECRET } from './constants';

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }: any) => ({ req, res })
  });

  await createConnection(typeOrmConfig);

  const app = express();

  app.use(cookieParser()); //utilizing cookie parser to make distinguishing access and refresh tokens easy
  app.use((req, _, next) => {
    const accessToken = req.cookies['access-token'];
    try {
      const data = verify(accessToken, ACCESS_TOKEN_SECRET) as any;
      (req as any).userId = data.userId;
    } catch{}
    next();
  });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  );
};

startServer();
