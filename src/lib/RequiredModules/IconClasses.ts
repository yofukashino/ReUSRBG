import { webpack } from "replugged";

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

export default await webpack
  .waitForProps<IconClasses>(["iconItem"], {
    timeout: 10000,
  })
  .catch(() => {
    throw new Error("Failed To Find IconClasses Module");
  });
