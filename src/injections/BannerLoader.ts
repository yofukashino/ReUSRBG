import { PluginInjector, SettingValues, USRDB } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";

export default (): void => {
  const { BannerLoader } = Modules;
  PluginInjector.after(BannerLoader, "default", ([{ displayProfile }], res) => {
    if (
      !USRDB.has(displayProfile?.userId) ||
      (displayProfile?._userProfile?.banner &&
        SettingValues.get("nitroBanner", defaultSettings.nitroBanner))
    )
      return res;
    const { img } = USRDB.get(displayProfile?.userId);
    res.bannerSrc = img;
    return res;
  });
};
