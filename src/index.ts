import { Injector, Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";
import "./style.css";
export const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("ReUSRBG", "#b380ff");
export const USRDB = new Map<string, Types.USRBD_USER>();
export const SettingValues = await settings.init("dev.tharki.ReUSRBG", defaultSettings);
import Settings from "./Components/Settings";
import Injections from "./injections/index";
import Utils from "./lib/utils";
import Types from "./types";

export const start = (): void => {
  void Utils.loadUSRBD();
  Settings.registerSettings();
  void Injections.applyInjections();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
};

export { Settings } from "./Components/Settings";
