import { webpack } from "replugged";
import * as Types from "../types";
export const IconClasses = webpack.getByProps<Types.IconClasses>("iconItem");
export const InviteActions = webpack.getByProps<Types.InviteActions>(
  "acceptInviteAndTransitionToInviteChannel",
);

export const AvatarClasses = webpack.getByProps<Types.AvatarClasses>("avatarWrapperNormal");

export const UserAvatarParent = webpack.getBySource<Types.GenericModule>(
  /\.displayProfile.*\.avatarSrc/,
);

export const { exports: UserBannerParent } = webpack.getBySource<Types.GenericExport>(
  /\.displayProfile.*\.bannerSrc/,
  {
    raw: true,
  },
);

export const { exports: UserBannerConstructor } = webpack.getBySource<Types.GenericExport>(
  ".src).concat",
  { raw: true },
);
