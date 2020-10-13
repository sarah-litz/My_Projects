// Must be at top
import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { typeOrmConfig } from './config';
import { ApolloServer } from 'apollo-server-express';

// Importing typeDefs and resolvers
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  const conn = await createConnection(typeOrmConfig);

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  );
};

startServer();
