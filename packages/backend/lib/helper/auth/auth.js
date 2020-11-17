"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = exports.sendRefreshToken = void 0;
const ms_1 = __importDefault(require("ms"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
exports.sendRefreshToken = (res, token) => {
    res.cookie('jid', token, {
        maxAge: ms_1.default(config_1.config.get('jwt.refresh.duration')),
        httpOnly: true,
        path: '/refresh_token'
    });
};
const createToken = (userId, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign({ id: userId }, secret, { expiresIn });
};
exports.createAccessToken = (user) => {
    return createToken(user.id.toString(10), config_1.config.get('jwt.access.secret'), config_1.config.get('jwt.refresh.duration'));
};
exports.createRefreshToken = (user) => {
    return createToken(user.id.toString(10), config_1.config.get('jwt.access.secret'), config_1.config.get('jwt.refresh.duration'));
};
