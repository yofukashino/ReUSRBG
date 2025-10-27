import { webpack } from "replugged";
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

export declare class DisplayProfile {
  public accentColor: number;
  public banner: undefined | string;
  public bio: string;
  public emoji: null | string;
  public guildId: undefined | string;
  public popoutAnimationParticleType: undefined | number;
  public pronouns: string;
  public themeColors: undefined | string;
  public userId: string;
  public _GuildMemberProfile: null | GuildMemberProfile;
  public _profileThemesExperimentBucket: number;
  public _userProfile: UserProfile;
  public application: null;
  public canEditThemes: boolean;
  public canUsePremiumProfileCustomization: boolean;
  public isInEditProfileThemesBucket: boolean;
  public premiumGuildSince: null | string;
  public premiumSince: null | string;
  public premiumType: null | number;
  public primaryColor: number;
  public getBannerURL: (props: { canAnimate: boolean; size: number }) => string;
  public getLegacyUsername: () => string;
}

export default await webpack
  .waitForPrototype<DisplayProfile>(["getBannerURL", "getLegacyUsername"], { timeout: 10000 })
  .catch(() => {
    throw new Error("Failed To Find DisplayProfile Module");
  });
