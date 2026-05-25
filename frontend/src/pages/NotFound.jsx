import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="text-center max-w-md px-8">
        <div className="w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-4xl font-bold">E</span>
        </div>
        <h1 className="text-6xl font-bold text-green-600 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-800 mb-3">Página não encontrada</h2>
        <p className="text-gray-500 text-sm mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Ir para o início
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound