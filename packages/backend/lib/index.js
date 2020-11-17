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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const create_connection_1 = require("./helper/create-connection");
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const chalk_1 = __importDefault(require("chalk"));
const config_1 = require("./config");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./resolvers/UserResolver");
const get_me_1 = require("./helper/auth/get-me");
const refresh_auth_1 = require("./helper/auth/refresh-auth");
const SleepDataResolver_1 = require("./resolvers/SleepDataResolver");
const auth_checker_1 = require("./helper/auth/auth-checker");
const createApolloServer = () => __awaiter(void 0, void 0, void 0, function* () {
    return new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [UserResolver_1.UserResolver, SleepDataResolver_1.SleepDataResolver],
            authChecker: auth_checker_1.authChecker,
            validate: true,
            dateScalarMode: 'isoDate'
        }),
        context: ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            const me = yield get_me_1.getMe(req);
            return { me, req, res };
        }),
        introspection: true
    });
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    process.env.TZ = 'UTC';
    const app = express_1.default();
    const conn = yield create_connection_1.superCreateConnection();
    console.log(chalk_1.default.green('PG connected.'));
    app.use(cors_1.default({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.use(cookie_parser_1.default());
    app.post('/refresh_token', refresh_auth_1.refreshAuth);
    const apolloServer = yield createApolloServer();
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(config_1.config.get('port'), () => {
        console.log(chalk_1.default.green(`🚀 Server ready at ${config_1.config.get('port')}.`));
    });
    process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
        console.info(chalk_1.default.blue('SIGTERM signal received.'));
        console.log(chalk_1.default.red('Closing PG server.'));
        yield conn.close();
        console.log(chalk_1.default.red('PG connection closed.'));
    }));
});
startServer();
