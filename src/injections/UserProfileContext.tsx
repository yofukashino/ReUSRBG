import { util } from "replugged";
import { users as UltimateUserStore } from "replugged/common";
import { PluginInjector, SettingValues, USRDB } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import USRBGButton from "../Components/USRBGButton";
import Types from "../types";
export default (): void => {
  const { UserProfileContext } = Modules;
  PluginInjector.before(UserProfileContext, "render", (args) => {
    const [props] = args;
    const profileHeader = props?.children?.find((c) =>
      /{profileType:\w+,children:\w+}=/.exec(c?.type?.toString()),
    );
    if (
      !profileHeader ||
      !props.user ||
      !USRDB.has(props.user.id) ||
      (props.user?.banner && SettingValues.get("nitroBanner", defaultSettings.nitroBanner))
    )
      return args;
    if (!Array.isArray(profileHeader.props.children)) {
      profileHeader.props.children = [profileHeader.props.children];
    }
    profileHeader.props.children.unshift(<USRBGButton />);
    return args;
  });
};
