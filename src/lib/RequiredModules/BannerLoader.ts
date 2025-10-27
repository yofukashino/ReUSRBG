import type Types from "@Types";
import { webpack } from "replugged";
import type { DisplayProfile } from "./DisplayProfileUtils";

export type BannerLoader = Record<
  string,
  (user: {
    canAnimate: boolean;
    displayProfile: DisplayProfile;
    overrideBannerSrc: string;
    size: number;
  }) => {
    bannerSrc: string;
    status: number;
  }
>;

export default await webpack
  .waitForModule<Types.DefaultTypes.RawModule<BannerLoader>>(
    webpack.filters.bySource('"SHOULD_LOAD"'),
    {
      timeout: 10000,
      raw: true,
    },
  )
  .then(({ exports }) => exports)
  .catch(() => {
    throw new Error("Failed To Find BannerLoader Module");
  });
