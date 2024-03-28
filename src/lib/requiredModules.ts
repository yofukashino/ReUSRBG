import { webpack } from "replugged";
import Types from "../types";
export const IconClasses = webpack.getByProps<Types.IconClasses>("iconItem");
export const InviteActions = webpack.getByProps<Types.InviteActions>(
  "acceptInviteAndTransitionToInviteChannel",
);

export const AvatarClasses = webpack.getByProps<Types.AvatarClasses>("avatarWrapperNormal");

export const UserAvatarParent = webpack.getByProps<Types.GenericModule>(
  "UserPopoutBadgeList",
  "UserPopoutAvatar",
);

export const { exports: UserBannerParent } = webpack.getBySource<Types.GenericExport>(
  "darkenOnHover:",
  {
    raw: true,
  },
);

export const { exports: UserBannerConstructor } = webpack.getBySource<Types.GenericExport>(
  ".bannerSVGWrapper",
  { raw: true },
);

export const TransitionUtil = webpack.getByProps<Types.TransitionUtil>(
  "transitionTo",
  "transitionToGuild",
);

export const Invite = webpack.getBySource<Types.InviteComponent>(".AnalyticsPages.INVITE_EMBED");
