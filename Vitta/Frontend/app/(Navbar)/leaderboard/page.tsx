'use client'

import { useState, useEffect } from 'react'

interface LeaderboardUser {
  id: number
  nome: string
  pontos: number
  streak: number
  contribuicoes: number
  posicao: number
}

export default function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      // Dados mockados para teste
      const mockData: LeaderboardUser[] = [
        { id: 1, nome: "Ana Silva", pontos: 2450, streak: 45, contribuicoes: 89, posicao: 1 },
        { id: 2, nome: "Carlos Santos", pontos: 2200, streak: 32, contribuicoes: 76, posicao: 2 },
        { id: 3, nome: "Maria Oliveira", pontos: 1980, streak: 28, contribuicoes: 64, posicao: 3 },
        { id: 4, nome: "João Costa", pontos: 1750, streak: 25, contribuicoes: 58, posicao: 4 },
        { id: 5, nome: "Paula Lima", pontos: 1600, streak: 22, contribuicoes: 52, posicao: 5 },
        { id: 6, nome: "Pedro Alves", pontos: 1450, streak: 18, contribuicoes: 45, posicao: 6 },
        { id: 7, nome: "Lucia Ferreira", pontos: 1300, streak: 15, contribuicoes: 38, posicao: 7 },
        { id: 8, nome: "Rafael Souza", pontos: 1150, streak: 12, contribuicoes: 32, posicao: 8 },
      ]
      
      setTimeout(() => {
        setUsers(mockData)
        setLoading(false)
      }, 500)
      
      // Quando tiver API pronta:
      // const response = await fetch('http://localhost:8000/leaderboard')
      // const data = await response.json()
      // setUsers(data)
    } catch (error) {
      console.error('Erro ao carregar leaderboard:', error)
      setLoading(false)
    }
  }

  const getRankIcon = (posicao: number) => {
    switch (posicao) {
      case 1: return "🥇"
      case 2: return "🥈"
      case 3: return "🥉"
      default: return `#${posicao}`
    }
  }

  const getRankColor = (posicao: number) => {
    switch (posicao) {
      case 1: return "bg-gradient-to-r from-yellow-400 to-yellow-600"
      case 2: return "bg-gradient-to-r from-gray-300 to-gray-500"
      case 3: return "bg-gradient-to-r from-orange-400 to-orange-600"
      default: return "bg-gradient-to-r from-blue-400 to-blue-600"
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black text-black dark:text-white">
        <div className="text-xl">Carregando leaderboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">🏆 Leaderboard</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Ranking dos usuários mais ativos da Vitta
        </p>
        
        <div className="space-y-4">
          {users.map((user) => (
            <div 
              key={user.id}
              className={`${getRankColor(user.posicao)} rounded-lg p-1`}
            >
              <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold min-w-[60px]">
                    {getRankIcon(user.posicao)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{user.nome}</h3>
                    <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <span>🔥 {user.streak} dias</span>
                      <span>📊 {user.contribuicoes} posts</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-500">
                    {user.pontos.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">pontos</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-gray-50 dark:bg-zinc-900 rounded-lg p-4">
          <h3 className="font-bold mb-2">📋 Como funciona a pontuação:</h3>
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
            <li>• Post no feed: +10 pontos</li>
            <li>• Manter streak diário: +5 pontos por dia</li>
            <li>• Completar objetivo: +50 pontos</li>
            <li>• Interagir com outros usuários: +2 pontos</li>
          </ul>
        </div>
      </div>
    </div>
  )
}