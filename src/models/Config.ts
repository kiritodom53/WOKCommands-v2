import {
    Column, Entity, OneToMany, PrimaryColumn
} from "typeorm";
import { ds } from "../DCMD";
import ConfigType from "../util/ConfigType";
import { GuildConfig } from "./GuildConfig";

@Entity({ name: "config", })
export class Config {
    @PrimaryColumn({ unique: true, })
    key: string;

    @Column("varchar",
        { nullable: true, })
    description!: string | null;

    @Column({
        nullable: false,
        default: false,
    })
    isRequireForRun: boolean;

    @Column({
        nullable: false,
        default: "textChannelId",
        comment: "textChannelId, roleId, userId, voiceChannelId, textGroupId",
    })
    type: string;

    @OneToMany(type => GuildConfig, guildConfig => guildConfig.config)
    guildConfigs!: GuildConfig[];

    public static async findByKey(key: ConfigType): Promise<Config | null> {
        return await ds.getRepository(Config).findOneBy({ key, });
    }
}
