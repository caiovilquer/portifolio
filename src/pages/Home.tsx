
import React from "react";
import { motion } from "framer-motion";
import AnimatedTerminal from "../components/AnimatedTerminal";

const Home: React.FC = () => (
  <motion.div
    className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden py-20 md:py-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    {/* Background Glow Effect */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--primary)] opacity-10 blur-[120px] rounded-full pointer-events-none" />

    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h2 className="text-[var(--text-secondary)] text-xl md:text-2xl font-medium mb-4 tracking-wide">
          Olá, eu sou
        </h2>
        <h1 className="heading-1 mb-6">
          <span className="text-gradient font-extrabold">Caio Vilquer</span>
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-tertiary)] max-w-2xl mx-auto mb-10 leading-relaxed px-4">
          Desenvolvedor Backend <span className="text-[var(--text-secondary)]">|</span> Engenharia de Computação <span className="text-[var(--text-secondary)]">@</span> Poli-USP
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-16 w-full sm:w-auto px-6 sm:px-0"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <a href="#projects" className="btn-primary w-full sm:w-auto text-center">
          Ver Projetos
        </a>
        <a href="#contact" className="btn-outline w-full sm:w-auto text-center">
          Entrar em Contato
        </a>
      </motion.div>

      <motion.div
        className="w-full"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <AnimatedTerminal />
      </motion.div>
    </div>

    {/* Scroll Indicator - Hidden on small vertical screens to avoid overlap */}
    <motion.div
      className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-tertiary)] hidden h-custom:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, 10, 0] }}
      transition={{ delay: 1, duration: 2, repeat: Infinity }}
    >
      <span className="text-xs uppercase tracking-widest">Scroll</span>
      <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--primary)] to-transparent opacity-50"></div>
    </motion.div>
  </motion.div>
);

export default Home;
