"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const User_1 = __importDefault(require("./models/User"));
const typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'rick',
    password: 'morty',
    database: 'glootie',
    synchronize: true,
    logging: false,
    entities: [User_1.default]
};
exports.typeOrmConfig = typeOrmConfig;
