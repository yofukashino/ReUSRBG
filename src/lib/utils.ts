import { plugins, util } from "replugged";
import { PluginLogger, USRDBStatic } from "@this";
import USRDB from "@USRDB";

export class LimitedMap<K, V> extends Map<K, V> {
  private limit: number;
  private keysQueue = new Set<K>();

  public constructor(limit: number) {
    super();
    this.limit = limit;
  }

  public expire(): void {
    const oldestKey: K = this.keysQueue.values().next().value;

    if (oldestKey === void 0) return;

    this.keysQueue.delete(oldestKey);
    this.delete(oldestKey);
  }

  public set(key: K, value: V): this {
    if (this.size >= this.limit) this.expire();

    this.keysQueue.add(key);
    return super.set(key, value);
  }
}

export const GifToPng = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const { ok, headers } = response;

    if (!ok) {
      return null;
    }

    if (headers.get("Content-Type") !== "image/gif") {
      PluginLogger.verbose("URL is not a GIF", url);
      return null;
    }

    const gifBlob = await response.blob();

    const dataUrl: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;

      reader.onload = ({ target: { result } }) => {
        const img = new Image();
        img.onerror = reject;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          const canvasContext = canvas.getContext("2d");
          canvasContext.drawImage(img, 0, 0);

          canvas.toBlob((blob) => {
            const pngObjectUrl = URL.createObjectURL(blob);

            resolve(pngObjectUrl);
            canvas.remove();
          }, "image/png");
        };
        if (typeof result !== "string") {
          resolve(null);
          return;
        }

        img.src = result;
      };

      reader.readAsDataURL(gifBlob);
    });

    return dataUrl;
  } catch (error) {
    PluginLogger.error("Error fetching or processing the GIF:", error);
    return null;
  }
};

export const loadUSRDBStatic = async ({
  bannerUrl,
  key,
}: {
  bannerUrl: string;
  key: string;
}): Promise<void> => {
  USRDBStatic.set(key, null);

  const blobUri = await GifToPng(bannerUrl);
  USRDBStatic.set(key, blobUri);

  if (blobUri === null) return;

  const banner: HTMLDivElement = document.querySelector(`[class^="banner"][style*="${bannerUrl}"]`);
  if (!banner) return;

  const reactInstance = util.getReactInstance(banner);
  if (!reactInstance?.return) return;

  reactInstance.return.key = "USRDBStatic";
};

export const tryUSRDBStatic = (userId: string): string => {
  if (!USRDB.has(userId)) return;

  const bannerUrl = USRDB.get(userId);

  const key = `${userId}-${bannerUrl}`;

  const png = USRDBStatic.get(key);

  if (png !== undefined) return png === null ? bannerUrl : png;

  void loadUSRDBStatic({ bannerUrl, key });

  return bannerUrl;
};

export const isDisabled = (): boolean => plugins.getDisabled().includes("dev.tharki.ReUSRBG");

export default { LimitedMap, GifToPng, loadUSRDBStatic, tryUSRDBStatic, isDisabled };
