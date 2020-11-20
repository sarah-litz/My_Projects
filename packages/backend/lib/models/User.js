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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Preferences_1 = __importDefault(require("./Preferences"));
const SleepDatum_1 = __importDefault(require("./SleepDatum"));
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'text' }),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    typeorm_1.Column({ type: 'text' }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ type: 'text' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "count", void 0);
__decorate([
    typeorm_1.OneToMany(() => Preferences_1.default, (preferences) => preferences.user),
    __metadata("design:type", Array)
], User.prototype, "preferences", void 0);
__decorate([
    typeorm_1.OneToMany(() => SleepDatum_1.default, (datum) => datum.user),
    __metadata("design:type", Array)
], User.prototype, "sleepData", void 0);
User = __decorate([
    typeorm_1.Entity('users')
], User);
exports.User = User;
