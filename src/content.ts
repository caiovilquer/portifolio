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
  descriptor: string;
  plain: string;
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
    stackLabel: string;
    stack: Array<{ label: string; value: string; proof: string }>;
    methodLabel: string;
    method: Array<{ number: string; title: string; text: string }>;
    otherLabel: string;
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
      availability: "Poliatletas · RotinaPet · Viazio",
      heading:
        "Três sistemas no ar, escritos do banco à tela.",
      mobileHeading:
        "Três sistemas no ar, do banco à tela.",
      summary:
        "Estudo Engenharia de Computação na Poli-USP. A equipe de atletismo da Poli-USP registra competições e recordes no Poliatletas, famílias organizam o cuidado dos pets no RotinaPet e o Viazio ranqueia destinos de viagem. Escrevo backend, frontend, banco e deploy dos três, em Java, Kotlin e TypeScript, e cada regra difícil fica sustentada por teste.",
      mobileSummary:
        "Três sistemas em produção, escritos do banco à tela em Java, Kotlin e TypeScript.",
      identityName: "Caio Vilquer",
      identityRole: "Backend · Poli-USP",
      identityStack: "Java / Kotlin / TypeScript",
      mobileLocation: "SP",
      specs: [
        { label: "Formação", value: "Poli-USP · conclusão em 12/2029" },
        { label: "Foco", value: "Backend, do modelo de dados ao deploy" },
        { label: "Stack", value: "Java · Kotlin · TypeScript" },
        { label: "Base", value: "São Paulo, SP" },
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
      kicker: "Três sistemas em produção",
      heading: "Trabalhos selecionados",
      intro:
        "Nenhum dos três é um cadastro simples. O Poliatletas compara marcas de modalidades que medem coisas diferentes: tempo, distância e pontos. O RotinaPet impede que uma família veja os dados da outra, inclusive nas respostas da IA. O Viazio mantém o ranking de pé quando uma fonte externa cai. Escrevi backend, frontend e banco dos três sozinho, e cada uma dessas regras tem teste que a segura.",
      indexLabel: "Registro dos casos",
      projects: [
        {
          slug: "poliatletas",
          code: "01 / 03",
          period: "08.2025 · atual",
          title: "Poliatletas",
          descriptor: "Sistema da equipe de atletismo da Poli-USP",
          plain:
            "A equipe de atletismo da Poli-USP usa o sistema para registrar competições, resultados, recordes e treinos, no lugar das planilhas que se perdiam a cada temporada. São mais de cem pessoas entre atletas e comissão técnica, com histórico auditável e rankings públicos.",
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
          ],
          evidenceLabel: "Evidência no produto",
          evidence: [
            "Rankings públicos com filtros e comparação de temporadas",
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
          descriptor: "Cuidado compartilhado com assistente de IA e RAG",
          plain:
            "A família inteira cuida do mesmo pet sem duplicar remédio nem perder vacina: cada tutor vê o que já foi feito, por quem e quando. O assistente de IA só enxerga o que aquela família tem direito de ver e nunca registra nada sem a confirmação de uma pessoa.",
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
          ],
          evidenceLabel: "Quality gates versionados",
          evidence: [
            "Recall@5 mínimo de 95% e precisão de citações mínima de 98%",
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
          descriptor: "Motor explicável de recomendação de viagens",
          plain:
            "Escolhe quando e para onde viajar cruzando feriado, clima, custo e distância, e mostra por que cada destino ficou naquela posição em vez de entregar uma nota única. Quando uma fonte externa sai do ar, o ranking continua de pé e diz o que faltou.",
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
          ],
          evidenceLabel: "Evidência no repositório",
          evidence: [
            "Mais de 250 testes backend sem dependência de rede",
            "Cinco fontes externas com degradação explícita",
          ],
          stack: "Java 21 · Spring Boot · React 19 · PostgreSQL · Resilience4j",
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
      next: "Validar o pipeline em dataset próprio e, depois, fundir visão com IMU. O sistema recusa a métrica quando a evidência ao redor da liberação é insuficiente.",
      evidence:
        "A captura real é tratada em 240 fps; estados detectado, predito e interpolado permanecem auditáveis nos relatórios.",
      imageAlt:
        "Dois frames reais do TrackShot com a pose sobre o atleta; no segundo, o implemento e sua trajetória aparecem destacados em amarelo",
      repository: "Código privado",
    },
    profile: {
      kicker: "Onde usei cada tecnologia",
      heading: "Perfil técnico",
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
      kicker: "Contato · São Paulo",
      heading: "Fale comigo.",
      text: "Respondo e-mail em até um dia útil. Os currículos abaixo trazem o histórico completo: o de backend detalha os projetos e as decisões técnicas, o full stack cobre também frontend e banco.",
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
      availability: "Poliatletas · RotinaPet · Viazio",
      heading:
        "Three systems in production, from database to screen.",
      mobileHeading:
        "Three systems live, from database to screen.",
      summary:
        "I study Computer Engineering at Poli-USP. The Poli-USP athletics team records its meets and records in Poliatletas, families organize pet care in RotinaPet, and Viazio ranks travel destinations. I write the backend, frontend, database, and deployment for all three, in Java, Kotlin, and TypeScript, and every hard rule is held down by a test.",
      mobileSummary:
        "Three systems in production, written from the database to the screen in Java, Kotlin, and TypeScript.",
      identityName: "Caio Vilquer",
      identityRole: "Backend · Poli-USP",
      identityStack: "Java / Kotlin / TypeScript",
      mobileLocation: "SP",
      specs: [
        { label: "Degree", value: "Poli-USP · expected 12/2029" },
        { label: "Focus", value: "Backend, from data model to deploy" },
        { label: "Stack", value: "Java · Kotlin · TypeScript" },
        { label: "Base", value: "São Paulo, Brazil" },
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
      kicker: "Three systems in production",
      heading: "Selected work",
      intro:
        "None of the three is a simple CRUD app. Poliatletas compares results from events that measure different things: time, distance, and points. RotinaPet keeps one family's data out of another's, including in the AI's answers. Viazio keeps its ranking standing when an upstream source goes down. I wrote the backend, frontend, and database for all three on my own, and every one of those rules is held down by a test.",
      indexLabel: "Case register",
      projects: [
        {
          slug: "poliatletas",
          code: "01 / 03",
          period: "08.2025 · present",
          title: "Poliatletas",
          descriptor: "The athletics management system at Poli-USP",
          plain:
            "The Poli-USP athletics team uses the system to record meets, results, records, and training, replacing the spreadsheets that went missing every season. More than a hundred people use it, athletes and coaching staff, with an auditable history and public rankings.",
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
          ],
          evidenceLabel: "Product evidence",
          evidence: [
            "Public rankings with filters and season comparison",
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
          descriptor: "Shared pet care with an AI and RAG assistant",
          plain:
            "A whole family cares for the same pet without double-dosing medication or missing a vaccine: every owner sees what was already done, by whom, and when. The AI assistant only ever sees what that family is allowed to see, and it never records anything without a person confirming it.",
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
          ],
          evidenceLabel: "Versioned quality gates",
          evidence: [
            "Recall@5 at or above 95% and citation precision at or above 98%",
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
          descriptor: "Explainable travel recommendation engine",
          plain:
            "It picks when and where to travel by weighing holidays, weather, cost, and distance, and shows why each destination landed in that position instead of handing over a single score. When an upstream source goes down, the ranking stays standing and says what was missing.",
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
          ],
          evidenceLabel: "Repository evidence",
          evidence: [
            "More than 250 backend tests without network access",
            "Five upstream sources with explicit degradation",
          ],
          stack: "Java 21 · Spring Boot · React 19 · PostgreSQL · Resilience4j",
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
      next: "Validate the pipeline on a proprietary dataset, then fuse vision with IMU data. The system refuses a metric when release evidence is insufficient.",
      evidence:
        "Real capture time is handled at 240 fps; detected, predicted, and interpolated states remain auditable in the reports.",
      imageAlt:
        "Two real TrackShot frames with pose tracking over the athlete; the second highlights the implement and its trajectory in yellow",
      repository: "Private code",
    },
    profile: {
      kicker: "Where I used each technology",
      heading: "Technical profile",
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
          value:
            "JUnit, Jest, Vitest, Testcontainers, Docker, and GitHub Actions",
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
      kicker: "Contact · São Paulo",
      heading: "Get in touch.",
      text: "I reply to email within one business day. The CVs below carry the full history: the backend one details the projects and the technical decisions, the full-stack one also covers frontend and database work.",
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
