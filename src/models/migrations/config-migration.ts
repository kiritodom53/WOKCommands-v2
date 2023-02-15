import { ds } from "../../DCMD";
import { Config } from "../Config";
import ConfigType from "../../util/ConfigType";

export const migrateConfig = async () => {
    const repo = ds.getRepository(Config);

    for (const config of Object.values(ConfigType))
        await repo.query(
            "INSERT IGNORE INTO `configs` (`key`, `isRequireForRun`) VALUES " +
                `('${ config }', 0);`,
        );

};
