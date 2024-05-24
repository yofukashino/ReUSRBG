import { types } from "replugged";
import { User } from "discord-types/general";
export namespace Types {
  export import DefaultTypes = types;
  export interface GenericModule extends Record<string, DefaultTypes.AnyFunction> {}
  export interface GenericExport {
    exports: GenericModule;
  }
  export interface GuildMemberProfile {
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
  interface UserProfile {
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
  export interface TransitionUtil {
    back: DefaultTypes.AnyFunction;
    forward: DefaultTypes.AnyFunction;
    getFingerprintLocation: DefaultTypes.AnyFunction;
    getHistory: DefaultTypes.AnyFunction;
    getLastRouteChangeSource: DefaultTypes.AnyFunction;
    getLastRouteChangeSourceLocationStack: DefaultTypes.AnyFunction;
    hasNavigated: DefaultTypes.AnyFunction;
    isValidFingerprintRoute: DefaultTypes.AnyFunction;
    replaceWith: DefaultTypes.AnyFunction;
    transitionTo: DefaultTypes.AnyFunction;
    transitionToGuild: DefaultTypes.AnyFunction;
  }
  export interface DisplayProfile {
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
    _GuildMemberProfile: null | GuildMemberProfile;
    _profileThemesExperimentBucket: number;
    _userProfile: UserProfile;
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
    displayProfile: DisplayProfile;
    guildId: undefined | string;
    isHovering: boolean;
    onClose: DefaultTypes.AnyFunction;
    profileType: string;
    showPremiumBadgeUpsell: boolean;
    user: User;
  }

  export interface USRBD_USER {
    img: string;
    uid: string;
    _id: string;
  }
  export type InviteComponent = React.ComponentType<{ code: string; author: User }>;
  export interface Invite {
    code: string;
    guild?: {
      banner: string;
      description: string;
      features: string[];
      icon: string;
      id: string;
      name: string;
      nsfw: false;
      nsfw_level: number;
      premium_subscription_count: number;
      splash: string;
      vanity_url_code: string;
      verification_level: number;
    };
    inviter: {
      accent_color?: string;
      avatar?: string;
      avatar_decoration_data?: Record<string, string>;
      banner?: string;
      banner_color?: string;
      discriminator?: string;
      flags?: string;
      global_name?: string;
      id?: string;
      premium_type?: number;
      public_flags?: number;
      username?: string;
    };
    expires_at?: null | string;
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
    resolveInvite: (code: string) => { code: string; invite: Invite | null };
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
  export enum BannerLoadingStatus {
    COMPLETE = 2,
    LOADING = 1,
    SHOULD_LOAD = 0,
  }
  export interface BannerLoader {
    BannerLoadingStatus: typeof BannerLoadingStatus;
    default: (bannerOptions: {
      canAnimate: boolean;
      displayProfile: DisplayProfile;
      overrideBannerSrc: string;
      size: number;
    }) => {
      bannerSrc: string;
      status: number;
    };
  }
  export interface DisplayProfileUtils {
    default: (userId: string, guildId: string) => DisplayProfile;
    getDisplayProfile: (userId: string, guildId: string) => DisplayProfile;
    useDisplayProfileWithFetchEffect: (userId: string, guildId: string) => DisplayProfile;
  }
  export interface Settings {
    nitroBanner: boolean;
    settingsBanner: boolean;
  }
  export interface Modules {
    loadModules?: () => Promise<void>;
    IconClasses?: IconClasses;
    InviteActions?: InviteActions;
    DisplayProfileUtils?: DisplayProfileUtils;
    UserBannerParent?: GenericModule;
    UserBannerConstructor?: GenericModule;
    TransitionUtil?: TransitionUtil;
    Invite?: InviteComponent;
    BannerLoader?: BannerLoader;
  }
}
export default Types;
