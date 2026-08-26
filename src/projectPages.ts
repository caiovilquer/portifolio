import { content, type Locale, type ProjectContent, type ProjectLink } from "./content";
import type { ProjectSlug } from "./routes";

export type ProjectPageData = {
  slug: ProjectSlug;
  code: string;
  period: string;
  title: string;
  descriptor: string;
  contribution: string;
  status: string;
  summary: string;
  problemLabel: string;
  problem: string;
  decisionsLabel: string;
  decisions: Array<{ label: string; text: string }>;
  evidenceLabel: string;
  evidence: string[];
  stack: string;
  image: ProjectContent["image"];
  imageCaption: string;
  links: ProjectLink[];
  privateCode?: string;
};

type SelectedProjectSlug = Exclude<ProjectSlug, "trackshot">;

function selectedProject(locale: Locale, slug: SelectedProjectSlug): ProjectContent {
  const project = content[locale].work.projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Unknown selected project: ${slug}`);
  return project;
}

const selectedProjectPages: Record<
  Locale,
  Record<SelectedProjectSlug, ProjectPageData>
> = {
  pt: {
    poliatletas: {
      ...selectedProject("pt", "poliatletas"),
      slug: "poliatletas",
      contribution:
        "Modelagem do domínio esportivo, backend NestJS, contratos da API e integração com o frontend React.",
      status: "Em produção e em evolução",
      summary:
        "Construí o Poliatletas para reunir a operação da equipe em um modelo que entende modalidades, marcas, elegibilidade e histórico. O backend atende tanto as páginas públicas de atletas e rankings quanto os fluxos de treinadores para resultados, competições e treinos.",
      problemLabel: "Comparar marcas sem apagar o contexto",
      problem:
        "Nos 100 metros, uma marca menor é melhor; no peso, vence a maior distância. Resultados ainda variam por unidade, gênero, competição, fase e validade. Tratar tudo como um número ordenável produziria recordes falsos e perderia a origem de cada marca.",
      decisionsLabel: "Decisões que sustentam o produto",
      decisions: [
        {
          label: "Métrica com direção e elegibilidade",
          text: "Cada modalidade define unidade canônica e direção de comparação. PBs, rankings e recordes são derivados somente de resultados elegíveis, sem alterar o histórico que os originou.",
        },
        {
          label: "Escrita idempotente e auditável",
          text: "Importações em lote evitam duplicidade; alterações sensíveis registram ator, papel, ação e metadados. Reprocessamentos recalculam derivados sem regravar o resultado original.",
        },
        {
          label: "Concorrência explícita nos treinos",
          text: "A execução offline usa Idempotency-Key, revisão de sessão e If-Match. Reenvios devolvem a mesma resposta e uma edição estrutural concorrente produz conflito em vez de sobrescrever dados silenciosamente.",
        },
        {
          label: "Contrato único entre API e interface",
          text: "A API REST é versionada e exporta OpenAPI. O frontend gera seus tipos a partir desse contrato, reduzindo divergência entre DTOs do NestJS e as telas em React.",
        },
      ],
      evidenceLabel: "O que pode ser conferido",
      evidence: [
        "Rankings públicos por modalidade, período e temporada, além de perfis com PBs e histórico",
        "Importação idempotente, recomputação de recordes e trilha de auditoria para operações sensíveis",
        "Mais de 250 testes distribuídos entre backend e frontend",
        "Produto público em poliatletas.com.br; código de aplicação mantido em repositórios privados",
      ],
      imageCaption:
        "Marca do Poliatletas, sistema usado para publicar atletas, resultados e rankings da equipe.",
    },
    rotinapet: {
      ...selectedProject("pt", "rotinapet"),
      slug: "rotinapet",
      contribution:
        "Arquitetura do backend, autorização do RAG, pipeline de indexação e integração do assistente com o frontend Angular.",
      status: "Produto publicado e desenvolvimento ativo",
      summary:
        "O RotinaPet organiza agenda, histórico clínico, documentos e cuidado compartilhado. A camada de IA consulta somente fontes autorizadas da família, cita o que encontrou e entrega rascunhos que ainda passam pelas regras determinísticas do domínio.",
      problemLabel: "Responder sem atravessar famílias nem prescrever sozinho",
      problem:
        "Uma busca semanticamente parecida pode pertencer a outro pet ou outra família. Mesmo com a fonte correta, texto clínico insuficiente não sustenta uma resposta. E uma sugestão de cuidado não pode virar plano apenas porque o modelo devolveu JSON válido.",
      decisionsLabel: "Limites impostos à IA",
      decisions: [
        {
          label: "Autorização define o corpus",
          text: "Família, pet e fontes com estado READY delimitam o conjunto pesquisável antes do ranking. Um documento revogado sai da elegibilidade imediatamente, mesmo que a limpeza física dos chunks ocorra depois.",
        },
        {
          label: "Busca híbrida com citação validada",
          text: "FTS em português e distância vetorial são combinados por RRF. As citações retornadas precisam apontar para trechos do conjunto autorizado; sem suporte suficiente, o assistente se abstém.",
        },
        {
          label: "Indexação recuperável",
          text: "Fonte, atividade e outbox são gravadas na mesma transação. O worker cria embeddings em lote e publica chunks e estado READY atomicamente, com retry e dead letter para falhas persistentes.",
        },
        {
          label: "Confirmação pelo domínio",
          text: "Structured Outputs produz um rascunho versionado. Antes de escrever um plano, o caso de uso revalida papel, versão, expiração, idempotência e confirmação explícita da pessoa responsável.",
        },
      ],
      evidenceLabel: "Critérios registrados no projeto",
      evidence: [
        "Dataset sintético versionado com Recall@5 mínimo de 95% e precisão de citações mínima de 98%",
        "Abstenção sem evidência mínima de 95%, incluindo casos de prompt injection indireta",
        "Estados de fonte, chunks e citações preservam o caminho entre resposta e documento autorizado",
        "Backend Kotlin/Spring Boot e frontend Angular publicados separadamente, com repositórios públicos",
      ],
      imageCaption:
        "Identidade do RotinaPet, produto que reúne agenda, documentos e decisões de cuidado por família.",
    },
    viazio: {
      ...selectedProject("pt", "viazio"),
      slug: "viazio",
      contribution:
        "Arquitetura do motor de recomendação, integrações externas, persistência, API Spring Boot e frontend React.",
      status: "Versão publicada",
      summary:
        "O Viazio compara janelas e destinos a partir de clima, custo, distância e calendário. A resposta separa nota, cobertura e confiança para continuar útil quando um provedor falha, sem fingir que dados ausentes têm a mesma qualidade dos dados observados.",
      problemLabel: "Ordenar destinos com dados incompletos",
      problem:
        "Clima, câmbio, feriados, indicadores econômicos e conteúdo editorial têm validades e falhas diferentes. Bloquear a requisição até todos responderem deixa o ranking lento; preencher a ausência com zero pune o destino por um problema do provedor.",
      decisionsLabel: "Como o ranking degrada",
      decisions: [
        {
          label: "Score e cobertura separados",
          text: "Quatro estratégias calculam clima, custo, distância e festividades. Quando um critério falta, os pesos disponíveis são renormalizados e a cobertura reduz a confiança final sem inventar uma nota.",
        },
        {
          label: "Falha isolada por provedor",
          text: "Retry, circuit breaker e bulkhead têm estados independentes. Uma indisponibilidade da Wikipédia remove o conteúdo editorial, mas não abre o circuito de clima, feriados ou Banco Mundial.",
        },
        {
          label: "PostgreSQL antes da rede",
          text: "Leituras usam dados persistidos com fetched_at, stale_at e expires_at. Um miss recebe no máximo dois segundos de busca síncrona; depois disso, a resposta degrada e o refresh entra na fila.",
        },
        {
          label: "Concorrência limitada por candidato",
          text: "Candidatos são avaliados em virtual threads, enquanto a fila de atualização usa prioridade e ShedLock. A falha de um candidato não interrompe a ordenação dos demais.",
        },
      ],
      evidenceLabel: "Evidência executável",
      evidence: [
        "250 testes no backend e 17 testes unitários no frontend",
        "Cinco provedores remotos com cache, proteção e comportamento de falha documentados separadamente",
        "Fila de refresh persistida para dados ausentes, vencidos ou com baixa confiança",
        "Aplicação pública sem cadastro, com API versionada e repositório aberto",
      ],
      imageCaption:
        "Marca do Viazio, aplicada ao produto que compara destinos e expõe a composição do ranking.",
    },
  },
  en: {
    poliatletas: {
      ...selectedProject("en", "poliatletas"),
      slug: "poliatletas",
      contribution:
        "Sports-domain modeling, NestJS backend, API contracts, and integration with the React frontend.",
      status: "In production and under active development",
      summary:
        "I built Poliatletas to bring the team's operations into a model that understands events, marks, eligibility, and history. The backend serves public athlete and ranking pages as well as coaches' workflows for results, competitions, and training.",
      problemLabel: "Comparing marks without erasing context",
      problem:
        "In the 100 metres, a lower mark is better; in shot put, the greater distance wins. Results also vary by unit, gender, competition, round, and validity. Treating each mark as a sortable number would create false records and lose its source.",
      decisionsLabel: "Decisions behind the product",
      decisions: [
        {
          label: "Direction-aware eligible metrics",
          text: "Each event defines a canonical unit and comparison direction. PBs, rankings, and records are derived only from eligible results without modifying the history that produced them.",
        },
        {
          label: "Idempotent, auditable writes",
          text: "Batch imports prevent duplicates; sensitive changes record actor, role, action, and metadata. Reprocessing rebuilds derived data without rewriting the original result.",
        },
        {
          label: "Explicit training concurrency",
          text: "Offline execution uses an Idempotency-Key, session revisions, and If-Match. Retries return the same response, while concurrent structural edits produce a conflict instead of silently overwriting data.",
        },
        {
          label: "One contract for API and UI",
          text: "The versioned REST API exports OpenAPI. The frontend generates types from that contract, reducing drift between NestJS DTOs and React screens.",
        },
      ],
      evidenceLabel: "What can be checked",
      evidence: [
        "Public rankings by event, period, and season, plus athlete profiles with PBs and history",
        "Idempotent imports, record recomputation, and an audit trail for sensitive operations",
        "More than 250 tests across the backend and frontend",
        "Public product at poliatletas.com.br; application code kept in private repositories",
      ],
      imageCaption:
        "Poliatletas identity, used by the system that publishes athletes, results, and team rankings.",
    },
    rotinapet: {
      ...selectedProject("en", "rotinapet"),
      slug: "rotinapet",
      contribution:
        "Backend architecture, RAG authorization, indexing pipeline, and assistant integration with the Angular frontend.",
      status: "Published product under active development",
      summary:
        "RotinaPet organizes schedules, clinical history, documents, and shared care. Its AI layer searches only the family's authorized sources, cites what it found, and produces drafts that still pass through deterministic domain rules.",
      problemLabel: "Answering without crossing households or prescribing alone",
      problem:
        "A semantically similar passage may belong to another pet or household. Even the correct source may not provide enough clinical support for an answer. A care suggestion also cannot become a plan merely because the model returned valid JSON.",
      decisionsLabel: "Boundaries placed around AI",
      decisions: [
        {
          label: "Authorization defines the corpus",
          text: "Household, pet, and sources in READY state define the searchable set before ranking. A revoked document becomes ineligible immediately, even when physical chunk cleanup runs later.",
        },
        {
          label: "Hybrid retrieval with checked citations",
          text: "Portuguese FTS and vector distance are merged through RRF. Returned citations must point to passages in the authorized set; without enough support, the assistant abstains.",
        },
        {
          label: "Recoverable indexing",
          text: "Source, activity, and outbox are written in one transaction. The worker batches embeddings and publishes chunks with READY state atomically, with retries and a dead-letter path for persistent failures.",
        },
        {
          label: "Domain confirmation",
          text: "Structured Outputs creates a versioned draft. Before writing a plan, the use case revalidates role, version, expiry, idempotency, and explicit confirmation from the responsible person.",
        },
      ],
      evidenceLabel: "Criteria recorded in the project",
      evidence: [
        "Versioned synthetic dataset with Recall@5 at or above 95% and citation precision at or above 98%",
        "Unsupported-answer abstention at or above 95%, including indirect prompt-injection cases",
        "Source states, chunks, and citations preserve the path from an answer to its authorized document",
        "Kotlin/Spring Boot backend and Angular frontend deployed separately with public repositories",
      ],
      imageCaption:
        "RotinaPet identity for the product that organizes schedules, documents, and household care decisions.",
    },
    viazio: {
      ...selectedProject("en", "viazio"),
      slug: "viazio",
      contribution:
        "Recommendation-engine architecture, external integrations, persistence, Spring Boot API, and React frontend.",
      status: "Published version",
      summary:
        "Viazio compares travel windows and destinations through weather, cost, distance, and calendars. Its response separates score, coverage, and confidence so it remains useful when a provider fails without presenting missing data as observed data.",
      problemLabel: "Ranking destinations with incomplete data",
      problem:
        "Weather, exchange rates, holidays, economic indicators, and editorial content have different lifetimes and failure modes. Waiting for every source makes ranking slow; replacing missing data with zero punishes a destination for a provider failure.",
      decisionsLabel: "How the ranking degrades",
      decisions: [
        {
          label: "Score and coverage remain separate",
          text: "Four strategies calculate weather, cost, distance, and festivities. When a criterion is missing, available weights are normalized and coverage lowers final confidence without inventing a score.",
        },
        {
          label: "Failures stay isolated by provider",
          text: "Retries, circuit breakers, and bulkheads keep independent state. A Wikipedia outage removes editorial content without opening the weather, holiday, or World Bank circuits.",
        },
        {
          label: "PostgreSQL before the network",
          text: "Reads use persisted data with fetched_at, stale_at, and expires_at. A miss gets at most two seconds of synchronous work; after that, the response degrades and a refresh enters the queue.",
        },
        {
          label: "Bounded concurrency per candidate",
          text: "Candidates are evaluated on virtual threads, while the refresh queue uses priorities and ShedLock. One candidate's failure does not stop the remaining ranking.",
        },
      ],
      evidenceLabel: "Executable evidence",
      evidence: [
        "250 backend tests and 17 frontend unit tests",
        "Five remote providers with separate cache, protection, and failure behavior",
        "A persisted refresh queue for missing, expired, or low-confidence data",
        "A public application with no account requirement, a versioned API, and an open repository",
      ],
      imageCaption:
        "Viazio identity for the product that compares destinations and exposes how each ranking is composed.",
    },
  },
};

const trackShot: Record<Locale, ProjectPageData> = {
  pt: {
    slug: "trackshot",
    code: "PESQUISA / 01",
    period: "2026 · atual",
    title: "TrackShot CV",
    descriptor: "Visão computacional aplicada ao arremesso de peso",
    contribution:
      "Pesquisa, pipeline de pose, rastreamento do implemento, calibração e cálculo das métricas de liberação.",
    status: "Protótipo desktop em desenvolvimento",
    summary:
      "O TrackShot separa pose, rastreamento e cálculo físico para medir a liberação a partir de vídeo lento de smartphone. Cada ponto informa se foi detectado, predito ou interpolado; velocidade, ângulo e altura carregam a incerteza da calibração usada.",
    problemLabel: "Transformar pixels em uma medição defensável",
    problem:
      "O vídeo traz o tempo do contêiner, não necessariamente a taxa real da captura. O braço e o peso sofrem oclusão durante o giro, e uma escala obtida no plano do chão não vale automaticamente para o voo. Um número final só é útil se preservar essas fontes de erro.",
    decisionsLabel: "Camadas do experimento",
    decisions: [
      {
        label: "Tempo real da captura",
        text: "O pipeline recebe explicitamente os 240 fps da gravação slow motion. Derivadas e filtros usam esse relógio, evitando o erro de oito vezes causado pelos 30 fps gravados no contêiner do vídeo.",
      },
      {
        label: "Pose com estado por frame",
        text: "MMPose é o estimador principal e MediaPipe permanece como alternativa leve. Oclusões curtas usam predição conservadora e todo ponto mantém o estado detectado, predito, interpolado ou sem dado.",
      },
      {
        label: "Voo validado pela física",
        text: "O rastreador procura o arco que sai da mão e combina detecção visual com Kalman. Comprimento, deslocamento, velocidade e ajuste parabólico evitam aceitar um trecho curto de folhagem como trajetória do peso.",
      },
      {
        label: "Métrica separada do detector",
        text: "O módulo físico recebe trajetória, frame de liberação, fps e calibração. A escala vem de uma referência corporal no plano vertical; pontos reconstruídos e a aproximação de plano único aparecem nos relatórios.",
      },
    ],
    evidenceLabel: "Resultados e limites registrados",
    evidence: [
      "Sete testes sintéticos recuperam velocidade, ângulo e altura conhecidos com erro inferior a 1e-6",
      "No cenário controlado, o Kalman teve RMSE de 4,15 px com ruído de 6 px e atravessou seis frames de oclusão",
      "Em um vídeo real, a janela de voo teve 94% de detecção e ajuste parabólico R² de 0,98",
      "Falta validar as métricas contra trena e digitalização manual em um dataset próprio antes de iniciar a fusão com IMU",
    ],
    stack: "Python · MMPose · MediaPipe · OpenCV · SciPy · vídeo a 240 fps",
    image: {
      src: "/media/trackshot-sequence-1440.webp",
      srcSet:
        "/media/trackshot-sequence-720.webp 720w, /media/trackshot-sequence-1440.webp 1440w",
      width: 1440,
      height: 840,
      alt: content.pt.research.imageAlt,
    },
    imageCaption:
      "Dois frames do pipeline: pose do atleta, trajetória do implemento e estados usados para auditar a liberação.",
    links: [],
    privateCode: "Código privado",
  },
  en: {
    slug: "trackshot",
    code: "RESEARCH / 01",
    period: "2026 · present",
    title: "TrackShot CV",
    descriptor: "Computer vision applied to shot put",
    contribution:
      "Research, pose pipeline, implement tracking, calibration, and release-metric computation.",
    status: "Desktop prototype in development",
    summary:
      "TrackShot separates pose, tracking, and physical computation to measure release from smartphone slow-motion video. Each point states whether it was detected, predicted, or interpolated; speed, angle, and height carry the uncertainty of the chosen calibration.",
    problemLabel: "Turning pixels into a defensible measurement",
    problem:
      "Video containers report a playback rate that may differ from the real capture rate. The arm and implement become occluded during the turn, and a scale measured on the ground plane does not automatically apply to flight. A final number is useful only when it preserves those error sources.",
    decisionsLabel: "Layers of the experiment",
    decisions: [
      {
        label: "Real capture time",
        text: "The pipeline receives the recording's actual 240 fps. Derivatives and filters use that clock, avoiding the eightfold error caused by the 30 fps stored in the video container.",
      },
      {
        label: "Per-frame pose state",
        text: "MMPose is the main estimator and MediaPipe remains a lightweight alternative. Short occlusions use conservative prediction, and each point stays labeled as detected, predicted, interpolated, or missing.",
      },
      {
        label: "Flight checked against physics",
        text: "The tracker searches for the arc leaving the hand and combines visual detection with a Kalman filter. Length, displacement, speed, and parabolic fit prevent a short patch of foliage from being accepted as the shot's trajectory.",
      },
      {
        label: "Metrics kept separate from detection",
        text: "The physics module receives a trajectory, release frame, frame rate, and calibration. Scale comes from a body reference on the vertical plane; reconstructed points and the single-plane approximation remain visible in reports.",
      },
    ],
    evidenceLabel: "Recorded results and limits",
    evidence: [
      "Seven synthetic tests recover known speed, angle, and height with error below 1e-6",
      "In the controlled scenario, Kalman RMSE was 4.15 px with 6 px noise and crossed a six-frame occlusion",
      "In one real video, the flight window reached 94% detection with a parabolic fit of R² 0.98",
      "Metrics still require validation against tape measurements and manual digitization on a proprietary dataset before IMU fusion begins",
    ],
    stack: "Python · MMPose · MediaPipe · OpenCV · SciPy · 240 fps video",
    image: {
      src: "/media/trackshot-sequence-1440.webp",
      srcSet:
        "/media/trackshot-sequence-720.webp 720w, /media/trackshot-sequence-1440.webp 1440w",
      width: 1440,
      height: 840,
      alt: content.en.research.imageAlt,
    },
    imageCaption:
      "Two pipeline frames showing athlete pose, implement trajectory, and the states used to audit release.",
    links: [],
    privateCode: "Private code",
  },
};

export function getProjectPageData(locale: Locale, slug: ProjectSlug): ProjectPageData {
  if (slug === "trackshot") return trackShot[locale];
  return selectedProjectPages[locale][slug];
}
