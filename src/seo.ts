import { content, type Locale } from "./content";
import { getProjectPageData } from "./projectPages";
import {
  alternateRoute,
  projectPath,
  routePath,
  type ProjectSlug,
  type SiteRoute,
} from "./routes";

export const SITE_ORIGIN = "https://vilquer.dev";
export const SITE_UPDATED_DATE = "2026-08-26";
export const SITE_UPDATED = `${SITE_UPDATED_DATE}T12:00:00-03:00`;
export const PERSON_ID = `${SITE_ORIGIN}/#caio-vilquer`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

type SeoData = {
  title: string;
  description: string;
  canonical: string;
  locale: "pt_BR" | "en_US";
  lang: "pt-BR" | "en";
  alternateLocale: "en_US" | "pt_BR";
  alternatePt: string;
  alternateEn: string;
  image: string;
  imageAlt: string;
  preload?: {
    href: string;
    type: string;
    srcSet?: string;
    sizes?: string;
  };
  jsonLd: Record<string, unknown>;
};

const KNOWS_ABOUT = [
  "Java",
  "Kotlin",
  "TypeScript",
  "Spring Boot",
  "NestJS",
  "PostgreSQL",
  "Retrieval-augmented generation",
  "Computer vision",
  "React",
  "Angular",
];

const PROJECT_DESCRIPTIONS: Record<Locale, Record<ProjectSlug, string>> = {
  pt: {
    poliatletas:
      "Estudo do Poliatletas: sistema da equipe de atletismo da Poli-USP com NestJS, React, PostgreSQL, Prisma, Redis, rankings e mais de 250 testes.",
    rotinapet:
      "Estudo do RotinaPet: cuidado compartilhado de pets com Kotlin, Spring Boot, Angular, PostgreSQL, pgvector e RAG com autorização por recurso.",
    viazio:
      "Estudo do Viazio: ranking explicável de destinos com Java 21, Spring Boot, React, PostgreSQL, Resilience4j e dados de clima, custo e calendário.",
    trackshot:
      "Pesquisa TrackShot CV: visão computacional para estimar velocidade, ângulo e altura de liberação no arremesso de peso usando vídeo em 240 fps.",
  },
  en: {
    poliatletas:
      "Poliatletas case study: Poli-USP athletics software built with NestJS, React, PostgreSQL, Prisma, Redis, public rankings, and over 250 tests.",
    rotinapet:
      "RotinaPet case study: shared pet care built with Kotlin, Spring Boot, Angular, PostgreSQL, pgvector, and resource-authorized RAG.",
    viazio:
      "Viazio case study: explainable destination ranking with Java 21, Spring Boot, React, PostgreSQL, Resilience4j, weather, cost, and calendar data.",
    trackshot:
      "TrackShot CV research: computer vision that estimates shot-put release speed, angle, and height from 240 fps smartphone video.",
  },
};

const PROJECT_SOCIAL_IMAGES: Record<ProjectSlug, string> = {
  poliatletas: "/media/poliatletas-1440.webp",
  rotinapet: "/media/rotinapet-1200.webp",
  viazio: "/media/viazio-1440.webp",
  trackshot: "/media/trackshot-sequence-1440.webp",
};

function absolute(path: string): string {
  return new URL(path, SITE_ORIGIN).toString();
}

function person(locale: Locale): Record<string, unknown> {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Caio Vilquer Carvalho",
    alternateName: ["Caio Vilquer", "caiovilquer"],
    url: `${SITE_ORIGIN}/`,
    image: absolute("/media/caio-original-2048.webp"),
    email: "mailto:caio@vilquer.dev",
    description:
      locale === "pt"
        ? "Estudante de Engenharia de Computação na Poli-USP e desenvolvedor backend com projetos em Java, Kotlin e TypeScript."
        : "Computer Engineering student at Poli-USP and backend developer with projects in Java, Kotlin, and TypeScript.",
    jobTitle:
      locale === "pt"
        ? "Desenvolvedor backend e estudante de Engenharia de Computação"
        : "Backend developer and Computer Engineering student",
    identifier: "caiovilquer",
    knowsAbout: KNOWS_ABOUT,
    hasOccupation: {
      "@type": "Occupation",
      name: locale === "pt" ? "Desenvolvedor backend" : "Backend developer",
      skills: KNOWS_ABOUT.join(", "),
      occupationLocation: {
        "@type": "City",
        name: "São Paulo",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Escola Politécnica da Universidade de São Paulo",
      alternateName: "Poli-USP",
      url: "https://www.poli.usp.br/",
    },
    sameAs: [
      "https://www.linkedin.com/in/caio-vilquer/",
      "https://github.com/caiovilquer",
    ],
  };
}

