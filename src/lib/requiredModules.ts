import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.IconClasses ??= await webpack
    .waitForProps<Types.IconClasses>(["iconItem"], {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find IconClasses Module");
    });

  Modules.InviteActions ??= await webpack
    .waitForProps<Types.InviteActions>(["acceptInviteAndTransitionToInviteChannel"], {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find InviteActions Module");
    });

  Modules.DisplayProfileUtils ??= await webpack
    .waitForProps<Types.DisplayProfileUtils>(["getDisplayProfile"], { timeout: 10000 })
    .catch(() => {
      throw new Error("Failed To Find DisplayProfileUtils Module");
    });

  Modules.UserBannerParent ??= await webpack
    .waitForModule<Types.GenericExport>(webpack.filters.bySource("darkenOnHover:"), {
      raw: true,
      timeout: 10000,
    })
    .then(({ exports }) => exports)
    .catch(() => {
      throw new Error("Failed To Find UserBannerParent Module");
    });

  Modules.UserBannerConstructor ??= await webpack
    .waitForModule<Types.GenericExport>(webpack.filters.bySource(".bannerSVGWrapper"), {
      raw: true,
      timeout: 10000,
    })
    .then(({ exports }) => exports)
    .catch(() => {
      throw new Error("Failed To Find UserBannerConstructor Module");
    });

  Modules.TransitionUtil ??= await webpack
    .waitForProps<Types.TransitionUtil>(["transitionTo", "transitionToGuild"], { timeout: 10000 })
    .catch(() => {
      throw new Error("Failed To Find TransitionUtil Module");
    });

  Modules.Invite ??= await webpack
    .waitForModule<Types.InviteComponent>(
      webpack.filters.bySource(".AnalyticsPages.INVITE_EMBED"),
      { timeout: 10000 },
    )
    .catch(() => {
      throw new Error("Failed To Find Invite Module");
    });

  Modules.BannerLoader ??= await webpack
    .waitForProps<Types.BannerLoader>(["BannerLoadingStatus"], {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find BannerLoader Module");
    });

  Modules.HeaderButton ??= await webpack
    .waitForModule<Types.HeaderButton>(webpack.filters.bySource('.banner]:"banner"==='), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find HeaderButton Module");
    });

  Modules.UserProfileContext ??= await webpack
    .waitForModule<Types.UserProfileContext>(
      webpack.filters.bySource(".UserProfileThemeContextProvider"),
      { timeout: 10000 },
    )
    .catch(() => {
      throw new Error("Failed To Find UserProfileContext Module");
    });
};

export default Modules;
