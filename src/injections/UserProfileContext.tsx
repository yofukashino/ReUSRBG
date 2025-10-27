import { PluginInjector, SettingValues } from "@this";
import { DefaultSettings } from "@consts";
import { UserProfileContext } from "@lib/RequiredModules";
import USRBGButton from "@components/USRBGButton";
import USRDB from "@USRDB";

PluginInjector.before(UserProfileContext, "render", (args) => {
  const [props] = args;

  if (!props?.children) return args;
  if (!Array.isArray(props?.children)) props.children = [props?.children];

  const container =
    props?.children.find((v) =>
      v?.props?.children?.some?.(
        (c) =>
          c?.type?.toString?.()?.includes(".wrapper,children") ||
          c?.props?.className === "headerButtonWrapper",
      ),
    )?.props?.children || props?.children;

  const profileHeaderIndex = container?.findIndex?.(
    (c) =>
      c?.type?.toString?.()?.includes(".wrapper,children") ||
      c?.props?.className === "headerButtonWrapper",
  );

  if (profileHeaderIndex === -1) container.unshift(<div className="headerButtonWrapper" />);

  const nitroBanner =
    props.user?.banner && SettingValues.get("nitroBanner", DefaultSettings.nitroBanner);

  if (!props.user || !USRDB.has(props.user.id) || nitroBanner) return args;

  const profileHeader = container[profileHeaderIndex !== -1 ? profileHeaderIndex : 0];

  if (!Array.isArray(profileHeader.props.children))
    profileHeader.props.children = profileHeader.props.children
      ? [profileHeader.props.children]
      : [];

  profileHeader.props.children.unshift(<USRBGButton />);
  return args;
});
