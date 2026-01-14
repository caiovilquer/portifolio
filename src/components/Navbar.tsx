import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links: { label: string; href: string }[] = [
  { label: "Home", href: "#home" },
  { label: "Sobre", href: "#about" },
  { label: "Projetos", href: "#projects" },
  { label: "Futuro", href: "#future-projects" },
  { label: "Contato", href: "#contact" },
];

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = document.querySelectorAll("section");
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

      if (isNearBottom) {
        setActiveLink("contact");
        return;
      }

      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 300 && window.scrollY < sectionTop + sectionHeight - 300) {
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

  const handleMobileMenuLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    setActiveLink(href.substring(1));
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
          ? "py-4 bg-[#0f172a]/80 backdrop-blur-md border-b border-[rgba(255,255,255,0.05)]"
          : "py-6 bg-transparent"
          }`}
      >
        <div className="container-custom flex items-center justify-between">
          <a
            href="#home"
            className="text-2xl font-bold tracking-tighter"
          >
            <span className="text-white">vilquer</span>
            <span className="text-[var(--primary)]">.dev</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8 bg-[rgba(255,255,255,0.03)] px-6 py-2 rounded-full border border-[rgba(255,255,255,0.05)] backdrop-blur-sm">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-300 relative px-2 py-1 ${activeLink === link.href.substring(1)
                    ? "text-[var(--primary)]"
                    : "text-slate-400 hover:text-white"
                    }`}
                >
                  {link.label}
                  {activeLink === link.href.substring(1) && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--primary)] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block w-[100px] text-right">
            {/* Placeholder for balance or extra action if needed */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)] pt-24 px-6 md:hidden"
          >
            <ul className="flex flex-col gap-6 items-center">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={() => handleMobileMenuLinkClick(link.href)}
                    className={`text-2xl font-medium ${activeLink === link.href.substring(1)
                      ? "text-[var(--primary)]"
                      : "text-slate-400"
                      }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
