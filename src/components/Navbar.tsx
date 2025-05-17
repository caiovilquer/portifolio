import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const links: { label: string; href: string }[] = [
  { label: "Home", href: "#home" },
  { label: "Sobre", href: "#about" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "#contact" },
];

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll events to update active link
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background opacity when scrolled
      setIsScrolled(window.scrollY > 10);

      // Get current section based on scroll position
      const sections = document.querySelectorAll("section");

      const isNearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (isNearBottom) {
        // If we are close to the end, activate the last section (contact)
        setActiveLink("contact");
        return;
      }

      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id") || "";
        }
      });

      if (current) {
        setActiveLink(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full backdrop-blur-sm z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/90 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <a
          href="#home"
          className="text-xl font-bold text-[var(--dark)] transition-colors duration-200"
        >
          Caio Vilquer Carvalho
        </a>
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex space-x-6">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link ${
                    activeLink === link.href.substring(1) ? "active" : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          <button className="md:hidden p-2" aria-label="Menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
