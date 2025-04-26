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

    const container =
      props?.children.find((v) =>
        v?.props?.children?.some?.((c) => c?.type?.toString?.()?.includes(".wrapper,children")),
      )?.props?.children || props?.children;

    const profileHeaderIndex = container?.findIndex?.((c) =>
      c?.type?.toString?.()?.includes(".wrapper,children"),
    );

    if (profileHeaderIndex === -1) {
      container.unshift(<div className="headerButtonWrapper" children={[]} />);
    }

    if (
      !props.user ||
      !USRDB.has(props.user.id) ||
      (props.user?.banner && SettingValues.get("nitroBanner", defaultSettings.nitroBanner))
    )
      return args;

    const profileHeader = container[profileHeaderIndex !== -1 ? profileHeaderIndex : 0];

    if (!Array.isArray(profileHeader.props.children)) {
      profileHeader.props.children = profileHeader.props.children
        ? [profileHeader.props.children]
        : [];
    }
    profileHeader.props.children.unshift(<USRBGButton />);
    return args;
  });
};
