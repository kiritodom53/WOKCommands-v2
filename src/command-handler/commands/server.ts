import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
} from "discord.js";

import CommandType from "../../util/CommandType";
import { CommandObject, CommandUsage } from "../../../typings";

const noCommands = "No custom commands configured.";

export default {
    description: "Creates a custom command",
    type: CommandType.SLASH,
    guildOnly: true,
    permissions: [PermissionFlagsBits.Administrator],

    options: [
        {
            name: "load",
            description: "Show the current server load",
            type: ApplicationCommandOptionType.Subcommand,
        },
    ],

    callback: async (commandUsage: CommandUsage) => {
        const { instance, guild } = commandUsage;
        const interaction =
            commandUsage.interaction as ChatInputCommandInteraction;

        const sub = interaction.options.getSubcommand();

        if (sub === "load") {
            const { heapUsed, rss } = process.memoryUsage();
            const usedMemory = heapUsed / 1024 / 1024;
            const usedRss = rss / 1024 / 1024;
            const response = `Aktuální zatížení serveru: ${usedMemory.toFixed(
                2
            )} MB (Heap) a ${usedRss.toFixed(2)} MB (RSS)`;
            return { content: response };
        }
    },
} as CommandObject;
