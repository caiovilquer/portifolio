import React from "react";
import { motion } from "framer-motion";
import ProjectCard, { Project } from "../components/ProjectCard";
import {
  FaPython,
  FaJava,
  FaReact,
  FaGamepad,
  FaDatabase,
  FaCode,
} from "react-icons/fa";
import {
  SiTypescript,
  SiSpringboot,
  SiCss3,
  SiArduino,
  SiC,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { GiConsoleController } from "react-icons/gi";
import { MdStorage, MdHardware } from "react-icons/md";
import { VscSnake } from "react-icons/vsc";

// Importar os vídeos MP4
import gameListDemo from "../assets/mp4/game-list-demo.mp4";
import minotauroDemo from "../assets/mp4/minotauro-demo.mp4";
import cadastroDemo from "../assets/mp4/cadastro-demo.mp4";

const projects: Project[] = [
  {
    id: 1,
    title: "Game Ranking List",
    description:
      "Aplicação fullstack para gerenciamento pessoal de coleções de jogos. O frontend em React proporciona uma interface moderna, intuitiva e responsiva, permitindo aos usuários visualizar, adicionar e organizar jogos com facilidade, utilizando filtros avançados e classificação personalizada. O backend, desenvolvido em Java com Spring Boot, disponibiliza uma API RESTful robusta com autenticação, operações CRUD completas e persistência eficiente em banco de dados relacional. Juntos, criam uma plataforma prática e completa para entusiastas organizarem suas bibliotecas de jogos digitais.",
    tech: [
      "Java",
      "Spring Boot",
      "API REST",
      "TypeScript",
      "React",
      "CSS",
      "PostgreSQL",
    ],
    techIcons: {
      TypeScript: SiTypescript,
      React: FaReact,
      CSS: SiCss3,
      Java: FaJava,
      "Spring Boot": SiSpringboot,
      "API REST": TbApi,
      PostgreSQL: FaDatabase,
      JWT: FaCode,
    },
    githubUrl: "https://github.com/caiovilquer/game-list-backend",
    demoUrl: "https://gamelist.vilquer.dev/",
    demoVideo: gameListDemo,
  },
  {
    id: 2,
    title: "A Fúria do Minotauro",
    description:
      "Labirinto sensorial interativo baseado na mitologia grega (Teseu e o Minotauro), projetado para aprimorar a coordenação motora fina e concentração, especialmente em usuários com TEA. Utilizando Arduino e Python (Pygame), o sistema detecta colisões por interrupção digital ao toque do anel nas paredes metálicas do labirinto móvel, fornecendo feedback imediato (visual e sonoro). O jogador avança gradativamente em fases com níveis crescentes de dificuldade, recebendo estímulos sensoriais integrados enquanto acompanha Teseu na épica missão de vencer o Minotauro.",
    tech: [
      "Python",
      "Pygame",
      "Arduino",
      "Game Development",
      "Assistive technology",
    ],
    techIcons: {
      Python: FaPython,
      Pygame: VscSnake,
      Arduino: SiArduino,
      "Game Development": FaGamepad,
      "Assistive technology": MdHardware,
    },
    githubUrl: "https://github.com/caiovilquer/A-furia-do-minotauro",
    demoUrl: "",
    demoVideo: minotauroDemo,
  },
  {
    id: 3,
    title: "Sistema de Cadastro via CLI",
    description:
      "Sistema de cadastro de usuários executado via terminal, desenvolvido em Java. Proporciona uma interface textual simples e intuitiva para cadastro, consulta, edição e exclusão de informações pessoais dos usuários. Os dados são armazenados e gerenciados em arquivos texto (bloco de notas). Inclui também um módulo para criação e gerenciamento de perguntas dinâmicas na interface de cadastro. Projeto educacional que demonstra conceitos básicos de persistência de dados e manipulação de arquivos.",
    tech: ["Java", "Console Application", "CRUD", "Data Management"],
    techIcons: {
      Java: FaJava,
      "Console Application": GiConsoleController,
      CRUD: FaDatabase,
      "Data Management": MdStorage,
    },
    githubUrl: "https://github.com/caiovilquer/Sistema-de-cadastro",
    demoUrl: "",
    demoVideo: cadastroDemo,
  },
  {
    id: 4,
    title: "Geladeira com Peltier",
    description:
      "Mini geladeira inteligente usando pastilha Peltier. O microcontrolador MSP430 é responsável por gerenciar o funcionamento do sistema, controlando a temperatura interna e o acionamento do módulo Peltier conforme necessário. Ademais, é possível selecionar a opção de temporizar o funcionamento da geladeira, isto é setar um horário para ligá-la e/ou desligá-la Projeto de hardware que demonstra a aplicação de efeito termoelétrico para refrigeração em escala reduzida.",
    tech: ["C", "MSP430", "Hardware", "Eletrônica"],
    techIcons: {
      C: SiC,
      MSP430: FaCode,
      Hardware: MdHardware,
      Eletrônica: MdHardware,
    },
    githubUrl: "https://github.com/caiovilquer/Geladeira-Peltier",
    demoUrl: "",
    demoVideo: "",
  },
];

const Projects: React.FC = () => (
  <div className="container mx-auto px-4">
    <motion.h2
      className="section-title"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      Meus Projetos
    </motion.h2>

    <motion.div
      className="project-grid"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {projects.map((project, index) => (
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

export default Projects;
