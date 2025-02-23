import { USRBG_URL } from "./consts";
import { PluginLogger, USRDB, USRDBStatic } from "../index";

export class LimitedMap<K, V> extends Map<K, V> {
  private limit: number;
  private keysQueue: K[] = [];
  public constructor(limit: number) {
    super();
    this.limit = limit;
  }
  public set(key: K, value: V): this {
    if (this.size >= this.limit) {
      const oldestKey = this.keysQueue.shift();
      if (oldestKey !== void 0) {
        this.delete(oldestKey);
      }
    }
    super.set(key, value);
    this.keysQueue.push(key);
    return this;
  }
}

export const gifToPng = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType !== "image/gif") {
      PluginLogger.log("URL is not a GIF");
      return null;
    }

    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0);

          const dataUrl = canvas.toDataURL("image/png");

          canvas.remove();

          resolve(dataUrl);
        };
        img.src = e.target.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    PluginLogger.error("Error fetching or processing the GIF:", error);
    return null;
  }
};

export const tryUSRDBStatic = (userId): string => {
  const imgUrl = USRDB.get(userId);
  const img = USRDBStatic.get(`${userId}-${imgUrl}`);
  if (img) return img;
  if (img === null) return imgUrl;
  void gifToPng(imgUrl).then((dataUri) => {
    USRDBStatic.set(`${userId}-${imgUrl}`, dataUri);
    if (dataUri === null) return;
    const banner = document.querySelector(`[style*="${imgUrl}"]`);
    if (banner) (banner as HTMLDivElement).style.backgroundImage = `url(${dataUri})`;
  });
  return imgUrl;
};

export const loadUSRBD = async (reload?: boolean): Promise<void> => {
  const fetchStart = performance.now();
  const USRBG_RESPONSE = await fetch(USRBG_URL);
  const USRBG_JSON = await USRBG_RESPONSE.json();
  for (const [USRBG_USERID, USRBG_ETAG] of Object.entries(USRBG_JSON.users))
    USRDB.set(
      USRBG_USERID,
      `${USRBG_JSON.endpoint}/${USRBG_JSON.bucket}/${USRBG_JSON.prefix}${USRBG_USERID}?${
        USRBG_ETAG as string
      }`,
    );
  const fetchEnd = performance.now();
  PluginLogger.log(
    `${reload ? "Reloaded" : "Loaded"} USRBG Database in ${(fetchEnd - fetchStart).toFixed(2)}ms.`,
  );
};
export default { LimitedMap, gifToPng, tryUSRDBStatic, loadUSRBD };
