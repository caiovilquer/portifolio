import { renderToString } from "react-dom/server";
import App from "./App";
import { content } from "./content";
import { getProjectPageData } from "./projectPages";
import { getSeoData, SITE_ORIGIN, SITE_UPDATED_DATE } from "./seo";
import { projectPath, routePath, STATIC_ROUTES, type ProjectSlug, type SiteRoute } from "./routes";

export { STATIC_ROUTES, getSeoData, routePath };

export function renderRoute(route: SiteRoute): string {
  return renderToString(<App route={route} />);
}

export function buildLlmsText(): string {
  return `# Caio Vilquer Carvalho

> Backend developer and Computer Engineering student at Poli-USP, based in São Paulo, Brazil. Three systems in production, built end to end: Poliatletas, RotinaPet, and Viazio.

Canonical profile: ${SITE_ORIGIN}/
English profile: ${SITE_ORIGIN}/en/
Email: caio@vilquer.dev
GitHub: https://github.com/caiovilquer
LinkedIn: https://www.linkedin.com/in/caio-vilquer/

## Selected case studies

- [Poliatletas](${SITE_ORIGIN}${projectPath("pt", "poliatletas")}): athletics management, NestJS, Fastify, PostgreSQL, Prisma, React, and Redis.
- [RotinaPet](${SITE_ORIGIN}${projectPath("pt", "rotinapet")}): authorized RAG for shared pet care, Kotlin, Spring Boot, Angular, PostgreSQL, pgvector, and OpenAI.
- [Viazio](${SITE_ORIGIN}${projectPath("pt", "viazio")}): explainable travel ranking with Java 21, Spring Boot, React, PostgreSQL, and Resilience4j.

## Applied research

- [TrackShot CV](${SITE_ORIGIN}${projectPath("pt", "trackshot")}): computer vision for shot-put release metrics using smartphone video.

## Curricula

- [Backend CV, Portuguese](${SITE_ORIGIN}/cv/caio-vilquer-backend.pdf)
- [Backend CV, English](${SITE_ORIGIN}/cv/caio-vilquer-backend-en.pdf)
- [Full-stack CV, Portuguese](${SITE_ORIGIN}/cv/caio-vilquer-full-stack.pdf)
- [Full-stack CV, English](${SITE_ORIGIN}/cv/caio-vilquer-full-stack-en.pdf)

Last updated: ${SITE_UPDATED_DATE}
`;
}

export function buildLlmsFullText(): string {
  const sections = (["pt", "en"] as const).flatMap((locale) => {
    const localeName = locale === "pt" ? "Português" : "English";
    const labels = locale === "pt"
      ? {
          selected: "Trabalhos selecionados",
          research: "Pesquisa aplicada",
          type: "Tipo",
          contribution: "Atuação de Caio",
          period: "Período",
          status: "Estado",
          stack: "Tecnologia",
          links: "Links",
          availability: "Disponibilidade",
        }
      : {
          selected: "Selected case studies",
          research: "Applied research",
          type: "Type",
          contribution: "Caio's contribution",
          period: "Period",
          status: "Status",
          stack: "Technology",
          links: "Links",
          availability: "Availability",
        };
    const renderProject = (slug: ProjectSlug) => {
        const project = getProjectPageData(locale, slug);
        const decisions = project.decisions
          .map((decision) => `- **${decision.label}:** ${decision.text}`)
          .join("\n");
        const evidence = project.evidence.map((item) => `- ${item}`).join("\n");
        const links = project.links.map((link) => `- [${link.label}](${link.href})`).join("\n");
        return `### ${project.title}

URL: ${SITE_ORIGIN}${projectPath(locale, slug)}
${labels.type}: ${project.descriptor}
${labels.contribution}: ${project.contribution}
${labels.period}: ${project.period}
${labels.status}: ${project.status}
${labels.stack}: ${project.stack}

${project.summary}

#### ${project.problemLabel}

${project.problem}

#### ${project.decisionsLabel}

${decisions}

#### ${project.evidenceLabel}

${evidence}
${links ? `\n#### ${labels.links}\n\n${links}` : ""}
`;
    };
    const selectedProjects = (["poliatletas", "rotinapet", "viazio"] as ProjectSlug[])
      .map(renderProject)
      .join("\n");
    const research = renderProject("trackshot");

    return `# ${localeName}

${content[locale].hero.summary}

${labels.availability}: ${content[locale].hero.specs.map((item) => `${item.label}: ${item.value}`).join("; ")}.

## ${labels.selected}

${selectedProjects}

## ${labels.research}

${research}`;
  });

  return `# Caio Vilquer Carvalho: profile and project evidence

Source: ${SITE_ORIGIN}/
Last updated: ${SITE_UPDATED_DATE}

${sections.join("\n")}`;
}
