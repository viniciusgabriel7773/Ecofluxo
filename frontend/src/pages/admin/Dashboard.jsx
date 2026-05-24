import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../services/supabase'

function AdminDashboard() {
  const { signOut } = useAuth()
  const [stats, setStats] = useState({
    escolas: 0,
    reutilizadores: 0,
    residuos: 0,
    coletas: 0,
    totalKg: 0,
    co2Evitado: 0,
  })
  const [residuos, setResiduos] = useState([])
  const [coletas, setColetas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')

      const { data: residuosData } = await supabase
        .from('residuos')
        .select('*')
        .order('criado_em', { ascending: false })

      const { data: coletasData } = await supabase
        .from('coletas')
        .select('*')
        .order('criado_em', { ascending: false })

      const escolas = profiles?.filter(p => p.tipo === 'escola').length || 0
      const reutilizadores = profiles?.filter(p => p.tipo === 'reutilizador').length || 0
      const totalKg = residuosData?.reduce((acc, r) => acc + (r.unidade === 'kg' ? r.quantidade : 0), 0) || 0

      setStats({
        escolas,
        reutilizadores,
        residuos: residuosData?.length || 0,
        coletas: coletasData?.length || 0,
        totalKg,
        co2Evitado: (totalKg * 0.5).toFixed(1),
      })

      setResiduos(residuosData || [])
      setColetas(coletasData || [])
      setLoading(false)
    }

    fetchStats()
  }, [])

  const tipoLabel = {
    sobra_merenda: 'Sobra de merenda',
    casca_fruta: 'Casca de fruta',
    vegetal: 'Resíduo vegetal',
    borra_cafe: 'Borra de café',
    misto: 'Resíduo misto',
    outro: 'Outro',
  }

  const statusColor = {
    disponivel: 'bg-green-100 text-green-700',
    coletado: 'bg-blue-100 text-blue-700',
    pendente: 'bg-yellow-100 text-yellow-700',
    aceita: 'bg-purple-100 text-purple-700',
    concluida: 'bg-gray-100 text-gray-700',
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">E</span>
          </div>
          <span className="font-bold text-purple-800 text-lg">EcoFluxo</span>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">Admin</span>
        </div>
        <button
          onClick={signOut}
          className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          Sair
        </button>
      </header>

      <main className="px-8 py-8 max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Painel administrativo</h1>
          <p className="text-gray-500 mt-1">Visão geral de todo o sistema EcoFluxo.</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">Carregando dados...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{stats.escolas}</p>
                <p className="text-xs text-gray-500 mt-1">Escolas</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                <p className="text-2xl font-bold text-blue-500">{stats.reutilizadores}</p>
                <p className="text-xs text-gray-500 mt-1">Reutilizadores</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                <p className="text-2xl font-bold text-amber-500">{stats.residuos}</p>
                <p className="text-xs text-gray-500 mt-1">Resíduos</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                <p className="text-2xl font-bold text-purple-500">{stats.coletas}</p>
                <p className="text-xs text-gray-500 mt-1">Coletas</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                <p className="text-2xl font-bold text-emerald-500">{stats.totalKg}</p>
                <p className="text-xs text-gray-500 mt-1">kg desviados</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                <p className="text-2xl font-bold text-teal-500">{stats.co2Evitado}</p>
                <p className="text-xs text-gray-500 mt-1">kg CO₂ evitado</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-gray-800 mb-4">Resíduos recentes</h2>
                {residuos.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4">Nenhum resíduo cadastrado</p>
                ) : (
                  <div className="space-y-3">
                    {residuos.slice(0, 8).map((r) => (
                      <div key={r.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{tipoLabel[r.tipo] || r.tipo}</p>
                          <p className="text-xs text-gray-400">{r.quantidade} {r.unidade}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[r.status] || 'bg-gray-100 text-gray-700'}`}>
                          {r.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-gray-800 mb-4">Coletas recentes</h2>
                {coletas.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4">Nenhuma coleta registrada</p>
                ) : (
                  <div className="space-y-3">
                    {coletas.slice(0, 8).map((c) => (
                      <div key={c.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-gray-800">Coleta #{c.id.slice(0, 8)}</p>
                          <p className="text-xs text-gray-400">
                            {c.data_agendada ? new Date(c.data_agendada).toLocaleDateString('pt-BR') : 'Sem data'}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[c.status] || 'bg-gray-100 text-gray-700'}`}>
                          {c.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard