'use client'

import { useState, useEffect } from 'react'

interface UserProfile {
  user: string
  peso: number
  altura: number
  streak: number
  contribuicoes: number
  objetivos: string[]
}

export default function PerfilPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      // Por agora, dados mockados para testar
      const mockData = {
        user: "João Silva",
        peso: 75,
        altura: 175,
        streak: 15,
        contribuicoes: 42,
        objetivos: ["Perder 5kg", "Correr 5km", "Ganhar massa muscular"]
      }
      
      // Simula delay de API
      setTimeout(() => {
        setProfile(mockData)
        setLoading(false)
      }, 500)
      
      // Quando tiver API pronta, descomente:
      // const response = await fetch('http://localhost:8000/user/profile')
      // const data = await response.json()
      // setProfile(data)
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black text-black dark:text-white">
        <div className="text-xl">Carregando perfil...</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black text-black dark:text-white">
        <div className="text-xl text-red-500">Erro ao carregar perfil</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Meu Perfil</h1>
        
        <div className="bg-gray-50 dark:bg-zinc-900 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {profile.user.charAt(0).toUpperCase()}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-600 dark:text-gray-300">Usuário</h3>
              <p className="text-xl font-bold">{profile.user}</p>
            </div>
            
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-600 dark:text-gray-300">Peso</h3>
              <p className="text-xl font-bold">{profile.peso} kg</p>
            </div>
            
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-600 dark:text-gray-300">Altura</h3>
              <p className="text-xl font-bold">{profile.altura} cm</p>
            </div>
            
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-600 dark:text-gray-300">Streak</h3>
              <p className="text-xl font-bold text-green-500">{profile.streak} dias</p>
            </div>
            
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-600 dark:text-gray-300">Contribuições</h3>
              <p className="text-xl font-bold text-blue-500">{profile.contribuicoes}</p>
            </div>
            
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg md:col-span-2">
              <h3 className="font-semibold text-gray-600 dark:text-gray-300 mb-2">Objetivos</h3>
              <ul className="list-disc list-inside space-y-1">
                {profile.objetivos.map((objetivo, index) => (
                  <li key={index} className="text-sm">{objetivo}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}