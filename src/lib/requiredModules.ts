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
    .waitForModule<Types.DisplayProfileUtils>(
      webpack.filters.bySource(/getUser\(.\),.=.\.getUserProfile/),
      { timeout: 10000 },
    )
    .catch(() => {
      throw new Error("Failed To Find DisplayProfileUtils Module");
    });

  Modules.RoutingUtilsModule ??= await webpack
    .waitForModule<Types.GenericModule>(
      webpack.filters.bySource("transitionTo - Transitioning to"),
      { timeout: 10000 },
    )
    .catch(() => {
      throw new Error("Failed To Find RoutingUtils Module");
    });

  Modules.RoutingUtils ??= {
    back: webpack.getFunctionBySource(Modules.RoutingUtilsModule, "goBack()"),
    forward: webpack.getFunctionBySource(Modules.RoutingUtilsModule, "goForward()"),
    getFingerprintLocation: webpack.getFunctionBySource(Modules.RoutingUtilsModule, ".REJECT_IP"),
    isValidFingerprintRoute: webpack.getFunctionBySource(Modules.RoutingUtilsModule, ".HANDOFF"),
    replaceWith: webpack.getFunctionBySource(Modules.RoutingUtilsModule, "Replacing route with"),
    transitionTo: webpack.getFunctionBySource(
      Modules.RoutingUtilsModule,
      "transitionTo - Transitioning to",
    ),
    transitionToGuild: webpack.getFunctionBySource(
      Modules.RoutingUtilsModule,
      "transitionToGuild - Transitioning to",
    ),
  };

  Modules.Invite ??= await webpack
    .waitForModule<Types.InviteComponent>(webpack.filters.bySource(".getInviteError"), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find Invite Module");
    });

  Modules.BannerLoader ??= await webpack
    .waitForModule<Types.GenericExport>(webpack.filters.bySource('="SHOULD_LOAD"'), {
      timeout: 10000,
      raw: true,
    })
    .then(({ exports }) => exports)
    .catch(() => {
      throw new Error("Failed To Find BannerLoader Module");
    });

  Modules.HeaderButton ??= await webpack
    .waitForModule(webpack.filters.bySource(".bannerColor,"), {
      timeout: 10000,
    })
    .then((mod) =>
      webpack.getFunctionBySource<Types.HeaderButton>(mod, /{className:.,innerClassName:.,....}/),
    )
    .catch(() => {
      throw new Error("Failed To Find HeaderButton Module");
    });

  Modules.UserProfileContext ??= await webpack
    .waitForModule<Types.UserProfileContext>(
      webpack.filters.bySource(".ThemeContextProvider,{theme:null!="),
      {
        timeout: 10000,
      },
    )
    .catch(() => {
      throw new Error("Failed To Find UserProfileContext Module");
    });

  Modules.UserBannerConstructorPromise ??= webpack
    .waitForModule<Types.GenericExport>(
      webpack.filters.bySource(".canUsePremiumProfileCustomization)||!1;"),
      {
        raw: true,
      },
    )
    .then(({ exports }) => exports)
    .catch(() => {
      throw new Error("Failed To Find UserBannerConstructor Module");
    });
};

export default Modules;
