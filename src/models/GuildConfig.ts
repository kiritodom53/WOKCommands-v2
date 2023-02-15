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
            const guildConf = await GuildConfig.findByKey(guildId, key);

            if (!guildConf) {
                console.log("save cf");
                await ds.getRepository(GuildConfig).save({
                    guildId: guildId,
                    configKey: key,
                    value: value,
                });
                return true;
            }
            console.log("update cf");
            await ds.getRepository(GuildConfig).update({
                guildId: guildId,
                configKey: key,
            }, { value: value, });
            return true;
        } catch (e) {
            return false;
        }
    }
}
