// Must be at top
import 'reflect-metadata';
import express from 'express';
// Import entities
import { superCreateConnection } from './helper/create-connection';
import { ApolloServer } from 'apollo-server-express';
import chalk from 'chalk';
import { config } from './config';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const startServer = async () => {
  const app = express();

  // Create connection to postgresql
  const conn = await superCreateConnection();
  console.log(chalk.green('PG connected.'));

  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  // Attach apollo graphql to express http server
  await apolloServer.applyMiddleware({ app });

  // Start Express server on port.
  app.listen(config.get('port'), () => {
    console.log(chalk.green(`🚀 Server ready at ${config.get('port')}.`));
  });

  // Listen to kill command
  process.on('SIGTERM', async () => {
    console.info(chalk.blue('SIGTERM signal received.'));
    console.log(chalk.red('Closing PG server.'));
    await conn.close();
    console.log(chalk.red('PG connection closed.'));
  });
};

startServer();
