/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { Injector, Logger, components, settings } from "replugged";
import {
  BannerClasses,
  Clickable,
  IconClasses,
  UserBannerParents,
} from "./lib/requiredModules.jsx";
import { USBBG_SERVER_INVITE_CODE, USRBG_URL, defaultSettings } from "./lib/consts.jsx";
import * as Utils from "./lib/utils.jsx";
import "./style.css";
const { Tooltip } = components;
const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("ReUSRBG");
const USRBG_response = await fetch(USRBG_URL);
const USRBG_json = await USRBG_response.json();
const USRDB = new Map(USRBG_json.map((user) => [user.uid, user]));
PluginLogger.log("Loaded USRBG Database.");
export const usrbg = await settings.init("Tharki.ReUSRBG", defaultSettings);
const theUSRBGIcon = () => {
  return (
    <Tooltip
      text="USRBG Banner"
      {...{
        className: `${IconClasses.iconItem} usr-bg-icon-clickable`,
        onClick: () =>
          InviteActions.acceptInviteAndTransitionToInviteChannel({
            inviteKey: USBBG_SERVER_INVITE_CODE,
          }),
        style: {
          display: "block",
          position: "absolute",
          right: "10px",
          top: "1px",
        },
      }}>
      <svg {...{ class: IconClasses.actionIcon, viewBox: "0 0 24 24" }}>
        <path
          fill="currentColor"
          d="M6 16.938v2.121L5.059 20h-2.12L6 16.938Zm16.002-2.503v2.122L18.56 20h-.566v-1.557l4.008-4.008ZM8.75 14h6.495a1.75 1.75 0 0 1 1.744 1.607l.006.143V20H7v-4.25a1.75 1.75 0 0 1 1.606-1.744L8.75 14Zm-.729-3.584c.06.579.243 1.12.523 1.6L2 18.56v-2.122l6.021-6.022Zm13.98-.484v2.123l-4.007 4.01v-.315l-.004-.168a2.734 2.734 0 0 0-.387-1.247l4.399-4.403ZM12.058 4 2 14.06v-2.121L9.936 4h2.12Zm9.945 1.432v2.123l-5.667 5.67a2.731 2.731 0 0 0-.86-.216l-.23-.009h-.6a4.02 4.02 0 0 0 .855-1.062l6.502-6.506ZM12 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM7.559 4l-5.56 5.56V7.438L5.439 4h2.12Zm13.498 0-5.148 5.149a3.98 3.98 0 0 0-.652-1.47L18.935 4h2.122Zm-4.498 0-2.544 2.544a3.974 3.974 0 0 0-1.6-.522L14.438 4h2.122Z"></path>
      </svg>
    </Tooltip>
  );
};
const applyInjections = () => {
  for (const [UserBanner, FunctionKey] of UserBannerParents) {
    PluginInjector.before(UserBanner, FunctionKey, ([args]) => {
      if (
        !USRDB.has(args.user.id) ||
        (args?.displayProfile?.premiumType && usrbg.get("nitroBanner", defaultSettings.nitroBanner))
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
        (args?.displayProfile?.premiumType && usrbg.get("nitroBanner", defaultSettings.nitroBanner))
      )
        return;
      res.props.isPremium = true;

      res.props.children.props.children = [theUSRBGIcon()];
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
  applyInjections();
};

export const stop = () => {
  PluginInjector.uninjectAll();
};
export { Settings } from "./Components/Settings.jsx";
