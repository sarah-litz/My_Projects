// Must be at top
import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { typeOrmConfig } from './config';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

// Importing typeDefs and resolvers
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  const conn = await createConnection(typeOrmConfig);

  const app = express();
  app.use(
    cors({
      // TODO: production
      origin: 'http://localhost:3000',
      credentials: true
    })
  );

  server.applyMiddleware({ app, cors: false });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  );
};

startServer();
