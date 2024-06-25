import { webpack } from "replugged";
import { PluginInjector, SettingValues, USRDB } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Types from "../types";

export default (): void => {
  const { BannerLoader } = Modules;
  const loader = webpack.getFunctionKeyBySource(BannerLoader, ".getPreviewBanner");
  PluginInjector.after(
    BannerLoader,
    loader,
    (
      [{ displayProfile }]: [
        {
          canAnimate: boolean;
          displayProfile: Types.DisplayProfile;
          overrideBannerSrc: string;
          size: number;
        },
      ],
      res: {
        bannerSrc: string;
        status: number;
      },
    ) => {
      if (
        !USRDB.has(displayProfile?.userId) ||
        (displayProfile?._userProfile?.banner &&
          SettingValues.get("nitroBanner", defaultSettings.nitroBanner))
      )
        return res;
      const img = USRDB.get(displayProfile?.userId);
      res.bannerSrc = img;
      return res;
    },
  );
};
