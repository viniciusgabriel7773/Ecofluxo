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
          <span>5 lugar na 31 Ciencia Jovem</span>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Conectando escolas a um<br />
          <span className="text-green-500">futuro mais sustentavel</span>
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
          O EcoFluxo conecta escolas, creches e cantinas a hortas urbanas, composteiras e iniciativas ecologicas, reduzindo o desperdicio de residuos organicos e promovendo a economia circular.
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
            Ja tenho conta
          </button>
        </div>
      </section>

      {/* Metricas */}
      <section className="px-8 py-12 bg-green-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-2xl p-6 border border-green-100">
            <p className="text-4xl font-bold text-green-600 mb-1">+500kg</p>
            <p className="text-sm font-medium text-gray-700 mb-1">Residuos desviados</p>
            <p className="text-xs text-gray-400">de aterros sanitarios</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-green-100">
            <p className="text-4xl font-bold text-green-600 mb-1">+30</p>
            <p className="text-sm font-medium text-gray-700 mb-1">Instituicoes</p>
            <p className="text-xs text-gray-400">escolas e reutilizadores</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-green-100">
            <p className="text-4xl font-bold text-green-600 mb-1">250kg</p>
            <p className="text-sm font-medium text-gray-700 mb-1">CO2 evitado</p>
            <p className="text-xs text-gray-400">emissoes nao geradas</p>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="px-8 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Como funciona</h2>
        <p className="text-gray-500 text-center mb-12">Tres passos simples para transformar residuos em recursos</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏫</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">1. Escola cadastra</h3>
            <p className="text-sm text-gray-500">A escola registra seus residuos organicos disponiveis — sobras de merenda, cascas de frutas e mais.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🗺️</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">2. Plataforma conecta</h3>
            <p className="text-sm text-gray-500">O EcoFluxo conecta automaticamente a escola ao reutilizador mais proximo via mapa interativo.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">♻️</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">3. Residuo vira recurso</h3>
            <p className="text-sm text-gray-500">O residuo e coletado e vai para hortas urbanas, composteiras e fazendas, gerando impacto real.</p>
          </div>
        </div>
      </section>

      {/* Quem usa */}
      <section className="px-8 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Para quem e o EcoFluxo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-xl">🏫</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Escolas e creches</h3>
              <p className="text-sm text-gray-500">Cadastre residuos organicos, agende coletas e acompanhe o impacto ambiental da sua instituicao em tempo real.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-xl">🌱</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Hortas e composteiras</h3>
              <p className="text-sm text-gray-500">Acesse residuos organicos de qualidade, visualize no mapa e aceite coletas com poucos cliques.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-xl">🚚</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Coletores e parceiros</h3>
              <p className="text-sm text-gray-500">Gerencie rotas de coleta, acompanhe agendamentos e otimize a logistica de transporte.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-xl">🏛️</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Prefeituras e gestores</h3>
              <p className="text-sm text-gray-500">Monitore metricas globais, gere relatorios e comprove conformidade com a Politica Nacional de Residuos Solidos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="px-8 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">O que dizem sobre o EcoFluxo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-1 mb-3">
              <span className="text-amber-400 text-sm">★★★★★</span>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              "O EcoFluxo transformou a forma como nossa escola lida com as sobras da merenda. Agora tudo vai para a horta comunitaria do bairro."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 font-bold text-sm">MS</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Maria Silva</p>
                <p className="text-xs text-gray-400">Diretora escolar</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-1 mb-3">
              <span className="text-amber-400 text-sm">★★★★★</span>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              "Nossa horta urbana cresceu muito depois que comecamos a receber residuos das escolas pelo EcoFluxo. E uma parceria que beneficia todos."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-700 font-bold text-sm">JO</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Joao Oliveira</p>
                <p className="text-xs text-gray-400">Agricultor urbano</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-1 mb-3">
              <span className="text-amber-400 text-sm">★★★★★</span>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              "Como gestora municipal, o EcoFluxo nos ajuda a acompanhar o desvio de residuos e comprovar metas ambientais de forma simples e transparente."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-700 font-bold text-sm">AC</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Ana Costa</p>
                <p className="text-xs text-gray-400">Gestora municipal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-8 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Pronto para fazer diferenca?</h2>
        <p className="text-gray-500 mb-8">Junte-se ao EcoFluxo e transforme residuos organicos em impacto ambiental real.</p>
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
        <p className="text-xs text-gray-400">Tecnologia sustentavel para um futuro melhor</p>
      </footer>

    </div>
  )
}

export default Landing