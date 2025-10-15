import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

// Context type: theme value and function to change it
type ThemeCtx = { theme: Theme; setTheme: React.Dispatch<React.SetStateAction<Theme>> };

// Create context with undefined as default (for error handling)
const ThemeContext = createContext<ThemeCtx | undefined>(undefined);

// Custom hook to use the theme context
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get initial theme: first from localStorage, then from OS, fallback to dark
  const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark"; // Server-side: use dark

  // 1) User choice first (from localStorage)
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved as Theme;

  // 2) OS preference if available
  if (typeof window.matchMedia === "function") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  // 3) Fallback to dark
  return "dark";
};

  // Use lazy initialization (runs only once)
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  // Update <html> classes and save theme to localStorage when theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen to OS theme changes and update theme (cleanup on unmount)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setTheme(e.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange); // cleanup
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};