import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function RotaProtegida({ children, tipo }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold">E</span>
          </div>
          <p className="text-gray-400 text-sm">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (tipo && user.user_metadata?.tipo !== tipo) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RotaProtegida