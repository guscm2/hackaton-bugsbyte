'use client'
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import path from "path";
import fs from "fs";
import Image from "next/image";

import posts from "../../contributions.json";

export default function Feed() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <section className="feed-container">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="media-wrapper relative aspect-square w-full">
                {post.type === "video" ? (
                  <video 
                    src={post.path} 
                    controls 
                    className="w-full h-full object-cover"
                    preload="metadata"
                  >
                    O seu navegador não suporta vídeos.
                  </video>
                ) : (
                  <Image
                    src={post.path}
                    alt="Contribuição"
                    fill // Usa 'fill' para preencher o wrapper responsivamente
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
