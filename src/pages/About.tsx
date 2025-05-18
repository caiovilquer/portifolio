import React from "react";
import { motion } from "framer-motion";
import avatar from "../assets/avatar.jpeg";

// Interface para os dados de habilidade
interface Skill {
  name: string;
  proficiency: number; // percentual de 0 a 100
}

// Dados de habilidades categorizados
const skillCategories = [
  {
    name: "Linguagens de Programação",
    skills: [
      { name: "Java", proficiency: 85 },
      { name: "Kotlin", proficiency: 60 },
      { name: "TypeScript", proficiency: 70 },
      { name: "Python", proficiency: 80 },
      { name: "C", proficiency: 50 },
    ],
  },
  {
    name: "Frameworks & Bibliotecas",
    skills: [
      { name: "Spring Boot", proficiency: 75 },
      { name: "React", proficiency: 60 },
      { name: "JUnit", proficiency: 75 },
      { name: "Hibernate", proficiency: 90 },
    ],
  },
  {
    name: "DevOps & Ferramentas",
    skills: [
      { name: "Git", proficiency: 90 },
      { name: "Docker", proficiency: 50 },
      { name: "CI/CD", proficiency: 75 },
      { name: "GitHub Actions", proficiency: 80 },
    ],
  },
  {
    name: "Banco de Dados",
    skills: [
      { name: "PostgreSQL", proficiency: 85 },
      { name: "MySQL", proficiency: 90 },
      { name: "MongoDB", proficiency: 50 },
    ],
  },
];

// Componente para as barras de proficiência
const SkillBar: React.FC<{ skill: Skill; delay: number }> = ({
  skill,
  delay,
}) => (
  <div className="mb-3">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-[var(--dark)]">
        {skill.name}
      </span>
      <span className="text-xs font-semibold text-[var(--primary)]">
        {skill.proficiency}%
      </span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
      <motion.div
        className="h-2 rounded-full bg-[var(--primary)]"
        style={{ width: 0 }}
        animate={{ width: `${skill.proficiency}%` }}
        transition={{
          duration: 1.2,
          delay: delay,
          ease: "easeOut",
        }}
      />
    </div>
  </div>
);

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
          backend com experiência em Java, Kotlin e Spring Boot, atuando no
          desenvolvimento de APIs REST, integração com bancos PostgreSQL/MySQL e
          automação de pipelines CI/CD (GitHub Actions). Também possuo
          experiência básica em desenvolvimento frontend utilizando React com
          TypeScript, além de conhecimentos em Python e Análise de Dados. Tenho
          paixão por criar soluções tecnológicas eficientes, aplicar boas
          práticas (Clean Code, SOLID, TDD) e estou sempre em busca de novos
          desafios que estimulem meu aprendizado e crescimento profissional.
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

    {/* Nova seção de skills com indicadores de proficiência */}
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
