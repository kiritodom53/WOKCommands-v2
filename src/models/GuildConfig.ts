import {
    Column, Entity, ManyToOne, PrimaryColumn
} from "typeorm";
import { Config } from "./Config";
import ConfigType from "../util/ConfigType";
import { ds } from "../DCMD";

@Entity({ name: "guild_config", })
export class GuildConfig {
    @PrimaryColumn({ unique: true, })
    guildId: string;

    @PrimaryColumn({ unique: true, })
    configKey: string;

    @ManyToOne(type => Config, config => config.guildConfigs)
    config: Config;

    @Column("varchar", { nullable: true, })
    value!: string | null;

    public static async findByKey(guildId: string, key: ConfigType | string): Promise<GuildConfig | null> {
        return await ds.getRepository(GuildConfig).findOneBy({
            guildId,
            configKey: key,
        });
    }

    public static async saveOrUpdate(guildId: string, key: string, value: string | null = null): Promise<boolean> {
        try {
            const guildConf = GuildConfig.findByKey(guildId, key);

            if (!guildConf) {
                await ds.getRepository(GuildConfig).save({
                    guildId,
                    configKey: key,
                    value,
                });
                return true;
            }
            await ds.getRepository(GuildConfig).update({
                guildId,
                configKey: key,
            }, { value, });
            return true;
        } catch (e) {
            return false;
        }
    }
}
