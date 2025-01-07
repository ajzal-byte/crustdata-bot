"use client";

import { useTheme } from "../contexts/ThemeContext";
import { Sun, Moon, Palette } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, currentFunTheme } = useTheme();

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-full ${
          theme === "light" ? "bg-yellow-200" : "bg-gray-200"
        }`}
        aria-label="Light mode"
        title="Light mode"
      >
        <Sun size={20} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-full ${
          theme === "dark" ? "bg-gray-600" : "bg-gray-200"
        }`}
        aria-label="Dark mode"
        title="Dark mode"
      >
        <Moon size={20} />
      </button>
      <button
        onClick={() => setTheme("fun")}
        className={`p-2 rounded-full ${
          theme === "fun"
            ? `bg-gradient-to-r ${currentFunTheme.primary}`
            : "bg-gray-200"
        }`}
        aria-label="Fun mode"
        title="Fun mode"
      >
        <Palette size={20} />
      </button>
    </div>
  );
}
