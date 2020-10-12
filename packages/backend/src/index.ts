// Must be at top
import 'reflect-metadata';
import express from 'express';
// Import entities
import { superCreateConnection } from './helper/create-connection';
import { ApolloServer, gql } from 'apollo-server-express';
import chalk from 'chalk';

const typeDefs = gql`
  # Basic login option
  type Login {
    userName: String
    passWord: String
  }

  type Query {
    users: [Login]
  }
`;

// for test purposes
const users = [
  {
    userName: 'user1',
    passWord: 'pass'
  }
];

const resolvers = {
  Query: {
    users: () => users
  }
};

(async () => {
  const app = express();

  // Create connection to postgresql
  const conn = await superCreateConnection();
  console.log(chalk.green('PG connected.'));

  // Create apollo graphql server
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  // Attach apollo graphql to express http server
  await apolloServer.applyMiddleware({ app });

  // Start Express server on port.
  app.listen(() => {
    console.log(chalk.green('Starting backend on port 4000.'));
  });

  // Listen to kill command
  process.on('SIGTERM', async () => {
    console.info(chalk.blue('SIGTERM signal received.'));
    console.log(chalk.red('Closing PG server.'));
    await conn.close();
    console.log(chalk.red('PG connection closed.'));
  });
})();
