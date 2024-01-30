import patchAvatars from "./Avatar";
import patchBanners from "./Banners";
export const applyInjections = (): void => {
  patchAvatars();
  patchBanners();
};

export default { applyInjections };
