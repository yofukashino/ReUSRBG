import { webpack } from "replugged";
import * as Types from "../types";
export const IconClasses = webpack.getByProps("iconItem");
export const InviteActions = webpack.getByProps(
  "acceptInviteAndTransitionToInviteChannel",
) as unknown as Types.InviteActions;
export const BannerClasses = Object.assign(
  {},
  webpack.getByProps("settingsBanner", "profileBannerPremium"),
  webpack.getByProps("avatarWrapperNormal"),
) as unknown as Types.BannerClasses;

export const ClickableModule = webpack.getBySource(
  "renderNonInteractive",
) as unknown as Types.DefaultTypes.ObjectExports;

export const Clickable = webpack.getFunctionBySource(ClickableModule, "handleKeyPress");

export const UserBannerParents = webpack
  .getBySource(/\.displayProfile.*\.profileType/, {
    all: true,
    raw: true,
  })
  .map((m) => m.exports as Types.CanBeAnyObject);
