import { util } from "replugged";
import { toast as Toasts } from "replugged/common";
import { Button, ButtonItem, SwitchItem } from "replugged/components";
import { PluginLogger, SettingValues, USRDB } from "../index";
import { defaultSettings } from "../lib/consts";
import Utils from "../lib/utils";
import Types from "../types";

export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value`, defaultSettings[key]);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};
export const reloadDatabase = async (): Promise<void> => {
  USRDB.clear();
  await Utils.loadUSRBD(true);
  Toasts.toast("Reloaded USRBG Database.", Toasts.Kind.SUCCESS);
};
export const Settings = (): React.ReactElement => {
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
        button="Reload Database"
        onClick={() => {
          reloadDatabase();
        }}>
        Reload USRBG database without restarting discord.
      </ButtonItem>
    </div>
  );
};

export default { registerSettings, reloadDatabase, Settings };
