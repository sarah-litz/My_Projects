import { gql } from 'apollo-server-express';

export const typeDefs = gql`

  type Query {
    getUser(id: Int!): User
  }
  type Mutation {
    addUser(email: String!, password: String!): String!
    loginUser(email: String!, password: String!): String!
  }

  type User {
    id: Int!
    email: String!
    password: String!
  }
`;
