import React from "react";
import ProjectCard, { Project } from "../components/ProjectCard";

const projects: Project[] = [
  {
    id: 1,
    title: "PetCareScheduler",
    description:
      "API em Kotlin/Spring Boot para gerenciar vacinas, medicamentos e banho/tosa de pets.",
    tech: ["Kotlin", "Spring Boot", "PostgreSQL"],
    githubUrl: "https://github.com/seu-usuario/petcarescheduler",
    demoUrl: "",
  },
  {
    id: 2,
    title: "TrackShot CV",
    description:
      "App Android para análise biomecânica de arremesso de peso (Kotlin, OpenCV).",
    tech: ["Kotlin", "OpenCV", "Jetpack"],
    githubUrl: "https://github.com/seu-usuario/trackshot-cv",
    demoUrl: "",
  },
  // adicionar mais...
];

const Projects: React.FC = () => (
  <div className="container mx-auto py-20 px-4">
    <h2 className="text-3xl font-bold mb-8 text-center">Meus Projetos</h2>
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </div>
);

export default Projects;
