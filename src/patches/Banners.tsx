import { webpack } from "replugged";
import { PluginInjector, SettingValues, USRDB } from "../index";
import { defaultSettings, displayProfileGetterList } from "../lib/consts";
import { UserBannerParent } from "../lib/requiredModules";
import USRBGIcon from "../Components/USRBGIcon";
import * as Types from "../types";

export const patchBanners = (): void => {
  const funtionKey = webpack.getFunctionKeyBySource(
    UserBannerParent,
    /\.displayProfile.*\.bannerSrc/,
  ) as unknown as string;
  PluginInjector.before(UserBannerParent, funtionKey, (args: [Types.UserBannerArgs]) => {
    const [UserBannerArgs] = args;
    if (
      !USRDB.has(UserBannerArgs.user.id) ||
      (UserBannerArgs?.displayProfile?._userProfile?.banner &&
        SettingValues.get("nitroBanner", defaultSettings.nitroBanner))
    )
      return args;
    const { img } = USRDB.get(UserBannerArgs.user.id);
    UserBannerArgs.bannerSrc = img;
    if (!UserBannerArgs.displayProfile) return args;
    const originalGetterProperties = Object.fromEntries(
      displayProfileGetterList.map((key) => [key, UserBannerArgs.displayProfile[key]]),
    );
    for (const key in originalGetterProperties)
      Object.defineProperty(UserBannerArgs.displayProfile, key, {
        get: () => originalGetterProperties[key],
        configurable: true,
      });
    Object.defineProperty(UserBannerArgs.displayProfile, "premiumType", {
      get: () => 2,
      configurable: true,
    });
    PluginInjector.instead(UserBannerArgs.displayProfile, "getBannerURL", () => img);
    return args;
  });

  PluginInjector.after(
    UserBannerParent,
    funtionKey,
    (args: [Types.UserBannerArgs], res: Types.ReactElement) => {
      const [UserBannerArgs] = args;
      if (
        !USRDB.has(UserBannerArgs.user.id) ||
        (UserBannerArgs?.displayProfile?._userProfile?.banner &&
          SettingValues.get("nitroBanner", defaultSettings.nitroBanner))
      )
        return res;
      res.props.hasBannerImage = true;
      res.props.isPremium = true;
      res.props.children.props.children = [<USRBGIcon />];
      return res;
    },
  );
};
