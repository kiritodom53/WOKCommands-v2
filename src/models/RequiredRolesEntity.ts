import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "required_roles", })
export class RequiredRolesEntity {
    @PrimaryColumn()
    guildId: string;

    @PrimaryColumn()
    cmdId: string;

    @PrimaryColumn()
    roleId: string;
}
