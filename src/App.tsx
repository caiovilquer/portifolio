import { useEffect, useRef, useState } from "react";
import { content, type Locale, type ProjectContent } from "./content";
import { getProjectPageData } from "./projectPages";
import {
  alternateRoute,
  homePath,
  projectPath,
  routePath,
  type ProjectSlug,
  type SiteRoute,
} from "./routes";

const EMAIL = "caio@vilquer.dev";
const CV_FILES: Record<Locale, { backend: string; fullStack: string }> = {
  pt: {
    backend: "/cv/caio-vilquer-backend.pdf",
    fullStack: "/cv/caio-vilquer-full-stack.pdf",
  },
  en: {
    backend: "/cv/caio-vilquer-backend-en.pdf",
    fullStack: "/cv/caio-vilquer-full-stack-en.pdf",
  },
};

type CopyState = "idle" | "copied" | "failed";

async function copyToClipboard(value: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await Promise.race([
        navigator.clipboard.writeText(value),
        new Promise<never>((_, reject) =>
          window.setTimeout(() => reject(new Error("clipboard-timeout")), 800),
        ),
      ]);
      return true;
    } catch {
      // Browsers can expose the Clipboard API while denying or stalling writes.
    }
  }

  try {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    return copied;
  } catch {
    return false;
  }
}

function EmailCopy({
  copyLabel,
  copiedLabel,
  failedLabel,
  compact = false,
}: {
  copyLabel: string;
  copiedLabel: string;
  failedLabel: string;
  compact?: boolean;
}) {
  const [state, setState] = useState<CopyState>("idle");
  const timeout = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (timeout.current) window.clearTimeout(timeout.current);
    },
    [],
  );

  const handleCopy = async () => {
    const copied = await copyToClipboard(EMAIL);
    setState(copied ? "copied" : "failed");
    if (timeout.current) window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setState("idle"), 5000);
  };

  const buttonLabel = state === "copied" ? copiedLabel : copyLabel;

  return (
    <div className={`email-copy${compact ? " email-copy--compact" : ""}`}>
      <a className="email-copy__address" href={`mailto:${EMAIL}`}>
        {EMAIL}
      </a>
      <button
        className="email-copy__button"
        type="button"
        onClick={handleCopy}
        data-state={state}
      >
        {buttonLabel}
      </button>
      <span className="email-copy__feedback" aria-live="polite" role="status">
        {state === "failed" ? failedLabel : ""}
      </span>
    </div>
  );
}

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function ShotPutMark() {
  return (
    <span className="project-record__shot-mark" aria-hidden="true">
      <svg viewBox="0 0 64 44" focusable="false">
        <circle className="project-record__shot-circle" cx="17" cy="27" r="11.5" />
        <path className="project-record__toe-board" d="M24.5 18.5 Q31 27 24.5 35.5" />
        <path className="project-record__shot-path" d="M25 21.5 Q36 11.5 50 7.5" />
        <circle className="project-record__shot" cx="53" cy="7" r="4" />
        <path className="project-record__impact-ticks" d="M53 0.5V2.5M60 7H62" />
      </svg>
    </span>
  );
}

