import { USRBG_URL } from "./consts";
import { PluginLogger, USRDB } from "../index";
export const loadUSRBD = async (reload?: boolean): Promise<void> => {
  const fetchStart = performance.now();
  const USRBG_RESPONSE = await fetch(USRBG_URL);
  const USRBG_JSON = await USRBG_RESPONSE.json();
  for (const USRBG_ITEM of USRBG_JSON) USRDB.set(USRBG_ITEM.uid, USRBG_ITEM);
  const fetchEnd = performance.now();
  PluginLogger.log(
    `${reload ? "Reloaded" : "Loaded"} USRBG Database in ${(fetchEnd - fetchStart).toFixed(2)}ms.`,
  );
};
export default { loadUSRBD };
