import { Injector, Logger, settings, webpack } from "replugged";
import { BannerClasses, Clickable, UserBannerParents } from "./lib/requiredModules";
import { USRBG_URL, defaultSettings } from "./lib/consts";
import * as Utils from "./lib/utils";
import { registerSettings } from "./Components/Settings";
import { USRBGIcon } from "./Components/USRBGIcon";
import "./style.css";
import * as Types from "./types";

const PluginInjector = new Injector();

export const PluginLogger = Logger.plugin("ReUSRBG");

const USRBG_RESPONSE = await fetch(USRBG_URL);
const USRBG_JSON = await USRBG_RESPONSE.json();
const USRDB = new Map(
  USRBG_JSON.map((user: Types.USRBD_USER) => [user.uid, user]),
) as unknown as Map<string, Types.USRBD_USER>;
PluginLogger.log("Loaded USRBG Database.");

export const SettingValues = await settings.init("Tharki.ReUSRBG", defaultSettings);

const applyInjections = (): void => {
  for (const UserBannerParent of UserBannerParents) {
    const funtionKey = webpack.getFunctionKeyBySource(
      UserBannerParent,
      /\.displayProfile.*\.profileType/,
    ) as unknown as string;
    PluginInjector.before(UserBannerParent, funtionKey, (args) => {
      const UserBannerArgs = args[0] as Types.UserBannerArgs;
      if (
        !USRDB.has(UserBannerArgs.user.id) ||
        (UserBannerArgs?.displayProfile?.premiumType &&
          SettingValues.get("nitroBanner", defaultSettings.nitroBanner))
      )
        return;
      const img = USRDB.get(UserBannerArgs.user.id)?.img;
      UserBannerArgs.bannerSrc = img;
      if (!UserBannerArgs.displayProfile) return;
      PluginInjector.instead(UserBannerArgs.displayProfile, "getBannerURL", () => img);
    });
    PluginInjector.after(UserBannerParent, funtionKey, (args, res: Types.ReactElement) => {
      const UserBannerArgs = args[0] as Types.UserBannerArgs;
      if (
        !USRDB.has(UserBannerArgs.user.id) ||
        (UserBannerArgs?.displayProfile?.premiumType &&
          SettingValues.get("nitroBanner", defaultSettings.nitroBanner))
      )
        return;
      res.props.isPremium = true;
      res.props.children.props.children = [USRBGIcon];
    });
  }
  PluginInjector.after(Clickable.prototype, "render", (_args, res) => {
    const wrapper = res?.props?.children;
    if (!wrapper?.props?.className?.includes?.(BannerClasses.avatarWrapperNormal)) return;
    const IdWrapper = Utils.findInReactTree(wrapper, "src") as string;
    const UserId = IdWrapper?.split("/")[4];
    if (!USRDB.has(UserId)) return res;
    res.props.children.props.className += BannerClasses.avatarPositionPremiumBanner;
    return res;
  });
};

export const start = (): void => {
  registerSettings();
  applyInjections();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
};

export { Settings } from "./Components/Settings";
