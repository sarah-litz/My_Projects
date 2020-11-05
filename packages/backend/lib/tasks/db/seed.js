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
const typeorm_1 = require("typeorm");
const config_1 = require("../../config");
const User_1 = __importDefault(require("../../models/User"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Beginning dbseed task.');
    const conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
    console.log('PG connected.');
    let user = new User_1.default();
    user.email = 'john@doe.com';
    user.password = 'johndoe';
    const userRepo = conn.getRepository(User_1.default);
    user = yield userRepo.save(user);
    console.log(`User saved. id = ${user.id}`);
    yield conn.close();
    console.log('PG connection closed.');
    console.log('Finished dbseed task.');
}))();
