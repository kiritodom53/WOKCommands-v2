"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandType_1 = __importDefault(require("../../util/CommandType"));
const noCommands = "No custom commands configured.";
exports.default = {
    description: "Creates a custom command",
    type: CommandType_1.default.SLASH,
    guildOnly: true,
    permissions: [discord_js_1.PermissionFlagsBits.Administrator],
    options: [
        {
            name: "load",
            description: "Show the current server load",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
        },
    ],
    callback: async (commandUsage) => {
        const { instance, guild, } = commandUsage;
        const interaction = commandUsage.interaction;
        const sub = interaction.options.getSubcommand();
        if (sub === "load") {
            const { heapUsed, rss, } = process.memoryUsage();
            const usedMemory = heapUsed / 1024 / 1024;
            const usedRss = rss / 1024 / 1024;
            const response = `Aktuální zatížení serveru: ${usedMemory.toFixed(2)} MB (Heap) a ${usedRss.toFixed(2)} MB (RSS)`;
            return { content: response, };
        }
    },
};
