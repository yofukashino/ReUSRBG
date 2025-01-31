import Modules from "../lib/requiredModules";
import injectBannerLoader from "./BannerLoader";
import injectBanners from "./Banners";
import injectDisplayProfileUtils from "./DisplayProfileUtils";
import injectUserProfileContext from "./UserProfileContext";
export const applyInjections = async (): Promise<void> => {
  await Modules.loadModules();
  injectBannerLoader();
  void injectBanners();
  injectDisplayProfileUtils();
  injectUserProfileContext();
};

export default { applyInjections };
