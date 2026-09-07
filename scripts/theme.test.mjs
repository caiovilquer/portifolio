import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";

const source = readFileSync(new URL("../src/theme-bootstrap.js", import.meta.url), "utf8");

function environment({ saved = null, dark = false, reduced = false, blocked = false, transitions = false } = {}) {
  const events = new Map();
  const media = new Map();
  const classes = new Set();
  const calls = [];
  const root = { dataset: {}, classList: { add: (v) => classes.add(v), remove: (v) => classes.delete(v), contains: (v) => classes.has(v) } };
  const meta = { content: "#eeede7", setAttribute: (_, value) => { meta.content = value; } };
  const storage = new Map(saved === null ? [] : [["portfolio-theme", saved]]);
  const localStorage = {
    getItem: (key) => { if (blocked) throw new Error("blocked"); return storage.get(key) ?? null; },
    setItem: (key, value) => { if (blocked) throw new Error("blocked"); storage.set(key, value); },
  };
  const window = {
    localStorage,
    requestAnimationFrame: (callback) => { queueMicrotask(callback); return 1; },
    cancelAnimationFrame: () => {},
    matchMedia: (query) => {
      const result = { matches: query.includes("color-scheme") ? dark : reduced, addEventListener: (_, listener) => { result.change = listener; } };
      media.set(query, result);
      return result;
    },
    addEventListener: (type, listener) => events.set(type, listener),
  };
  const document = { documentElement: root, querySelectorAll: () => [meta] };
  if (transitions) document.startViewTransition = (callback) => {
    let finish;
    const transition = { callback, ready: Promise.resolve(), finished: new Promise((resolve) => { finish = resolve; }), skipTransition() { this.skipped = true; finish(); }, finish: () => finish() };
    calls.push(transition);
    return transition;
  };
  vm.runInNewContext(source, { window, document });
  return {
    store: window.portfolioTheme, root, meta, storage, calls, classes,
    media: (query, matches) => { const m = media.get(query); m.matches = matches; m.change(); },
    external: (value, key = "portfolio-theme") => events.get("storage")({ key, newValue: value, storageArea: localStorage }),
    restore: () => events.get("pageshow")({ persisted: true }),
  };
}

test("first paint follows the system and sets browser chrome before React", () => {
  for (const dark of [false, true]) {
    const e = environment({ dark });
    assert.equal(e.store.getSnapshot(), dark ? "system:dark" : "system:light");
    assert.equal(e.root.dataset.theme, dark ? "dark" : "light");
    assert.equal(e.meta.content, dark ? "#111f25" : "#eeede7");
  }
});

test("a saved choice overrides the system; invalid storage falls back to system", () => {
  assert.equal(environment({ dark: true, saved: "light" }).root.dataset.theme, "light");
  assert.equal(environment({ dark: false, saved: "dark" }).root.dataset.theme, "dark");
  assert.equal(environment({ dark: true, saved: "invalid" }).store.getSnapshot(), "system:dark");
});

test("system changes only affect automatic appearance", () => {
  const e = environment();
  e.media("(prefers-color-scheme: dark)", true);
  assert.equal(e.root.dataset.theme, "dark");
  e.store.setPreference("light");
  e.media("(prefers-color-scheme: dark)", false);
  e.media("(prefers-color-scheme: dark)", true);
  assert.equal(e.root.dataset.theme, "light");
  e.store.setPreference("system");
  assert.equal(e.root.dataset.theme, "dark");
  assert.equal(e.storage.get("portfolio-theme"), "system");
});

test("blocked storage retains an interactive in-memory preference", () => {
  const e = environment({ blocked: true });
  e.store.setPreference("dark");
  e.restore();
  assert.equal(e.store.getSnapshot(), "dark:dark");
  assert.equal(e.meta.content, "#111f25");
});

test("storage events synchronize tabs, removal restores system, unrelated keys are ignored", () => {
  const e = environment();
  e.external("dark");
  assert.equal(e.root.dataset.theme, "dark");
  e.external("light", "unrelated");
  assert.equal(e.root.dataset.theme, "dark");
  e.external(null);
  assert.equal(e.store.getSnapshot(), "system:light");
  e.external("dark");
  e.external(null, null);
  assert.equal(e.store.getSnapshot(), "system:light");
});

test("restoring a cached page reads the latest saved preference", () => {
  const e = environment();
  e.storage.set("portfolio-theme", "dark");
  e.restore();
  assert.equal(e.store.getSnapshot(), "dark:dark");
});

test("subscriptions notify semantic changes and can be cleaned up", () => {
  const e = environment();
  const snapshots = [];
  const unsubscribe = e.store.subscribe(() => snapshots.push(e.store.getSnapshot()));
  e.store.setPreference("dark");
  e.store.setPreference("dark");
  unsubscribe();
  e.store.setPreference("light");
  assert.deepEqual(snapshots, ["dark:dark"]);
});

test("manual transitions finish cleanly without animating the initial paint", async () => {
  const e = environment({ transitions: true });
  assert.equal(e.calls.length, 0);
  e.store.setPreference("dark");
  assert.equal(e.classes.has("theme-transition"), true);
  e.calls[0].callback();
  assert.equal(e.root.dataset.theme, "dark");
  e.calls[0].finish();
  await Promise.resolve();
  assert.equal(e.classes.has("theme-transition"), false);
});

test("stale transition callbacks cannot overwrite the latest rapid choice", async () => {
  const e = environment({ transitions: true });
  e.store.setPreference("dark");
  e.store.setPreference("light");
  e.store.setPreference("dark");
  e.calls[1].callback();
  e.calls[0].callback();
  assert.equal(e.store.getSnapshot(), "dark:dark");
  await Promise.resolve();
  assert.equal(e.classes.has("theme-transition"), true);
  e.calls[1].finish();
  await Promise.resolve();
  assert.equal(e.classes.has("theme-transition"), false);
});

test("reduced motion, reading transitions and automatic updates apply immediately", () => {
  const e = environment({ reduced: true, transitions: true });
  e.store.setPreference("dark");
  assert.equal(e.calls.length, 0);
  e.media("(prefers-reduced-motion: reduce)", false);
  e.classes.add("reading-mode-transition");
  e.store.setPreference("light");
  assert.equal(e.calls.length, 0);
  e.classes.delete("reading-mode-transition");
  e.store.setPreference("system");
  e.media("(prefers-color-scheme: dark)", true);
  assert.equal(e.calls.length, 0);
  assert.equal(e.root.dataset.theme, "dark");
});

test("turning reduced motion on cancels an active transition without losing the choice", async () => {
  const e = environment({ transitions: true });
  e.store.setPreference("dark");
  e.media("(prefers-reduced-motion: reduce)", true);
  e.calls[0].callback();
  await Promise.resolve();
  assert.equal(e.root.dataset.theme, "dark");
  assert.equal(e.classes.has("theme-transition"), false);
});

test("starting a reading transition settles the theme before measuring anchors", async () => {
  const e = environment({ transitions: true });
  e.store.setPreference("dark");
  e.store.finishTransition();
  e.calls[0].callback();
  await Promise.resolve();
  assert.equal(e.root.dataset.theme, "dark");
  assert.equal(e.classes.has("theme-transition"), false);
});
