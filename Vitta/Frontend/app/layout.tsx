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
        <header className="bg-black border-b p-4 flex gap-6"> 
          <Link href="/" className="hover:text-blue-500 font-bold">
            Home
          </Link>
          <Link href="/feed" className="hover:text-blue-500 font-bold">
            Feed
          </Link>
          <Link href="/perfil" className="hover:text-blue-500 font-bold">
            Perfil
          </Link>
        </header>

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