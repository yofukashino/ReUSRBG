/* eslint-disable consistent-return */
/* eslint-disable camelcase */

import { Injector, Logger, settings } from "replugged";
import { BannerClasses, Clickable, UserBannerParents } from "./lib/requiredModules.jsx";
import { USRBG_URL, defaultSettings } from "./lib/consts.jsx";
import * as Utils from "./lib/utils.jsx";
import { registerSettings } from "./Components/Settings.jsx";
import { USRBGIcon } from "./Components/USRBGIcon.jsx";
import "./style.css";

const PluginInjector = new Injector();

export const PluginLogger = Logger.plugin("ReUSRBG");

const USRBG_response = await fetch(USRBG_URL);
const USRBG_json = await USRBG_response.json();
const USRDB = new Map(USRBG_json.map((user) => [user.uid, user]));
PluginLogger.log("Loaded USRBG Database.");

export const SettingValues = await settings.init("Tharki.ReUSRBG", defaultSettings);

const applyInjections = () => {
  for (const [UserBanner, FunctionKey] of UserBannerParents) {
    PluginInjector.before(UserBanner, FunctionKey, ([args]) => {
      if (
        !USRDB.has(args.user.id) ||
        (args?.displayProfile?.premiumType &&
          SettingValues.get("nitroBanner", defaultSettings.nitroBanner))
      )
        return;
      const img = USRDB.get(args.user.id)?.img;
      args.bannerSrc = img;
      if (!args.displayProfile) return;
      PluginInjector.instead(args.displayProfile, "getBannerURL", () => img);
    });
    PluginInjector.after(UserBanner, FunctionKey, ([args], res) => {
      if (
        !USRDB.has(args.user.id) ||
        (args?.displayProfile?.premiumType &&
          SettingValues.get("nitroBanner", defaultSettings.nitroBanner))
      )
        return;
      res.props.isPremium = true;
      res.props.children.props.children = [USRBGIcon];
    });
  }
  PluginInjector.after(Clickable.prototype, "render", (args, res) => {
    const wrapper = res?.props?.children;
    if (!wrapper?.props?.className?.includes?.(BannerClasses.avatarWrapperNormal)) return;
    const UserId = Utils.findInReactTree(wrapper, "src")?.split("/")[4];
    if (!USRDB.has(UserId)) return res;
    res.props.children.props.className += ` ${BannerClasses.avatarPositionPremiumBanner}`;
    return res;
  });
};

export const start = () => {
  registerSettings();
  applyInjections();
};

export const stop = () => {
  PluginInjector.uninjectAll();
};

export { Settings } from "./Components/Settings.jsx";
