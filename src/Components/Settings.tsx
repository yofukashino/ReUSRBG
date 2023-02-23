import { components, util } from "replugged";
import { PluginLogger, SettingValues } from "../index";
import * as Types from "../types";
const { SwitchItem } = components;
import { defaultSettings } from "../lib/consts";
export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, defaultSettings[key]);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};

export const Settings = (): Types.ReactElement => {
  return (
    <div>
      <SwitchItem
        note="Show someone's Nitro banner instead of USRBG banner if they have one."
        {...util.useSetting(SettingValues, "nitroBanner", defaultSettings.nitroBanner)}>
        Prioritize Nitro banner
      </SwitchItem>
    </div>
  );
};
