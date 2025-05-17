import React from "react";

const links: { label: string; href: string }[] = [
  { label: "Home", href: "#home" },
  { label: "Sobre", href: "#about" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "#contact" },
];

const Navbar: React.FC = () => (
  <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-sm">
    <div className="container mx-auto flex items-center justify-between p-4">
      <a href="#home" className="text-xl font-bold">
        Seu Nome
      </a>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="hover:text-blue-600">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

export default Navbar;
