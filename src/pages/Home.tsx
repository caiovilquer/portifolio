import React from "react";
import { motion } from "framer-motion";

const Home: React.FC = () => (
  <motion.div
    className="min-h-screen flex flex-col items-center justify-center text-center px-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <h1 className="text-4xl md:text-6xl font-bold mb-4">
      Olá, eu sou Caio Vilquer Carvalho
    </h1>
    <p className="text-lg md:text-2xl mb-8">
      Desenvolvedor Backend | Engenharia de Computação – Poli-USP
    </p>
    <a
      href="#projects"
      className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Veja meus projetos
    </a>
  </motion.div>
);

export default Home;
