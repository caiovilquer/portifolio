import React from "react";
import { motion } from "framer-motion";
import ProjectCard, { Project } from "../components/ProjectCard";
import { FaDocker } from "react-icons/fa";
import { SiKotlin, SiSpringboot, SiOpencv } from "react-icons/si";
import { GrAndroid } from "react-icons/gr";
import { BiLogoPostgresql } from "react-icons/bi";
import { MdOutlineSensors } from "react-icons/md";
import { TbApi } from "react-icons/tb";

// Importar os vídeos de protótipo, se existirem
import trackShotImage from "../assets/images/trackshotcv-image.png";
import petCareImage from "../assets/images/petcare-image.png";

const futureProjects: Project[] = [
  {
    id: 1,
    title: "TrackShot CV",
    description:
      "Aplicação Android nativa voltada para análise biomecânica e coleta de métricas no arremesso de peso, utilizando visão computacional com OpenCV e processamento de dados por sensores inerciais (IMU). Desenvolvida em Kotlin, a aplicação realiza tracking automático do movimento do atleta, medindo parâmetros essenciais como velocidade, ângulo de lançamento e trajetória, oferecendo feedback preciso para atletas e treinadores. Protótipo em fase de desenvolvimento com funcionalidades de análise sendo validadas.",
    tech: ["Kotlin", "Android", "OpenCV", "IMU"],
    techIcons: {
      Kotlin: SiKotlin,
      Android: GrAndroid,
      OpenCV: SiOpencv,
      IMU: MdOutlineSensors,
    },
    githubUrl: "",
    demoUrl: "",
    inProgress: true,
    estimatedCompletion: "Fev 2026",
    progressPercentage: 5,
    demoVideo: "",
    demoImage: trackShotImage,
  },
];

const FutureProjects: React.FC = () => (
  <div className="container-custom py-20">
    <motion.h2
      className="heading-2 text-center mb-10"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      Projetos <span className="text-gradient">Futuros</span>
    </motion.h2>

    <motion.p
      className="text-center text-[var(--text-secondary)] mb-16 max-w-2xl mx-auto text-lg leading-relaxed"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      Inovações e experimentos em desenvolvimento. Acompanhe o progresso dessas ideias que estão saindo do papel.
    </motion.p>

    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {futureProjects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          className="h-full"
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  </div>
);

export default FutureProjects;
