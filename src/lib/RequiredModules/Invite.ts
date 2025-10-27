import { webpack } from "replugged";
import type Types from "@Types";

export type GuildInvite = React.FC<{
  code: string;
  message: Types.Message;
  getAcceptInviteContext: () => unknown;
}>;

export default {
  GuildInvite: await webpack
    .waitForModule<GuildInvite>(webpack.filters.bySource(".getInviteError"), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find Invite Module");
    }),
};
