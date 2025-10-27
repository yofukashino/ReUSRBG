import { PluginInjector, PluginLogger } from "@this";
import Modules from "@lib/RequiredModules";

const InjectionNames = ["DisplayProfile.ts", "UserProfileContext.tsx"] as const;

export const applyInjections = async (): Promise<void> => {
  try {
    await Modules.loadModules();
    await Promise.all(InjectionNames.map((name) => import(`./${name}`)));
  } catch (err: unknown) {
    PluginLogger.error(err);
  }
};

export const removeInjections = (): void => {
  PluginInjector.uninjectAll();
};

export default { applyInjections, removeInjections };
