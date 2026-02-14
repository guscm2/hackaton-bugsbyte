'use client'

import { useState } from 'react';
import { loginUsuario } from '../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { user, error } = await loginUsuario(email, senha);
    
    if (error) {
      alert("Erro ao entrar: " + error);
    } else {
      router.push('/feed'); // Vai para o feed se der certo
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-8">Entrar na Vitta</h1>
      
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm px-4">
        <input 
          type="email" 
          placeholder="Teu email" 
          className="p-3 rounded border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Tua senha" 
          className="p-3 rounded border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white p-3 rounded-full font-bold hover:bg-blue-700 transition-all"
        >
          Entrar
        </button>
      </form>
      
    </div>
  );
}