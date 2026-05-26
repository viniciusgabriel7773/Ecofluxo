import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../contexts/AuthContext'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

function criarIcone(cor) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 28px;
      height: 28px;
      background: ${cor};
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
  })
}

const iconeEscola = criarIcone('#22c55e')
const iconeReutilizador = criarIcone('#3b82f6')

function Mapa() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [escolas, setEscolas] = useState([])
  const [reutilizadores, setReutilizadores] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('todos')

 useEffect(() => {
  async function fetchPontos() {
    console.log('buscando pontos...')
    const { data, error } = await supabase
      .from('profiles')
      .select('*')

    console.log('data:', data)
    console.log('error:', error)

    if (data) {
      const comCoordenadas = data.filter(p => p.latitude !== null && p.longitude !== null)
      console.log('com coordenadas:', comCoordenadas)
      setEscolas(comCoordenadas.filter(p => p.tipo === 'escola'))
      setReutilizadores(comCoordenadas.filter(p => p.tipo === 'reutilizador'))
    }
    setLoading(false)
  }
  fetchPontos()
}, [])

  const mostrarEscolas = filtro === 'todos' || filtro === 'escolas'
  const mostrarReutilizadores = filtro === 'todos' || filtro === 'reutilizadores'

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
        <span className="text-gray-500 text-sm ml-2">Mapa interativo</span>
      </header>

      <main className="px-8 py-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Mapa interativo</h1>
            <p className="text-gray-500 mt-1">Visualize escolas e reutilizadores na sua regiao.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFiltro('todos')}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${filtro === 'todos' ? 'bg-gray-800 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setFiltro('escolas')}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${filtro === 'escolas' ? 'bg-green-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              Escolas
            </button>
            <button
              onClick={() => setFiltro('reutilizadores')}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${filtro === 'reutilizadores' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              Reutilizadores
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div>
              <p className="text-sm font-medium text-gray-800">{escolas.length} Escolas</p>
              <p className="text-xs text-gray-400">cadastradas no sistema</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <div>
              <p className="text-sm font-medium text-gray-800">{reutilizadores.length} Reutilizadores</p>
              <p className="text-xs text-gray-400">prontos para receber</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <div>
              <p className="text-sm font-medium text-gray-800">{escolas.length + reutilizadores.length} Pontos</p>
              <p className="text-xs text-gray-400">no total no mapa</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <p className="text-gray-400 text-sm">Carregando mapa...</p>
            </div>
          ) : (
            <MapContainer
              center={[-8.0476, -34.877]}
              zoom={11}
              style={{ height: '520px', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {mostrarEscolas && escolas.map((escola) => (
                <Marker
                  key={escola.id}
                  position={[escola.latitude, escola.longitude]}
                  icon={iconeEscola}
                >
                  <Popup>
                    <div className="p-1">
                      <p className="font-bold text-sm">{escola.nome}</p>
                      <p className="text-xs text-gray-500 mt-1">{escola.endereco}</p>
                      <p className="text-xs text-gray-500">{escola.cidade} — {escola.estado}</p>
                      {escola.telefone && <p className="text-xs text-gray-500 mt-1">{escola.telefone}</p>}
                      <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Escola</span>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {mostrarReutilizadores && reutilizadores.map((r) => (
                <Marker
                  key={r.id}
                  position={[r.latitude, r.longitude]}
                  icon={iconeReutilizador}
                >
                  <Popup>
                    <div className="p-1">
                      <p className="font-bold text-sm">{r.nome}</p>
                      <p className="text-xs text-gray-500 mt-1">{r.endereco}</p>
                      <p className="text-xs text-gray-500">{r.cidade} — {r.estado}</p>
                      {r.telefone && <p className="text-xs text-gray-500 mt-1">{r.telefone}</p>}
                      <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Reutilizador</span>
                    </div>
                  </Popup>
                </Marker>
              ))}

            </MapContainer>
          )}
        </div>
      </main>
    </div>
  )
}

export default Mapa