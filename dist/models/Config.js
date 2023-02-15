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
var Config_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const typeorm_1 = require("typeorm");
const DCMD_1 = require("../DCMD");
const GuildConfig_1 = require("./GuildConfig");
let Config = Config_1 = class Config {
    key;
    description;
    isRequireForRun;
    guildConfigs;
    static async findByKey(key) {
        console.log("Config::findByKey - start");
        const t = await DCMD_1.ds.getRepository(Config_1).findOneBy({ key, });
        console.log("Config::findByKey - end");
        return t;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ unique: true, }),
    __metadata("design:type", String)
], Config.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true, }),
    __metadata("design:type", Object)
], Config.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Config.prototype, "isRequireForRun", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => GuildConfig_1.GuildConfig, guildConfig => guildConfig.config),
    __metadata("design:type", Array)
], Config.prototype, "guildConfigs", void 0);
Config = Config_1 = __decorate([
    (0, typeorm_1.Entity)({ name: "config", })
], Config);
exports.Config = Config;
