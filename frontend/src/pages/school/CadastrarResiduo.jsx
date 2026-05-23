import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../contexts/AuthContext'

function CadastrarResiduo() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    tipo: '',
    quantidade: '',
    unidade: 'kg',
    descricao: '',
    disponivel_ate: '',
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.from('residuos').insert({
      escola_id: user.id,
      tipo: form.tipo,
      quantidade: parseFloat(form.quantidade),
      unidade: form.unidade,
      descricao: form.descricao,
      disponivel_ate: form.disponivel_ate || null,
      status: 'disponivel',
    })

        if (error) {
    setError(error.message)
    setLoading(false)
    return
        }

    navigate('/school/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
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
          <h1 className="text-2xl font-bold text-gray-800">Cadastrar resíduo</h1>
          <p className="text-gray-500 mt-1">Registre os resíduos orgânicos disponíveis para coleta.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de resíduo</label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="">Selecione o tipo</option>
                <option value="sobra_merenda">Sobra de merenda</option>
                <option value="casca_fruta">Casca de fruta</option>
                <option value="vegetal">Resíduo vegetal</option>
                <option value="borra_cafe">Borra de café</option>
                <option value="misto">Resíduo misto</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
                <input
                  type="number"
                  name="quantidade"
                  value={form.quantidade}
                  onChange={handleChange}
                  placeholder="Ex: 5"
                  min="0"
                  step="0.1"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unidade</label>
                <select
                  name="unidade"
                  value={form.unidade}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="kg">Quilogramas (kg)</option>
                  <option value="litros">Litros (L)</option>
                  <option value="sacos">Sacos</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                placeholder="Descreva o resíduo, como foi gerado, condições..."
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Disponível até</label>
              <input
                type="date"
                name="disponivel_ate"
                value={form.disponivel_ate}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
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
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
              >
                {loading ? 'Salvando...' : 'Cadastrar resíduo'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default CadastrarResiduo