// Must be at top
import 'reflect-metadata';

import express from 'express';

import { createConnection } from 'typeorm';
import { typeOrmConfig } from './config';

// Import entities
import User from './models/User';

const { ApolloServer, gql } = require('apollo-server');

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
////

const resolvers = {
  Query: {
    users: () => users
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4000, () => {
  console.log(`Starting backend on port 4000.`);
});

(async () => {
  const conn = await createConnection(typeOrmConfig);
  console.log('PG connected.');

  // Main config goes here

  await conn.close();
  console.log('PG connection closed.');
})();
