import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "required_permission", })
export class RequiredPermissionsEntity {
    @PrimaryColumn()
    guildId: string;

    @PrimaryColumn()
    cmdId: string;

    @PrimaryColumn()
    permission: string;
}
