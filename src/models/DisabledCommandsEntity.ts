import { Entity, PrimaryColumn } from "typeorm";
import { ds } from "../DCMD";

@Entity({ name: "disabled_command", })
export class DisabledCommandsEntity {
    @PrimaryColumn()
    guildId: string;
    @PrimaryColumn()
    cmdName: string;
}

export const findDisabledCommand = async (): Promise<DisabledCommandsEntity[]> => {
    const repo = await ds.getRepository(DisabledCommandsEntity);
    const result = await repo.find();
    return !result ? [] : result;
};
