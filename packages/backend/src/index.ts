import express from 'express';

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
