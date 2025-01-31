"use client";

import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

type Message = {
  text: string;
  isUser: boolean;
};

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { theme, currentFunTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/getAnswer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) throw new Error("Failed to get answer");

      const data = await response.json();

      // Artificial delay for loading indicator
      await new Promise((resolve) => setTimeout(resolve, 500));

      const botMessage: Message = { text: data.answer, isUser: false };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        text: "Sorry, an error occurred. Please try again.",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-3 rounded-lg ${
              message.isUser
                ? "bg-blue-500 text-white ml-auto"
                : theme === "fun"
                ? `bg-gradient-to-r ${currentFunTheme.primary} text-white`
                : theme === "dark"
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>
          </div>
        ))}
        {isLoading && (
          <div
            className={`max-w-[80%] p-3 rounded-lg ${
              theme === "fun"
                ? `bg-gradient-to-r ${currentFunTheme.primary} text-white`
                : theme === "dark"
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full animate-bounce bg-current"></div>
              <div
                className="w-2 h-2 rounded-full animate-bounce bg-current"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full animate-bounce bg-current"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className={`p-4 border-t ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about Crustdata's API..."
            className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === "fun"
                ? `bg-gradient-to-r ${currentFunTheme.primary} text-white hover:opacity-90`
                : theme === "dark"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
