import { useState } from 'react'
import { supabase } from '../../services/supabase'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Email ou senha incorretos.')
      setLoading(false)
      return
    }

    console.log('Login ok:', data)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-green-100 p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl font-bold">E</span>
          </div>
          <h1 className="text-2xl font-bold text-green-800">EcoFluxo</h1>
          <p className="text-green-600 text-sm mt-1">Entre na sua conta</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Não tem conta?{' '}
          <a href="/register" className="text-green-600 font-medium hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login