import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import Link from "next/link";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <header className="bg-black border-b p-6 flex items-center gap-6">

          <Image
            src="/logo.svg"
            alt="Logo do Vitta"
            width={60}
            height={60}
          /> 

          <Link href="/feed" className="hover:text-blue-500 font-bold">
            Feed
          </Link>
          <Link href="/camara" className="hover:text-blue-500 font-bold">
            Câmera
          </Link>
          <Link href="/leaderboard" className="hover:text-blue-500 font-bold">
            Leaderboard
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