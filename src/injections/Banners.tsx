import { PluginInjector, SettingValues, USRDB } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import USRBGIcon from "../Components/USRBGIcon";
import Types from "../types";

export default (): void => {
  const { UserBannerConstructor, UserBannerParent } = Modules;
  PluginInjector.after(
    UserBannerParent,
    "default",
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

  PluginInjector.after(
    UserBannerConstructor,
    "default",
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
