import type { Locale } from "./content";

export const PROJECT_SLUGS = [
  "poliatletas",
  "rotinapet",
  "viazio",
  "trackshot",
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

export type SiteRoute =
  | { kind: "home"; locale: Locale }
  | { kind: "project"; locale: Locale; slug: ProjectSlug };

export const STATIC_ROUTES: SiteRoute[] = [
  { kind: "home", locale: "pt" },
  { kind: "home", locale: "en" },
  ...PROJECT_SLUGS.flatMap((slug) => [
    { kind: "project", locale: "pt", slug } as const,
    { kind: "project", locale: "en", slug } as const,
  ]),
];

export function isProjectSlug(value: string): value is ProjectSlug {
  return PROJECT_SLUGS.includes(value as ProjectSlug);
}

export function routePath(route: SiteRoute): string {
  if (route.kind === "home") return route.locale === "pt" ? "/" : "/en/";
  return route.locale === "pt"
    ? `/projetos/${route.slug}/`
    : `/en/projects/${route.slug}/`;
}

export function homePath(locale: Locale): string {
  return routePath({ kind: "home", locale });
}

export function projectPath(locale: Locale, slug: ProjectSlug): string {
  return routePath({ kind: "project", locale, slug });
}

export function alternateRoute(route: SiteRoute, locale: Locale): SiteRoute {
  return route.kind === "home"
    ? { kind: "home", locale }
    : { kind: "project", locale, slug: route.slug };
}

export function resolveRoute(pathname: string): SiteRoute {
  const path = pathname.replace(/\/{2,}/g, "/").replace(/\/?$/, "/");
  if (path === "/en/") return { kind: "home", locale: "en" };

  const englishProject = path.match(/^\/en\/projects\/([^/]+)\/$/);
  if (englishProject && isProjectSlug(englishProject[1])) {
    return { kind: "project", locale: "en", slug: englishProject[1] };
  }

  const portugueseProject = path.match(/^\/projetos\/([^/]+)\/$/);
  if (portugueseProject && isProjectSlug(portugueseProject[1])) {
    return { kind: "project", locale: "pt", slug: portugueseProject[1] };
  }

  return { kind: "home", locale: "pt" };
}
