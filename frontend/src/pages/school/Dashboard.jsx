import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../services/supabase'

function SchoolDashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const nome = user?.user_metadata?.nome || 'Escola'
  const [residuos, setResiduos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchResiduos() {
      const { data, error } = await supabase
        .from('residuos')
        .select('*')
        .eq('escola_id', user.id)
        .order('criado_em', { ascending: false })

      if (!error) setResiduos(data)
      setLoading(false)
    }

    fetchResiduos()
  }, [user.id])

  const totalKg = residuos.reduce((acc, r) => acc + (r.unidade === 'kg' ? r.quantidade : 0), 0)
  const co2Evitado = (totalKg * 0.5).toFixed(1)

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
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">E</span>
          </div>
          <span className="font-bold text-green-800 text-lg">EcoFluxo</span>
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
          <p className="text-gray-500 mt-1">Acompanhe o impacto ambiental da sua instituição.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Resíduos cadastrados</p>
            <p className="text-3xl font-bold text-green-600">{totalKg}</p>
            <p className="text-xs text-gray-400 mt-1">kg no total</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Registros</p>
            <p className="text-3xl font-bold text-blue-500">{residuos.length}</p>
            <p className="text-xs text-gray-400 mt-1">entradas cadastradas</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">CO₂ evitado</p>
            <p className="text-3xl font-bold text-emerald-500">{co2Evitado}</p>
            <p className="text-xs text-gray-400 mt-1">kg de CO₂</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Coletas realizadas</p>
            <p className="text-3xl font-bold text-purple-500">0</p>
            <p className="text-xs text-gray-400 mt-1">no total</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-800 mb-1">Cadastrar resíduo</h2>
            <p className="text-sm text-gray-500 mb-4">Registre sobras de merenda, cascas e outros resíduos orgânicos.</p>
            <button
              onClick={() => navigate('/school/cadastrar-residuo')}
              className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Cadastrar agora
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-800 mb-1">Agendar coleta</h2>
            <p className="text-sm text-gray-500 mb-4">Solicite uma coleta e conecte sua escola a um reutilizador.</p>
           <button
            onClick={() => navigate('/school/agendar-coleta')}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
            Agendar coleta
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">Resíduos cadastrados</h2>

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
              <h3 className="font-bold text-gray-700 mb-1">Nenhum resíduo ainda</h3>
              <p className="text-sm text-gray-400">Cadastre seu primeiro resíduo e comece a fazer diferença!</p>
            </div>
          )}

          {!loading && residuos.length > 0 && (
            <div className="space-y-3">
              {residuos.map((residuo) => (
                <div key={residuo.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{tipoLabel[residuo.tipo] || residuo.tipo}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{residuo.descricao || 'Sem descrição'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 text-sm">{residuo.quantidade} {residuo.unidade}</p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {residuo.status}
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

export default SchoolDashboard