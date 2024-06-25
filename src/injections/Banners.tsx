import { webpack } from "replugged";
import { PluginInjector, SettingValues, USRDB } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import USRBGIcon from "../Components/USRBGIcon";
import Types from "../types";

export const injectUserBannerConstructor = (): void => {
  const { UserBannerConstructor } = Modules;
  const loader = webpack.getFunctionKeyBySource(UserBannerConstructor, "profileType:");
  PluginInjector.after(
    UserBannerConstructor,
    loader,
    ([UserBannerArgs]: [Types.UserBannerArgs], res: React.ReactElement) => {
      if (
        UserBannerArgs.profileType !== "SETTINGS" ||
        !UserBannerArgs.hasBanner ||
        !SettingValues.get("settingsBanner", defaultSettings.settingsBanner)
      )
        return res;
      res.props.className = `${res.props.className} usrbg`;
      res.props.viewBox = "0 0 660 233";
      return res;
    },
  );
};

export const injectUserBannerParent = (): void => {
  const { UserBannerParent } = Modules;
  const loader = webpack.getFunctionKeyBySource(UserBannerParent, "displayProfile:");
  PluginInjector.after(
    UserBannerParent,
    loader,
    ([UserBannerArgs]: [Types.UserBannerArgs], res: React.ReactElement) => {
      if (
        !USRDB.has(UserBannerArgs.user.id) ||
        (UserBannerArgs?.user?.banner &&
          SettingValues.get("nitroBanner", defaultSettings.nitroBanner))
      )
        return res;
      res.props.hasBannerImage = true;
      res.props.isPremium = true;
      res.props.children.props.children = res.props.children.props.children
        .filter(Boolean)
        .filter(
          (c) =>
            !c?.type?.toString?.()?.includes?.("pencil") &&
            !c?.type?.toString?.()?.includes?.("NITRO_BADGE") &&
            !c?.props?.children?.toString?.()?.includes?.("pencil") &&
            !c?.props?.children?.toString?.()?.includes?.("NITRO_BADGE"),
        );
      res.props.children.props.children.unshift(<USRBGIcon />);
      return res;
    },
  );
};

export default (): void => {
  injectUserBannerConstructor();
  injectUserBannerParent();
};
