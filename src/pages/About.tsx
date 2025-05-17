import React from "react";
import avatar from "../assets/avatar.jpeg";

const About: React.FC = () => (
  <div className="container mx-auto py-20 px-4 flex flex-col md:flex-row items-center gap-8">
    <img
      src={avatar}
      alt="Avatar"
      className="w-48 h-48 rounded-full object-cover shadow-lg"
    />
    <div>
      <h2 className="text-3xl font-bold mb-4">Sobre Mim</h2>
      <p className="text-gray-700 leading-relaxed">
        Sou estudante de Engenharia de Computação na Poli-USP e atuo como
        desenvolvedor backend, com experiência em Java, Kotlin e Spring Boot.
        Tenho paixão por resolver problemas reais e aprender novas tecnologias.
      </p>
    </div>
  </div>
);

export default About;
