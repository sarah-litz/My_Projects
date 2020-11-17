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
const chalk_1 = __importDefault(require("chalk"));
require("reflect-metadata");
const config_1 = require("../../config");
const create_connection_1 = require("../../helper/create-connection");
const User_1 = require("../../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Beginning dbseed task.');
    console.log(chalk_1.default.blue(`Creating '${config_1.typeOrmConfig.database}' database if not already created.`));
    const connection = yield create_connection_1.superCreateConnection();
    console.log('PG connected.');
    let user = new User_1.User();
    user.email = 'john@doe.com';
    user.password = yield bcryptjs_1.default.hash('johndoe', 8);
    const userRepository = connection.getRepository(User_1.User);
    user = yield userRepository.save(user);
    console.log(`User saved. id = ${user.id}`);
    yield connection.close();
    console.log('PG connection closed.');
    console.log('Finished dbseed task.');
}))();
