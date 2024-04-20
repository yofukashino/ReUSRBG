import Modules from "../lib/requiredModules";
import patchAvatars from "./Avatar";
import patchBanners from "./Banners";
export const applyInjections = async (): Promise<void> => {
  await Modules.loadModules();
  patchAvatars();
  patchBanners();
};

export default { applyInjections };
