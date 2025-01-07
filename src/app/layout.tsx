import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crustdata API Support Chatbot",
  description: "Get answers to your questions about Crustdata's APIs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} transition-colors duration-200`}>
        {children}
      </body>
    </html>
  );
}
