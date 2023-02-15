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
var GuildConfig_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildConfig = void 0;
const typeorm_1 = require("typeorm");
const Config_1 = require("./Config");
const DCMD_1 = require("../DCMD");
let GuildConfig = GuildConfig_1 = class GuildConfig {
    guildId;
    configKey;
    config;
    value;
    static async findByKey(guildId, key) {
        return await DCMD_1.ds.getRepository(GuildConfig_1).findOneBy({
            guildId,
            configKey: key,
        });
    }
    static async saveOrUpdate(guildId, key, value = null) {
        try {
            const guildConf = await GuildConfig_1.findByKey(guildId, key);
            if (!guildConf) {
                console.log("save cf");
                await DCMD_1.ds.getRepository(GuildConfig_1).save({
                    guildId: guildId,
                    configKey: key,
                    value: value,
                });
                return true;
            }
            console.log("update cf");
            await DCMD_1.ds.getRepository(GuildConfig_1).update({
                guildId: guildId,
                configKey: key,
            }, { value: value, });
            return true;
        }
        catch (e) {
            return false;
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ unique: true, }),
    __metadata("design:type", String)
], GuildConfig.prototype, "guildId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ unique: true, }),
    __metadata("design:type", String)
], GuildConfig.prototype, "configKey", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Config_1.Config, config => config.guildConfigs),
    __metadata("design:type", Config_1.Config)
], GuildConfig.prototype, "config", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true, }),
    __metadata("design:type", Object)
], GuildConfig.prototype, "value", void 0);
GuildConfig = GuildConfig_1 = __decorate([
    (0, typeorm_1.Entity)({ name: "guild_config", })
], GuildConfig);
exports.GuildConfig = GuildConfig;
