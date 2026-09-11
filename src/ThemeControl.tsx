import { type CSSProperties, useEffect, useId, useRef, useState } from "react";
import type { Locale } from "./content";
import { type ThemePreference, useTheme } from "./theme";
import "./ThemeControl.css";

const labels = {
  pt: { title: "Aparência", trigger: "Tema", system: "Sistema", light: "Claro", dark: "Escuro", automatic: "Acompanha a aparência do dispositivo.", manual: "Aparência escolhida por você." },
  en: { title: "Appearance", trigger: "Theme", system: "System", light: "Light", dark: "Dark", automatic: "Matches your device’s appearance.", manual: "Appearance selected by you." },
};
const options: ThemePreference[] = ["system", "light", "dark"];

export function ThemeControl({ locale }: { locale: Locale }) {
  const copy = labels[locale];
  const { preference, resolved, setPreference } = useTheme();
  const [open, setOpen] = useState(false);
  const control = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLInputElement>("input:checked")?.focus({ preventScroll: true });
    const onOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !control.current?.contains(event.target)) {
        setOpen(false);
        // Do not steal focus from another control the user is clicking.
        if (panel.current?.contains(document.activeElement)) trigger.current?.focus({ preventScroll: true });
      }
    };
    const onFocusOutside = (event: FocusEvent) => {
      if (event.target instanceof Node && !control.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    // On iOS, tapping a radio/label can blur the current input with no next
    // focus target before its click/change fires. Close only on a confirmed
    // outside interaction, never on that intermediate blur.
    document.addEventListener("pointerdown", onOutside, true);
    document.addEventListener("focusin", onFocusOutside, true);
    return () => {
      document.removeEventListener("pointerdown", onOutside, true);
      document.removeEventListener("focusin", onFocusOutside, true);
    };
  }, [open]);

  return (
    <div
      className="theme-control"
      ref={control}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !open) return;
        event.preventDefault();
        setOpen(false);
        trigger.current?.focus({ preventScroll: true });
      }}
    >
      <button
        type="button"
        className="theme-control__trigger"
        ref={trigger}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        aria-label={`${copy.title}: ${copy[preference]}`}
        title={`${copy.title}: ${copy[preference]}`}
        onClick={() => {
          if (!open) {
            control.current?.closest("header")?.querySelector("details[open]")?.removeAttribute("open");
          }
          setOpen((value) => !value);
        }}
      >
        <svg viewBox="0 0 32 32" aria-hidden="true" className="theme-control__instrument" data-theme={resolved}>
          <circle cx="16" cy="16" r="11" />
          <path className="theme-control__sector" d="M16 16 L16 5 A11 11 0 0 1 27 16 Z" />
          <path className="theme-control__ticks" d="M16 1v2M16 29v2M1 16h2M29 16h2" />
          <circle className="theme-control__origin" cx="16" cy="16" r="2.5" />
        </svg>
        <span className="theme-control__label">{copy.trigger}</span>
      </button>
      <div className="theme-control__panel" id={`${id}-panel`} ref={panel} hidden={!open}>
        <fieldset>
          <legend>{copy.title}</legend>
          <div className="theme-control__rail" style={{ "--theme-index": options.indexOf(preference) } as CSSProperties}>
            <span className="theme-control__indicator" aria-hidden="true"><span /></span>
            {options.map((value) => (
              <label className="theme-control__option" key={value}>
                <input type="radio" name={`${id}-theme`} value={value} checked={preference === value} onChange={() => setPreference(value)} />
                <span className="theme-control__detent" aria-hidden="true" />
                <span>{copy[value]}</span>
              </label>
            ))}
          </div>
          <p className="theme-control__note">{preference === "system" ? copy.automatic : copy.manual}</p>
        </fieldset>
      </div>
    </div>
  );
}
