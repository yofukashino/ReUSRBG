import { util } from "replugged";
import { PluginInjector, SettingValues, USRDB } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import USRBGButton from "../Components/USRBGButton";
import Types from "../types";
export default (): void => {
  const { ProfileHeader } = Modules;
  PluginInjector.after(ProfileHeader, "default", (_args, res: Types.ReactTree) => {
    if (!res) return res;
    if (!Array.isArray(res.props.children)) {
      res.props.children = [res.props.children];
    }
    const { user } = (util.findInReactTree(res, (u: Types.ReactTree) => Boolean(u?.user)) ??
      {}) as Types.ReactTree & { user: Types.User };
    if (
      (!user ||
        !USRDB.has(user.id) ||
        (res?.banner && SettingValues.get("nitroBanner", defaultSettings.nitroBanner))) &&
      !res.props.children.some((c) => c?.type?.toString?.()?.includes?.(".Messages.EDIT_PROFILE"))
    )
      return res;
    res.props.children.unshift(<USRBGButton />);
    return res;
  });
};
