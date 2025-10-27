import { Logger, webpack } from "replugged";
import { localStorage } from "replugged/common";

interface CachedUSRBG {
  fetchTime: number;
  cache: Record<string, string>;
  endpoint?: string;
  bucket?: string;
  prefix?: string;
}

class USRDB {
  #logger = Logger.api("USRDB", "#ffffff80");
  #loading = false;
  #fetchTime: number;
  #cache: Record<string, string>;
  #endpoint: string;
  #bucket: string;
  #prefix: string;
  #expireTime = 12 * 60 * 60 * 1000;

  #USRBG_URL = "https://usrbg.is-hardly.online/users" as const;
  #USRBG_LOCAL_STORAGE_KEY = "usrbg.is-hardly.online" as const;

  get #isExpired(): boolean {
    return this.#fetchTime === 0 || Date.now() - this.#fetchTime > this.#expireTime;
  }

  public async load(force?: boolean): Promise<void> {
    if (this.#loading) return;
    this.#loading = true;
    const fetchStart = Date.now();

    const USRBG_CACHED_JSON: CachedUSRBG = localStorage.get(this.#USRBG_LOCAL_STORAGE_KEY, {
      fetchTime: 0,
      cache: {},
    });

    this.#fetchTime = USRBG_CACHED_JSON.fetchTime;
    this.#cache = USRBG_CACHED_JSON.cache;
    this.#endpoint = USRBG_CACHED_JSON.endpoint;
    this.#bucket = USRBG_CACHED_JSON.bucket;
    this.#prefix = USRBG_CACHED_JSON.prefix;

    if (force || this.#isExpired) {
      await this.fetch();
      this.save();
    }

    if (this.#fetchTime < fetchStart)
      this.#logger.verbose(
        `USRBG Database loaded from ${(Date.now() - this.#fetchTime).toFixed(2)}ms old cache.`,
      );
    else
      this.#logger.verbose(
        `${force ? "Reloaded" : "Loaded"} USRBG Database in ${(Date.now() - fetchStart).toFixed(2)}ms.`,
      );
    this.#loading = false;
  }

  public async fetch(): Promise<void> {
    const USRBG_JSON = await fetch(this.#USRBG_URL).then((r) => r.json());
    this.#prefix = USRBG_JSON.prefix;
    this.#bucket = USRBG_JSON.bucket;
    this.#endpoint = USRBG_JSON.endpoint;
    this.#cache = USRBG_JSON.users;
    this.#fetchTime = Date.now();
  }

  public save(): void {
    localStorage.set(this.#USRBG_LOCAL_STORAGE_KEY, {
      fetchTime: this.#fetchTime,
      cache: this.#cache,
      endpoint: this.#endpoint,
      bucket: this.#bucket,
      prefix: this.#prefix,
    });
  }

  public has(userId: string): boolean {
    if (this.#isExpired) void this.load();
    const etag = this.#cache[userId];
    return Boolean(etag);
  }

  public get(userId: string): string {
    if (this.#isExpired) void this.load();
    const etag = this.#cache[userId];
    if (etag) return `${this.#endpoint}/${this.#bucket}/${this.#prefix}${userId}?${etag}`;
  }

  public constructor() {
    void this.load();
  }

  private static MODULE_ID = "USRBG" as const;

  public static init(): USRDB {
    if (webpack.wpRequire.c[this.MODULE_ID]?.loaded === false)
      delete webpack.wpRequire.c[this.MODULE_ID];

    if (webpack.wpRequire.m[this.MODULE_ID]) return webpack.getById(this.MODULE_ID);

    const manager = new USRDB();
    webpackChunkdiscord_app.push([
      [Symbol.for("USRBG")],
      {
        [this.MODULE_ID]: (module) => {
          module.exports = manager;
        },
      },
    ]);

    return manager;
  }
}

export default USRDB.init();
