export type Locale = "pt" | "en";

export type ProjectDecision = {
  label: string;
  text: string;
};

export type ProjectLink = {
  label: string;
  href: string;
  kind?: "primary" | "secondary";
};

export type ProjectContent = {
  slug: string;
  code: string;
  period: string;
  title: string;
  role: string;
  summary: string;
  problemLabel: string;
  problem: string;
  decisionsLabel: string;
  decisions: ProjectDecision[];
  evidenceLabel: string;
  evidence: string[];
  stack: string;
  image: {
    src: string;
    srcSet?: string;
    width: number;
    height: number;
    alt: string;
    position?: string;
  };
  links: ProjectLink[];
  privateCode?: string;
};

type SiteContent = {
  meta: {
    title: string;
    description: string;
  };
  skip: string;
  brandLabel: string;
  nav: Array<{ label: string; href: string }>;
  language: {
    label: string;
    portuguese: string;
    english: string;
  };
  hero: {
    availability: string;
    heading: string;
    mobileHeading: string;
    summary: string;
    mobileSummary: string;
    identityName: string;
    identityRole: string;
    identityStack: string;
    mobileLocation: string;
    specs: Array<{ label: string; value: string }>;
    cvBackend: string;
    cvFullStack: string;
    seeWork: string;
    portraitAlt: string;
    portraitCaption: string;
    measurementLabel: string;
    measurementNote: string;
    emailLabel: string;
    copyEmail: string;
    copiedEmail: string;
    copyFailed: string;
  };
  work: {
    kicker: string;
    heading: string;
    intro: string;
    indexLabel: string;
    projects: ProjectContent[];
  };
  research: {
    kicker: string;
    heading: string;
    status: string;
    summary: string;
    currentLabel: string;
    current: string[];
    nextLabel: string;
    next: string;
    evidence: string;
    imageAlt: string;
    repository: string;
  };
  profile: {
    kicker: string;
    heading: string;
    intro: string;
    stackLabel: string;
    stack: Array<{ label: string; value: string; proof: string }>;
    methodLabel: string;
    method: Array<{ number: string; title: string; text: string }>;
    otherLabel: string;
    otherIntro: string;
    other: Array<{
      title: string;
      type: string;
      description: string;
      stack: string;
      href?: string;
      linkLabel: string;
    }>;
  };
  contact: {
    kicker: string;
    heading: string;
    text: string;
    email: string;
    copy: string;
    linkedin: string;
    github: string;
    cvBackend: string;
    cvFullStack: string;
    location: string;
    legal: string;
  };
};

const sharedImages = {
  poliatletas: {
    src: "/media/poliatletas-logo.svg",
    width: 228,
    height: 228,
  },
  rotinapet: {
    src: "/media/rotinapet-logo.svg",
    width: 840,
    height: 210,
  },
  viazio: {
    src: "/media/viazio-logo.svg?v=white-on-navy",
    width: 1920,
    height: 1080,
  },
};

