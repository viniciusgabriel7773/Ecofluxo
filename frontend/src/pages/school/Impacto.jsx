import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../services/supabase'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'

function Impacto() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [residuos, setResiduos] = useState([])
  const [coletas, setColetas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDados() {
      const { data: residuosData } = await supabase
        .from('residuos')
        .select('*')
        .eq('escola_id', user.id)

      const { data: coletasData } = await supabase
        .from('coletas')
        .select('*')
        .eq('escola_id', user.id)

      if (residuosData) setResiduos(residuosData)
      if (coletasData) setColetas(coletasData)
      setLoading(false)
    }
    fetchDados()
  }, [user.id])

  const totalKg = residuos.reduce((acc, r) => acc + (r.unidade === 'kg' ? r.quantidade : 0), 0)
  const co2Evitado = (totalKg * 0.5).toFixed(1)
  const aguaEconomizada = (totalKg * 2.5).toFixed(1)
  const energiaEconomizada = (totalKg * 0.8).toFixed(1)

  const tipoLabel = {
    sobra_merenda: 'Sobra merenda',
    casca_fruta: 'Casca fruta',
    vegetal: 'Vegetal',
    borra_cafe: 'Borra café',
    misto: 'Misto',
    outro: 'Outro',
  }

  const dadosPorTipo = Object.entries(
    residuos.reduce((acc, r) => {
      const tipo = tipoLabel[r.tipo] || r.tipo
      acc[tipo] = (acc[tipo] || 0) + r.quantidade
      return acc
    }, {})
  ).map(([name, value]) => ({ name, value }))

  const CORES = ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#14b8a6']

  const dadosColetas = [
    { name: 'Pendentes', value: coletas.filter(c => c.status === 'pendente').length },
    { name: 'Aceitas', value: coletas.filter(c => c.status === 'aceita').length },
    { name: 'Concluídas', value: coletas.filter(c => c.status === 'concluida').length },
  ].filter(d => d.value > 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/school/dashboard')}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          &larr;
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">E</span>
          </div>
          <span className="font-bold text-green-800 text-lg">EcoFluxo</span>
        </div>
        <span className="text-gray-500 text-sm ml-2">Impacto ambiental</span>
      </header>

      <main className="px-8 py-8 max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Impacto ambiental</h1>
          <p className="text-gray-500 mt-1">Veja a diferença que sua escola está fazendo no meio ambiente.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <p className="text-4xl font-bold text-green-600 mb-1">{totalKg}</p>
            <p className="text-sm font-medium text-gray-700">kg desviados</p>
            <p className="text-xs text-gray-400 mt-1">de aterros sanitários</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <p className="text-4xl font-bold text-emerald-500 mb-1">{co2Evitado}</p>
            <p className="text-sm font-medium text-gray-700">kg de CO₂</p>
            <p className="text-xs text-gray-400 mt-1">emissões evitadas</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <p className="text-4xl font-bold text-blue-500 mb-1">{aguaEconomizada}</p>
            <p className="text-sm font-medium text-gray-700">litros de água</p>
            <p className="text-xs text-gray-400 mt-1">economia estimada</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <p className="text-4xl font-bold text-purple-500 mb-1">{coletas.length}</p>
            <p className="text-sm font-medium text-gray-700">coletas</p>
            <p className="text-xs text-gray-400 mt-1">realizadas no total</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-800 mb-4">Resíduos por tipo (kg)</h2>
            {dadosPorTipo.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm">Nenhum dado ainda</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={dadosPorTipo}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} name="kg" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-gray-800 mb-4">Status das coletas</h2>
            {dadosColetas.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm">Nenhuma coleta ainda</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={dadosColetas}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {dadosColetas.map((entry, index) => (
                      <Cell key={index} fill={CORES[index % CORES.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-green-50 rounded-2xl border border-green-100 p-6">
          <h2 className="font-bold text-green-800 mb-2">Equivalências ambientais</h2>
          <p className="text-sm text-green-700 mb-4">O que os seus {totalKg} kg de resíduos desviados representam:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{(totalKg * 0.5).toFixed(0)}</p>
              <p className="text-xs text-gray-500 mt-1">árvores preservadas por 1 ano</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-500">{(totalKg * 1.2).toFixed(0)}</p>
              <p className="text-xs text-gray-500 mt-1">dias de água economizados</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-purple-500">{(totalKg * 0.3).toFixed(0)}</p>
              <p className="text-xs text-gray-500 mt-1">kg de adubo gerado</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

export default Impacto