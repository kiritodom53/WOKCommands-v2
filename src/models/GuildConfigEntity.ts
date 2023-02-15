import {
    Column, Entity, ManyToOne, PrimaryColumn
} from "typeorm";
import { ConfigEntity } from "./ConfigEntity";
import ConfigType from "../util/ConfigType";
import { ds } from "../DCMD";

@Entity({ name: "guild_config", })
export class GuildConfigEntity {
    @PrimaryColumn({ unique: true, })
    guildId: string;

    @PrimaryColumn({ unique: true, })
    configKey: string;

    @ManyToOne(type => ConfigEntity, config => config.guildConfigs)
    config: ConfigEntity;

    @Column("varchar", { nullable: true, })
    value!: string | null;

    public static async findByKey(guildId: string, key: ConfigType | string): Promise<GuildConfigEntity | null> {
        return await ds.getRepository(GuildConfigEntity).findOneBy({
            guildId,
            configKey: key,
        });
    }

    public static async saveOrUpdate(guildId: string, key: string, value: string | null = null): Promise<boolean> {
        try {
            const guildConf = GuildConfigEntity.findByKey(guildId, key);

            if (!guildConf) {
                await ds.getRepository(GuildConfigEntity).save({
                    guildId,
                    configKey: key,
                    value,
                });
                return true;
            }
            await ds.getRepository(GuildConfigEntity).update({
                guildId,
                configKey: key,
            }, { value, });
            return true;
        } catch (e) {
            return false;
        }
    }
}
