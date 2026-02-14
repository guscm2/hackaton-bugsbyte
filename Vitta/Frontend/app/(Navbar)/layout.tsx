import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <header className="bg-black border-b p-6 flex gap-6"> 
          <Link href="/" className="hover:text-blue-500 font-bold">
            Home
          </Link>
          <Link href="/feed" className="hover:text-blue-500 font-bold">
            Feed
          </Link>

            <Link href="/perfil" className="ml-auto hover:text-blue-500 font-bold">
              <div className=" border-none w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                U
              </div>
            </Link>


        </header>
        {children} {/* Aqui é onde o conteúdo de cada página vai aparecer */}

    </>

  );
}