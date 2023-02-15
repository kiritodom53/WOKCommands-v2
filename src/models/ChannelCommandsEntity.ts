import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "channel_command", })
export class ChannelCommandsEntity {
    @PrimaryColumn()
    guildId: string;

    @PrimaryColumn()
    commandId: string;

    @PrimaryColumn()
    channelId: string;
}
