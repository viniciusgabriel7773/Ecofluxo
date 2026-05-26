import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../services/supabase'
import toast from 'react-hot-toast'

function CollectorDashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const nome = user?.user_metadata?.nome || 'Coletor'
  const [coletas, setColetas] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('todas')

  useEffect(() => {
    async function fetchColetas() {
      const { data, error } = await supabase
        .from('coletas')
        .select('*, residuos(tipo, quantidade, unidade, descricao), profiles!coletas_escola_id_fkey(nome, endereco, cidade, estado)')
        .order('criado_em', { ascending: false })

      if (!error && data) setColetas(data)
      setLoading(false)
    }
    fetchColetas()
  }, [])

  async function atualizarStatus(id, novoStatus) {
    const { error } = await supabase
      .from('coletas')
      .update({ status: novoStatus })
      .eq('id', id)

    if (error) {
      toast.error('Erro ao atualizar status.')
      return
    }

    setColetas(coletas.map(c => c.id === id ? { ...c, status: novoStatus } : c))
    toast.success(`Coleta marcada como ${novoStatus}!`)
  }

  const tipoLabel = {
    sobra_merenda: 'Sobra de merenda',
    casca_fruta: 'Casca de fruta',
    vegetal: 'Residuo vegetal',
    borra_cafe: 'Borra de cafe',
    misto: 'Residuo misto',
    outro: 'Outro',
  }

  const statusColor = {
    pendente: 'bg-yellow-100 text-yellow-700',
    aceita: 'bg-blue-100 text-blue-700',
    em_coleta: 'bg-orange-100 text-orange-700',
    concluida: 'bg-green-100 text-green-700',
  }

  const coletasFiltradas = filtro === 'todas'
    ? coletas
    : coletas.filter(c => c.status === filtro)

  const pendentes = coletas.filter(c => c.status === 'pendente').length
  const aceitas = coletas.filter(c => c.status === 'aceita').length
  const concluidas = coletas.filter(c => c.status === 'concluida').length

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">E</span>
          </div>
          <span className="font-bold text-orange-800 text-lg">EcoFluxo</span>
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
          <h1 className="text-2xl font-bold text-gray-800">Painel do coletor</h1>
          <p className="text-gray-500 mt-1">Gerencie suas rotas e coletas de residuos organicos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Pendentes</p>
            <p className="text-3xl font-bold text-yellow-500">{pendentes}</p>
            <p className="text-xs text-gray-400 mt-1">aguardando coleta</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Em andamento</p>
            <p className="text-3xl font-bold text-orange-500">{aceitas}</p>
            <p className="text-xs text-gray-400 mt-1">coletas aceitas</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-sm text-gray-500 mb-1">Concluidas</p>
            <p className="text-3xl font-bold text-green-500">{concluidas}</p>
            <p className="text-xs text-gray-400 mt-1">no total</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-800">Coletas</h2>
            <div className="flex gap-2">
              {['todas', 'pendente', 'aceita', 'concluida'].map(f => (
                <button
                  key={f}
                  onClick={() => setFiltro(f)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors capitalize ${
                    filtro === f
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">Carregando...</p>
            </div>
          )}

          {!loading && coletasFiltradas.length === 0 && (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-bold text-gray-700 mb-1">Nenhuma coleta encontrada</h3>
              <p className="text-sm text-gray-400">Aguarde novas solicitacoes de coleta.</p>
            </div>
          )}

          {!loading && coletasFiltradas.length > 0 && (
            <div className="space-y-4">
              {coletasFiltradas.map((coleta) => (
                <div key={coleta.id} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        {coleta.residuos ? tipoLabel[coleta.residuos.tipo] || coleta.residuos.tipo : 'Residuo'}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {coleta.profiles?.nome || 'Escola'} — {coleta.profiles?.cidade || ''}
                      </p>
                      {coleta.profiles?.endereco && (
                        <p className="text-xs text-gray-400 mt-0.5">{coleta.profiles.endereco}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[coleta.status] || 'bg-gray-100 text-gray-700'}`}>
                        {coleta.status}
                      </span>
                      {coleta.residuos && (
                        <p className="text-xs text-green-600 font-medium mt-1">
                          {coleta.residuos.quantidade} {coleta.residuos.unidade}
                        </p>
                      )}
                    </div>
                  </div>

                  {coleta.data_agendada && (
                    <p className="text-xs text-gray-400 mb-3">
                      Agendado para: {new Date(coleta.data_agendada).toLocaleDateString('pt-BR')}
                    </p>
                  )}

                  <div className="flex gap-2">
                    {coleta.status === 'pendente' && (
                      <button
                        onClick={() => atualizarStatus(coleta.id, 'aceita')}
                        className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Aceitar coleta
                      </button>
                    )}
                    {coleta.status === 'aceita' && (
                      <button
                        onClick={() => atualizarStatus(coleta.id, 'em_coleta')}
                        className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Iniciar coleta
                      </button>
                    )}
                    {coleta.status === 'em_coleta' && (
                      <button
                        onClick={() => atualizarStatus(coleta.id, 'concluida')}
                        className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Concluir coleta
                      </button>
                    )}
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

export default CollectorDashboard