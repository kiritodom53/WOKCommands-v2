import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "command_log", })
export class CommandLogEntity {
    @PrimaryColumn({ unique: true, })
    guildId: string;

    @PrimaryColumn()
    commandId: string;

    @PrimaryColumn()
    userId: string;

    @Column("varchar", { nullable: true, })
    data!: string | null;

    @Column()
    cmdType: string;

    @PrimaryColumn()
    triggeredAtCTS: Date;

    @Column()
    triggeredAtUTS: string;
}
