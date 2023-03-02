import { Injector, Logger, settings } from "replugged";
import { USRBG_URL, defaultSettings } from "./lib/consts";
import { registerSettings } from "./Components/Settings";
import "./style.css";
import * as Types from "./types";

export const PluginInjector = new Injector();

export const PluginLogger = Logger.plugin("ReUSRBG");

const USRBG_RESPONSE = await fetch(USRBG_URL);
const USRBG_JSON = await USRBG_RESPONSE.json();
export const USRDB = new Map<string, Types.USRBD_USER>(
  USRBG_JSON.map((user: Types.USRBD_USER) => [user.uid, user]),
);
PluginLogger.log("Loaded USRBG Database.");

export const SettingValues = await settings.init("Tharki.ReUSRBG", defaultSettings);

import { applyInjections } from "./patches/index";

export const start = (): void => {
  registerSettings();
  applyInjections();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
};

export { Settings } from "./Components/Settings";
