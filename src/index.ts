import { Injector, Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";
import "./style.css";
export const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("ReUSRBG", "#b380ff");
export const USRDB = new Map<string, string>();
export const SettingValues = await settings.init("dev.tharki.ReUSRBG", defaultSettings);
import Settings from "./Components/Settings";
import Injections from "./injections/index";
import Utils from "./lib/utils";
export const USRDBStatic = new Utils.LimitedMap<string, string | null>(250);

export const start = (): void => {
  void Utils.loadUSRBD();
  Settings.registerSettings();
  void Injections.applyInjections().catch((err) => PluginLogger.error(err));
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
};

export { Settings } from "./Components/Settings";

export { _isAnimatedUSRBG } from "./plaintextFunctions";
