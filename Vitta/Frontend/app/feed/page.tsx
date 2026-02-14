'use client'
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

import postsData from "../../contributions.json";

export default function Feed() {
  const router = useRouter();
  const posts = postsData || [];

  console.log("Posts carregados:", posts);
  console.log("Número de posts:", posts.length);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-900">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-8 px-4 bg-zinc-50 dark:bg-zinc-900">
        <div className="w-full mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Feed</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Sair
          </button>
        </div>
        
        <section className="w-full space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
              Nenhuma contribuição ainda
            </div>
          ) : (
            posts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden border border-zinc-200 dark:border-zinc-700"
              >
                {/* Header do post */}
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      U
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-zinc-900 dark:text-white">Usuário</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {new Date(post.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mídia */}
                <div className="relative w-full aspect-square bg-zinc-100 dark:bg-zinc-900">
                  {post.type === "video" ? (
                    <video 
                      src={post.path} 
                      controls 
                      className="w-full h-full object-contain"
                      preload="metadata"
                    >
                      O seu navegador não suporta vídeos.
                    </video>
                  ) : (
                    <Image
                      src={post.path}
                      alt="Contribuição"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  )}
                </div>

                {/* Footer do post */}
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-400 transition">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-blue-400 transition">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-3 text-zinc-700 dark:text-zinc-300">
                    <span className="font-semibold">Contribuição sustentável</span> 🌱
                  </p>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
