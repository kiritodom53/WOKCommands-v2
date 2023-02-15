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
        console.log("GuildConfig::findByKey - start");
        const t = await ds.getRepository(GuildConfig).findOneBy({
            guildId,
            configKey: key,
        });
        console.log("GuildConfig::findByKey - start");
        return t;
    }

    public static async saveOrUpdate(guildId: string, key: string, value: string | null = null): Promise<boolean> {
        console.log("GuildConfig::saveOrUpdate - start 1");
        try {
            const guildConf = GuildConfig.findByKey(guildId, key);

            if (!guildConf) {
                console.log("GuildConfig::saveOrUpdate - start 1.1");
                await ds.getRepository(GuildConfig).save({
                    guildId,
                    configKey: key,
                    value,
                });
                console.log("GuildConfig::saveOrUpdate - end 1.1");
                return true;
            }
            console.log("GuildConfig::saveOrUpdate - start 1.2");
            await ds.getRepository(GuildConfig).update({
                guildId,
                configKey: key,
            }, { value, });
            console.log("GuildConfig::saveOrUpdate - end 1.2");
            return true;
        } catch (e) {
            console.log("GuildConfig::saveOrUpdate - end 1");
            return false;
        }
    }
}
