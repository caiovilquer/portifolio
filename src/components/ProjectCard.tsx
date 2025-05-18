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
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Função para lidar com o play/pause do vídeo
  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Erro ao reproduzir vídeo:", err));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Manipulador de eventos para o vídeo
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    // Adiciona eventos
    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("ended", handleEnded);

    return () => {
      // Remove eventos
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("ended", handleEnded);
    };
  }, [showVideo]);

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
                    ref={videoContainerRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full relative video-container"
                  >
                    <video
                      ref={videoRef}
                      src={project.demoVideo}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full rounded-lg object-cover shadow-md"
                      aria-label={`Demonstração do projeto ${project.title}`}
                      onClick={(e) => e.stopPropagation()} // Previne que o clique no vídeo feche o componente
                    />
                    {/* Botão de tela cheia personalizado removido */}
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
