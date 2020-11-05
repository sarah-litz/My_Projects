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
import { SleepDatumResolver } from './resolvers/SleepDatumResolver';
import { authChecker } from './helper/auth/auth-checker';
import { refreshAuth } from './helper/auth/refresh-auth';

const createApolloServer = async () => {
  return new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, SleepDatumResolver],
      authChecker,
      validate: true,
      dateScalarMode: 'isoDate'
    }),
    context: async ({ req, res }) => {
      const me = await getMe(req);
      return { me, req, res };
    },
    introspection: true
  });
};

const startServer = async () => {
  // Avoid timezone issues
  process.env.TZ = 'UTC';

  const app = express();

  // Create connection to postgresql
  const conn = await superCreateConnection();
  console.log(chalk.green('PG connected.'));

  app.use(
    cors({
      // TODO: production
      origin: 'http://localhost:3000',
      credentials: true
    })
  );

  app.use(cookieParser()); //utilizing cookie parser to make distinguishing access and refresh tokens easy
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
