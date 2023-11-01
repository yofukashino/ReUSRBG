import { PluginInjector, SettingValues, USRDB } from "../index";
import { defaultSettings } from "../lib/consts";
import { UserAvatarParent } from "../lib/requiredModules";

import * as Types from "../types";

export default (): void => {
  PluginInjector.before(UserAvatarParent, "default", (args: [Types.UserAvatarArgs]) => {
    const [UserAvatarArgs] = args;
    if (
      !USRDB.has(UserAvatarArgs.user.id) ||
      (UserAvatarArgs?.user?.premiumType &&
        SettingValues.get("nitroBanner", defaultSettings.nitroBanner))
    )
      return args;
    const { img } = USRDB.get(UserAvatarArgs.user.id);
    if (!UserAvatarArgs.displayProfile) return args;
    Object.defineProperty(UserAvatarArgs.displayProfile, "banner", {
      get: () => img,
      configurable: true,
    });
    return args;
  });
};
