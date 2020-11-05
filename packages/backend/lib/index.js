"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const config_1 = require("./config");
const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql `
  # Basic login option
  type Login {
    userName: String
    passWord: String
  }

  type Query {
    users: [Login]
  }
`;
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
const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4000, () => {
    console.log(`Starting backend on port 4000.`);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
    console.log('PG connected.');
    yield conn.close();
    console.log('PG connection closed.');
}))();
