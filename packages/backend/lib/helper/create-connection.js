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
exports.superCreateConnection = void 0;
const pg_god_1 = require("pg-god");
const typeorm_1 = require("typeorm");
const config_1 = require("../config");
let conn;
function superCreateConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        if (conn)
            return conn;
        try {
            conn = yield typeorm_1.createConnection(config_1.typeOrmConfig);
            return conn;
        }
        catch (error) {
            if (error.code === '3D000') {
                yield pg_god_1.createDatabase({ databaseName: config_1.typeOrmConfig.database }, {
                    user: config_1.typeOrmConfig.username,
                    port: config_1.typeOrmConfig.port,
                    host: config_1.typeOrmConfig.host,
                    password: typeof config_1.typeOrmConfig.password === 'undefined'
                        ? undefined
                        : typeof config_1.typeOrmConfig.password === 'string'
                            ? config_1.typeOrmConfig.password
                            : yield config_1.typeOrmConfig.password()
                });
                return superCreateConnection();
            }
            throw error;
        }
    });
}
exports.superCreateConnection = superCreateConnection;
