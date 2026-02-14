import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vitta",
  description: "",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>


        <main className="max-w-4xl mx-auto p-6">
          {children} {/* Aqui é onde o conteúdo de cada página vai aparecer */}
        </main>

        <footer className="text-center p-10 text-white-400">
          © 2026 Vitta
        </footer>
      </body>
    </html>
  );
}