import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { supabase } from '../../services/supabase'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function Mapa() {
  const navigate = useNavigate()
  const [escolas, setEscolas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEscolas() {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('tipo', 'escola')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)

      if (data) setEscolas(data)
      setLoading(false)
    }
    fetchEscolas()
  }, [])

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
        <span className="text-gray-500 text-sm ml-2">Mapa de coletas</span>
      </header>

      <main className="px-8 py-8 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Mapa interativo</h1>
          <p className="text-gray-500 mt-1">Visualize escolas e pontos de coleta na sua região.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <p className="text-gray-400 text-sm">Carregando mapa...</p>
            </div>
          ) : (
            <MapContainer
              center={[-8.0476, -34.877]}
              zoom={12}
              style={{ height: '500px', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {escolas.map((escola) => (
                <Marker
                  key={escola.id}
                  position={[escola.latitude, escola.longitude]}
                >
                  <Popup>
                    <div>
                      <p className="font-bold">{escola.nome}</p>
                      <p className="text-sm text-gray-500">{escola.cidade}</p>
                      <p className="text-xs text-green-600 mt-1">Escola participante</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {escolas.length === 0 && (
                <Marker position={[-8.0476, -34.877]}>
                  <Popup>
                    <p className="font-bold">Recife, PE</p>
                    <p className="text-sm text-gray-500">Adicione escolas com localização para ver no mapa</p>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Escolas cadastradas</span>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600">Reutilizadores</span>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-sm text-gray-600">Coletas em andamento</span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Mapa