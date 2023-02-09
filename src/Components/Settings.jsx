import { common, components, util } from "replugged";
import { PluginLogger, SettingValues } from "../index.jsx";
const { SwitchItem } = components;
const { React } = common;
import { defaultSettings } from "../lib/consts.jsx";
export const registerSettings = () => {
  for (const [key, value] of Object.entries(defaultSettings)) {
    if (SettingValues.has(key)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, value);
    SettingValues.set(key, value);
  }
};

export const Settings = () => {
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
