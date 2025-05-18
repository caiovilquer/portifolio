import React from "react";
import { motion } from "framer-motion";
import ProjectCard, { Project } from "../components/ProjectCard";
import { FaDocker } from "react-icons/fa";
import { SiKotlin, SiSpringboot, SiOpencv } from "react-icons/si";
import { GrAndroid } from "react-icons/gr";
import { BiLogoPostgresql } from "react-icons/bi";
import { MdOutlineSensors } from "react-icons/md";
import { TbApi } from "react-icons/tb";

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
    githubUrl: "", // URL quando disponível
    demoUrl: "", // URL quando disponível
    inProgress: true,
    estimatedCompletion: "Fev 2026",
    progressPercentage: 5,
  },
  {
    id: 2,
    title: "PetCareScheduler",
    description:
      "Aplicação backend desenvolvida em Kotlin com Spring Boot para agendamento inteligente e gerenciamento de cuidados com pets. Conta com uma API RESTful robusta, persistência eficiente usando PostgreSQL e comunicação via notificações por e-mail para avisar sobre eventos importantes aos usuários. Futuras integrações previstas incluem clínicas veterinárias e inteligência artificial para recomendações personalizadas. Protótipo funcional em desenvolvimento com arquitetura limpa e modular.",
    tech: ["Kotlin", "Spring Boot", "PostgreSQL", "Docker", "API REST"],
    techIcons: {
      Kotlin: SiKotlin,
      "Spring Boot": SiSpringboot,
      PostgreSQL: BiLogoPostgresql,
      Docker: FaDocker,
      "API REST": TbApi,
    },
    githubUrl: "", // URL quando disponível
    demoUrl: "", // URL quando disponível
    inProgress: true,
    estimatedCompletion: "Jul 2025",
    progressPercentage: 15,
  },
];

const FutureProjects: React.FC = () => (
  <div className="container mx-auto px-4">
    <motion.h2
      className="section-title"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      Projetos Futuros
    </motion.h2>

    <motion.p
      className="text-center text-[var(--secondary)] mb-10 max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      Aqui estão os projetos que estou atualmente desenvolvendo ou planejando
      para o futuro próximo. Fique à vontade para entrar em contato se quiser
      saber mais ou colaborar.
    </motion.p>

    <motion.div
      className="project-grid"
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
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  </div>
);

export default FutureProjects;
