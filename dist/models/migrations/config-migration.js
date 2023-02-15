"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateConfig = void 0;
const DCMD_1 = require("../../DCMD");
const Config_1 = require("../Config");
const ConfigType_1 = __importDefault(require("../../util/ConfigType"));
const migrateConfig = async () => {
    const repo = DCMD_1.ds.getRepository(Config_1.Config);
    for (const config of Object.values(ConfigType_1.default))
        await repo.query("INSERT IGNORE INTO `configs` (`key`, `isRequireForRun`) VALUES " +
            `('${config}', 0);`);
};
exports.migrateConfig = migrateConfig;
