import { webpack } from "replugged";
import { PluginInjector, SettingValues, USRDB } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import USRBGButton from "../Components/USRBGButton";

export default (): void => {
  const { UserProfileContext } = Modules;

  PluginInjector.before(UserProfileContext, "render", (args) => {
    const [props] = args;
    if (!props?.children) return args;
    if (!Array.isArray(props?.children)) props.children = [props?.children];

    const profileHeaderIndex = props?.children?.findIndex?.((c) =>
      /{profileType:\w+,children:\w+}=\w+/.exec(c?.type?.toString()),
    );
    if (profileHeaderIndex === -1) {
      const ProfileHeader =
        webpack.getBySource<
          React.ComponentType<{ profileType: string; children?: React.ReactElement[] }>
        >(/wrapper,{\[\w+\.biteSize/);
      props?.children.unshift(<ProfileHeader profileType={props.profileType} />);
    }

    if (
      !props.user ||
      !USRDB.has(props.user.id) ||
      (props.user?.banner && SettingValues.get("nitroBanner", defaultSettings.nitroBanner))
    )
      return args;

    const profileHeader = props?.children[profileHeaderIndex !== -1 ? profileHeaderIndex : 0];

    if (!Array.isArray(profileHeader.props.children)) {
      profileHeader.props.children = [profileHeader.props.children];
    }
    profileHeader.props.children.unshift(<USRBGButton />);
    return args;
  });
};
