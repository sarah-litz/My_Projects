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
exports.refreshAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const auth_1 = require("./auth");
const config_1 = require("../../config");
const User_1 = require("../../models/User");
exports.refreshAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.jid;
    if (!token) {
        return res.send({ ok: false, accessToken: '' });
    }
    let payload = null;
    try {
        payload = jsonwebtoken_1.verify(token, config_1.config.get('jwt.refresh.secret'));
    }
    catch (err) {
        console.log(err);
        return res.send({ ok: false, accessToken: '' });
    }
    const repository = typeorm_1.getConnection().getRepository(User_1.User);
    const user = yield repository.findOne({ id: payload.userId });
    if (!user) {
        return res.send({ ok: false, accessToken: '' });
    }
    if (user.count !== payload.tokenVersion) {
        return res.send({ ok: false, accessToken: '' });
    }
    auth_1.sendRefreshToken(res, auth_1.createRefreshToken(user));
    return res.send({ ok: true, accessToken: auth_1.createAccessToken(user) });
});
