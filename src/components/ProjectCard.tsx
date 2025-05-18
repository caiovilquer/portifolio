import React, { useState, useRef } from "react";
import { IconType } from "react-icons";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaClock,
  FaPlay,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
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
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleFullScreen = () => {
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      // Entrar em modo de tela cheia
      videoRef.current
        .requestFullscreen()
        .then(() => {
          setIsFullScreen(true);
        })
        .catch((err) => {
          console.error(
            `Erro ao tentar exibir o vídeo em tela cheia: ${err.message}`
          );
        });
    } else {
      // Sair do modo de tela cheia
      document
        .exitFullscreen()
        .then(() => {
          setIsFullScreen(false);
        })
        .catch((err) => {
          console.error(`Erro ao sair do modo tela cheia: ${err.message}`);
        });
    }
  };

  // Listener para detectar quando o usuário sai do modo fullscreen usando ESC
  React.useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          {project.inProgress && (
            <span className="flex items-center gap-1 px-2 py-1 bg-amber-600 text-xs font-medium text-white rounded-full">
              <FaClock size={12} />
              Em desenvolvimento
            </span>
          )}
        </div>

        {project.demoVideo && (
          <div className="mb-4 relative">
            <button
              onClick={() => setShowVideo(!showVideo)}
              className="w-full bg-gray-900 rounded-lg overflow-hidden relative group"
              aria-label={
                showVideo ? "Ocultar demonstração" : "Mostrar demonstração"
              }
            >
              {!showVideo ? (
                <div className="flex items-center justify-center p-4 h-32 text-gray-400 hover:text-blue-400 transition-colors">
                  <FaPlay className="mr-2" />
                  <span>Ver demonstração</span>
                </div>
              ) : (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full relative"
                  >
                    <video
                      ref={videoRef}
                      src={project.demoVideo}
                      autoPlay
                      loop
                      muted
                      controls
                      className="w-full rounded-lg object-cover shadow-md"
                      aria-label={`Demonstração do projeto ${project.title}`}
                    />

                    {/* Botão de tela cheia posicionado no canto superior direito */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Impede que o clique chegue ao botão pai
                        toggleFullScreen();
                      }}
                      className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors z-10"
                      aria-label={
                        isFullScreen ? "Sair da tela cheia" : "Tela cheia"
                      }
                    >
                      {isFullScreen ? (
                        <FaCompress size={16} />
                      ) : (
                        <FaExpand size={16} />
                      )}
                    </button>
                  </motion.div>
                </AnimatePresence>
              )}
            </button>
          </div>
        )}

        <p className="text-gray-300 mb-4">{project.description}</p>

        {/* Adicionando seção de progresso quando disponível */}
        {project.estimatedCompletion && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">Progresso:</span>
              <span className="text-gray-300">
                {project.progressPercentage || 0}% •{" "}
                {project.estimatedCompletion}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-700 ease-in-out"
                style={{ width: `${project.progressPercentage || 0}%` }}
              ></div>
            </div>
          </div>
        )}

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

        <div className="flex flex-wrap gap-3">
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
          {project.additionalLinks &&
            project.additionalLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                <FaExternalLinkAlt className="text-lg" />
                <span>{link.label}</span>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
