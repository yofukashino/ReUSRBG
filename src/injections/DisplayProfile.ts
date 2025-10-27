import { PluginInjector, SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import { DisplayProfile } from "@lib/RequiredModules";
import USRDB from "@USRDB";
import Utils from "@Utils";

PluginInjector.after(
  DisplayProfile.prototype,
  "getBannerURL",
  ([{ canAnimate }], res, instance: typeof DisplayProfile) => {
    const nitroBanner =
      instance?.banner && SettingValues.get("nitroBanner", DefaultSettings.nitroBanner);

    if (!USRDB.has(instance.userId) || nitroBanner) return res;

    return canAnimate ? USRDB.get(instance.userId) : Utils.tryUSRDBStatic(instance.userId);
  },
);
