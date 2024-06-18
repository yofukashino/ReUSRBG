import {
  fluxDispatcher as FluxDispatcher,
  toast as Toasts,
  guilds as UltimateGuildStore,
  users as UltimateUserStore,
} from "replugged/common";
import { Clickable, Flex, Text } from "replugged/components";
import { USBBG_SERVER_ID, USBBG_SERVER_INVITE_CODE } from "../lib/consts";
import Modules from "../lib/requiredModules";

export default () => (
  <Flex
    direction={Flex.Direction.VERTICAL}
    justify={Flex.Justify.START}
    style={{ gap: "8px", margin: "1%" }}>
    <Text.Normal>
      <Flex direction={Flex.Direction.HORIZONTAL} wrap={Flex.Wrap.WRAP} style={{ gap: "4px" }}>
        <b>🔹</b>
        <Clickable
          onClick={async () => {
            if (UltimateGuildStore.getGuild(USBBG_SERVER_ID)) {
              FluxDispatcher.dispatch({ type: "LAYER_POP_ALL" });
              Modules.TransitionUtil?.transitionTo(
                `/channels/449175561529589761/886287835018178560`,
              );
              return;
            }
            const inviteInfo = await Modules.InviteActions?.resolveInvite(USBBG_SERVER_INVITE_CODE);
            if (inviteInfo.invite == null) {
              Toasts.toast("Error Resolving Invite, Try Different Invite.", Toasts.Kind.FAILURE);
              return;
            }
            FluxDispatcher.dispatch({ type: "LAYER_POP_ALL" });
            FluxDispatcher.dispatch({
              type: "INVITE_MODAL_OPEN",
              ...inviteInfo,
            });
          }}>
          Join Black Box Discord Server
        </Clickable>
        and go to
        <Clickable
          onClick={() => {
            FluxDispatcher.dispatch({ type: "LAYER_POP_ALL" });
            Modules.TransitionUtil?.transitionTo(`/channels/449175561529589761/886287835018178560`);
          }}>
          #click-here-to-request
        </Clickable>
      </Flex>
    </Text.Normal>
    <Text.Normal>
      <b>🔹</b> Type /bg and select the command. Upload for banner in the file option.
      <br />
      • Only .GIF .PNG .JPG .JPEG will be accepted. <br />
      • Max-size: 10MB
      <br />
      • NOT link, NOT gif picker from discord, you must download the image and then UPLOAD it
      <br />
      <b>
        • DO NOT REQUEST Adult/NSFW content for your banners, this is against USRBG Terms of Service
        and will be rejected.
      </b>
    </Text.Normal>
    <Text.Normal>
      <Flex direction={Flex.Direction.HORIZONTAL} wrap={Flex.Wrap.WRAP} style={{ gap: "4px" }}>
        <b>🔹</b> Wait for your background request to be approved in
        <Clickable
          onClick={() => {
            FluxDispatcher.dispatch({ type: "LAYER_POP_ALL" });
            Modules.TransitionUtil?.transitionTo(`/channels/449175561529589761/886288041612828702`);
          }}>
          #userbg-log ,
        </Clickable>
        it take a bit of time.
      </Flex>
    </Text.Normal>
    <Text.Normal>
      <b>🔸</b> If your background request is approved but you don't see it, reload Discord/USRBG
      Database. <br />• If still not, wait a bit more (it takes sometimes to update) and reload
      discord/database again.
    </Text.Normal>
    <span style={{ alignSelf: "center", margin: "1%" }}>
      <Modules.Invite author={UltimateUserStore.getCurrentUser()} code={USBBG_SERVER_INVITE_CODE} />
    </span>
  </Flex>
);
