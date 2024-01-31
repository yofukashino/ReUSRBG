import { PluginInjector, SettingValues, USRDB } from "../index";
import Consts from "../lib/consts";
import { UserBannerConstructor, UserBannerParent } from "../lib/requiredModules";
import USRBGIcon from "../Components/USRBGIcon";
import Types from "../types";

export default (): void => {
  PluginInjector.before(UserBannerParent, "default", (args: [Types.UserBannerArgs]) => {
    const [UserBannerArgs] = args;
    if (
      !USRDB.has(UserBannerArgs.user.id) ||
      (UserBannerArgs?.displayProfile?._userProfile?.banner &&
        SettingValues.get("nitroBanner", Consts.defaultSettings.nitroBanner))
    )
      return args;
    const { img } = USRDB.get(UserBannerArgs.user.id);
    UserBannerArgs.bannerSrc = img;
    if (!UserBannerArgs.displayProfile) return args;
    const originalPremiumProps = Object.fromEntries(
      Object.getOwnPropertyNames(Object.getPrototypeOf(UserBannerArgs.displayProfile))
        .filter((key) => typeof UserBannerArgs.displayProfile[key] !== "function")
        .map((key) => [key, UserBannerArgs.displayProfile[key]]),
    );
    for (const key in originalPremiumProps)
      Object.defineProperty(UserBannerArgs.displayProfile, key, {
        get: () => originalPremiumProps[key],
        configurable: true,
      });
    Object.defineProperty(UserBannerArgs.displayProfile, "premiumType", {
      get: () => 2,
      configurable: true,
    });
    UserBannerArgs.displayProfile.getBannerURL = () => img;
    return args;
  });

  PluginInjector.after(
    UserBannerParent,
    "default",
    (args: [Types.UserBannerArgs], res: React.ReactElement) => {
      const [UserBannerArgs] = args;
      if (
        !USRDB.has(UserBannerArgs.user.id) ||
        (UserBannerArgs?.displayProfile?._userProfile?.banner &&
          SettingValues.get("nitroBanner", Consts.defaultSettings.nitroBanner))
      )
        return res;
      res.props.hasBannerImage = true;
      res.props.isPremium = true;
      res.props.children.props.children = res.props.children.props.children
        .filter(Boolean)
        .filter((c) => !c?.props?.children?.toString?.()?.includes?.("pencil"));
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
        !SettingValues.get("settingsBanner", Consts.defaultSettings.settingsBanner)
      )
        return res;
      res.props.className = `${res.props.className} usrbg`;
      res.props.viewBox = "0 0 660 233";
      return res;
    },
  );
};
