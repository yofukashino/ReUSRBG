import { types as DefaultTypes } from "replugged";
export { types as DefaultTypes } from "replugged";
export { ReactElement, ComponentClass } from "react";
import { User } from "discord-types/general";

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
  hasBanner: boolean;
  displayProfile: displayProfile;
  guildId: undefined | string;
  isHovering: boolean;
  onClose: DefaultTypes.AnyFunction;
  profileType: string;
  showPremiumBadgeUpsell: boolean;
  user: User;
}
export interface UserAvatarArgs {
  channelId: string;
  disableUserProfileLink: boolean;
  displayProfile: displayProfile;
  guildId: null | string;
  isHovering: boolean;
  isMobile: boolean;
  isStreaming: boolean;
  onClose: DefaultTypes.AnyFunction;
  onOpenPremiumSettings: DefaultTypes.AnyFunction;
  showPremiumBadgeUpsell: boolean;
  status: string;
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
export interface IconClasses {
  actionIcon: string;
  alwaysShown: string;
  channelInfo: string;
  containerDefault: string;
  containerDragAfter: string;
  containerDragBefore: string;
  containerUserOver: string;
  disableClick: string;
  disabled: string;
  iconBase: string;
  iconItem: string;
  iconLive: string;
  iconVisibility: string;
  openChatIconItem: string;
  selected: string;
  subtitleHasThreads: string;
  summary: string;
}
export interface AvatarClasses {
  avatarDecorationHint: string;
  avatarHint: string;
  avatarHintInner: string;
  avatarHoverTarget: string;
  avatarPositionNormal: string;
  avatarPositionPanel: string;
  avatarPositionPomelo: string;
  avatarPositionPremiumBanner: string;
  avatarPositionPremiumNoBanner: string;
  avatarWrapper: string;
  avatarWrapperNonUserBot: string;
  avatarWrapperNormal: string;
  clickable: string;
  profileBadges: string;
  warningCircleIcon: string;
}
export interface GenericModule extends Record<string, DefaultTypes.AnyFunction> {}
export interface GenericExport {
  exports: GenericModule;
}
export interface Settings {
  nitroBanner: boolean;
  settingsBanner: boolean;
}
