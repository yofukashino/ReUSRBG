import { common, components, util } from "replugged";
import { PluginLogger, usrbg } from "../index.jsx";
const { SwitchItem } = components;
const { React } = common;
import { defaultSettings } from "../lib/consts.jsx";
export const registerSettings = () => {
  for (const [key, value] of Object.entries(defaultSettings)) {
    if (usrbg.has(key)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, value);
    usrbg.set(key, value);
  }
};

export const Settings = () => {
  return (
    <div>
      <SwitchItem
        note="Show someone's Nitro banner instead of USRBG banner if they have one."
        {...util.useSetting(usrbg, "nitroBanner")}>
        Prioritize Nitro banner
      </SwitchItem>
    </div>
  );
};
