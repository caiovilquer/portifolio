import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { INDEXNOW_KEY_FILE, SITE_ORIGIN } from "./seo-config.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const distributionRoot = path.join(projectRoot, "dist");

const pagePaths = [
  "/",
  "/en/",
  "/projetos/poliatletas/",
  "/en/projects/poliatletas/",
  "/projetos/rotinapet/",
  "/en/projects/rotinapet/",
  "/projetos/viazio/",
  "/en/projects/viazio/",
  "/projetos/trackshot/",
  "/en/projects/trackshot/",
];

const failures = [];
const titles = new Map();
const descriptions = new Map();

function fail(scope, message) {
  failures.push(`${scope}: ${message}`);
}

function routeFile(pathname) {
  return pathname === "/"
    ? path.join(distributionRoot, "index.html")
    : path.join(distributionRoot, pathname.replace(/^\//, ""), "index.html");
}

function firstMatch(html, expression) {
  return html.match(expression)?.[1]?.trim();
}

function allMatches(html, expression) {
  const globalExpression = expression.global
    ? expression
    : new RegExp(expression.source, `${expression.flags}g`);
  return [...html.matchAll(globalExpression)].map((match) => match[1]);
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

function localFileForUrl(url) {
  const parsed = new URL(url, SITE_ORIGIN);
  const pathname = decodeURIComponent(parsed.pathname);
  if (pathname.endsWith("/")) return routeFile(pathname);
  return path.join(distributionRoot, pathname.replace(/^\//, ""));
}

for (const pathname of pagePaths) {
  const scope = pathname;
  const file = routeFile(pathname);
  const html = await readFile(file, "utf8");
  const expectedCanonical = `${SITE_ORIGIN}${pathname}`;
  const expectedLanguage = pathname.startsWith("/en/") ? "en" : "pt-BR";
  const title = firstMatch(html, /<title>([^<]+)<\/title>/i);
  const description = firstMatch(
    html,
    /<meta\s+name="description"\s+content="([^"]+)"\s*\/?>/i,
  );
  const canonical = firstMatch(
    html,
    /<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?>/i,
  );
  const language = firstMatch(html, /<html\s+lang="([^"]+)"/i);
  const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
  const rootStart = html.indexOf('<div id="root">');
  const rootEnd = html.lastIndexOf("</div>");

  if (!title) fail(scope, "missing title");
  if (title && (title.length < 30 || title.length > 85)) {
    fail(scope, `title length ${title.length} is outside 30-85 characters`);
  }
  if (title) {
    if (titles.has(title)) fail(scope, `duplicate title also used by ${titles.get(title)}`);
    titles.set(title, scope);
  }

  if (!description) fail(scope, "missing meta description");
  if (description && (description.length < 105 || description.length > 180)) {
    fail(scope, `description length ${description.length} is outside 105-180 characters`);
  }
  if (description) {
    if (descriptions.has(description)) {
      fail(scope, `duplicate description also used by ${descriptions.get(description)}`);
    }
    descriptions.set(description, scope);
  }

  if (canonical !== expectedCanonical) {
    fail(scope, `canonical is ${canonical ?? "missing"}, expected ${expectedCanonical}`);
  }
  if (language !== expectedLanguage) {
    fail(scope, `document language is ${language ?? "missing"}, expected ${expectedLanguage}`);
  }
  if (h1Count !== 1) fail(scope, `expected one H1, found ${h1Count}`);
  if (rootStart < 0 || rootEnd - rootStart < 500) {
    fail(scope, "root does not contain substantial prerendered content");
  }
  if (/\?lang=(?:pt|en)/i.test(html)) fail(scope, "legacy query-string locale found");
  if (/noindex/i.test(html)) fail(scope, "noindex directive found");

  const alternates = new Map(
    [...html.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"/gi)]
      .map((match) => [match[1], match[2]]),
  );
  for (const locale of ["pt-BR", "en", "x-default"]) {
    if (!alternates.has(locale)) fail(scope, `missing ${locale} hreflang`);
  }

  const jsonLdBlocks = allMatches(
    html,
    /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
  );
  if (jsonLdBlocks.length !== 1) {
    fail(scope, `expected one JSON-LD block, found ${jsonLdBlocks.length}`);
  } else {
    try {
      const parsed = JSON.parse(jsonLdBlocks[0]);
      const types = (parsed["@graph"] ?? []).map((item) => item["@type"]);
      for (const type of ["WebSite", "Person"]) {
        if (!types.includes(type)) fail(scope, `JSON-LD graph is missing ${type}`);
      }
      const expectedType = pathname === "/" || pathname === "/en/" ? "ProfilePage" : "WebPage";
      if (!types.includes(expectedType)) fail(scope, `JSON-LD graph is missing ${expectedType}`);
      const isoDateTime = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/;
      for (const item of parsed["@graph"] ?? []) {
        if (item.dateModified && !isoDateTime.test(item.dateModified)) {
          fail(scope, `dateModified is not ISO 8601 DateTime: ${item.dateModified}`);
        }
      }
    } catch (error) {
      fail(scope, `invalid JSON-LD: ${error.message}`);
    }
  }

  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    if (!/\salt="[^"]*"/i.test(tag)) fail(scope, `image without alt: ${tag.slice(0, 100)}`);
    if (!/\swidth="\d+"/i.test(tag) || !/\sheight="\d+"/i.test(tag)) {
      fail(scope, `image without intrinsic dimensions: ${tag.slice(0, 100)}`);
    }
    const source = firstMatch(tag, /\ssrc="([^"]+)"/i);
    if (source && source.startsWith("/")) {
      const assetFile = localFileForUrl(source);
      if (!(await exists(assetFile))) fail(scope, `missing image asset ${source}`);
    }
  }

  for (const href of allMatches(html, /<a\b[^>]*\shref="([^"]+)"/gi)) {
    if (href.startsWith("#")) {
      if (!html.includes(`id="${href.slice(1)}"`)) fail(scope, `missing fragment target ${href}`);
      continue;
    }
    const target = new URL(href, expectedCanonical);
    if (target.origin !== SITE_ORIGIN) continue;
    const targetFile = localFileForUrl(target.href);
    if (!(await exists(targetFile))) fail(scope, `broken internal link ${href}`);
    if (target.hash) {
      const targetHtml = await readFile(targetFile, "utf8");
      if (!targetHtml.includes(`id="${target.hash.slice(1)}"`)) {
        fail(scope, `missing fragment target ${href}`);
      }
    }
  }
}

