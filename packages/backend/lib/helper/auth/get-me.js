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
exports.getMe = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
function getMe(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = req.headers['authorization'];
        const refreshToken = req.cookies['refresh-token'];
        if (!accessToken && !refreshToken)
            return;
        try {
            if (accessToken) {
                const data = jsonwebtoken_1.default.verify(accessToken, config_1.config.get('jwt.access.secret'));
                return { id: data.id };
            }
        }
        catch (_a) {
            if (!refreshToken)
                throw new apollo_server_express_1.AuthenticationError('Your session expired. Sign in again.');
        }
    });
}
exports.getMe = getMe;
