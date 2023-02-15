import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "custom_command", })
export class CustomCommandEntity {
    @PrimaryColumn()
    guildId: string;

    @Column()
    cmdId: string;

    @Column()
    response: string;
}