const sitemap = await readFile(path.join(distributionRoot, "sitemap.xml"), "utf8");
const sitemapUrls = allMatches(sitemap, /<loc>([^<]+)<\/loc>/gi);
for (const pathname of pagePaths) {
  const expected = `${SITE_ORIGIN}${pathname}`;
  if (!sitemapUrls.includes(expected)) fail("sitemap.xml", `missing ${expected}`);
}
for (const url of sitemapUrls) {
  if (!(await exists(localFileForUrl(url)))) fail("sitemap.xml", `URL has no output file: ${url}`);
}

const robots = await readFile(path.join(distributionRoot, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`)) {
  fail("robots.txt", "missing canonical sitemap declaration");
}
for (const agent of ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "PerplexityBot", "Googlebot", "bingbot"]) {
  if (!robots.includes(`User-agent: ${agent}`)) fail("robots.txt", `missing ${agent}`);
}

for (const file of ["llms.txt", "llms-full.txt", INDEXNOW_KEY_FILE]) {
  const content = await readFile(path.join(distributionRoot, file), "utf8");
  if (!content.trim()) fail(file, "file is empty");
}

if (failures.length) {
  console.error(`SEO audit failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`SEO audit passed: ${pagePaths.length} HTML pages and ${sitemapUrls.length} sitemap URLs.`);
