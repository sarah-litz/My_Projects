// Must be at top
import 'reflect-metadata';
import express from 'express';
// Import entities
import { superCreateConnection } from './helper/create-connection';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import { config } from './config';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import { getMe } from './helper/auth/get-me';
import { refreshAuth } from './helper/auth/refresh-auth';
import { SleepDataResolver } from './resolvers/SleepDataResolver';
import { authChecker } from './helper/auth/auth-checker';

const createApolloServer = async () => {
  return new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, SleepDataResolver],
      // Checks user is logged in (used for @Authorized annotation for queries and mutations)
      authChecker,
      // Tell type-graphql to valid incoming arguments based on `class-validator` library annotations (like @Min and @Max)
      validate: true,
      // Expect format for dates in graphql
      dateScalarMode: 'isoDate'
    }),
    context: async ({ req, res }) => {
      // Parses login token and sets context.me.id to user id (if there is a user token)
      const me = await getMe(req);
      return { me, req, res };
    },
    introspection: true
  });
};

const startServer = async () => {
  // Avoid timezone issues
  process.env.TZ = 'UTC';

  // Create connection to postgresql
  const conn = await superCreateConnection();
  console.log(chalk.green('PG connected.'));

  const app = express();

  app.use(cookieParser()); //utilizing cookie parser to make distinguishing access and refresh tokens easy

  app.use(
    // cors = cross origin resource sharing
    cors({
      // TODO: production
      origin:
        config.get('environment') === 'production'
          ? 'https://glootie.surge.sh'
          : 'http://localhost:3000',
      credentials: true
    })
  );

  app.post('/refresh_token', refreshAuth);

  const apolloServer = await createApolloServer();
  // Attach apollo graphql to express http server
  apolloServer.applyMiddleware({ app, cors: false });

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
