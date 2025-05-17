import React from "react";

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="border rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
    <div>
      <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <ul className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((t, i) => (
          <li key={i} className="text-sm bg-gray-200 rounded px-2 py-1">
            {t}
          </li>
        ))}
      </ul>
    </div>
    <div className="mt-4 flex space-x-4">
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        GitHub
      </a>
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Demo
        </a>
      )}
    </div>
  </div>
);

export default ProjectCard;
