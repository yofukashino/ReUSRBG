import Modules from "../lib/requiredModules";
import injectBannerLoader from "./BannerLoader";
import injectBanners from "./Banners";
import injectDisplayProfileUtils from "./DisplayProfileUtils";
export const applyInjections = async (): Promise<void> => {
  await Modules.loadModules();
  injectBannerLoader();
  injectBanners();
  injectDisplayProfileUtils();
};

export default { applyInjections };
