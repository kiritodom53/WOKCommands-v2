"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbModels = void 0;
const ChannelCommandsEntity_1 = require("./ChannelCommandsEntity");
const CooldownEntity_1 = require("./CooldownEntity");
const CustomCommandEntity_1 = require("./CustomCommandEntity");
const DisabledCommandsEntity_1 = require("./DisabledCommandsEntity");
const GuildPrefixEntity_1 = require("./GuildPrefixEntity");
const RequiredPermissionsEntity_1 = require("./RequiredPermissionsEntity");
const RequiredRolesEntity_1 = require("./RequiredRolesEntity");
const Config_1 = require("./Config");
const CommandLogEntity_1 = require("./CommandLogEntity");
exports.DbModels = [
    RequiredPermissionsEntity_1.RequiredPermissionsEntity,
    DisabledCommandsEntity_1.DisabledCommandsEntity,
    ChannelCommandsEntity_1.ChannelCommandsEntity,
    CustomCommandEntity_1.CustomCommandEntity,
    RequiredRolesEntity_1.RequiredRolesEntity,
    GuildPrefixEntity_1.GuildPrefixEntity,
    CommandLogEntity_1.CommandLogEntity,
    CooldownEntity_1.CooldownEntity,
    Config_1.Config,
];
exports.default = exports.DbModels;
