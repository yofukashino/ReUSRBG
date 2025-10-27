import { Injector, Logger, settings } from "replugged";
import { DefaultSettings } from "@consts";
import Settings from "@components/Settings";
import Injections from "@Injections";
import Utils from "@Utils";
import "./style.css";

export const PluginInjector = new Injector();
export const PluginLogger = Logger.plugin("ReUSRBG", "#ffffff80");
export const SettingValues = settings.init("dev.tharki.ReUSRBG", DefaultSettings);
export const USRDBStatic = new Utils.LimitedMap<string, string | null>(250);

export const start = (): void => {
  Settings.registerSettings();
  void Injections.applyInjections();
};

export const stop = (): void => {
  Injections.removeInjections();
};

export { Settings } from "@components/Settings";

export { _isAnimatedUSRBG, _getSettingBannerProps, uwuify } from "./plaintextFunctions";
