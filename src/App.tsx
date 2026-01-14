import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import FutureProjects from "./pages/FutureProjects";
import Contact from "./pages/Contact";

const App: React.FC = () => (
  <>
    <Navbar />
    <main>
      <section id="home" className="section relative z-10">
        <Home />
      </section>
      <section id="about" className="section relative z-20 bg-[var(--bg-primary)]">
        <About />
      </section>
      <section id="projects" className="section relative z-20 bg-[var(--bg-primary)]">
        <Projects />
      </section>
      <section id="future-projects" className="section relative z-20 bg-[var(--bg-primary)]">
        <FutureProjects />
      </section>
      <section id="contact" className="section relative z-20 bg-[var(--bg-primary)]">
        <Contact />
      </section>
    </main>
  </>
);

export default App;
