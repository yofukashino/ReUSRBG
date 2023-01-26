import { webpack as Webpack } from "replugged";
import * as Utils from "./utils.jsx";
export const IconClasses = Webpack.getByProps("iconItem");
export const InviteActions = Webpack.getByProps("acceptInviteAndTransitionToInviteChannel");
export const BannerClasses = Object.assign(
  {},
  Webpack.getByProps("settingsBanner", "profileBannerPremium"),
  Webpack.getByProps("avatarWrapperNormal"),
);
const ClickableStrings = [".ENTER", "preventDefault", ").handleKeyPress"];
export const ClickableModule = Webpack.getModule((m) =>
  ClickableStrings.every(
    (s) =>
      Utils.isObject(m?.exports) &&
      Object.values(m?.exports).some((n) => n?.toString?.().includes(s)),
  ),
);

const ClickableFunctionKey = Utils.getFunctionKeyFromStrings(ClickableModule, ClickableStrings);
export const { [ClickableFunctionKey]: Clickable } = ClickableModule;
const BannerModuleStrings = ["profileType", "displayProfile"];
const UserBannerParentsModules = Webpack.getModule(
  (m) =>
    BannerModuleStrings.every(
      (s) =>
        Utils.isObject(m?.exports) &&
        Object.values(m?.exports).some((n) => n?.toString?.().includes(s)),
    ),
  { all: true, raw: true },
);
export const UserBannerParents = UserBannerParentsModules.map((UserBanner) => [
  UserBanner.exports,
  Utils.getFunctionKeyFromStrings(UserBanner.exports, BannerModuleStrings),
]);
