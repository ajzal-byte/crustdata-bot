"use client";

import ChatUI from "@/components/ChatUI";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";

function Home() {
  const { theme, currentFunTheme } = useTheme();

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : theme === "fun"
          ? `bg-gradient-to-r ${currentFunTheme.background} ${currentFunTheme.text}`
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <header
        className={`shadow ${
          theme === "dark"
            ? "bg-gray-800"
            : theme === "fun"
            ? `bg-gradient-to-r ${currentFunTheme.primary}`
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1
            className={`text-3xl font-bold ${
              theme === "fun"
                ? "text-white"
                : theme === "dark"
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            Crustdata API Support
          </h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div
          className={`shadow sm:rounded-lg h-[calc(100vh-200px)] ${
            theme === "dark"
              ? "bg-gray-800"
              : theme === "fun"
              ? `bg-gradient-to-r ${currentFunTheme.background} bg-opacity-50`
              : "bg-white"
          }`}
        >
          <ChatUI />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
