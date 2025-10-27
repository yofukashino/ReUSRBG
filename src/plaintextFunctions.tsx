import { users } from "replugged/common";
import { SettingValues, USRDBStatic } from "@this";
import { DefaultSettings } from "@consts";
import USRDB from "@USRDB";
import Uwuifier from "uwuifier";

export const _isAnimatedUSRBG = (userId: string): boolean => {
  const imgUrl = USRDB.get(userId);
  const img = USRDBStatic.get(`${userId}-${imgUrl}`);

  if (img) return true;
  return false;
};

export const _getSettingBannerProps = (
  type: "BANNER" | "AVATAR",
): Record<string, unknown> | string => {
  const currentUser = users.getCurrentUser();
  const hasBanner = currentUser.banner || USRDB.has(currentUser.id);
  if (!SettingValues.get("settingsBanner", DefaultSettings.settingsBanner) || !hasBanner)
    return type === "BANNER" ? {} : "";

  return type === "BANNER"
    ? {
        bannerHeight: 233,
      }
    : " usrbg-settings-avatar";
};

const uwufier = new Uwuifier({
  spaces: {
    faces: 0.45,
    actions: 0,
    stutters: 0.55,
  },
  words: 1,
  exclamations: 1,
});
export const uwuify = (children: unknown): unknown => {
  if (typeof children === "string") return uwufier.uwuifySentence(children);
  if (Array.isArray(children)) return children.map((c) => uwuify(c));
  return children;
};
