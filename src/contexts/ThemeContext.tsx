"use client";

import { FunTheme, funThemes } from "@/data/themes";
import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark" | "fun";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  currentFunTheme: FunTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [currentFunTheme, setCurrentFunTheme] = useState<FunTheme>(
    funThemes[0]
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = window.document.documentElement;
    root.classList.remove("light", "dark", "fun");
    root.classList.add(theme);

    if (theme === "fun") {
      setCurrentFunTheme(
        funThemes[Math.floor(Math.random() * funThemes.length)]
      );
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentFunTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
