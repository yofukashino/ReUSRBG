import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.IconClasses ??= await webpack.waitForProps<Types.IconClasses>("iconItem");
  Modules.InviteActions ??= await webpack.waitForProps<Types.InviteActions>(
    "acceptInviteAndTransitionToInviteChannel",
  );
  Modules.DisplayProfileUtils ??= await webpack.waitForProps<Types.DisplayProfileUtils>(
    "getDisplayProfile",
  );
  Modules.UserBannerParent ??= await webpack
    .waitForModule<Types.GenericExport>(webpack.filters.bySource("darkenOnHover:"), {
      raw: true,
    })
    .then(({ exports }) => exports);
  Modules.UserBannerConstructor ??= await webpack
    .waitForModule<Types.GenericExport>(webpack.filters.bySource(".bannerSVGWrapper"), {
      raw: true,
    })
    .then(({ exports }) => exports);
  Modules.TransitionUtil ??= await webpack.waitForProps<Types.TransitionUtil>(
    "transitionTo",
    "transitionToGuild",
  );
  Modules.Invite ??= await webpack.waitForModule<Types.InviteComponent>(
    webpack.filters.bySource(".AnalyticsPages.INVITE_EMBED"),
  );
  Modules.BannerLoader ??= await webpack.waitForProps<Types.BannerLoader>("BannerLoadingStatus");
};

export default Modules;
