import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "cooldown", })
export class CooldownEntity {
    @PrimaryColumn()
    guildId: string;

    @Column()
    cmdId: string;

    @Column()
    expires: Date;
}
