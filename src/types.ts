import { types as DefaultTypes } from "replugged";
export { types as DefaultTypes } from "replugged";
export { ReactElement, ComponentClass } from "react";

export interface User {
  avatar: string;
  avatarDecoration: undefined | string;
  bot: boolean;
  desktop: boolean;
  discriminator: string;
  email: null | string;
  flags: number;
  guildMemberAvatars: {
    [key: number]: string;
  };
  hasBouncedEmail: boolean;
  hasFlag: DefaultTypes.AnyFunction;
  id: string;
  isStaff: DefaultTypes.AnyFunction;
  isStaffPersonal: DefaultTypes.AnyFunction;
  mfaEnabled: boolean;
  mobile: boolean;
  nsfwAllowed: undefined | boolean;
  personalConnectionId: null | string;
  phone: null | string;
  premiumType: undefined | number;
  premiumUsageFlags: number;
  publicFlags: number;
  purchasedFlags: number;
  system: boolean;
  username: string;
  verified: boolean;
  createdAt: Date;
  tag: string;
}
export interface guildMemberProfile {
  accentColor: undefined | number;
  banner: undefined | string;
  bio: undefined | string;
  emoji: null | string;
  guildId: string;
  popoutAnimationParticleType: undefined | number;
  pronouns: undefined | string;
  themeColors: undefined | string;
  userId: string;
}
interface userProfile {
  accentColor: undefined | number;
  application: null | string;
  applicationRoleConnections: [];
  banner: undefined | string;
  bio: string;
  connectedAccounts: Array<{ id: string; name: string; type: string; verified: boolean }>;
  emoji: null | string;
  lastFetched: number;
  popoutAnimationParticleType: undefined | number;
  premiumGuildSince: null | number;
  premiumSince: null | number;
  premiumType: null | number;
  profileFetchFailed: boolean;
  pronouns: undefined | string;
  themeColors: undefined | string;
  userId: string;
}
export interface displayProfile {
  accentColor: number;
  banner: undefined | string;
  bio: string;
  emoji: null | string;
  getBannerURL: DefaultTypes.AnyFunction;
  guildId: undefined | string;
  popoutAnimationParticleType: undefined | number;
  pronouns: string;
  themeColors: undefined | string;
  userId: string;
  _guildMemberProfile: null | guildMemberProfile;
  _profileThemesExperimentBucket: number;
  _userProfile: userProfile;
  application: null;
  canEditThemes: boolean;
  canUsePremiumProfileCustomization: boolean;
  isInEditProfileThemesBucket: boolean;
  premiumGuildSince: null | string;
  premiumSince: null | string;
  premiumType: null | number;
  primaryColor: number;
}
export interface UserBannerArgs {
  bannerSrc?: string;
  displayProfile: displayProfile;
  guildId: undefined | string;
  isHovering: boolean;
  onClose: DefaultTypes.AnyFunction;
  profileType: number;
  showPremiumBadgeUpsell: boolean;
  user: User;
}
export interface USRBD_USER {
  img: string;
  uid: string;
  _id: string;
}
export interface InviteActions {
  acceptInvite: DefaultTypes.AnyFunction;
  acceptInviteAndTransitionToInviteChannel: DefaultTypes.AnyFunction;
  createFriendInvite: DefaultTypes.AnyFunction;
  createInvite: DefaultTypes.AnyFunction;
  getAllFriendInvites: DefaultTypes.AnyFunction;
  getInviteContext: DefaultTypes.AnyFunction;
  mobileCreateInvite: DefaultTypes.AnyFunction;
  openApp: DefaultTypes.AnyFunction;
  openNativeAppModal: DefaultTypes.AnyFunction;
  resolveInvite: DefaultTypes.AnyFunction;
  revokeFriendInvites: DefaultTypes.AnyFunction;
  revokeInvite: DefaultTypes.AnyFunction;
  transitionToInvite: DefaultTypes.AnyFunction;
  transitionToInviteChannelSync: DefaultTypes.AnyFunction;
  transitionToInviteSync: DefaultTypes.AnyFunction;
}
export interface GenericModule {
  [key: string | number]: DefaultTypes.AnyFunction;
}
export interface GenericExport {
  exports: GenericModule;
}
export interface AssetsUtils {
  getAnimatableSourceWithFallback: DefaultTypes.AnyFunction;
  getApplicationIconSource: DefaultTypes.AnyFunction;
  getApplicationIconURL: DefaultTypes.AnyFunction;
  getAvatarDecorationURL: DefaultTypes.AnyFunction;
  getChannelIconSource: DefaultTypes.AnyFunction;
  getChannelIconURL: DefaultTypes.AnyFunction;
  getDefaultAvatarURL: DefaultTypes.AnyFunction;
  getEmojiURL: DefaultTypes.AnyFunction;
  getGameAssetSource: DefaultTypes.AnyFunction;
  getGameAssetURL: DefaultTypes.AnyFunction;
  getGuildBannerSource: DefaultTypes.AnyFunction;
  getGuildBannerURL: DefaultTypes.AnyFunction;
  getGuildDiscoverySplashSource: DefaultTypes.AnyFunction;
  getGuildDiscoverySplashURL: DefaultTypes.AnyFunction;
  getGuildHomeHeaderSource: DefaultTypes.AnyFunction;
  getGuildHomeHeaderURL: DefaultTypes.AnyFunction;
  getGuildIconSource: DefaultTypes.AnyFunction;
  getGuildIconURL: DefaultTypes.AnyFunction;
  getGuildMemberAvatarSource: DefaultTypes.AnyFunction;
  getGuildMemberAvatarURL: DefaultTypes.AnyFunction;
  getGuildMemberAvatarURLSimple: DefaultTypes.AnyFunction;
  getGuildMemberBannerURL: DefaultTypes.AnyFunction;
  getGuildSplashSource: DefaultTypes.AnyFunction;
  getGuildSplashURL: DefaultTypes.AnyFunction;
  getGuildTemplateIconSource: DefaultTypes.AnyFunction;
  getGuildTemplateIconURL: DefaultTypes.AnyFunction;
  getUserAvatarColor: DefaultTypes.AnyFunction;
  getUserAvatarSource: DefaultTypes.AnyFunction;
  getUserAvatarURL: DefaultTypes.AnyFunction;
  getUserBannerURL: DefaultTypes.AnyFunction;
  getVideoFilterAssetURL: DefaultTypes.AnyFunction;
  hasAnimatedGuildIcon: DefaultTypes.AnyFunction;
  isAnimatedIconHash: DefaultTypes.AnyFunction;
  makeSource: DefaultTypes.AnyFunction;
}
export interface Settings {
  nitroBanner: boolean;
}
