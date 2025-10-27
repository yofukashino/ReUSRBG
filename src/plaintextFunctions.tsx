import { users } from "replugged/common";
import { SettingValues, USRDBStatic } from "@this";
import { DefaultSettings } from "@consts";
import USRDB from "@USRDB";
import Utils from "@Utils";

export const _isAnimatedUSRBG = (userId: string): boolean => {
  const imgUrl = USRDB.get(userId);
  const img = USRDBStatic.get(`${userId}-${imgUrl}`);

  if (img && !Utils.isDisabled()) return true;
  return false;
};

export const _getSettingBannerProps = (
  type: "BANNER" | "AVATAR",
): Record<string, unknown> | string => {
  const currentUser = users.getCurrentUser();
  const hasBanner = currentUser.banner || USRDB.has(currentUser.id);
  if (
    Utils.isDisabled() ||
    !SettingValues.get("settingsBanner", DefaultSettings.settingsBanner) ||
    !hasBanner
  )
    return type === "BANNER" ? {} : "";

  return type === "BANNER"
    ? {
        bannerHeight: 233,
      }
    : " usrbg-settings-avatar";
};
