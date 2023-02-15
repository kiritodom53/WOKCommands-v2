import {
    Column, Entity, OneToMany, PrimaryColumn
} from "typeorm";
import { ds } from "../DCMD";
import ConfigType from "../util/ConfigType";
import { GuildConfigEntity } from "./GuildConfigEntity";

@Entity({ name: "config", })
export class ConfigEntity {
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

    @OneToMany(type => GuildConfigEntity, guildConfig => guildConfig.config)
    guildConfigs!: GuildConfigEntity[];

    public static async findByKey(key: ConfigType): Promise<ConfigEntity | null> {
        return await ds.getRepository(ConfigEntity).findOneBy({ key, });
    }
}
