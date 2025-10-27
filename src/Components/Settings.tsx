import { util } from "replugged";
import { toast as Toasts } from "replugged/common";
import { ButtonItem, FormNotice, Stack, Switch, Text } from "replugged/components";
import { PluginLogger, SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import Instruction from "@components/Instruction";
import USRDB from "@USRDB";

export const registerSettings = (): void => {
  type DefaultSettings = typeof DefaultSettings;
  type key = keyof DefaultSettings;
  type value = DefaultSettings[key];

  for (const key in DefaultSettings) {
    if (SettingValues.has(key as key)) return;
    PluginLogger.log(`Adding new setting ${key} with value ${DefaultSettings[key]}.`);
    SettingValues.set(key as key, DefaultSettings[key] as value);
  }
};

export const reloadDatabase = async (): Promise<void> => {
  await USRDB.load(true);
  Toasts.toast("Reloaded USRBG Database.", Toasts.Kind.SUCCESS);
};

export const Settings = (): React.ReactElement => {
  return (
    <Stack gap={24}>
      <Switch
        label="Prioritize Nitro banner"
        description="Show someone's Nitro banner instead of USRBG banner if they have one."
        {...util.useSetting(SettingValues, "nitroBanner", DefaultSettings.nitroBanner)}
      />
      <Switch
        label="Show Full Banner"
        description="Show full height banner in settings acccounts page."
        {...util.useSetting(SettingValues, "settingsBanner", DefaultSettings.settingsBanner)}
      />
      <ButtonItem
        label="Reload USRBG database without restarting discord."
        button="Reload Database"
        onClick={() => {
          void reloadDatabase();
        }}
      />

      <FormNotice
        // @ts-expect-error this accepts react element and is required otherwise wrong color
        title={<Text>⋆｡ ﾟ☁︎｡ ⋆｡ ﾟ☾ ﾟ｡ ⋆ How to request your own USRBG banner</Text>}
        body={<Instruction />}
        className="usrbg-instructions"
        iconClassName="usrbg-instructions-image"
        imageData={{
          height: 102,
          width: 102,
          position: "right",
          src: "https://i.imgur.com/nDtUcX5.gif",
        }}
        type={FormNotice.Types.CUSTOM}></FormNotice>
    </Stack>
  );
};

export default { registerSettings, reloadDatabase, Settings };
