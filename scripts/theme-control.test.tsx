import { act, StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeControl } from "../src/ThemeControl";
import type { Locale } from "../src/content";
import bootstrap from "../src/theme-bootstrap.js?raw";

let root: Root;
let host: HTMLDivElement;
let outside: HTMLButtonElement;

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query.includes("prefers-color-scheme"),
    addEventListener: vi.fn(),
  }));
  localStorage.clear();
  document.body.innerHTML = "";
  host = document.createElement("div");
  outside = document.createElement("button");
  outside.textContent = "Outside";
  document.body.append(host, outside);
  // Exercise the real controller and hook, including persistence and HTML theme.
  window.eval(bootstrap);
  root = createRoot(host);
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
  outside.remove();
  vi.unstubAllGlobals();
});

function mount(locale: Locale = "pt") {
  act(() => root.render(<StrictMode><ThemeControl locale={locale} /></StrictMode>));
  act(() => trigger().click());
  expect(panel().hidden).toBe(false);
}

const trigger = () => host.querySelector<HTMLButtonElement>(".theme-control__trigger")!;
const panel = () => host.querySelector<HTMLDivElement>(".theme-control__panel")!;
const radio = (value: string) => host.querySelector<HTMLInputElement>(`input[value="${value}"]`)!;

function pointer(target: HTMLElement, type: string) {
  const event = new MouseEvent(type, { bubbles: true, cancelable: true });
  Object.defineProperty(event, "pointerType", { value: "touch" });
  act(() => target.dispatchEvent(event));
}

describe.each(["pt", "en"] as const)("%s theme panel", (locale) => {
  it.each(["input", "text", "marker"])("selects every theme when a touch on %s blurs the radio before activation", (part) => {
    mount(locale);
    for (const value of ["light", "dark", "system", "light"]) {
      act(() => host.querySelector<HTMLInputElement>("input:checked")!.focus());
      const input = radio(value);
      const label = input.closest("label")!;
      const target = part === "input" ? input : part === "text"
        ? label.lastElementChild as HTMLElement
        : label.querySelector<HTMLElement>(".theme-control__detent")!;

      pointer(target, "pointerdown");
      // iOS may clear focus without giving the tapped control focus. This real
      // blur emits focusout with relatedTarget=null, before native activation.
      act(() => (document.activeElement as HTMLElement).blur());
      expect(document.activeElement).toBe(document.body);
      expect(panel().hidden).toBe(false);
      pointer(target, "pointerup");
      act(() => target.click());

      expect(input.checked).toBe(true);
      expect(panel().hidden).toBe(false);
      expect(localStorage.getItem("portfolio-theme")).toBe(value);
      expect(document.documentElement.dataset.themePreference).toBe(value);
      expect(document.documentElement.dataset.theme).toBe(value === "light" ? "light" : "dark");
    }
  });
});

it("keeps the panel open when internal content receives a touch without taking focus", () => {
  mount();
  pointer(host.querySelector<HTMLElement>(".theme-control__note")!, "pointerdown");
  act(() => (document.activeElement as HTMLElement).blur());
  expect(panel().hidden).toBe(false);
  expect(localStorage.getItem("portfolio-theme")).toBe(null);
});

it("does not apply a preference on pointerdown or a canceled touch", () => {
  mount();
  pointer(radio("light"), "pointerdown");
  act(() => (document.activeElement as HTMLElement).blur());
  pointer(radio("light"), "pointercancel");
  expect(panel().hidden).toBe(false);
  expect(radio("system").checked).toBe(true);
  expect(localStorage.getItem("portfolio-theme")).toBe(null);
  act(() => radio("light").click());
  expect(radio("light").checked).toBe(true);
});

it("closes when keyboard focus actually moves outside, retaining that focus", () => {
  mount();
  act(() => radio("light").focus());
  expect(panel().hidden).toBe(false);
  act(() => outside.focus());
  expect(panel().hidden).toBe(true);
  expect(document.activeElement).toBe(outside);
});

it("closes on an outside touch even if another handler stops bubbling", () => {
  mount();
  outside.addEventListener("pointerdown", (event) => event.stopPropagation());
  pointer(outside, "pointerdown");
  expect(panel().hidden).toBe(true);
  expect(document.activeElement).toBe(trigger());
});

it("returns focus on Escape and restores the saved selection on reopen", () => {
  mount();
  act(() => radio("light").click());
  act(() => radio("light").dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })));
  expect(panel().hidden).toBe(true);
  expect(document.activeElement).toBe(trigger());
  act(() => trigger().click());
  expect(panel().hidden).toBe(false);
  expect(document.activeElement).toBe(radio("light"));
});

it("toggles closed from the trigger without reopening on focus restoration", () => {
  mount();
  pointer(trigger(), "pointerdown");
  act(() => trigger().click());
  expect(panel().hidden).toBe(true);
  act(() => trigger().click());
  expect(panel().hidden).toBe(false);
});
