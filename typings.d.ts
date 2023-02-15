import {
    ApplicationCommandOption,
    Client,
    CommandInteraction,
    Guild,
    GuildMember,
    Message,
    TextChannel,
    User,
} from "discord.js";
import CommandType from "./src/util/CommandType";
import ConfigType from "./src/util/ConfigType";
import CooldownTypes from "./src/util/CooldownTypes";
import Cooldowns from "./src/util/Cooldowns";
import DefaultCommands from "./src/util/DefaultCommands";
import CommandHandler from "./src/command-handler/CommandHandler";
import EventHandler from "./src/event-handler/EventHandler";
import { RequiredPermissionsEntity } from "./src/models/RequiredPermissionsEntity";
import { DisabledCommandsEntity } from "./src/models/DisabledCommandsEntity";
import { ChannelCommandsEntity } from "./src/models/ChannelCommandsEntity";
import { CustomCommandEntity } from "./src/models/CustomCommandEntity";
import { RequiredRolesEntity } from "./src/models/RequiredRolesEntity";
import { GuildPrefixEntity } from "./src/models/GuildPrefixEntity";
import { CooldownEntity } from "./src/models/CooldownEntity";
import { ConfigEntity } from "./src/models/ConfigEntity";
import { IDbUser } from "./src/models/interfaces/IDbUser";

export default class DCMD {
    constructor(options: Options);

    private _client!: Client;

    public get client(): Client;

    private _testServers!: string[];

    public get testServers(): string[];

    private _botOwners!: string[];

    public get botOwners(): string[];

    private _cooldowns: Cooldowns | undefined;

    public get cooldowns(): Cooldowns;

    private _disabledDefaultCommands!: DefaultCommands[];

    public get disabledDefaultCommands(): DefaultCommands[];

    private _validations!: Validations;

    public get validations(): Validations;

    private _commandHandler: CommandHandler | undefined;

    public get commandHandler(): CommandHandler;

    private _eventHandler!: EventHandler;

    public get eventHandler(): EventHandler;

    private _isConnectedToMariaDB = false;

    public get isConnectedToMariaDB(): boolean;
}

export interface Options {
    client: Client;
    mongoUri?: string;
    commandsDir?: string;
    featuresDir?: string;
    testServers?: string[];
    botOwners?: string[];
    cooldownConfig?: CooldownConfig;
    disabledDefaultCommands?: DefaultCommands[];
    events?: Events;
    validations?: Validations;
}

export interface CooldownConfig {
    errorMessage: string;
    botOwnersBypass: boolean;
    dbRequired: number;
}

export interface Events {
    dir: string;

    [key: string]: any;
}

export interface Validations {
    runtime?: string;
    syntax?: string;
}

export class Cooldowns {
    constructor(instance: DCMD, cooldownConfig: CooldownConfig) {}
}

export interface CooldownUsage {
    errorMessage?: string;
    type: CooldownTypes;
    duration: string;
}

export interface InternalCooldownConfig {
    cooldownType: CooldownTypes;
    userId: string;
    actionId: string;
    guildId?: string;
    duration?: string;
    errorMessage?: string;
}

export interface CommandUsage {
    client: Client;
    instance: DCMD;
    message?: Message | null;
    interaction?: CommandInteraction | null;
    args: string[];
    text: string;
    guild?: Guild | null;
    member?: GuildMember;
    user: User;
    channel?: TextChannel;
    cancelCooldown?: function;
    updateCooldown?: function;
}

export interface CommandObject {
    callback: (commandUsage: CommandUsage) => unknown;
    type: CommandType;
    init?: function;
    description?: string;
    aliases?: string[];
    testOnly?: boolean;
    guildOnly?: boolean;
    ownerOnly?: boolean;
    permissions?: bigint[];
    deferReply?: "ephemeral" | boolean;
    cooldowns?: CooldownUsage;
    minArgs?: number;
    maxArgs?: number;
    correctSyntax?: string;
    expectedArgs?: string;
    options?: ApplicationCommandOption[];
    autocomplete?: function;
    reply?: boolean;
    delete?: boolean;
    excludeLog?: boolean;
    configs?: ConfigType[];
}

export type FileData = {
    filePath: string;
    fileContents: any;
};

export class Command {
    constructor(
        instance: DCMD,
        commandName: string,
        commandObject: CommandObject
    );

    public get instance(): DCMD;

    public get commandName(): string;

    public get commandObject(): CommandObject;
}

export {
    // CommandObject,
    // Command,
    CommandType,
    ConfigType,
    CooldownTypes,
    DefaultCommands,
    RequiredPermissionsEntity,
    DisabledCommandsEntity,
    ChannelCommandsEntity,
    CustomCommandEntity,
    RequiredRolesEntity,
    GuildPrefixEntity,
    CooldownEntity,
    ConfigEntity,
    IDbUser,
};
