import React from "react";
import { motion } from "framer-motion";
import avatar from "../assets/avatar.png";

// Interface para os dados de habilidade
interface Skill {
  name: string;
  level: "Básico" | "Intermediário" | "Avançado";
  subLevel?: number;
}

const skillCategories: { name: string; skills: Skill[] }[] = [
  {
    name: "Linguagens de Programação",
    skills: [
      { name: "Java", level: "Avançado", subLevel: 85 },
      { name: "Kotlin", level: "Intermediário", subLevel: 75 },
      { name: "TypeScript", level: "Intermediário", subLevel: 75 },
      { name: "Python", level: "Avançado", subLevel: 75 },
      { name: "C", level: "Básico", subLevel: 25 },
    ],
  },
  {
    name: "Frameworks & Bibliotecas",
    skills: [
      { name: "Spring", level: "Avançado", subLevel: 90 },
      { name: "NestJS", level: "Intermediário", subLevel: 75 },
      { name: "React", level: "Intermediário", subLevel: 55 },
      { name: "JUnit", level: "Avançado", subLevel: 75 },
      { name: "Hibernate", level: "Avançado", subLevel: 95 },
    ],
  },
  {
    name: "DevOps & Ferramentas",
    skills: [
      { name: "Git", level: "Avançado", subLevel: 90 },
      { name: "Docker", level: "Básico", subLevel: 30 },
      { name: "CI/CD", level: "Avançado", subLevel: 80 },
      { name: "GitHub Actions", level: "Avançado", subLevel: 85 },
    ],
  },
  {
    name: "Banco de Dados",
    skills: [
      { name: "PostgreSQL", level: "Avançado", subLevel: 85 },
      { name: "MySQL", level: "Avançado", subLevel: 90 },
      { name: "MongoDB", level: "Básico", subLevel: 20 },
    ],
  },
];

const SkillBar: React.FC<{ skill: Skill; delay: number }> = ({
  skill,
  delay,
}) => {
  const getLevelWidth = (skill: Skill): number => {
    if (skill.subLevel !== undefined) {
      switch (skill.level) {
        case "Básico":
          return Math.min(40, Math.max(20, skill.subLevel));
        case "Intermediário":
          return Math.min(75, Math.max(50, skill.subLevel));
        case "Avançado":
          return Math.min(100, Math.max(75, skill.subLevel));
        default:
          return 0;
      }
    }

    // Se não houver subLevel, use o nível padrão
    switch (skill.level) {
      case "Básico":
        return 33;
      case "Intermediário":
        return 65;
      case "Avançado":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-[var(--dark)]">
          {skill.name}
        </span>
        <span className="text-xs font-semibold text-[var(--primary)]">
          {skill.level}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <motion.div
          className="h-2 rounded-full bg-[var(--primary)]"
          style={{ width: 0 }}
          animate={{ width: `${getLevelWidth(skill)}%` }}
          transition={{
            duration: 1.2,
            delay: delay,
            ease: "easeOut",
          }}
        />
      </div>
    </div>
  );
};

const About: React.FC = () => (
  <div className="container mx-auto px-4">
    <motion.h2
      className="section-title"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      Sobre Mim
    </motion.h2>

    <motion.div
      className="flex flex-col md:flex-row items-center gap-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        src={avatar}
        alt="Avatar"
        className="w-48 h-48 rounded-full object-cover shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      />

      <div>
        <motion.p
          className="text-[var(--secondary)] leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Sou estudante de Engenharia de Computação na Poli-USP e desenvolvedor
          backend com experiência em Java, Kotlin e Spring Boot, além de
          conhecimentos em Node com NestJS para desenvolvimento de APIs
          modernas. Atuo no desenvolvimento de APIs REST, integração com bancos
          PostgreSQL/MySQL e automação de pipelines CI/CD (GitHub Actions).
          Também possuo experiência básica em desenvolvimento frontend
          utilizando React com TypeScript, além de conhecimentos em Python e
          Análise de Dados. Tenho paixão por criar soluções tecnológicas
          eficientes, aplicar boas práticas (Clean Code, SOLID, TDD) e estou
          sempre em busca de novos desafios que estimulem meu aprendizado e
          crescimento profissional.
        </motion.p>

        {/* Substituímos as tags estáticas por uma seção de skills */}
        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            "Clean Code",
            "SOLID",
            "TDD",
            "RESTful APIs",
            "Análise de Dados",
            "Eletrônica",
          ].map((methodology, index) => (
            <span key={index} className="tech-tag">
              {methodology}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>

    <motion.div
      className="mt-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="text-2xl font-bold mb-8 text-center">
        Minhas <span className="text-[var(--primary)]">Habilidades</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.name}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + categoryIndex * 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-[var(--border)]">
              {category.name}
            </h4>
            {category.skills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                delay={0.4 + categoryIndex * 0.1 + index * 0.1}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default About;
