import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { INDEXNOW_KEY, INDEXNOW_KEY_FILE, SITE_ORIGIN } from "./seo-config.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const distributionRoot = path.join(projectRoot, "dist");
const serverBundle = path.join(projectRoot, ".ssr", "entry-server.js");
const server = await import(serverBundle);
const template = await readFile(path.join(distributionRoot, "index.html"), "utf8");
// Fonte unica da data: src/seo.ts, via o bundle SSR.
const lastModified = server.SITE_UPDATED_DATE;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function preloadMarkup(preload) {
  if (!preload) return "";
  const attributes = [
    'rel="preload"',
    'as="image"',
    `href="${escapeHtml(preload.href)}"`,
    `type="${escapeHtml(preload.type)}"`,
    'fetchpriority="high"',
  ];
  if (preload.srcSet) attributes.push(`imagesrcset="${escapeHtml(preload.srcSet)}"`);
  if (preload.sizes) attributes.push(`imagesizes="${escapeHtml(preload.sizes)}"`);
  return `<link ${attributes.join(" ")} />`;
}

function seoHead(seo) {
  const jsonLd = JSON.stringify(seo.jsonLd).replaceAll("<", "\\u003c");
  return `<!--seo-head-start-->
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="author" content="Caio Vilquer Carvalho" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${escapeHtml(seo.canonical)}" />
    <link rel="alternate" hreflang="pt-BR" href="${escapeHtml(seo.alternatePt)}" />
    <link rel="alternate" hreflang="en" href="${escapeHtml(seo.alternateEn)}" />
    <link rel="alternate" hreflang="x-default" href="${escapeHtml(seo.alternatePt)}" />
    <link rel="alternate" type="text/plain" href="${SITE_ORIGIN}/llms.txt" title="LLM summary" />
    <link rel="me" href="https://github.com/caiovilquer" />
    <link rel="me" href="https://www.linkedin.com/in/caio-vilquer/" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeHtml(seo.canonical)}" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:locale" content="${seo.locale}" />
    <meta property="og:locale:alternate" content="${seo.alternateLocale}" />
    <meta property="og:site_name" content="Caio Vilquer" />
    <meta property="og:image" content="${escapeHtml(seo.image)}" />
    <meta property="og:image:alt" content="${escapeHtml(seo.imageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${escapeHtml(seo.image)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(seo.imageAlt)}" />
    ${preloadMarkup(seo.preload)}
    <script type="application/ld+json">${jsonLd}</script>
    <!--seo-head-end-->`;
}

function outputFileForRoute(route) {
  const pathname = server.routePath(route);
  if (pathname === "/") return path.join(distributionRoot, "index.html");
  return path.join(distributionRoot, pathname.replace(/^\//, ""), "index.html");
}

for (const route of server.STATIC_ROUTES) {
  const seo = server.getSeoData(route);
  const appHtml = server.renderRoute(route);
  const documentHtml = template
    .replace(/<html lang="[^"]+">/, `<html lang="${seo.lang}">`)
    .replace(/<!--seo-head-start-->[\s\S]*?<!--seo-head-end-->/, seoHead(seo))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  const outputFile = outputFileForRoute(route);
  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, documentHtml, "utf8");
}

function sitemapUrl(route) {
  const seo = server.getSeoData(route);
  return `  <url>
    <loc>${escapeHtml(seo.canonical)}</loc>
    <lastmod>${lastModified}</lastmod>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${escapeHtml(seo.alternatePt)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${escapeHtml(seo.alternateEn)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeHtml(seo.alternatePt)}" />
  </url>`;
}

const curriculumPairs = [
  ["/cv/caio-vilquer-backend.pdf", "/cv/caio-vilquer-backend-en.pdf"],
  ["/cv/caio-vilquer-full-stack.pdf", "/cv/caio-vilquer-full-stack-en.pdf"],
];
const curriculumUrls = curriculumPairs.flatMap(([pt, en]) => [
  `  <url>
    <loc>${SITE_ORIGIN}${pt}</loc>
    <lastmod>${lastModified}</lastmod>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${SITE_ORIGIN}${pt}" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_ORIGIN}${en}" />
  </url>`,
  `  <url>
    <loc>${SITE_ORIGIN}${en}</loc>
    <lastmod>${lastModified}</lastmod>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${SITE_ORIGIN}${pt}" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_ORIGIN}${en}" />
  </url>`,
]);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...server.STATIC_ROUTES.map(sitemapUrl), ...curriculumUrls].join("\n")}
</urlset>
`;

const robots = `User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Googlebot
Allow: /

User-agent: bingbot
Allow: /

User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;

await Promise.all([
  writeFile(path.join(distributionRoot, "sitemap.xml"), sitemap, "utf8"),
  writeFile(path.join(distributionRoot, "robots.txt"), robots, "utf8"),
  writeFile(path.join(distributionRoot, "llms.txt"), server.buildLlmsText(), "utf8"),
  writeFile(path.join(distributionRoot, "llms-full.txt"), server.buildLlmsFullText(), "utf8"),
  writeFile(path.join(distributionRoot, INDEXNOW_KEY_FILE), INDEXNOW_KEY, "utf8"),
]);

await rm(path.join(projectRoot, ".ssr"), { recursive: true, force: true });

console.log(`Prerendered ${server.STATIC_ROUTES.length} HTML routes.`);
console.log("Generated sitemap.xml, robots.txt, llms.txt, llms-full.txt, and IndexNow key.");
