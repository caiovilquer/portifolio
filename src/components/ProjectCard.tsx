import React, { useState, useRef, useEffect } from "react";
import { IconType } from "react-icons";
import { FaGithub, FaExternalLinkAlt, FaClock, FaPlay } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
  inProgress?: boolean;
  additionalLinks?: {
    label: string;
    url: string;
  }[];
  estimatedCompletion?: string;
  progressPercentage?: number;
  demoVideo?: string;
  demoImage?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showMedia, setShowMedia] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("ended", handleEnded);

    return () => {
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("ended", handleEnded);
    };
  }, [showMedia]);

  return (
    <div className="glass-card overflow-hidden group h-full flex flex-col">
      <div className="p-5 sm:p-6 md:p-8 flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2 sm:gap-0">
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
            {project.title}
          </h3>
          {project.inProgress && (
            <span className="inline-flex w-fit items-center gap-1 px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-medium rounded-full border border-amber-500/30">
              <FaClock size={12} />
              Em desenvolvimento
            </span>
          )}
        </div>

        {/* Media Section */}
        {(project.demoImage || project.demoVideo) && (
          <div className="mb-6 rounded-xl overflow-hidden bg-[var(--bg-primary)] border border-[var(--border-color)]">
            {project.demoImage && !project.demoVideo && (
              <img
                src={project.demoImage}
                alt={`Demonstração do projeto ${project.title}`}
                className="w-full h-40 sm:h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
            )}

            {project.demoVideo && (
              <div className="relative">
                <button
                  onClick={() => setShowMedia(!showMedia)}
                  className="w-full relative group/video"
                  aria-label={showMedia ? "Ocultar demonstração" : "Mostrar demonstração"}
                >
                  {!showMedia ? (
                    <div className="flex flex-col items-center justify-center h-40 sm:h-48 bg-[var(--bg-secondary)] text-[var(--text-tertiary)] hover:text-[var(--primary)] transition-colors">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-current flex items-center justify-center mb-2 group-hover/video:scale-110 transition-transform">
                        <FaPlay className="pl-1" />
                      </div>
                      <span className="text-sm font-medium">Ver demonstração</span>
                    </div>
                  ) : (
                    <AnimatePresence>
                      <motion.div
                        ref={videoContainerRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full"
                      >
                        <video
                          ref={videoRef}
                          src={project.demoVideo}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full max-h-48 sm:max-h-64 object-contain bg-black"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </motion.div>
                    </AnimatePresence>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-6 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Progress Bar */}
        {project.estimatedCompletion && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-[var(--text-tertiary)] mb-2">
              <span>Progresso</span>
              <span>{project.progressPercentage || 0}%</span>
            </div>
            <div className="w-full bg-[var(--bg-tertiary)] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${project.progressPercentage || 0}%` }}
              />
            </div>
            <div className="text-right text-xs text-[var(--text-tertiary)] mt-1">
              Previsão: {project.estimatedCompletion}
            </div>
          </div>
        )}

        {/* Tech Tags */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="flex items-center gap-1.5 px-3 py-1 bg-[var(--bg-tertiary)] text-xs text-[var(--text-secondary)] rounded-md border border-[var(--border-color)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors cursor-default"
              >
                {project.techIcons &&
                  project.techIcons[tech] &&
                  React.createElement(project.techIcons[tech], {
                    className: "text-current opacity-70",
                    size: 14,
                  })}
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mt-auto pt-6 border-t border-[var(--border-color)]">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors"
            >
              <FaGithub size={18} />
              <span>Código</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
            >
              <FaExternalLinkAlt size={16} />
              <span>Live Demo</span>
            </a>
          )}
          {project.additionalLinks &&
            project.additionalLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-[var(--secondary)] hover:text-white transition-colors"
              >
                <FaExternalLinkAlt size={16} />
                <span>{link.label}</span>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
