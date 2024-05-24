import { PluginInjector, SettingValues, USRDB } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";

export default (): void => {
  const { DisplayProfileUtils } = Modules;
  PluginInjector.after(DisplayProfileUtils, "default", ([userId], res) => {
    if (
      !USRDB.has(userId) ||
      (res?.banner && SettingValues.get("nitroBanner", defaultSettings.nitroBanner))
    )
      return res;
    res.banner ??= res.userId;
    return res;
  });
};
