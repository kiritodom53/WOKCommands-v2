import { ChannelCommandsEntity } from "./ChannelCommandsEntity";
import { CooldownEntity } from "./CooldownEntity";
import { CustomCommandEntity } from "./CustomCommandEntity";
import { DisabledCommandsEntity } from "./DisabledCommandsEntity";
import { GuildPrefixEntity } from "./GuildPrefixEntity";
import { RequiredPermissionsEntity } from "./RequiredPermissionsEntity";
import { RequiredRolesEntity } from "./RequiredRolesEntity";
import { Config } from "./Config";
import { CommandLogEntity } from "./CommandLogEntity";

export const DbModels = [
    RequiredPermissionsEntity,
    DisabledCommandsEntity,
    ChannelCommandsEntity,
    CustomCommandEntity,
    RequiredRolesEntity,
    GuildPrefixEntity,
    CommandLogEntity,
    CooldownEntity,
    Config,
];

export default DbModels;
