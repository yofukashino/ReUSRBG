import Types from "./types";
export default [
  {
    find: /bannerWidth:\i,bannerHeight:\i/,
    replacements: [
      {
        match: /(\(0,\i\.\i\)\(\i\))&&(\(0,\i\.jsx\)\(\i\.\i,{className:\i\.gifTag)/,
        replace: (_: string, prefix: string, suffix: string) =>
          `($exports._isAnimatedUSRBG?.(arguments[0]?.user?.id)||${prefix})&&${suffix}`,
      },
    ],
  },
  {
    find: "UserSettingsAccountProfileCard",
    replacements: [
      {
        match: /themePadding:0/,
        replace: () => `themePadding:0,...($exports._getSettingBannerProps?.("BANNER")??{})`,
      },
      {
        match: /className:\i\.avatar/,
        replace: (prefix) => `${prefix}+($exports._getSettingBannerProps?.("AVATAR")??"")`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
