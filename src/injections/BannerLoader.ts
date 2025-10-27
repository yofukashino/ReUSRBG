import { webpack } from "replugged";
import { PluginInjector, SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import { BannerLoader } from "@lib/RequiredModules";
import USRDB from "@USRDB";

const loader = webpack.getFunctionKeyBySource(BannerLoader, ".getPreviewBanner");
PluginInjector.after(BannerLoader, loader, ([{ displayProfile, canAnimate }], res) => {
  const nitroBanner =
    displayProfile?._userProfile?.banner &&
    SettingValues.get("nitroBanner", DefaultSettings.nitroBanner);

  if (!USRDB.has(displayProfile?.userId) || nitroBanner) return res;

  const imgSrc = USRDB.get(displayProfile?.userId);
  if (canAnimate) res.bannerSrc = imgSrc;
  res.status = 2;

  return res;
});
