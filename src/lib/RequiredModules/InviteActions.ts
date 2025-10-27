import { webpack } from "replugged";

export interface InviteRecord {
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
  acceptInviteAndTransitionToInviteChannel: (...args: unknown[]) => unknown;
  resolveInvite: (code: string) => { code: string; invite: InviteRecord | null };
}

export default await webpack
  .waitForProps<InviteActions>(["acceptInviteAndTransitionToInviteChannel", "resolveInvite"], {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find InviteActions Module");
  });
