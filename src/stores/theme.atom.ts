import { atomWithStorage } from "jotai/utils";

export type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("balanz-theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export const themeAtom = atomWithStorage<Theme>(
  "balanz-theme",
  getInitialTheme(),
);
