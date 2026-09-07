// Inlined into every HTML document by Vite, before styles and React hydration.
(() => {
  const key = "portfolio-theme";
  const root = document.documentElement;
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const listeners = new Set();
  const parse = (value) => value === "light" || value === "dark" ? value : "system";
  let preference = "system";
  let transition;
  let instantFrame;
  let revision = 0;
  let snapshot;

  try {
    preference = parse(window.localStorage.getItem(key));
  } catch {
    // Appearance still works for this document when storage is unavailable.
  }

  const resolve = () => preference === "system" ? (system.matches ? "dark" : "light") : preference;
  const announce = () => {
    const next = `${preference}:${resolve()}`;
    if (snapshot === next) return;
    snapshot = next;
    listeners.forEach((listener) => listener());
  };
  const apply = () => {
    // Read the latest choice here: a skipped transition may still run its callback.
    const theme = resolve();
    root.dataset.theme = theme;
    root.dataset.themePreference = preference;
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.setAttribute("content", theme === "dark" ? "#111f25" : "#eeede7");
    });
    announce();
  };
  const update = (animate) => {
    const currentRevision = ++revision;
    transition?.skipTransition();
    transition = undefined;
    if (instantFrame) window.cancelAnimationFrame(instantFrame);
    root.classList.remove("theme-instant");
    root.classList.remove("theme-transition");

    if (!animate || reduced.matches || !document.startViewTransition ||
        root.dataset.theme === resolve() || root.classList.contains("reading-mode-transition")) {
      const instant = !animate || reduced.matches;
      if (instant) root.classList.add("theme-instant");
      apply();
      if (instant) {
        instantFrame = window.requestAnimationFrame(() => {
          instantFrame = window.requestAnimationFrame(() => {
            if (revision === currentRevision) root.classList.remove("theme-instant");
            instantFrame = undefined;
          });
        });
      }
      return;
    }

    root.classList.add("theme-transition");
    try {
      transition = document.startViewTransition(apply);
      // Cancellation is an expected outcome when preferences change quickly.
      transition.ready.catch(() => {});
      transition.finished.then(cleanup, cleanup);
    } catch {
      apply();
      cleanup();
    }

    function cleanup() {
      if (revision !== currentRevision) return;
      root.classList.remove("theme-transition");
      transition = undefined;
    }
  };

  window.portfolioTheme = {
    getSnapshot: () => snapshot,
    finishTransition: () => update(false),
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setPreference: (value) => {
      preference = parse(value);
      try {
        window.localStorage.setItem(key, preference);
      } catch {
        // Keep the user's choice in memory even when it cannot be persisted.
      }
      update(true);
    },
  };

  system.addEventListener("change", () => {
    if (preference === "system") update(false);
  });
  reduced.addEventListener("change", () => {
    if (reduced.matches) update(false);
  });
  window.addEventListener("storage", (event) => {
    if (event.key !== key && event.key !== null) return;
    if (event.storageArea && event.storageArea !== window.localStorage) return;
    preference = parse(event.newValue);
    update(false);
  });
  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    try {
      preference = parse(window.localStorage.getItem(key));
    } catch {
      // Retain the in-memory preference on a restored page.
    }
    update(false);
  });
  apply();
})();
