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
exports.SleepDataResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const SleepDatum_1 = __importDefault(require("../models/SleepDatum"));
const User_1 = require("../models/User");
const apollo_server_express_1 = require("apollo-server-express");
const class_validator_1 = require("class-validator");
const moment_1 = __importDefault(require("moment"));
let SleepDatumCreateInput = class SleepDatumCreateInput {
};
__decorate([
    class_validator_1.Min(0),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], SleepDatumCreateInput.prototype, "totalHours", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], SleepDatumCreateInput.prototype, "didDream", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.Max(10),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], SleepDatumCreateInput.prototype, "anxiety", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.Max(10),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], SleepDatumCreateInput.prototype, "sleepQuality", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.Max(12),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], SleepDatumCreateInput.prototype, "melatonin", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], SleepDatumCreateInput.prototype, "caffeine", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], SleepDatumCreateInput.prototype, "date", void 0);
SleepDatumCreateInput = __decorate([
    type_graphql_1.InputType()
], SleepDatumCreateInput);
let SleepDataResolver = class SleepDataResolver {
    sleepData(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = typeorm_1.getConnection().getRepository(SleepDatum_1.default);
            return yield repository.find({
                where: {
                    user: context.me.id
                }
            });
        });
    }
    createSleepData(options, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getConnection().getRepository(User_1.User);
            const user = yield userRepository.findOne(context.me.id);
            if (!user) {
                throw new apollo_server_express_1.AuthenticationError('User not found ahhhh!');
            }
            console.log(options.date);
            const repository = typeorm_1.getConnection().getRepository(SleepDatum_1.default);
            const data = repository.create(Object.assign(Object.assign({}, options), { date: options.date.toISOString(), user }));
            return yield repository.save(data);
        });
    }
    date(sleepDatum) {
        return moment_1.default(sleepDatum.date, 'YYYY-MM-DD').toISOString();
    }
};
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Query(() => [SleepDatum_1.default]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SleepDataResolver.prototype, "sleepData", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => SleepDatum_1.default, { nullable: true }),
    __param(0, type_graphql_1.Arg('options', () => SleepDatumCreateInput)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SleepDatumCreateInput, Object]),
    __metadata("design:returntype", Promise)
], SleepDataResolver.prototype, "createSleepData", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SleepDatum_1.default]),
    __metadata("design:returntype", String)
], SleepDataResolver.prototype, "date", null);
SleepDataResolver = __decorate([
    type_graphql_1.Resolver(() => SleepDatum_1.default)
], SleepDataResolver);
exports.SleepDataResolver = SleepDataResolver;
