import React from "react";
import { IconType } from "react-icons";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  techIcons?: {
    [key: string]: IconType;
  };
  githubUrl: string;
  demoUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="flex items-center gap-1 px-3 py-1 bg-gray-700 text-sm text-gray-200 rounded-full"
              >
                {project.techIcons &&
                  project.techIcons[tech] &&
                  React.createElement(project.techIcons[tech], {
                    className: "text-gray-300",
                    size: 16,
                  })}
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              <FaGithub className="text-lg" />
              <span>GitHub</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors duration-300"
            >
              <FaExternalLinkAlt className="text-lg" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
