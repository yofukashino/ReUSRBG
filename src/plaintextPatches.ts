import Types from "./types";
export default [
  {
    replacements: [
      {
        match: /(\(0,.\.\w+\)\(.\))&&(\(0,..jsx\)\(.\..,{className:.\.gifTag)/,
        replace: (_: string, prefix: string, suffix: string) =>
          `(replugged.plugins.getExports("dev.tharki.ReUSRBG")._isAnimatedUSRBG(arguments[0]?.user?.id)||${prefix})&&${suffix}`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
