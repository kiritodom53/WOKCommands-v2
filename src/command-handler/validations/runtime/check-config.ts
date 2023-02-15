import Command from "../../Command";
import { ConfigEntity } from "../../../models/ConfigEntity";
import { CommandUsage } from "../../../../typings";
import { ds } from "../../../DCMD";

export default async (command: Command, usage: CommandUsage) => {
    const { configs, } = command.commandObject;
    const { commandName, instance, } = command;
    const { guild, channel, message, interaction, } = usage;

    if (!guild || !instance.isConnectedToMariaDB)
        return true;


    const results = await ds
        .getRepository(ConfigEntity)
        .createQueryBuilder("c")
        .where("value is null")
        .andWhere("`key` IN (:keys)", { keys: configs, })
        .getRawMany();

    if (!results)
        return true;


    if (results.length == 0)
        return true;


    const unsetConfigs: Map<string, string | null> = new Map<
        string,
        string | null
    >();
    results.forEach((x) => unsetConfigs.set(x.c_key, !x.c_description ? null : x.c_description),
    );

    let text = "This command require these configs to be set:\n";
    unsetConfigs.forEach(
        (value, key) => (text += `> _${ key }_:\n\`\`\`\n${
            !value ? "Nemá popisek" : value
        }\`\`\`\n`),
    );

    if (message) message.reply(text);
    else if (interaction) interaction.reply(text);

    return false;
};
