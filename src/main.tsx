import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { resolveRoute } from "./routes";

type PageRevealWithTransition = Event & {
  viewTransition?: {
    finished: Promise<unknown>;
  };
};

function enableSmoothScrollAfterReveal() {
  let fallbackTimer: number;
  let enabled = false;

  const enable = () => {
    if (enabled) return;

    enabled = true;
    window.clearTimeout(fallbackTimer);
    document.documentElement.dataset.scrollReady = "true";
  };

  fallbackTimer = window.setTimeout(enable, 700);
  window.addEventListener(
    "pagereveal",
    (event) => {
      const transition = (event as PageRevealWithTransition).viewTransition;
      if (transition) {
        void transition.finished.finally(enable);
        return;
      }

      window.requestAnimationFrame(enable);
    },
    { once: true },
  );
}

enableSmoothScrollAfterReveal();

const legacyLanguage = new URLSearchParams(window.location.search).get("lang");
if (window.location.pathname === "/" && legacyLanguage === "en") {
  window.location.replace("/en/");
}

const route = resolveRoute(window.location.pathname);

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <React.StrictMode>
    <App route={route} />
  </React.StrictMode>,
);