export const content: Record<Locale, SiteContent> = {
  pt: {
    meta: {
      title: "Caio Vilquer · Backend em Java, Kotlin e TypeScript · Poli-USP",
      description:
        "Estudante de Engenharia de Computação na Poli-USP. Projetos em Java, Kotlin, Spring Boot, NestJS, PostgreSQL, RAG, React e Angular.",
    },
    skip: "Pular para o conteúdo",
    brandLabel: "Caio Vilquer, início",
    nav: [
      { label: "Trabalho", href: "#trabalho" },
      { label: "Pesquisa", href: "#pesquisa" },
      { label: "Perfil", href: "#perfil" },
      { label: "Contato", href: "#contato" },
    ],
    language: {
      label: "Idioma da página",
      portuguese: "PT",
      english: "EN",
    },
    hero: {
      availability: "Disponível agora para estágio",
      heading: "Escrevo sistemas em que as regras de negócio ficam visíveis no código e nos testes.",
      mobileHeading: "Backend com regras de negócio visíveis no código e nos testes.",
      summary:
        "Estudo Engenharia de Computação na Poli-USP. Trabalho principalmente no backend com Java, Kotlin e TypeScript, mas também implemento frontend e banco de dados nos meus projetos. O RotinaPet usa RAG; o TrackShot aplica visão computacional ao arremesso de peso.",
      mobileSummary:
        "Java, Kotlin e TypeScript. Projetos com RAG, visão computacional e sistemas full stack.",
      identityName: "Caio Vilquer",
      identityRole: "Backend · Poli-USP",
      identityStack: "Java / Kotlin / TypeScript",
      mobileLocation: "SP",
      specs: [
        { label: "Busca", value: "Estágio ou posição júnior" },
        { label: "Foco", value: "Backend, com atuação full stack" },
        { label: "Modelo", value: "Remoto ou híbrido em São Paulo" },
        { label: "Formação", value: "Poli-USP, conclusão em 12/2029" },
      ],
      cvBackend: "Baixar CV backend",
      cvFullStack: "CV full stack",
      seeWork: "Ver trabalhos selecionados",
      portraitAlt: "Retrato de Caio Vilquer Carvalho",
      portraitCaption: "Caio Vilquer Carvalho · São Paulo, SP",
      measurementLabel: "Referência da régua visual",
      measurementNote:
        "Ø 2,135 m: o diâmetro do círculo do arremesso de peso virou a régua visual deste portfólio.",
      emailLabel: "Contato direto",
      copyEmail: "Copiar e-mail",
      copiedEmail: "E-mail copiado",
      copyFailed: "Não foi possível copiar. Selecione o endereço ao lado.",
    },
    work: {
      kicker: "Poliatletas · RotinaPet · Viazio",
      heading: "Trabalhos selecionados",
      intro:
        "O Poliatletas compara marcas esportivas, o RotinaPet isola os dados de cada família e o Viazio ranqueia destinos mesmo quando uma fonte falha. Nos três, regras de domínio, autorização e falhas de integração aparecem no código e nos testes.",
      indexLabel: "Registro dos casos",
      projects: [
        {
          slug: "poliatletas",
          code: "01 / 03",
          period: "08.2025 · atual",
          title: "Poliatletas",
          role: "Sistema da equipe de atletismo da Poli-USP",
          summary:
            "O Poliatletas reúne atletas, competições, resultados, rankings, recordes e a operação técnica da equipe.",
          problemLabel: "Problema de domínio",
          problem:
            "Tempo, distância e pontuação não podem ser comparados pela mesma regra. O sistema também precisa separar resultado oficial, marca de treino, papel do usuário e histórico auditável.",
          decisionsLabel: "Decisões técnicas",
          decisions: [
            {
              label: "Modelo esportivo",
              text: "Normalização por unidade e direção de comparação, com PBs e recordes derivados apenas de resultados elegíveis.",
            },
            {
              label: "Papéis e auditoria",
              text: "JWT e RBAC para USER, COACH e ADMIN, importação idempotente e trilha de auditoria nas ações sensíveis.",
            },
            {
              label: "API e tipos gerados",
              text: "API NestJS/Fastify versionada, PostgreSQL e Prisma; frontend React consome tipos gerados do OpenAPI.",
            },
          ],
          evidenceLabel: "Evidência no produto",
          evidence: [
            "Rankings públicos com filtros e comparação de temporadas",
            "Importação de resultados em lote sem duplicar histórico",
            "Código de aplicação privado; demonstração pública disponível",
          ],
          stack: "NestJS · Fastify · PostgreSQL · Prisma · React · Redis",
          image: {
            ...sharedImages.poliatletas,
            alt: "Logotipo oficial do Poliatletas em azul e amarelo",
          },
          links: [
            {
              label: "Abrir sistema",
              href: "https://poliatletas.com.br",
              kind: "primary",
            },
          ],
          privateCode: "Código privado",
        },
        {
          slug: "rotinapet",
          code: "02 / 03",
          period: "05.2025 · atual",
          title: "RotinaPet",
          role: "Cuidado compartilhado com assistente de IA e RAG",
          summary:
            "Agenda, histórico clínico, documentos e colaboração familiar, com IA limitada por autorização e confirmação humana.",
          problemLabel: "Problema de confiança",
          problem:
            "Uma resposta útil não pode consultar dados de outra família, inventar evidência clínica nem criar um plano de cuidado sem revisão explícita.",
          decisionsLabel: "Decisões técnicas",
          decisions: [
            {
              label: "Autorização antes do ranking",
              text: "O universo de busca é filtrado por família, pet e fonte autorizada antes de combinar FTS em português e pgvector por RRF.",
            },
            {
              label: "IA propõe, domínio confirma",
              text: "Structured Outputs gera rascunhos versionados; o caso de uso revalida papel, versão, expiração e idempotência antes de escrever.",
            },
            {
              label: "Indexação recuperável",
              text: "Outbox transacional, lotes de embeddings, retry, dead letter e troca atômica mantêm fonte e índice consistentes.",
            },
          ],
          evidenceLabel: "Quality gates versionados",
          evidence: [
            "Recall@5 mínimo de 95%",
            "Precisão de citações mínima de 98%",
            "Abstenção sem evidência mínima de 95%",
          ],
          stack:
            "Kotlin · Spring Boot · Angular · PostgreSQL/pgvector · OpenAI",
          image: {
            ...sharedImages.rotinapet,
            alt: "Logotipo oficial do RotinaPet em verde, preto e amarelo",
          },
          links: [
            {
              label: "Abrir sistema",
              href: "https://rotinapet.vilquer.dev",
              kind: "primary",
            },
            {
              label: "Backend",
              href: "https://github.com/caiovilquer/rotina-pet",
            },
            {
              label: "Frontend",
              href: "https://github.com/caiovilquer/rotina-pet-front",
            },
          ],
        },
        {
          slug: "viazio",
          code: "03 / 03",
          period: "03.2026 · 07.2026",
          title: "Viazio",
          role: "Motor explicável de recomendação de viagens",
          summary:
            "Cruza calendário, clima, custo relativo, distância e contexto local sem esconder incerteza atrás de uma nota única.",
          problemLabel: "Problema de decisão",
          problem:
            "APIs externas têm latências, coberturas e falhas diferentes. O ranking precisa continuar útil quando um critério falta e mostrar por que cada destino ficou naquela posição.",
          decisionsLabel: "Decisões técnicas",
          decisions: [
            {
              label: "Score decomponível",
              text: "Qualidade da janela, qualidade do destino e confiança dos dados aparecem separadas; pesos são renormalizados quando uma fonte falta.",
            },
            {
              label: "Isolamento por provedor",
              text: "Retry, circuit breaker e bulkhead independentes evitam que a Wikipédia derrube clima, câmbio ou feriados.",
            },
            {
              label: "PostgreSQL na leitura",
              text: "Leituras usam PostgreSQL, orçamento síncrono de 2 segundos e refresh em background para não prender a resposta em upstream lento.",
            },
          ],
          evidenceLabel: "Evidência no repositório",
          evidence: [
            "Mais de 250 testes backend sem dependência de rede",
            "Cinco fontes externas com degradação explícita",
            "Java 21 com virtual threads por candidato",
          ],
          stack:
            "Java 21 · Spring Boot · React 19 · PostgreSQL · Resilience4j",
          image: {
            ...sharedImages.viazio,
            alt: "Logotipo horizontal do Viazio em dourado e branco sobre azul-marinho quadriculado",
          },
          links: [
            {
              label: "Abrir sistema",
              href: "https://viazio.vilquer.dev",
              kind: "primary",
            },
            {
              label: "Ver código",
              href: "https://github.com/caiovilquer/viazio",
            },
          ],
        },
      ],
    },
    research: {
      kicker: "Pesquisa aplicada · visão computacional",
      heading: "TrackShot CV",
      status: "Protótipo desktop em desenvolvimento",
      summary:
        "O TrackShot usa vídeo de smartphone para estimar velocidade, ângulo e altura de liberação no arremesso de peso, sem radar ou laboratório.",
      currentLabel: "O que já existe",
      current: [
        "Pose 2D com MMPose e MediaPipe como backend leve",
        "Suavização temporal e tratamento conservador de oclusões",
        "Rastreamento do implemento e detecção do frame de liberação",
        "Métricas de velocidade, ângulo e altura com incerteza explícita",
      ],
      nextLabel: "Próxima validação",
      next:
        "Validar o pipeline em dataset próprio e, depois, fundir visão com IMU. O sistema recusa a métrica quando a evidência ao redor da liberação é insuficiente.",
      evidence:
        "A captura real é tratada em 240 fps; estados detectado, predito e interpolado permanecem auditáveis nos relatórios.",
      imageAlt:
        "Dois frames reais do TrackShot com a pose sobre o atleta; no segundo, o implemento e sua trajetória aparecem destacados em amarelo",
      repository: "Código privado · em desenvolvimento",
    },
    profile: {
      kicker: "Onde usei cada tecnologia",
      heading: "Perfil técnico",
      intro:
        "Prefiro explicar onde usei uma tecnologia e qual problema ela resolveu.",
      stackLabel: "Tecnologia e projeto",
      stack: [
        {
          label: "Backend",
          value: "Java, Kotlin, Spring Boot, NestJS e Fastify",
          proof: "Viazio, RotinaPet e Poliatletas",
        },
        {
          label: "Dados e IA",
          value: "PostgreSQL, pgvector, Prisma, JPA, RAG e embeddings",
          proof: "RotinaPet, Viazio e Poliatletas",
        },
        {
          label: "Frontend",
          value: "React, Angular, TypeScript e TanStack Query",
          proof: "Os três produtos selecionados",
        },
        {
          label: "Qualidade e operação",
          value: "JUnit, Jest, Vitest, Testcontainers, Docker e GitHub Actions",
          proof: "Testes de domínio, integração e contrato",
        },
      ],
      methodLabel: "Como estruturo o trabalho",
      method: [
        {
          number: "A",
          title: "Regra testável",
          text: "Mantenho a decisão de negócio testável sem depender do banco, da UI ou do provedor externo.",
        },
        {
          number: "B",
          title: "Autorização e falhas",
          text: "Incluo autorização, idempotência e tratamento de falhas de integração no contrato desde o início.",
        },
        {
          number: "C",
          title: "O que falta medir",
          text: "Quando o código ainda não prova capacidade, precisão ou completude, eu trato isso como hipótese a medir.",
        },
      ],
      otherLabel: "Outros trabalhos",
      otherIntro:
        "O CasaConta tem testes de regras de domínio em .NET; o Marca mantém dados de saúde e treino localmente com Tauri, Rust e SQLite.",
      other: [
        {
          title: "CasaConta",
          type: "Case full stack",
          description:
            "Controle residencial com regra de menor de idade, API HTTP testada de ponta a ponta e agregação de totais no backend.",
          stack: ".NET 8 · EF Core · SQLite · React 19",
          href: "https://github.com/caiovilquer/ControleGastos",
          linkLabel: "Ver código",
        },
        {
          title: "Marca",
          type: "Aplicação desktop offline",
          description:
            "Acompanhamento de saúde, nutrição e treino com SQLite local, backup, exportação e relatório médico imprimível.",
          stack: "Tauri 2 · Rust · React · SQLite",
          linkLabel: "Código privado",
        },
      ],
    },
    contact: {
      kicker: "Estágio · júnior · São Paulo",
      heading: "Estou disponível para começar agora.",
      text:
        "Procuro estágio e também considero posições júnior em backend ou full stack. Em São Paulo, busco vagas remotas ou híbridas.",
      email: "caio@vilquer.dev",
      copy: "Copiar e-mail",
      linkedin: "LinkedIn",
      github: "GitHub",
      cvBackend: "CV backend",
      cvFullStack: "CV full stack",
      location: "São Paulo, SP · Brasil",
      legal: "Projetado e desenvolvido por Caio Vilquer Carvalho.",
    },
  },
  en: {
    meta: {
      title: "Caio Vilquer · Backend in Java, Kotlin and TypeScript · Poli-USP",
      description:
        "Computer Engineering student at Poli-USP. Projects in Java, Kotlin, Spring Boot, NestJS, PostgreSQL, RAG, React, and Angular.",
    },
    skip: "Skip to content",
    brandLabel: "Caio Vilquer, home",
    nav: [
      { label: "Work", href: "#trabalho" },
      { label: "Research", href: "#pesquisa" },
      { label: "Profile", href: "#perfil" },
      { label: "Contact", href: "#contato" },
    ],
    language: {
      label: "Page language",
      portuguese: "PT",
      english: "EN",
    },
    hero: {
      availability: "Available now for internships",
      heading: "I build systems where business rules stay visible in code and tests.",
      mobileHeading: "Backend systems with business rules visible in code and tests.",
      summary:
        "I study Computer Engineering at Poli-USP. I work mainly on backend systems with Java, Kotlin, and TypeScript, but I also build the frontend and database layers in my projects. RotinaPet uses RAG; TrackShot applies computer vision to shot put.",
      mobileSummary:
        "Java, Kotlin, and TypeScript. Projects with RAG, computer vision, and full-stack systems.",
      identityName: "Caio Vilquer",
      identityRole: "Backend · Poli-USP",
      identityStack: "Java / Kotlin / TypeScript",
      mobileLocation: "SP",
      specs: [
        { label: "Seeking", value: "Internship or junior position" },
        { label: "Focus", value: "Backend, with full-stack experience" },
        { label: "Model", value: "Remote or hybrid in São Paulo" },
        { label: "Degree", value: "Poli-USP, expected 12/2029" },
      ],
      cvBackend: "Download backend CV",
      cvFullStack: "Full-stack CV",
      seeWork: "View selected work",
      portraitAlt: "Portrait of Caio Vilquer Carvalho",
      portraitCaption: "Caio Vilquer Carvalho · São Paulo, Brazil",
      measurementLabel: "Visual ruler reference",
      measurementNote:
        "Ø 2.135 m: the official shot-put circle diameter became this portfolio's visual ruler.",
      emailLabel: "Direct contact",
      copyEmail: "Copy email",
      copiedEmail: "Email copied",
      copyFailed: "Copy failed. Select the address beside this message.",
    },
    work: {
      kicker: "Poliatletas · RotinaPet · Viazio",
      heading: "Selected work",
      intro:
        "Poliatletas compares athletic results, RotinaPet isolates each family's data, and Viazio ranks destinations when an upstream source fails. In all three, domain rules, authorization, and integration failures appear in code and tests.",
      indexLabel: "Case register",
      projects: [
        {
          slug: "poliatletas",
          code: "01 / 03",
          period: "08.2025 · present",
          title: "Poliatletas",
          role: "The athletics management system at Poli-USP",
          summary:
            "Poliatletas brings athletes, meets, results, rankings, records, and the team's technical operations into one system.",
          problemLabel: "Domain problem",
          problem:
            "Time, distance, and points cannot share one comparison rule. The system must also separate official results, training marks, user roles, and an auditable history.",
          decisionsLabel: "Technical decisions",
          decisions: [
            {
              label: "Sports model",
              text: "Unit normalization and explicit comparison direction, with PBs and records derived only from eligible results.",
            },
            {
              label: "Roles and audit records",
              text: "JWT and RBAC for USER, COACH, and ADMIN, idempotent imports, and audit records for sensitive changes.",
            },
            {
              label: "API and generated types",
              text: "A versioned NestJS/Fastify API backed by PostgreSQL and Prisma; React consumes types generated from OpenAPI.",
            },
          ],
          evidenceLabel: "Product evidence",
          evidence: [
            "Public rankings with filters and season comparison",
            "Batch result import without duplicating history",
            "Application code is private; the public product is available",
          ],
          stack: "NestJS · Fastify · PostgreSQL · Prisma · React · Redis",
          image: {
            ...sharedImages.poliatletas,
            alt: "Official Poliatletas logo in blue and yellow",
          },
          links: [
            {
              label: "Open product",
              href: "https://poliatletas.com.br",
              kind: "primary",
            },
          ],
          privateCode: "Private codebase",
        },
        {
          slug: "rotinapet",
          code: "02 / 03",
          period: "05.2025 · present",
          title: "RotinaPet",
          role: "Shared pet care with an AI and RAG assistant",
          summary:
            "Schedules, clinical history, documents, and family collaboration, with AI constrained by authorization and human confirmation.",
          problemLabel: "Trust problem",
          problem:
            "A useful answer cannot access another household, fabricate clinical evidence, or create a care plan without explicit review.",
          decisionsLabel: "Technical decisions",
          decisions: [
            {
              label: "Authorization before ranking",
              text: "Family, pet, and source filters define the search universe before Portuguese FTS and pgvector are merged with RRF.",
            },
            {
              label: "AI proposes, domain confirms",
              text: "Structured Outputs creates versioned drafts; the use case revalidates role, version, expiry, and idempotency before writing.",
            },
            {
              label: "Recoverable indexing",
              text: "A transactional outbox, batched embeddings, retries, dead letters, and atomic publication keep source and index consistent.",
            },
          ],
          evidenceLabel: "Versioned quality gates",
          evidence: [
            "Recall@5 at or above 95%",
            "Citation precision at or above 98%",
            "Unsupported-answer abstention at or above 95%",
          ],
          stack:
            "Kotlin · Spring Boot · Angular · PostgreSQL/pgvector · OpenAI",
          image: {
            ...sharedImages.rotinapet,
            alt: "Official RotinaPet logo in green, black, and yellow",
          },
          links: [
            {
              label: "Open product",
              href: "https://rotinapet.vilquer.dev",
              kind: "primary",
            },
            {
              label: "Backend",
              href: "https://github.com/caiovilquer/rotina-pet",
            },
            {
              label: "Frontend",
              href: "https://github.com/caiovilquer/rotina-pet-front",
            },
          ],
        },
        {
          slug: "viazio",
          code: "03 / 03",
          period: "03.2026 · 07.2026",
          title: "Viazio",
          role: "Explainable travel recommendation engine",
          summary:
            "It combines calendars, weather, relative cost, distance, and local context without hiding uncertainty behind one opaque score.",
          problemLabel: "Decision problem",
          problem:
            "External APIs have different latencies, coverage, and failures. The ranking must remain useful when one criterion is missing and explain why each destination landed where it did.",
          decisionsLabel: "Technical decisions",
          decisions: [
            {
              label: "Decomposable score",
              text: "Window quality, destination quality, and data confidence remain separate; weights are normalized when a source is unavailable.",
            },
            {
              label: "Provider isolation",
              text: "Independent retries, circuit breakers, and bulkheads prevent Wikipedia failures from taking down weather, currency, or holidays.",
            },
            {
              label: "PostgreSQL on the read path",
              text: "Reads use PostgreSQL, a two-second synchronous budget, and background refreshes instead of waiting on a slow upstream.",
            },
          ],
          evidenceLabel: "Repository evidence",
          evidence: [
            "More than 250 backend tests without network access",
            "Five upstream sources with explicit degradation",
            "Java 21 virtual threads for candidate evaluation",
          ],
          stack:
            "Java 21 · Spring Boot · React 19 · PostgreSQL · Resilience4j",
          image: {
            ...sharedImages.viazio,
            alt: "Horizontal Viazio logo in gold and white on a navy blue grid",
          },
          links: [
            {
              label: "Open product",
              href: "https://viazio.vilquer.dev",
              kind: "primary",
            },
            {
              label: "View code",
              href: "https://github.com/caiovilquer/viazio",
            },
          ],
        },
      ],
    },
    research: {
      kicker: "Applied research · computer vision",
      heading: "TrackShot CV",
      status: "Desktop prototype in development",
      summary:
        "TrackShot uses smartphone video to estimate release speed, angle, and height in shot put without radar or a laboratory.",
      currentLabel: "What exists today",
      current: [
        "2D pose with MMPose and MediaPipe as a lightweight backend",
        "Temporal smoothing and conservative occlusion handling",
        "Implement tracking and release-frame detection",
        "Speed, angle, and height metrics with explicit uncertainty",
      ],
      nextLabel: "Next validation",
      next:
        "Validate the pipeline on a proprietary dataset, then fuse vision with IMU data. The system refuses a metric when release evidence is insufficient.",
      evidence:
        "Real capture time is handled at 240 fps; detected, predicted, and interpolated states remain auditable in the reports.",
      imageAlt:
        "Two real TrackShot frames with pose tracking over the athlete; the second highlights the implement and its trajectory in yellow",
      repository: "Private code · in progress",
    },
    profile: {
      kicker: "Where I used each technology",
      heading: "Technical profile",
      intro:
        "I prefer to explain where I used a technology and what problem it solved.",
      stackLabel: "Technology and project",
      stack: [
        {
          label: "Backend",
          value: "Java, Kotlin, Spring Boot, NestJS, and Fastify",
          proof: "Viazio, RotinaPet, and Poliatletas",
        },
        {
          label: "Data and AI",
          value: "PostgreSQL, pgvector, Prisma, JPA, RAG, and embeddings",
          proof: "RotinaPet, Viazio, and Poliatletas",
        },
        {
          label: "Frontend",
          value: "React, Angular, TypeScript, and TanStack Query",
          proof: "All three selected products",
        },
        {
          label: "Quality and operations",
          value: "JUnit, Jest, Vitest, Testcontainers, Docker, and GitHub Actions",
          proof: "Domain, integration, and contract tests",
        },
      ],
      methodLabel: "How I structure the work",
      method: [
        {
          number: "A",
          title: "Testable rules",
          text: "I keep business decisions testable without depending on the database, UI, or external provider.",
        },
        {
          number: "B",
          title: "Authorization and failures",
          text: "I include authorization, idempotency, and integration failures in the contract from the start.",
        },
        {
          number: "C",
          title: "What still needs measurement",
          text: "When code does not prove capacity, accuracy, or completeness, I treat the claim as something to measure.",
        },
      ],
      otherLabel: "Other work",
      otherIntro:
        "CasaConta has .NET tests for domain rules; Marca keeps health and training data local with Tauri, Rust, and SQLite.",
      other: [
        {
          title: "CasaConta",
          type: "Full-stack case",
          description:
            "Household expenses with a minor-specific domain rule, end-to-end HTTP tests, and backend-owned totals.",
          stack: ".NET 8 · EF Core · SQLite · React 19",
          href: "https://github.com/caiovilquer/ControleGastos",
          linkLabel: "View code",
        },
        {
          title: "Marca",
          type: "Offline desktop app",
          description:
            "Health, nutrition, and training tracking with local SQLite, backups, exports, and a printable medical report.",
          stack: "Tauri 2 · Rust · React · SQLite",
          linkLabel: "Private code",
        },
      ],
    },
    contact: {
      kicker: "Internships · junior roles · São Paulo",
      heading: "I am available to start now.",
      text:
        "I am looking for an internship and also consider junior backend or full-stack roles. I am available for remote work or a hybrid role in São Paulo.",
      email: "caio@vilquer.dev",
      copy: "Copy email",
      linkedin: "LinkedIn",
      github: "GitHub",
      cvBackend: "Backend CV",
      cvFullStack: "Full-stack CV",
      location: "São Paulo, SP · Brazil",
      legal: "Designed and developed by Caio Vilquer Carvalho.",
    },
  },
};
