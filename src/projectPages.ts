import { content, type Locale, type ProjectContent, type ProjectLink } from "./content";
import type { ProjectSlug } from "./routes";

export type ProjectPageData = {
  slug: ProjectSlug;
  code: string;
  period: string;
  title: string;
  role: string;
  summary: string;
  problemLabel: string;
  problem: string;
  decisionsLabel: string;
  decisions: Array<{ label: string; text: string }>;
  evidenceLabel: string;
  evidence: string[];
  stack: string;
  image: ProjectContent["image"];
  links: ProjectLink[];
  privateCode?: string;
};

const trackShot: Record<Locale, ProjectPageData> = {
  pt: {
    slug: "trackshot",
    code: "PESQUISA / 01",
    period: "2026 · em desenvolvimento",
    title: "TrackShot CV",
    role: "Visão computacional aplicada ao arremesso de peso",
    summary: content.pt.research.summary,
    problemLabel: "Problema de medição",
    problem:
      "Vídeo de smartphone não oferece escala, profundidade ou visibilidade constantes. A estimativa precisa indicar quando a evidência ao redor da liberação é insuficiente, em vez de devolver um número preciso sem sustentação.",
    decisionsLabel: "Pipeline atual",
    decisions: content.pt.research.current.map((text, index) => ({
      label: ["Pose e implemento", "Série temporal", "Liberação", "Métrica auditável"][index],
      text,
    })),
    evidenceLabel: "Estado verificável",
    evidence: [content.pt.research.evidence, content.pt.research.next],
    stack: "Python · MMPose · MediaPipe · OpenCV · vídeo a 240 fps · IMU planejada",
    image: {
      src: "/media/trackshot-sequence-1440.webp",
      srcSet:
        "/media/trackshot-sequence-720.webp 720w, /media/trackshot-sequence-1440.webp 1440w",
      width: 1440,
      height: 840,
      alt: content.pt.research.imageAlt,
    },
    links: [],
    privateCode: content.pt.research.repository,
  },
  en: {
    slug: "trackshot",
    code: "RESEARCH / 01",
    period: "2026 · in development",
    title: "TrackShot CV",
    role: "Computer vision applied to shot put",
    summary: content.en.research.summary,
    problemLabel: "Measurement problem",
    problem:
      "Smartphone video does not provide constant scale, depth, or visibility. The estimate must state when evidence around release is insufficient instead of returning an unsupported precise number.",
    decisionsLabel: "Current pipeline",
    decisions: content.en.research.current.map((text, index) => ({
      label: ["Pose and implement", "Time series", "Release", "Auditable metric"][index],
      text,
    })),
    evidenceLabel: "Verifiable state",
    evidence: [content.en.research.evidence, content.en.research.next],
    stack: "Python · MMPose · MediaPipe · OpenCV · 240 fps video · planned IMU",
    image: {
      src: "/media/trackshot-sequence-1440.webp",
      srcSet:
        "/media/trackshot-sequence-720.webp 720w, /media/trackshot-sequence-1440.webp 1440w",
      width: 1440,
      height: 840,
      alt: content.en.research.imageAlt,
    },
    links: [],
    privateCode: content.en.research.repository,
  },
};

export function getProjectPageData(locale: Locale, slug: ProjectSlug): ProjectPageData {
  if (slug === "trackshot") return trackShot[locale];
  const project = content[locale].work.projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return { ...project, slug };
}
