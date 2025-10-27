import { webpack } from "replugged";
import { PluginInjector, SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import { DisplayProfileUtils } from "@lib/RequiredModules";
import USRDB from "@USRDB";
import Utils from "@Utils";

const loader = webpack.getFunctionKeyBySource(DisplayProfileUtils, /\w+\)\(\[\w+\.default/);

PluginInjector.after(DisplayProfileUtils, loader, ([userId], res) => {
  const nitroBanner = res?.banner && SettingValues.get("nitroBanner", DefaultSettings.nitroBanner);

  if (!res || !USRDB.has(userId) || nitroBanner) return res;

  res.banner ??= res.userId;
  res.getBannerURL = () => {
    return Utils.tryUSRDBStatic(userId);
  };

  return res;
});
