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

export interface DisplayProfile {
  accentColor: number;
  banner: undefined | string;
  bio: string;
  emoji: null | string;
  getBannerURL: () => string;
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

export type DisplayProfileUtils = Record<
  string,
  (userId: string, guildId: string) => DisplayProfile
>;

export default await webpack
  .waitForModule<DisplayProfileUtils>(
    webpack.filters.bySource(/getUser\(.\),.=.\.getUserProfile/),
    { timeout: 10000 },
  )
  .catch(() => {
    throw new Error("Failed To Find DisplayProfileUtils Module");
  });
