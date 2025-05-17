import React from "react";
import { motion } from "framer-motion";

const Home: React.FC = () => (
  <motion.div
    className="min-h-screen flex flex-col items-center justify-center text-center px-4 fade-in"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <h1 className="mb-6">
      Olá, eu sou{" "}
      <span className="text-[var(--primary)]">Caio Vilquer Carvalho</span>
    </h1>
    <p className="text-lg md:text-2xl mb-10 text-[var(--secondary)]">
      Desenvolvedor Backend | Engenharia de Computação – Poli-USP
    </p>
    <div className="flex gap-4">
      <a href="#projects" className="btn">
        Veja meus projetos
      </a>
      <a href="#contact" className="btn-outline">
        Contato
      </a>
    </div>
  </motion.div>
);

export default Home;
