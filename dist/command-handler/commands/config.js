"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandType_1 = __importDefault(require("../../util/CommandType"));
const DCMD_1 = require("../../DCMD");
const Config_1 = require("../../models/Config");
const GuildConfig_1 = require("../../models/GuildConfig");
exports.default = {
    description: "Toggles a command on or off for your guild",
    type: CommandType_1.default.SLASH,
    guildOnly: true,
    permissions: [discord_js_1.PermissionFlagsBits.Administrator],
    options: [
        {
            name: "key",
            description: "Configuration key",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true,
        },
        {
            name: "value",
            description: "Configuration value",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
            autocomplete: false,
        },
    ],
    autocomplete: (command) => {
        return [...command.instance.commandHandler.configs];
    },
    callback: async (commandUsage) => {
        const { instance, guild, text: commandName, interaction, } = commandUsage;
        if (!instance.isConnectedToMariaDB)
            return {
                content: "This bot is not connected to a database which is required for this command. Please contact the bot owner.",
                ephemeral: true,
            };
        if (!interaction.isChatInputCommand())
            return;
        const key = interaction.options.getString("key");
        const value = interaction.options.getString("value");
        const conf = await DCMD_1.ds.getRepository(Config_1.Config).findBy({ key: key, });
        if (!conf)
            return {
                content: "This config doesn't exist. Please contact the bot owner.",
                ephemeral: true,
            };
        const result = await GuildConfig_1.GuildConfig.saveOrUpdate(guild.id, key, value);
        if (!result)
            return {
                content: "Neexistující konfigurace!",
                ephemeral: true,
            };
        return {
            content: `Konfigurace \`${key}\` byla nastavena na \`${value}\``,
            ephemeral: true,
        };
    },
};
