import { common, components, util } from "replugged";
import { PluginLogger, SettingValues, USRDB } from "../index";
import * as Types from "../types";
const { toast: Toasts } = common;
const { ButtonItem, SwitchItem } = components;
import { USRBG_URL, defaultSettings } from "../lib/consts";
export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, defaultSettings[key]);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};
export const reloadDatabase = async (): Promise<void> => {
  USRDB.clear();
  const USRBG_RESPONSE = await fetch(USRBG_URL);
  const USRBG_JSON = await USRBG_RESPONSE.json();
  for (const USRBG_ITEM of USRBG_JSON) USRDB.set(USRBG_ITEM.uid, USRBG_ITEM);
  PluginLogger.log("Reloaded USRBG Database.");
  Toasts.toast("Reloaded USRBG Database.", Toasts.Kind.SUCCESS);
};
export const Settings = (): Types.ReactElement => {
  return (
    <div>
      <SwitchItem
        note="Show someone's Nitro banner instead of USRBG banner if they have one."
        {...util.useSetting(SettingValues, "nitroBanner", defaultSettings.nitroBanner)}>
        Prioritize Nitro banner
      </SwitchItem>
      <SwitchItem
        note="Show full height banner in settings acccounts page."
        {...util.useSetting(SettingValues, "settingsBanner", defaultSettings.settingsBanner)}>
        Show Full Banner
      </SwitchItem>
      <ButtonItem
        {...{
          button: "Reload Database",
          onClick: () => {
            reloadDatabase();
          },
        }}>
        Reload USRBG database without restarting discord.
      </ButtonItem>
    </div>
  );
};
