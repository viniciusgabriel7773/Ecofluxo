import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <header className="px-8 py-5 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="font-bold text-green-800 text-xl">EcoFluxo</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-gray-600 hover:text-green-600 font-medium transition-colors"
          >
            Entrar
          </button>
          <button
            onClick={() => navigate('/register')}
            className="text-sm bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Cadastrar
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="px-8 py-20 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-medium px-4 py-2 rounded-full mb-6">
          <span>5º lugar na 31ª Ciência Jovem</span>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Conectando escolas a um<br />
          <span className="text-green-500">futuro mais sustentável</span>
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
          O EcoFluxo conecta escolas, creches e cantinas a hortas urbanas, composteiras e iniciativas ecológicas — reduzindo o desperdício de resíduos orgânicos e promovendo a economia circular.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => navigate('/register')}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-8 py-3 rounded-xl text-sm transition-colors"
          >
            Comece gratuitamente
          </button>
          <button
            onClick={() => navigate('/login')}
            className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium px-8 py-3 rounded-xl text-sm transition-colors"
          >
            Já tenho conta
          </button>
        </div>
      </section>

      {/* Métricas */}
      <section className="px-8 py-12 bg-green-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-green-600 mb-1">+500kg</p>
            <p className="text-sm text-gray-500">de resíduos desviados de aterros</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-600 mb-1">+30</p>
            <p className="text-sm text-gray-500">instituições participantes</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-600 mb-1">250kg</p>
            <p className="text-sm text-gray-500">de CO₂ evitados</p>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="px-8 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Como funciona</h2>
        <p className="text-gray-500 text-center mb-12">Três passos simples para transformar resíduos em recursos</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏫</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">1. Escola cadastra</h3>
            <p className="text-sm text-gray-500">A escola registra seus resíduos orgânicos disponíveis — sobras de merenda, cascas de frutas e mais.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🗺️</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">2. Plataforma conecta</h3>
            <p className="text-sm text-gray-500">O EcoFluxo conecta automaticamente a escola ao reutilizador mais próximo via mapa interativo.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">♻️</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">3. Resíduo vira recurso</h3>
            <p className="text-sm text-gray-500">O resíduo é coletado e vai para hortas urbanas, composteiras e fazendas — gerando impacto real.</p>
          </div>
        </div>
      </section>

      {/* Quem usa */}
      <section className="px-8 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Para quem é o EcoFluxo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-xl">🏫</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Escolas e creches</h3>
              <p className="text-sm text-gray-500">Cadastre resíduos orgânicos, agende coletas e acompanhe o impacto ambiental da sua instituição em tempo real.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-xl">🌱</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Hortas e composteiras</h3>
              <p className="text-sm text-gray-500">Acesse resíduos orgânicos de qualidade, visualize no mapa e aceite coletas com poucos cliques.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-xl">🚚</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Coletores e parceiros</h3>
              <p className="text-sm text-gray-500">Gerencie rotas de coleta, acompanhe agendamentos e otimize a logística de transporte.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-xl">🏛️</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Prefeituras e gestores</h3>
              <p className="text-sm text-gray-500">Monitore métricas globais, gere relatórios e comprove conformidade com a Política Nacional de Resíduos Sólidos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-8 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Pronto para fazer diferença?</h2>
        <p className="text-gray-500 mb-8">Junte-se ao EcoFluxo e transforme resíduos orgânicos em impacto ambiental real.</p>
        <button
          onClick={() => navigate('/register')}
          className="bg-green-500 hover:bg-green-600 text-white font-medium px-10 py-3 rounded-xl text-sm transition-colors"
        >
          Criar conta gratuitamente
        </button>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-gray-100 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">E</span>
          </div>
          <span className="font-bold text-green-800">EcoFluxo</span>
        </div>
        <p className="text-xs text-gray-400">Tecnologia sustentável para um futuro melhor</p>
      </footer>

    </div>
  )
}

export default Landing