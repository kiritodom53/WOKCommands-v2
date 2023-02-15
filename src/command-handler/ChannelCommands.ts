import DCMD from "../../typings";
import { ChannelCommandsEntity } from "../models/ChannelCommandsEntity";
import { ds } from "../DCMD";

class ChannelCommands {
    // `${guildId}-${commandName}`: [channelIds]
    private _channelCommands: Map<string, string[]> = new Map();
    private _instance: DCMD;

    constructor(instance: DCMD) {
        this._instance = instance;
    }

    async action(
        action: "add" | "remove",
        guildId: string,
        commandName: string,
        channelId: string,
    ) {
        if (!this._instance.isConnectedToMariaDB)
            return;


        const _id = `${ guildId }-${ commandName }`;

        const repo = await ds.getRepository(ChannelCommandsEntity);

        let res;
        if (action == "remove")
            await repo.delete({
                guildId: guildId,
                commandId: commandName,
                channelId: channelId,
            });
        else
            res = await repo.insert({
                guildId: guildId,
                commandId: commandName,
                channelId: channelId,
            });


        const channels: Array<string> = [];
        const result = await repo.findBy({
            guildId: guildId,
            commandId: commandName,
        });
        result.forEach((x) => channels.push(x.channelId));

        // Id a všechny kanály co mají toto id
        this._channelCommands.set(_id, channels);
        return channels;
    }

    async add(guildId: string, commandName: string, channelId: string) {
        return await this.action("add", guildId, commandName, channelId);
    }

    async remove(guildId: string, commandName: string, channelId: string) {
        return await this.action("remove", guildId, commandName, channelId);
    }

    async getAvailableChannels(guildId: string, commandName: string) {
        if (!this._instance.isConnectedToMariaDB)
            return [];

        console.log("getAvailableChannels");
        const _id = `${ guildId }-${ commandName }`;
        console.log(_id);
        const t = this._channelCommands.get(_id);
        console.log(t);
        const channels: Array<string> = !t ? [] : t;
        console.log(channels);

        if (channels.length === 0) {
            const result = await ds.getRepository(ChannelCommandsEntity).findBy({
                commandId: commandName,
                guildId: guildId,
            });
            result.forEach((x) => channels.push(x.channelId));
            if (result.length < 1)
                this._channelCommands.set(_id, []);
            else
                this._channelCommands.set(_id, channels!);

        }

        return channels;
    }
}

export default ChannelCommands;
