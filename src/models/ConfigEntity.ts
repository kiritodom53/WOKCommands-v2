import { Column, Entity, PrimaryColumn } from "typeorm";
import { ds } from "../DCMD";
import ConfigType from "../util/ConfigType";

@Entity({ name: "configs", })
export class ConfigEntity {
    @PrimaryColumn({ unique: true, })
    key: string;

    @Column("varchar", { nullable: true, })
    value!: string | null;

    @Column("varchar", { nullable: true, })
    description!: string | null;

    @Column({
        nullable: false, default: false,
    })
    isRequireForRun: boolean;

    public static async findByKey(
        key: ConfigType,
    ): Promise<ConfigEntity | null> {
        return await ds.getRepository(ConfigEntity).findOneBy({ key: key, });
    }
}
