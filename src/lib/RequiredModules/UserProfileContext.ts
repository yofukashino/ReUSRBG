import { webpack } from "replugged";

import type { DisplayProfile } from "./DisplayProfileUtils";
import type Types from "@Types";

export interface UserProfileContext {
  $$typeof: symbol;
  Overlay: React.FC<UserProfileContext>;
  render: (
    props: {
      children: React.ReactElement[];
      className: string;
      displayProfile: DisplayProfile;
      profileType: string;
      user: Types.User;
    },
    ...args: unknown[]
  ) => React.ReactElement;
}

export default await webpack
  .waitForModule<UserProfileContext>(
    webpack.filters.bySource(/{profileThemeStyle:\w+,profileThemeClassName:\w+}/),
    {
      timeout: 10000,
    },
  )
  .catch(() => {
    throw new Error("Failed To Find UserProfileContext Module");
  });
