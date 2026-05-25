import toast from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../contexts/AuthContext'

function AgendarColeta() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [residuos, setResiduos] = useState([])
  const [form, setForm] = useState({
    residuo_id: '',
    data_agendada: '',
    observacoes: '',
  })

  useEffect(() => {
    async function fetchResiduos() {
      const { data } = await supabase
        .from('residuos')
        .select('*')
        .eq('escola_id', user.id)
        .eq('status', 'disponivel')

      if (data) setResiduos(data)
    }
    fetchResiduos()
  }, [user.id])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.from('coletas').insert({
      residuo_id: form.residuo_id,
      escola_id: user.id,
      data_agendada: form.data_agendada,
      observacoes: form.observacoes,
      status: 'pendente',
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

   toast.success('Coleta agendada com sucesso!')
navigate('/school/dashboard')
  }

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
      </header>

      <main className="px-8 py-8 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Agendar coleta</h1>
          <p className="text-gray-500 mt-1">Solicite uma coleta para seus resíduos orgânicos.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 p-8">

          {residuos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm mb-4">Nenhum resíduo disponível para coleta.</p>
              <button
                onClick={() => navigate('/school/cadastrar-residuo')}
                className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Cadastrar resíduo primeiro
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resíduo para coleta</label>
                <select
                  name="residuo_id"
                  value={form.residuo_id}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Selecione o resíduo</option>
                  {residuos.map((r) => (
                    <option key={r.id} value={r.id}>
                      {tipoLabel[r.tipo] || r.tipo} — {r.quantidade} {r.unidade}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data e hora da coleta</label>
                <input
                  type="datetime-local"
                  name="data_agendada"
                  value={form.data_agendada}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                <textarea
                  name="observacoes"
                  value={form.observacoes}
                  onChange={handleChange}
                  placeholder="Instruções para o coletor, localização específica..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/school/dashboard')}
                  className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-2.5 rounded-lg text-sm transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
                >
                  {loading ? 'Agendando...' : 'Agendar coleta'}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}

export default AgendarColeta