import { ds } from "../../DCMD";
import { ConfigEntity } from "../ConfigEntity";
import ConfigType from "../../util/ConfigType";

export const migrateConfig = async () => {
    const repo = ds.getRepository(ConfigEntity);

    for (const config of Object.values(ConfigType))
        await repo.query(
            "INSERT IGNORE INTO `configs` (`key`, `isRequireForRun`) VALUES " +
                `('${ config }', 0);`,
        );

};
