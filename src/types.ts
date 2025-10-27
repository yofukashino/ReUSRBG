import { types } from "replugged";

import type { WebpackChunkGlobal } from "replugged/dist/types";

import type { IconClasses } from "@lib/RequiredModules/IconClasses";
import type { InviteActions } from "@lib/RequiredModules/InviteActions";
import type { DisplayProfileUtils } from "@lib/RequiredModules/DisplayProfileUtils";
import type { RoutingUtils } from "@lib/RequiredModules/RoutingUtils";
import type { GuildInvite } from "@lib/RequiredModules/Invite";
import type { UserProfileContext } from "@lib/RequiredModules/UserProfileContext";
import type { BannerLoader } from "@lib/RequiredModules/BannerLoader";

import type GeneralDiscordTypes from "discord-types/general";

export namespace Types {
  export import DefaultTypes = types;
  export type User = GeneralDiscordTypes.User;
  export type Message = GeneralDiscordTypes.Message;

  export interface Modules {
    Proxy: Exclude<Modules, "Proxy" | "loadModules">;
    loadModules?: () => Promise<void>;
    BannerLoader?: BannerLoader;
    IconClasses?: IconClasses;
    InviteActions?: InviteActions;
    DisplayProfileUtils?: DisplayProfileUtils;
    RoutingUtils?: RoutingUtils;
    Invite?: { GuildInvite: GuildInvite };
    UserProfileContext?: UserProfileContext;
  }
}
export default Types;

declare global {
  export const webpackChunkdiscord_app: WebpackChunkGlobal;
}
