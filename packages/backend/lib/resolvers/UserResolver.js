"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("../helper/auth/auth");
const apollo_server_express_1 = require("apollo-server-express");
let SafeUser = class SafeUser {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SafeUser.prototype, "email", void 0);
SafeUser = __decorate([
    type_graphql_1.ObjectType()
], SafeUser);
let UserResolver = class UserResolver {
    addUser(email, password, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = typeorm_1.getConnection().getRepository(User_1.User);
            const alreadyExists = yield repository.findOne({ email });
            if (alreadyExists) {
                console.log('User already exists');
                throw new apollo_server_express_1.UserInputError('User with that email already exists!');
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const userValues = repository.create({
                email,
                password: hashedPassword,
                sleepData: []
            });
            const user = yield repository.save(userValues);
            console.log(`User saved. id = ${user.id}`);
            auth_1.sendRefreshToken(context.res, auth_1.createRefreshToken(user));
            return auth_1.createAccessToken(user);
        });
    }
    loginUser(email, password, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = typeorm_1.getConnection().getRepository(User_1.User);
            const user = yield repository.findOne({ email });
            if (!user) {
                throw new apollo_server_express_1.AuthenticationError('Invalid login or password.');
            }
            const passValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!passValid) {
                throw new apollo_server_express_1.AuthenticationError('Invalid login or password.');
            }
            auth_1.sendRefreshToken(context.res, auth_1.createAccessToken(user));
            return auth_1.createAccessToken(user);
        });
    }
    me(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = typeorm_1.getConnection().getRepository(User_1.User);
            const user = yield repository.findOne(context.me.id);
            if (!user) {
                throw new apollo_server_express_1.AuthenticationError('Invalid user.');
            }
            return {
                email: user.email
            };
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('email')),
    __param(1, type_graphql_1.Arg('password')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "addUser", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('email')),
    __param(1, type_graphql_1.Arg('password')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "loginUser", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Query(() => SafeUser),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
