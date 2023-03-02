import { webpack } from "replugged";
import * as Types from "../types";
export const IconClasses = webpack.getByProps("iconItem");
export const InviteActions = webpack.getByProps(
  "acceptInviteAndTransitionToInviteChannel",
) as unknown as Types.InviteActions;

export const AvatarClasses = webpack.getByProps("avatarWrapperNormal");

export const UserAvatarParent = webpack.getBySource(
  /\.displayProfile.*\.avatarSrc/,
) as unknown as Types.GenericModule;

export const { exports: UserBannerParent } = webpack.getBySource(/\.displayProfile.*\.bannerSrc/, {
  raw: true,
}) as Types.GenericExport;
