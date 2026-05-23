import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../services/supabase'

function ReuserDashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const nome = user?.user_metadata?.nome || 'Reutilizador'
  const [residuos, setResiduos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchResiduos() {
      const { data, error } = await supabase
        .from('residuos')
        .select('*, profiles(nome, cidade, estado)')
        .eq('status', 'disponivel')
        .order('criado_em', { ascending: false })

      if (!error) setResiduos(data)
      setLoading(false)
    }
    fetchResiduos()
  }, [])

  const tipoLabel = {
    sobra_merenda: 'Sobra de merenda',
    casca_fruta: 'Casca de fruta',
    vegetal: 'Resíduo vegetal',
    borra_cafe: 'Borra de café',
    misto: 'Resíduo misto',
    outro: 'Outro',
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">E</span>
          </div>
          <span className="font-bold text-blue-800 text-lg">EcoFluxo</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{nome}</span>
          <button
            onClick={signOut}
            className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="px-8 py-8 max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Bem-vindo, {nome}!</h1>
          <p className="text-gray-500 mt-1">Veja os resíduos orgânicos disponíveis para coleta.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Disponíveis agora</p>
            <p className="text-3xl font-bold text-blue-500">{residuos.length}</p>
            <p className="text-xs text-gray-400 mt-1">resíduos para coletar</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Total disponível</p>
            <p className="text-3xl font-bold text-green-600">
              {residuos.reduce((acc, r) => acc + (r.unidade === 'kg' ? r.quantidade : 0), 0)}
            </p>
            <p className="text-xs text-gray-400 mt-1">kg disponíveis</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Coletas aceitas</p>
            <p className="text-3xl font-bold text-purple-500">0</p>
            <p className="text-xs text-gray-400 mt-1">no total</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">Resíduos disponíveis</h2>

          {loading && (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">Carregando...</p>
            </div>
          )}

          {!loading && residuos.length === 0 && (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">♻️</span>
              </div>
              <h3 className="font-bold text-gray-700 mb-1">Nenhum resíduo disponível</h3>
              <p className="text-sm text-gray-400">Aguarde escolas cadastrarem resíduos para coleta.</p>
            </div>
          )}

          {!loading && residuos.length > 0 && (
            <div className="space-y-3">
              {residuos.map((residuo) => (
                <div key={residuo.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{tipoLabel[residuo.tipo] || residuo.tipo}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {residuo.profiles?.nome || 'Escola'} — {residuo.profiles?.cidade || ''} {residuo.profiles?.estado || ''}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{residuo.descricao || 'Sem descrição'}</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="font-bold text-green-600 text-sm">{residuo.quantidade} {residuo.unidade}</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      disponível
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  )
}

export default ReuserDashboard