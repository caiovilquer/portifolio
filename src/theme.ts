import { useSyncExternalStore } from "react";

export type ThemePreference = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";
type ThemeSnapshot = `${ThemePreference}:${ResolvedTheme}`;

declare global {
  interface Window {
    portfolioTheme: {
      getSnapshot: () => ThemeSnapshot;
      finishTransition: () => void;
      subscribe: (listener: () => void) => () => void;
      setPreference: (preference: ThemePreference) => void;
    };
  }
}

const subscribe = (listener: () => void) => window.portfolioTheme.subscribe(listener);
const getSnapshot = () => window.portfolioTheme.getSnapshot();
// The HTML remains identical during hydration; CSS already has the correct theme.
const getServerSnapshot = (): ThemeSnapshot => "system:light";

export function useTheme() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [preference, resolved] = snapshot.split(":") as [ThemePreference, ResolvedTheme];
  return {
    preference,
    resolved,
    setPreference: (value: ThemePreference) => window.portfolioTheme.setPreference(value),
  };
}