function website(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_ORIGIN}/`,
    name: "Caio Vilquer",
    alternateName: "Portfólio de Caio Vilquer Carvalho",
    inLanguage: ["pt-BR", "en"],
    publisher: { "@id": PERSON_ID },
  };
}

function homeJsonLd(locale: Locale, canonical: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      website(),
      person(locale),
      {
        "@type": "ProfilePage",
        "@id": `${canonical}#profile-page`,
        url: canonical,
        name: content[locale].meta.title,
        description: content[locale].meta.description,
        inLanguage: locale === "pt" ? "pt-BR" : "en",
        dateModified: SITE_UPDATED,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        hasPart: ["poliatletas", "rotinapet", "viazio", "trackshot"].map((slug) => ({
          "@type": "CreativeWork",
          url: absolute(projectPath(locale, slug as ProjectSlug)),
          name: getProjectPageData(locale, slug as ProjectSlug).title,
        })),
      },
    ],
  };
}

function projectJsonLd(
  route: Extract<SiteRoute, { kind: "project" }>,
  canonical: string,
): Record<string, unknown> {
  const project = getProjectPageData(route.locale, route.slug);
  const repository = project.links.find((link) => link.href.includes("github.com"))?.href;
  const live = project.links.find((link) => !link.href.includes("github.com"))?.href;

  const work: Record<string, unknown> = {
    "@type": "SoftwareApplication",
    "@id": `${canonical}#project`,
    name: project.title,
    description: project.summary,
    url: live ?? canonical,
    mainEntityOfPage: canonical,
    inLanguage: route.locale === "pt" ? "pt-BR" : "en",
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    image: absolute(PROJECT_SOCIAL_IMAGES[route.slug]),
    keywords: project.stack.split(" · "),
    dateModified: SITE_UPDATED,
    sameAs: project.links.map((link) => link.href),
  };
  if (repository) work.codeRepository = repository;

  return {
    "@context": "https://schema.org",
    "@graph": [
      website(),
      person(route.locale),
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: `${project.title} · ${project.descriptor} · Caio Vilquer`,
        description: project.summary,
        inLanguage: route.locale === "pt" ? "pt-BR" : "en",
        dateModified: SITE_UPDATED,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": `${canonical}#project` },
        author: { "@id": PERSON_ID },
      },
      work,
    ],
  };
}

export function getSeoData(route: SiteRoute): SeoData {
  const locale = route.locale;
  const canonical = absolute(routePath(route));
  const alternatePt = absolute(routePath(alternateRoute(route, "pt")));
  const alternateEn = absolute(routePath(alternateRoute(route, "en")));

  if (route.kind === "home") {
    return {
      title: content[locale].meta.title,
      description: content[locale].meta.description,
      canonical,
      locale: locale === "pt" ? "pt_BR" : "en_US",
      lang: locale === "pt" ? "pt-BR" : "en",
      alternateLocale: locale === "pt" ? "en_US" : "pt_BR",
      alternatePt,
      alternateEn,
      image: absolute("/og-card.png"),
      imageAlt:
        locale === "pt"
          ? "Caio Vilquer, backend em Java, Kotlin e TypeScript, Poli-USP"
          : "Caio Vilquer, backend developer working with Java, Kotlin, and TypeScript at Poli-USP",
      preload: {
        href: "/media/caio-original-1440.webp",
        type: "image/webp",
        srcSet:
          "/media/caio-original-768.webp 768w, /media/caio-original-1440.webp 1440w, /media/caio-original-2048.webp 2048w, /media/caio-original-2752.webp 2752w",
        sizes: "(min-width: 64rem) 26vw, (min-width: 52rem) 40vw, 100vw",
      },
      jsonLd: homeJsonLd(locale, canonical),
    };
  }

  const project = getProjectPageData(locale, route.slug);
  return {
    title: `${project.title} · ${project.descriptor} · Caio Vilquer`,
    description: PROJECT_DESCRIPTIONS[locale][route.slug],
    canonical,
    locale: locale === "pt" ? "pt_BR" : "en_US",
    lang: locale === "pt" ? "pt-BR" : "en",
    alternateLocale: locale === "pt" ? "en_US" : "pt_BR",
    alternatePt,
    alternateEn,
    image: absolute(PROJECT_SOCIAL_IMAGES[route.slug]),
    imageAlt: project.image.alt,
    preload: {
      href: project.image.src,
      type: project.image.src.endsWith(".svg") ? "image/svg+xml" : "image/webp",
      srcSet: project.image.srcSet,
      sizes: project.image.srcSet ? "(min-width: 64rem) 52vw, 100vw" : undefined,
    },
    jsonLd: projectJsonLd(route, canonical),
  };
}
