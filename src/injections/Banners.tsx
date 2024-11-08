import { webpack } from "replugged";
import { PluginInjector, SettingValues, USRDB } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import USRBGIcon from "../Components/USRBGIcon";
import Types from "../types";

export default async (): Promise<void> => {
  const UserBannerConstructor = await Modules.UserBannerConstructorPromise;
  const loader = webpack.getFunctionKeyBySource(UserBannerConstructor, "backgroundImage:");
  PluginInjector.after(
    UserBannerConstructor,
    loader,
    ([UserBannerArgs]: [Types.UserBannerArgs], res: React.ReactElement) => {
      if (
        UserBannerArgs.bannerHeight !== 100 ||
        UserBannerArgs.bannerWidth !== 660 ||
        !UserBannerArgs.displayProfile?.banner ||
        !SettingValues.get("settingsBanner", defaultSettings.settingsBanner)
      )
        return res;
      res.props.className = `${res.props.className} usrbg`;
      res.props.viewBox = "0 0 660 233";

      return res;
    },
  );
};
