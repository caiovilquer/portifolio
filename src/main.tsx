import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { resolveRoute } from "./routes";

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
