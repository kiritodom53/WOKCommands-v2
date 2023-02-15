"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DisabledCommandsEntity_1 = require("../models/DisabledCommandsEntity");
const DCMD_1 = require("../DCMD");
class DisabledCommands {
    // array of `${guildId}-${commandName}`
    _disabledCommands = [];
    _instance;
    constructor(instance) {
        this._instance = instance;
        this.loadDisabledCommands();
    }
    async loadDisabledCommands() {
        if (!this._instance.isConnectedToMariaDB)
            return;
        const results = await (0, DisabledCommandsEntity_1.findDisabledCommand)();
        for (const result of results)
            this._disabledCommands.push(`${result.guildId}-${result.cmdName}`);
    }
    async disable(guildId, commandName) {
        if (!this._instance.isConnectedToMariaDB ||
            this.isDisabled(guildId, commandName))
            return;
        const _id = `${guildId}-${commandName}`;
        this._disabledCommands.push(_id);
        const repo = await DCMD_1.ds.getRepository(DisabledCommandsEntity_1.DisabledCommandsEntity);
        try {
            await repo.save({
                guildId: guildId,
                cmdName: commandName,
            });
        }
        catch (ignored) { }
    }
    async enable(guildId, commandName) {
        if (!this._instance.isConnectedToMariaDB ||
            !this.isDisabled(guildId, commandName))
            return;
        const _id = `${guildId}-${commandName}`;
        this._disabledCommands = this._disabledCommands.filter((id) => id !== _id);
        const repo = await DCMD_1.ds.getRepository(DisabledCommandsEntity_1.DisabledCommandsEntity);
        await repo.delete({
            guildId: guildId,
            cmdName: commandName,
        });
    }
    isDisabled(guildId, commandName) {
        return this._disabledCommands.includes(`${guildId}-${commandName}`);
    }
}
exports.default = DisabledCommands;
