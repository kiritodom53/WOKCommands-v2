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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLogEntity = void 0;
const typeorm_1 = require("typeorm");
let CommandLogEntity = class CommandLogEntity {
    guildId;
    commandId;
    userId;
    data;
    cmdType;
    triggeredAtCTS;
    triggeredAtUTS;
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ unique: true, }),
    __metadata("design:type", String)
], CommandLogEntity.prototype, "guildId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], CommandLogEntity.prototype, "commandId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], CommandLogEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true, }),
    __metadata("design:type", Object)
], CommandLogEntity.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CommandLogEntity.prototype, "cmdType", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Date)
], CommandLogEntity.prototype, "triggeredAtCTS", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CommandLogEntity.prototype, "triggeredAtUTS", void 0);
CommandLogEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "command_log", })
], CommandLogEntity);
exports.CommandLogEntity = CommandLogEntity;
