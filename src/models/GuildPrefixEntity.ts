import {
    Column, DataSource, Entity, PrimaryColumn
} from "typeorm";
import { ds } from "../DCMD";

@Entity({ name: "guild_prefix", })
export class GuildPrefixEntity {
    @PrimaryColumn()
    guildId: string;

    @Column()
    prefix: string;
}

export const isPrefixExist = async (
    ds: DataSource,
    guildId: string,
    prefix: string,
): Promise<GuildPrefixEntity | null> => {
    const repo = await ds.getRepository(GuildPrefixEntity);
    const result = await repo.findOneBy({ guildId: guildId, });
    return result;
};

export const setPrefix = async (
    guildId: string,
    prefix: string,
): Promise<boolean> => {
    const repo = await ds.getRepository(GuildPrefixEntity);
    if (await isPrefixExist(ds, guildId, prefix)) {
        await repo.update(
            { guildId: guildId, },
            { prefix: prefix, },
        );
        return true;
    }

    await repo.insert({
        guildId,
        prefix,
    });
    return true;
};

export const findPrefixes = async (): Promise<GuildPrefixEntity[]> => {
    const repo = await ds.getRepository(GuildPrefixEntity);
    const result = await repo.find();
    return !result ? [] : result;
};
