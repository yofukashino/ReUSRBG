import { Injector, Logger, settings } from "replugged";
import Consts from "./lib/consts";
import Settings from "./Components/Settings";
import Types from "./types";
import "./style.css";
export const PluginInjector = new Injector();

export const PluginLogger = Logger.plugin("ReUSRBG", "#b380ff");

const USRBG_RESPONSE = await fetch(Consts.USRBG_URL);
const USRBG_JSON = await USRBG_RESPONSE.json();
export const USRDB = new Map<string, Types.USRBD_USER>(
  USRBG_JSON.map((user: Types.USRBD_USER) => [user.uid, user]),
);
PluginLogger.log("Loaded USRBG Database.");

export const SettingValues = await settings.init("dev.tharki.ReUSRBG", Consts.defaultSettings);

import Injections from "./patches/index";

export const start = (): void => {
  Settings.registerSettings();
  Injections.applyInjections();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
};

export { Settings } from "./Components/Settings";
