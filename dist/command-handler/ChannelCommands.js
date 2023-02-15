"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChannelCommandsEntity_1 = require("../models/ChannelCommandsEntity");
const DCMD_1 = require("../DCMD");
class ChannelCommands {
    // `${guildId}-${commandName}`: [channelIds]
    _channelCommands = new Map();
    _instance;
    constructor(instance) {
        this._instance = instance;
    }
    async action(action, guildId, commandName, channelId) {
        if (!this._instance.isConnectedToMariaDB)
            return;
        const _id = `${guildId}-${commandName}`;
        const repo = await DCMD_1.ds.getRepository(ChannelCommandsEntity_1.ChannelCommandsEntity);
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
        const channels = [];
        const result = await repo.findBy({
            guildId: guildId,
            commandId: commandName,
        });
        result.forEach((x) => channels.push(x.channelId));
        // Id a všechny kanály co mají toto id
        this._channelCommands.set(_id, channels);
        return channels;
    }
    async add(guildId, commandName, channelId) {
        return await this.action("add", guildId, commandName, channelId);
    }
    async remove(guildId, commandName, channelId) {
        return await this.action("remove", guildId, commandName, channelId);
    }
    async getAvailableChannels(guildId, commandName) {
        if (!this._instance.isConnectedToMariaDB)
            return [];
        console.log("getAvailableChannels");
        const _id = `${guildId}-${commandName}`;
        console.log(_id);
        const t = this._channelCommands.get(_id);
        console.log(t);
        const channels = !t ? [] : t;
        console.log(channels);
        if (channels.length === 0) {
            const result = await DCMD_1.ds.getRepository(ChannelCommandsEntity_1.ChannelCommandsEntity).findBy({
                commandId: commandName,
                guildId: guildId,
            });
            result.forEach((x) => channels.push(x.channelId));
            if (result.length < 1)
                this._channelCommands.set(_id, []);
            else
                this._channelCommands.set(_id, channels);
        }
        return channels;
    }
}
exports.default = ChannelCommands;
