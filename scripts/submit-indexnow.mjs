import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { INDEXNOW_KEY, INDEXNOW_KEY_FILE, SITE_ORIGIN } from "./seo-config.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const sitemap = await readFile(path.resolve(scriptDirectory, "../dist/sitemap.xml"), "utf8");
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_ORIGIN).host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_ORIGIN}/${INDEXNOW_KEY_FILE}`,
    urlList,
  }),
});

if (!response.ok && response.status !== 202) {
  const body = await response.text();
  throw new Error(`IndexNow returned HTTP ${response.status}: ${body}`);
}

console.log(`IndexNow accepted ${urlList.length} URLs with HTTP ${response.status}.`);
