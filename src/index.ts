import { Injector, Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";
import Settings from "./Components/Settings";
import Types from "./types";
import "./style.css";
export const PluginInjector = new Injector();

export const PluginLogger = Logger.plugin("ReUSRBG", "#b380ff");

export const USRDB = new Map<string, Types.USRBD_USER>();

export const SettingValues = await settings.init("dev.tharki.ReUSRBG", defaultSettings);

import Injections from "./patches/index";
import Utils from "./lib/utils";

export const start = (): void => {
  void Utils.loadUSRBD();
  Settings.registerSettings();
  Injections.applyInjections();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
};

export { Settings } from "./Components/Settings";
