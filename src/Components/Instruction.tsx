import {
  fluxDispatcher as FluxDispatcher,
  toast as Toasts,
  users as UltimateUserStore,
} from "replugged/common";
import { Clickable, Flex, Text } from "replugged/components";
import { Invite, InviteActions, TransitionUtil } from "../lib/requiredModules";
import { USBBG_SERVER_INVITE_CODE } from "../lib/consts";
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
            const inviteInfo = await InviteActions.resolveInvite(USBBG_SERVER_INVITE_CODE);
            if (inviteInfo.invite == null) {
              Toasts.toast("Error Resolving Invite, Try Different Invite.", Toasts.Kind.FAILURE);
              return;
            }
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
            TransitionUtil.transitionTo(`/channels/449175561529589761/886287835018178560`);
          }}>
          #background-request
        </Clickable>
      </Flex>
    </Text.Normal>
    <Text.Normal>
      <b>🔹</b> Click UPLOAD button and UPLOAD your image from your device.
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
            TransitionUtil.transitionTo(`/channels/449175561529589761/886288041612828702`);
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
      <Invite author={UltimateUserStore.getCurrentUser()} code={USBBG_SERVER_INVITE_CODE} />
    </span>
  </Flex>
);
