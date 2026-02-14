'use client'
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import path from "path";
import fs from "fs";
import { useRouter } from "next/navigation";
import Image from "next/image";

import posts from "../../fotos.json";

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
              <div className="image-wrapper">
                <Image
                  src={post.path}
                  alt= "Foto de contribuição"
                  width={500} // Define uma largura base
                  height={500} // Define uma altura base
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
