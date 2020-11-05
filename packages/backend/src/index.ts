// Must be at top
import 'reflect-metadata';
import express from 'express';
// Import entities
import { superCreateConnection } from './helper/create-connection';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from './constants';
import chalk from 'chalk';
import { config } from './config';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';

const startServer = async () => {
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
  app.use((req, _, next) => {
    const accessToken = req.cookies['access-token'];
    try {
      const data = verify(accessToken, ACCESS_TOKEN_SECRET) as any;
      (req as any).userId = data.userId;
    } catch {}
    next();
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({ req, res }: any) => ({ req, res })
  });
  // Attach apollo graphql to express http server
  // await apolloServer.applyMiddleware({ app, cors: false });
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
