import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaLayerGroup, FaTools, FaDatabase, FaBrain } from "react-icons/fa";
import avatar from "../assets/avatar.png";

const techStack = [
  {
    category: "Linguagens & Core",
    icon: <FaCode className="text-[var(--primary)]" />,
    skills: ["Java", "Kotlin", "TypeScript", "Python", "JavaScript", "C", "SQL"],
  },
  {
    category: "Frameworks & Libs",
    icon: <FaLayerGroup className="text-[var(--secondary)]" />,
    skills: [
      "Spring Boot",
      "NestJS",
      "React",
      "Hibernate/JPA",
      "JUnit",
      "TailwindCSS"
    ],
  },
  {
    category: "DevOps & Tools",
    icon: <FaTools className="text-[var(--accent)]" />,
    skills: ["Git", "Docker", "GitHub Actions", "CI/CD", "Maven", "Gradle", "Linux"],
  },
  {
    category: "Banco de Dados",
    icon: <FaDatabase className="text-purple-400" />,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "H2 Database"],
  },
  {
    category: "Arquitetura & Outros",
    icon: <FaBrain className="text-amber-400" />,
    skills: [
      "Clean Code",
      "SOLID",
      "DDD",
      "REST API",
      "Microservices",
      "TDD",
      "Design Patterns",
    ],
  },
];

const About: React.FC = () => (
  <div className="container-custom py-20 relative">
    {/* Background Decorations */}
    <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
    <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

    <motion.h2
      className="heading-2 text-center mb-16"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      Sobre <span className="text-gradient">Mim</span>
    </motion.h2>

    <motion.div
      className="flex flex-col lg:flex-row items-center lg:items-start gap-12 mb-24 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative group flex-shrink-0"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute -inset-1 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
        <img
          src={avatar}
          alt="Caio Vilquer Carvalho"
          className="relative w-64 h-64 rounded-full object-cover border-4 border-[var(--bg-primary)] shadow-2xl"
        />
      </motion.div>

      <div className="flex-1 space-y-6 text-lg text-[var(--text-secondary)] leading-relaxed text-center lg:text-left">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Sou estudante de{" "}
          <span className="text-[var(--primary)] font-semibold">
            Engenharia de Computação na Poli-USP
          </span>{" "}
          e desenvolvedor backend apaixonado. Minha jornada é marcada pelo
          domínio de Java, Kotlin e Spring Boot, além de explorar o ecossistema
          moderno com NestJS e React.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Com foco em entregar soluções robustas, tenho experiência prática em
          arquitetura de APIs REST, modelagem de banco de dados (PostgreSQL/MySQL)
          e automação de CI/CD. Mais do que código, busco excelência através de{" "}
          <strong className="text-[var(--text-primary)] font-semibold">
            Clean Code
          </strong>
          ,{" "}
          <strong className="text-[var(--text-primary)] font-semibold">
            SOLID
          </strong>{" "}
          e{" "}
          <strong className="text-[var(--text-primary)] font-semibold">
            DDD
          </strong>
          .
        </motion.p>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="max-w-7xl mx-auto"
    >
      <h3 className="text-3xl font-bold mb-12 text-center text-[var(--text-primary)]">
        Tech <span className="text-gradient">Stack</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techStack.map((stack, index) => (
          <motion.div
            key={stack.category}
            className="glass-card p-6 flex flex-col h-full hover:bg-[var(--bg-tertiary)]/30 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6 border-b border-[var(--border-color)] pb-4">
              <span className="text-2xl">{stack.icon}</span>
              <h4 className="text-xl font-bold text-[var(--text-primary)]">
                {stack.category}
              </h4>
            </div>

            <div className="flex flex-wrap gap-2">
              {stack.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-md bg-[rgba(56,189,248,0.08)] border border-[rgba(56,189,248,0.15)] text-[var(--text-primary)] text-sm hover:bg-[rgba(56,189,248,0.15)] hover:border-[var(--primary)] transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default About;