function ProjectRecord({
  project,
  index,
  locale,
}: {
  project: ProjectContent;
  index: number;
  locale: Locale;
}) {
  const detailLabel = locale === "pt" ? "Abrir estudo completo" : "Open full case study";

  return (
    <article
      id={project.slug}
      className={`project-record project-record--${project.slug} project-record--${index % 2 === 0 ? "forward" : "reverse"}`}
      aria-labelledby={`${project.slug}-title`}
    >
      <header className="project-record__header">
        <div className="project-record__register" aria-hidden="true">
          <span>{project.code}</span>
          <span>{project.period}</span>
        </div>
        <div className="project-record__title-block">
          <h3 id={`${project.slug}-title`}>{project.title}</h3>
          <p className="project-record__role">{project.descriptor}</p>
        </div>
        <p className="project-record__summary">{project.summary}</p>
      </header>

      <figure className="project-record__media">
        <img
          src={project.image.src}
          srcSet={project.image.srcSet}
          sizes="(min-width: 72rem) 48vw, (min-width: 48rem) 88vw, 100vw"
          width={project.image.width}
          height={project.image.height}
          alt={project.image.alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: project.image.position }}
        />
        <figcaption>{project.stack}</figcaption>
      </figure>

      <div className="project-record__analysis">
        <section className="project-record__problem" aria-labelledby={`${project.slug}-problem`}>
          <h4 id={`${project.slug}-problem`}>{project.problemLabel}</h4>
          <p>{project.problem}</p>
        </section>

        <section
          className="project-record__decisions"
          aria-labelledby={`${project.slug}-decisions`}
        >
          <h4 id={`${project.slug}-decisions`}>{project.decisionsLabel}</h4>
          <ul>
            {project.decisions.map((decision) => (
              <li key={decision.label}>
                <ShotPutMark />
                <div>
                  <strong>{decision.label}</strong>
                  <p>{decision.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="project-record__evidence"
          aria-labelledby={`${project.slug}-evidence`}
        >
          <h4 id={`${project.slug}-evidence`}>{project.evidenceLabel}</h4>
          <ul>
            {project.evidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <footer className="project-record__links">
          <a
            className="project-link project-link--case"
            href={projectPath(locale, project.slug as ProjectSlug)}
          >
            <span>{detailLabel}</span>
            <span aria-hidden="true">→</span>
          </a>
          {project.links.map((link) => (
            <ExternalLink
              key={link.href}
              href={link.href}
              className={
                link.kind === "primary"
                  ? "project-link project-link--primary"
                  : "project-link"
              }
            >
              {link.label}
            </ExternalLink>
          ))}
          {project.privateCode ? (
            <span className="project-record__private">{project.privateCode}</span>
          ) : null}
        </footer>
      </div>
    </article>
  );
}

function PortfolioHome({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const cvFiles = CV_FILES[locale];

  return (
    <>
      <a className="skip-link" href="#conteudo">
        {copy.skip}
      </a>

      <div className="page-measure" aria-hidden="true">
        <span>0,000</span>
        <span>0,534</span>
        <span>1,068</span>
        <span>1,601</span>
        <span>2,135 m</span>
      </div>

      <header className="site-header home-site-header">
        <div className="site-header__inner">
          <a className="wordmark" href={homePath(locale)} aria-label={copy.brandLabel}>
            <span className="wordmark__art" aria-hidden="true">
              <img
                className="wordmark__logo wordmark__logo--full"
                src="/media/caio-vilquer-logo.svg"
                width="275"
                height="76"
                alt=""
              />
              <img
                className="wordmark__logo wordmark__logo--compact"
                src="/media/caio-vilquer-mark.svg"
                width="76"
                height="76"
                alt=""
              />
            </span>
          </a>

          <nav
            className="site-nav"
            aria-label={locale === "pt" ? "Principal" : "Primary"}
          >
            <ul>
              {copy.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="language-switch" aria-label={copy.language.label}>
            <a
              href={homePath("pt")}
              lang="pt-BR"
              hrefLang="pt-BR"
              aria-current={locale === "pt" ? "page" : undefined}
            >
              {copy.language.portuguese}
            </a>
            <a
              href={homePath("en")}
              lang="en"
              hrefLang="en"
              aria-current={locale === "en" ? "page" : undefined}
            >
              {copy.language.english}
            </a>
          </nav>

          <details
            className="mobile-index"
            onKeyDown={(event) => {
              if (event.key !== "Escape") return;
              event.currentTarget.removeAttribute("open");
              event.currentTarget.querySelector("summary")?.focus();
            }}
          >
            <summary>{locale === "pt" ? "Índice" : "Index"}</summary>
            <nav
              className="mobile-index__nav"
              aria-label={locale === "pt" ? "Índice da página" : "Page index"}
            >
              <ul>
                {copy.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(event) =>
                        event.currentTarget.closest("details")?.removeAttribute("open")
                      }
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </header>

      <main id="conteudo" tabIndex={-1}>
        <section className="cover-sheet" id="inicio" aria-labelledby="hero-title">
          <div className="cover-sheet__grid">
            <div className="cover-sheet__intro">
              <p className="status-line">
                <span className="status-line__dot" aria-hidden="true" />
                <span className="status-line__text">{copy.hero.availability}</span>
                <span className="status-line__location">{copy.hero.mobileLocation}</span>
              </p>
              <h1 id="hero-title">
                <span className="cover-sheet__copy--desktop">{copy.hero.heading}</span>
                <span className="cover-sheet__copy--mobile">{copy.hero.mobileHeading}</span>
              </h1>
              <p className="cover-sheet__summary">
                <span className="cover-sheet__copy--desktop">{copy.hero.summary}</span>
                <span className="cover-sheet__copy--mobile">{copy.hero.mobileSummary}</span>
              </p>

              <div className="cover-sheet__actions">
                <a className="action action--primary" href={cvFiles.backend} download>
                  <span>{copy.hero.cvBackend}</span>
                  <span aria-hidden="true">↓</span>
                </a>
                <a
                  className="action action--text action--fullstack"
                  href={cvFiles.fullStack}
                  download
                >
                  {copy.hero.cvFullStack}
                </a>
                <a className="action action--text action--work" href="#trabalho">
                  <span>{copy.hero.seeWork}</span>
                  <span className="action__direction" aria-hidden="true">
                    ↘
                  </span>
                </a>
              </div>
            </div>

            <figure className="identity-photo">
              <div className="identity-photo__frame">
                <img
                  src="/media/caio-original-2752.webp"
                  srcSet="/media/caio-original-768.webp 768w, /media/caio-original-1440.webp 1440w, /media/caio-original-2048.webp 2048w, /media/caio-original-2752.webp 2752w"
                  sizes="(min-width: 64rem) 26vw, (min-width: 52rem) 40vw, 100vw"
                  width="2752"
                  height="1536"
                  alt={copy.hero.portraitAlt}
                  loading="eager"
                  decoding="async"
                  {...{ fetchpriority: "high" }}
                />
                <span className="identity-photo__cross identity-photo__cross--a" aria-hidden="true" />
                <span className="identity-photo__cross identity-photo__cross--b" aria-hidden="true" />
              </div>
              <figcaption>
                <span className="identity-photo__caption-default">
                  {copy.hero.portraitCaption}
                </span>
                <span className="identity-photo__mobile-caption">
                  <span className="identity-photo__person">
                    <strong>{copy.hero.identityName}</strong>
                    <span>{copy.hero.identityRole}</span>
                  </span>
                  <span className="identity-photo__stack">{copy.hero.identityStack}</span>
                </span>
              </figcaption>
            </figure>

            <dl className="spec-table">
              {copy.hero.specs.map((spec) => (
                <div key={spec.label}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>

            <aside className="measurement-note" aria-label={copy.hero.measurementLabel}>
              <span className="measurement-note__diameter" aria-hidden="true">
                Ø 2,135
              </span>
              <p>{copy.hero.measurementNote}</p>
            </aside>

            <div className="cover-sheet__contact">
              <p>{copy.hero.emailLabel}</p>
              <EmailCopy
                copyLabel={copy.hero.copyEmail}
                copiedLabel={copy.hero.copiedEmail}
                failedLabel={copy.hero.copyFailed}
              />
            </div>
          </div>
        </section>

        <section className="work-register" id="trabalho" aria-labelledby="work-title">
          <header className="section-heading section-heading--wide">
            <p className="section-kicker">{copy.work.kicker}</p>
            <div>
              <h2 id="work-title">{copy.work.heading}</h2>
              <p>{copy.work.intro}</p>
            </div>
          </header>

          <nav className="project-index" aria-labelledby="project-index-title">
            <h3 id="project-index-title">{copy.work.indexLabel}</h3>
            <ul>
              {copy.work.projects.map((project) => (
                <li key={project.slug}>
                  <a href={`#${project.slug}`}>
                    <ShotPutMark />
                    <strong>{project.title}</strong>
                    <span className="project-index__role">{project.descriptor}</span>
                    <span className="project-index__evidence">{project.evidence[0]}</span>
                    <span className="project-index__arrow" aria-hidden="true">↓</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="work-register__cases">
            {copy.work.projects.map((project, index) => (
              <ProjectRecord
                key={project.slug}
                project={project}
                index={index}
                locale={locale}
              />
            ))}
          </div>
        </section>

        <section className="research-sheet" id="pesquisa" aria-labelledby="research-title">
          <div className="research-sheet__header">
            <div>
              <p className="section-kicker">{copy.research.kicker}</p>
              <h2 id="research-title">{copy.research.heading}</h2>
            </div>
            <p className="research-sheet__status">{copy.research.status}</p>
          </div>

          <div className="research-sheet__body">
            <div className="research-sheet__copy">
              <p className="research-sheet__lead">{copy.research.summary}</p>

              <section aria-labelledby="research-current">
                <h3 id="research-current">{copy.research.currentLabel}</h3>
                <ul>
                  {copy.research.current.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="research-next">
                <h3 id="research-next">{copy.research.nextLabel}</h3>
                <p>{copy.research.next}</p>
              </section>

              <span className="private-note private-note--dark">
                {copy.research.repository}
              </span>
              <a
                className="project-link project-link--on-dark"
                href={projectPath(locale, "trackshot")}
              >
                <span>{locale === "pt" ? "Abrir estudo completo" : "Open full case study"}</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <figure className="research-sheet__figure">
              <img
                src="/media/trackshot-sequence-1440.webp"
                srcSet="/media/trackshot-sequence-720.webp 720w, /media/trackshot-sequence-1440.webp 1440w"
                sizes="(min-width: 64rem) 55vw, 100vw"
                width="1440"
                height="840"
                alt={copy.research.imageAlt}
                loading="lazy"
                decoding="async"
              />
              <figcaption>{copy.research.evidence}</figcaption>
            </figure>
          </div>
        </section>

        <section className="profile-sheet" id="perfil" aria-labelledby="profile-title">
          <header className="section-heading">
            <p className="section-kicker">{copy.profile.kicker}</p>
            <div>
              <h2 id="profile-title">{copy.profile.heading}</h2>
            </div>
          </header>

          <div className="profile-sheet__body">
            <section className="experience-map" aria-labelledby="experience-title">
              <h3 id="experience-title">{copy.profile.stackLabel}</h3>
              <dl>
                {copy.profile.stack.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>
                      <strong>{item.value}</strong>
                      <span>{item.proof}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="working-method" aria-labelledby="method-title">
              <h3 id="method-title">{copy.profile.methodLabel}</h3>
              <ol>
                {copy.profile.method.map((item) => (
                  <li key={item.number}>
                    <span aria-hidden="true">{item.number}</span>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <section className="other-work" aria-labelledby="other-work-title">
            <div className="other-work__heading">
              <h3 id="other-work-title">{copy.profile.otherLabel}</h3>
            </div>
            <div className="other-work__list">
              {copy.profile.other.map((item) => (
                <article key={item.title}>
                  <div>
                    <p>{item.type}</p>
                    <h4>{item.title}</h4>
                  </div>
                  <p>{item.description}</p>
                  <p className="other-work__stack">{item.stack}</p>
                  {item.href ? (
                    <ExternalLink className="project-link" href={item.href}>
                      {item.linkLabel}
                    </ExternalLink>
                  ) : (
                    <span className="project-record__private other-work__private">
                      {item.linkLabel}
                    </span>
                  )}
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>

      <footer className="contact-sheet" id="contato">
        <div className="contact-sheet__top">
          <p className="section-kicker">{copy.contact.kicker}</p>
          <h2>{copy.contact.heading}</h2>
          <p>{copy.contact.text}</p>
        </div>

        <EmailCopy
          copyLabel={copy.contact.copy}
          copiedLabel={copy.hero.copiedEmail}
          failedLabel={copy.hero.copyFailed}
          compact
        />

        <nav
          className="contact-sheet__links"
          aria-label={locale === "pt" ? "Links de contato" : "Contact links"}
        >
          <ExternalLink href="https://www.linkedin.com/in/caio-vilquer/">
            {copy.contact.linkedin}
          </ExternalLink>
          <ExternalLink href="https://github.com/caiovilquer">
            {copy.contact.github}
          </ExternalLink>
          <a href={cvFiles.backend} download>
            <span>{copy.contact.cvBackend}</span>
            <span aria-hidden="true">↓</span>
          </a>
          <a href={cvFiles.fullStack} download>
            <span>{copy.contact.cvFullStack}</span>
            <span aria-hidden="true">↓</span>
          </a>
        </nav>

        <div className="contact-sheet__foot">
          <p>{copy.contact.location}</p>
          <p>
            © {new Date().getFullYear()} · {copy.contact.legal}
          </p>
        </div>
      </footer>
    </>
  );
}

function ProjectPage({ route }: { route: Extract<SiteRoute, { kind: "project" }> }) {
  const { locale, slug } = route;
  const copy = content[locale];
  const project = getProjectPageData(locale, slug);
  const cvFiles = CV_FILES[locale];
  const labels = locale === "pt"
    ? {
        back: "Voltar ao portfólio",
        register: "Ficha do projeto",
        period: "Período",
        contribution: "Minha atuação",
        stack: "Tecnologia",
        status: "Estado",
        sources: "Produto e código",
        related: "Outros estudos",
        contact: "Contato",
        contactHeading: "Posso começar agora.",
        nav: "Navegação do projeto",
        sectionMarks: ["CÍRCULO", "SETOR", "MARCA", "SÚMULA"],
      }
    : {
        back: "Back to portfolio",
        register: "Project record",
        period: "Period",
        contribution: "My contribution",
        stack: "Technology",
        status: "Status",
        sources: "Product and code",
        related: "Other case studies",
        contact: "Contact",
        contactHeading: "I can start now.",
        nav: "Project navigation",
        sectionMarks: ["RING", "SECTOR", "MARK", "SHEET"],
      };
  const ptRoute = alternateRoute(route, "pt");
  const enRoute = alternateRoute(route, "en");

  return (
    <>
      <a className="skip-link" href="#conteudo">
        {copy.skip}
      </a>

      <div className="page-measure" aria-hidden="true">
        <span>0,000</span>
        <span>0,534</span>
        <span>1,068</span>
        <span>1,601</span>
        <span>2,135 m</span>
      </div>

      <header className="site-header dossier-site-header">
        <div className="site-header__inner">
          <a className="wordmark" href={homePath(locale)} aria-label={copy.brandLabel}>
            <span className="wordmark__art" aria-hidden="true">
              <img
                className="wordmark__logo wordmark__logo--full"
                src="/media/caio-vilquer-logo.svg"
                width="275"
                height="76"
                alt=""
              />
              <img
                className="wordmark__logo wordmark__logo--compact"
                src="/media/caio-vilquer-mark.svg"
                width="76"
                height="76"
                alt=""
              />
            </span>
          </a>

          <nav className="site-nav dossier-site-nav" aria-label={labels.nav}>
            <a href={`${homePath(locale)}#trabalho`}>← {labels.back}</a>
          </nav>

          <nav className="language-switch" aria-label={copy.language.label}>
            <a
              href={routePath(ptRoute)}
              lang="pt-BR"
              hrefLang="pt-BR"
              aria-current={locale === "pt" ? "page" : undefined}
            >
              PT
            </a>
            <a
              href={routePath(enRoute)}
              lang="en"
              hrefLang="en"
              aria-current={locale === "en" ? "page" : undefined}
            >
              EN
            </a>
          </nav>
        </div>
      </header>

      <main id="conteudo" tabIndex={-1}>
        <article className={`project-dossier project-record--${slug}`}>
          <header className="project-dossier__masthead">
            <div className="project-dossier__register">
              <ShotPutMark />
              <p>{labels.register}</p>
              <span>{project.code}</span>
            </div>
            <div className="project-dossier__title">
              <p>{project.descriptor}</p>
              <h1>{project.title}</h1>
              <p>{project.summary}</p>
            </div>
          </header>

          <dl className="project-dossier__specs">
            <div>
              <dt>{labels.period}</dt>
              <dd>{project.period}</dd>
            </div>
            <div>
              <dt>{labels.contribution}</dt>
              <dd>{project.contribution}</dd>
            </div>
            <div>
              <dt>{labels.stack}</dt>
              <dd>{project.stack}</dd>
            </div>
            <div>
              <dt>{labels.status}</dt>
              <dd>{project.status}</dd>
            </div>
          </dl>

          <figure className="project-dossier__media project-record__media">
            <img
              src={project.image.src}
              srcSet={project.image.srcSet}
              sizes="(min-width: 64rem) 66vw, 100vw"
              width={project.image.width}
              height={project.image.height}
              alt={project.image.alt}
              decoding="async"
              {...{ fetchpriority: "high" }}
            />
            <figcaption>{project.imageCaption}</figcaption>
          </figure>

          <div className="project-dossier__body">
            <aside
              className="project-dossier__margin"
              aria-label={copy.hero.measurementLabel}
            >
              <span>Ø 2,135 m</span>
              <p>{copy.hero.measurementNote}</p>
            </aside>

            <div className="project-dossier__analysis">
              <section aria-labelledby="dossier-problem">
                <p className="section-kicker">{labels.sectionMarks[0]}</p>
                <div>
                  <h2 id="dossier-problem">{project.problemLabel}</h2>
                  <p>{project.problem}</p>
                </div>
              </section>

              {project.visualEvidence ? (
                <section
                  className="project-dossier__visual-evidence"
                  aria-labelledby="dossier-visual-evidence"
                >
                  <p className="section-kicker">{project.visualEvidence.mark}</p>
                  <div>
                    <h2 id="dossier-visual-evidence">
                      {project.visualEvidence.title}
                    </h2>
                    <p>{project.visualEvidence.intro}</p>
                    <ol className="project-dossier__frame-sequence">
                      {project.visualEvidence.frames.map((frame) => (
                        <li
                          key={frame.frame}
                          className="project-dossier__frame"
                        >
                          <figure>
                            <div className="project-dossier__frame-image">
                              <img
                                src={frame.src}
                                srcSet={frame.srcSet}
                                sizes="(min-width: 80rem) 19vw, (min-width: 48rem) 38vw, 100vw"
                                width={frame.width}
                                height={frame.height}
                                alt={frame.alt}
                                loading="lazy"
                                decoding="async"
                              />
                              <span>{frame.frame}</span>
                            </div>
                            <figcaption>
                              <p>
                                <strong>{frame.stage}</strong>
                                <span>{frame.time}</span>
                              </p>
                              <p>{frame.caption}</p>
                            </figcaption>
                          </figure>
                        </li>
                      ))}
                    </ol>
                  </div>
                </section>
              ) : null}

              <section aria-labelledby="dossier-decisions">
                <p className="section-kicker">{labels.sectionMarks[1]}</p>
                <div>
                  <h2 id="dossier-decisions">{project.decisionsLabel}</h2>
                  <ol className="project-dossier__decisions">
                    {project.decisions.map((decision) => (
                      <li key={decision.label}>
                        <ShotPutMark />
                        <div>
                          <h3>{decision.label}</h3>
                          <p>{decision.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <section aria-labelledby="dossier-evidence">
                <p className="section-kicker">{labels.sectionMarks[2]}</p>
                <div>
                  <h2 id="dossier-evidence">{project.evidenceLabel}</h2>
                  <ul className="project-dossier__evidence">
                    {project.evidence.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>

              <section aria-labelledby="dossier-links">
                <p className="section-kicker">{labels.sectionMarks[3]}</p>
                <div>
                  <h2 id="dossier-links">{labels.sources}</h2>
                  <div className="project-record__links">
                    {project.links.map((link) => (
                      <ExternalLink
                        key={link.href}
                        href={link.href}
                        className={
                          link.kind === "primary"
                            ? "project-link project-link--primary"
                            : "project-link"
                        }
                      >
                        {link.label}
                      </ExternalLink>
                    ))}
                    {project.privateCode ? (
                      <span className="project-record__private">{project.privateCode}</span>
                    ) : null}
                  </div>
                </div>
              </section>
            </div>
          </div>

          <nav className="project-dossier__related" aria-labelledby="related-projects">
            <h2 id="related-projects">{labels.related}</h2>
            <ul>
              {(["poliatletas", "rotinapet", "viazio", "trackshot"] as ProjectSlug[])
                .filter((relatedSlug) => relatedSlug !== slug)
                .map((relatedSlug) => {
                  const related = getProjectPageData(locale, relatedSlug);
                  return (
                    <li key={relatedSlug}>
                      <a
                        href={projectPath(locale, relatedSlug)}
                      >
                        <ShotPutMark />
                        <span>{related.title}</span>
                        <span aria-hidden="true">→</span>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </article>
      </main>

      <footer className="contact-sheet project-contact-sheet">
        <div className="contact-sheet__top">
          <p className="section-kicker">{labels.contact}</p>
          <h2>{labels.contactHeading}</h2>
          <p>{copy.contact.text}</p>
        </div>

        <EmailCopy
          copyLabel={copy.contact.copy}
          copiedLabel={copy.hero.copiedEmail}
          failedLabel={copy.hero.copyFailed}
          compact
        />

        <nav className="contact-sheet__links" aria-label={labels.contact}>
          <ExternalLink href="https://www.linkedin.com/in/caio-vilquer/">
            {copy.contact.linkedin}
          </ExternalLink>
          <ExternalLink href="https://github.com/caiovilquer">
            {copy.contact.github}
          </ExternalLink>
          <a href={cvFiles.backend} download>
            <span>{copy.contact.cvBackend}</span>
            <span aria-hidden="true">↓</span>
          </a>
          <a href={cvFiles.fullStack} download>
            <span>{copy.contact.cvFullStack}</span>
            <span aria-hidden="true">↓</span>
          </a>
        </nav>

        <div className="contact-sheet__foot">
          <p>{copy.contact.location}</p>
          <p>© {new Date().getFullYear()} · {copy.contact.legal}</p>
        </div>
      </footer>
    </>
  );
}

function App({ route }: { route: SiteRoute }) {
  return route.kind === "project"
    ? <ProjectPage route={route} />
    : <PortfolioHome locale={route.locale} />;
}

export default App;
