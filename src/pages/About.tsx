import React from "react";
import { motion } from "framer-motion";
import avatar from "../assets/avatar.jpeg";

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

        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            "Java",
            "Spring Boot",
            "Kotlin",
            "PostgreSQL",
            "Git",
            "Docker",
            "Python",
            "TypeScript",
            "React",
            "API REST",
            "GitHub Actions",
            "CI/CD",
            "Clean Code",
            "SOLID",
            "Análise de Dados",
            "Eletrônica",
          ].map((skill, index) => (
            <span key={index} className="tech-tag">
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  </div>
);

export default About;
