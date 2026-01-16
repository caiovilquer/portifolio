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
      const isNearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

      if (isNearBottom) {
        setActiveLink("contact");
        return;
      }

      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (
          window.scrollY >= sectionTop - 300 &&
          window.scrollY < sectionTop + sectionHeight - 300
        ) {
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

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleMobileMenuLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    setActiveLink(href.substring(1));
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled
          ? "py-3 md:py-4 bg-[#0f172a]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)] shadow-lg"
          : "py-3 md:py-6 bg-transparent"
          }`}
      >
        <div className="container-custom flex items-center justify-between pl-4">
          <a
            href="#home"
            className="text-2xl md:text-2xl font-bold tracking-tighter relative z-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="text-white">vilquer</span>
            <span className="text-[var(--primary)]">.dev</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-2 bg-[rgba(255,255,255,0.03)] px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.05)] backdrop-blur-sm shadow-inner">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full z-10 block ${activeLink === link.href.substring(1)
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                    }`}
                >
                  {link.label}
                  {activeLink === link.href.substring(1) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[var(--primary)] rounded-full -z-10 mix-blend-overlay opacity-20"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  {activeLink === link.href.substring(1) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--primary)] rounded-full shadow-[0_0_8px_var(--primary)]"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex w-[40px]">
            {/* Spacer to balance layout if needed */}
          </div>

          {/* Mobile Menu Button - Fixed Position & Z-Index */}
          <button
            className="md:hidden relative z-50 p-2 text-white focus:outline-none flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar Menu" : "Abrir Menu"}
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-[rgba(255,255,255,0.05)] rounded-full backdrop-blur-md border border-[rgba(255,255,255,0.1)]">
              <motion.div
                animate={mobileMenuOpen ? "open" : "closed"}
                className="w-5 h-4 flex flex-col justify-between"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 7 },
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-full h-0.5 bg-white rounded-full origin-center"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  className="w-full h-0.5 bg-white rounded-full"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -9 },
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-full h-0.5 bg-white rounded-full origin-center"
                />
              </motion.div>
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0f172a] md:hidden flex flex-col justify-center items-center"
          >
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--primary)] filter blur-[100px] opacity-10 rounded-full pointer-events-none" />

            <motion.ul
              className="flex flex-col gap-6 items-center w-full relative z-10"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
            >
              {links.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    open: { opacity: 1, y: 0, scale: 1 },
                    closed: { opacity: 0, y: 20, scale: 0.9 }
                  }}
                  className="w-full text-center"
                >
                  <a
                    href={link.href}
                    onClick={() => handleMobileMenuLinkClick(link.href)}
                    className={`block w-full py-3 text-3xl font-bold tracking-tight transition-all duration-300 ${activeLink === link.href.substring(1)
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] scale-110"
                      : "text-slate-400 hover:text-white"
                      }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            {/* Decorative Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 opacity-50"
            >
              <div className="w-12 h-1 bg-[var(--bg-tertiary)] rounded-full" />
              <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">Menu</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
