import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    getUser(id: Int!): User
    currUser: User
  }
  type Mutation {
    addUser(email: String!, password: String!): String!
    loginUser(email: String!, password: String!): User
  }

  type User {
    id: String!
    email: String!
  }
`;
