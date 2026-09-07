import { useEffect, useState } from "react";

/** A reading cursor, independent of the last clicked hash. */
export function useReadingSection(items: readonly { href: string }[]) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const sections = items.flatMap(({ href }) => {
      const element = document.getElementById(href.slice(1));
      return element ? [{ href, element }] : [];
    });
    const header = document.querySelector<HTMLElement>(".home-site-header");
    let frame = 0;

    const measure = () => {
      frame = 0;
      const probe = Math.min(window.innerHeight * 0.4, (header?.offsetHeight ?? 0) + 64);
      let next: string | null = null;
      for (const section of sections) {
        if (section.element.getBoundingClientRect().top <= probe) next = section.href;
      }
      // A short final section may never reach the reading line.
      const root = document.documentElement;
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= root.scrollHeight - 2) {
        next = sections.at(-1)?.href ?? null;
      }
      setCurrent((previous) => previous === next ? previous : next);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    observer?.observe(document.body);
    if (header) observer?.observe(header);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
    };
  }, [items]);

  return current;
}
