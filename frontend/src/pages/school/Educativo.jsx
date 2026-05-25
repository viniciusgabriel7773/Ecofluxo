import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Educativo() {
  const navigate = useNavigate()

  const artigos = [
    {
      id: 1,
      titulo: 'O que é compostagem e como funciona?',
      categoria: 'Compostagem',
      cor: 'bg-green-100 text-green-700',
      tempo: '5 min',
      resumo: 'A compostagem é um processo natural de decomposição de resíduos orgânicos que transforma sobras de alimentos e materiais vegetais em adubo rico em nutrientes.',
      conteudo: [
        'A compostagem é um dos processos mais importantes para a sustentabilidade urbana. Ela transforma resíduos orgânicos — como cascas de frutas, sobras de alimentos e restos vegetais — em composto, um adubo natural rico em nutrientes.',
        'O processo funciona através de microrganismos (bactérias e fungos) que decompõem a matéria orgânica em condições controladas de umidade, temperatura e aeração.',
        'Para compostar corretamente, misture materiais "verdes" (ricos em nitrogênio, como restos de frutas) com materiais "marrons" (ricos em carbono, como folhas secas) na proporção de 1:3.',
        'Em escolas, a compostagem pode ser feita em composteiras simples no pátio, transformando sobras da merenda em adubo para a horta escolar.',
      ]
    },
    {
      id: 2,
      titulo: 'Economia circular nas escolas',
      categoria: 'Sustentabilidade',
      cor: 'bg-blue-100 text-blue-700',
      tempo: '4 min',
      resumo: 'A economia circular propõe um modelo onde os resíduos de um processo se tornam insumos de outro, eliminando o desperdício e regenerando sistemas naturais.',
      conteudo: [
        'A economia circular é um modelo econômico que elimina o conceito de "lixo". Em vez de descartar, os materiais são mantidos em uso pelo maior tempo possível.',
        'Nas escolas, isso significa transformar sobras da merenda em composto para a horta, usar a horta para enriquecer as aulas de ciências e alimentar os próprios alunos.',
        'O EcoFluxo é um exemplo prático de economia circular — conectando quem gera resíduos a quem pode reutilizá-los, fechando o ciclo de forma inteligente.',
        'Implementar a economia circular na escola ensina aos alunos valores de responsabilidade ambiental que vão além da sala de aula.',
      ]
    },
    {
      id: 3,
      titulo: 'Impacto do desperdício alimentar no Brasil',
      categoria: 'Meio ambiente',
      cor: 'bg-orange-100 text-orange-700',
      tempo: '6 min',
      resumo: 'O Brasil desperdiça cerca de 46 milhões de toneladas de alimentos por ano. Grande parte desse desperdício acontece nas escolas e pode ser evitado com ações simples.',
      conteudo: [
        'O Brasil é um dos maiores desperdiçadores de alimentos do mundo. Segundo a EMBRAPA, desperdiçamos cerca de 46 milhões de toneladas por ano — o suficiente para alimentar toda a população por meses.',
        'Nas escolas públicas brasileiras, estima-se que até 30% da merenda escolar seja desperdiçada diariamente. Isso representa não apenas um problema ambiental, mas também econômico.',
        'Quando resíduos orgânicos vão para aterros sanitários, eles liberam metano — um gás 25 vezes mais potente que o CO₂ no aquecimento global.',
        'Com o EcoFluxo, esses resíduos são desviados dos aterros e transformados em recursos úteis, reduzindo emissões e gerando valor para a comunidade.',
      ]
    },
    {
      id: 4,
      titulo: 'Como montar uma horta escolar',
      categoria: 'Prática',
      cor: 'bg-emerald-100 text-emerald-700',
      tempo: '7 min',
      resumo: 'Uma horta escolar é uma ferramenta poderosa de educação ambiental. Aprenda como montar uma do zero com poucos recursos.',
      conteudo: [
        'Uma horta escolar pode ser montada em qualquer espaço — de um pequeno canteiro a vasos reciclados. O importante é começar simples e envolver os alunos no processo.',
        'Passo 1: Escolha um local com pelo menos 4 horas de sol por dia. Passo 2: Prepare o solo com composto orgânico. Passo 3: Escolha plantas fáceis como alface, cenoura e temperos.',
        'O composto gerado pela compostagem das sobras da merenda é o adubo ideal para a horta — fechando o ciclo de forma natural e educativa.',
        'Envolva os alunos em todas as etapas: plantio, cuidado, colheita e consumo. Isso cria uma conexão real com a alimentação e o meio ambiente.',
      ]
    },
    {
      id: 5,
      titulo: 'Resíduos orgânicos e gases de efeito estufa',
      categoria: 'Clima',
      cor: 'bg-purple-100 text-purple-700',
      tempo: '5 min',
      resumo: 'Entenda como o descarte inadequado de resíduos orgânicos contribui para as mudanças climáticas e o que podemos fazer para reduzir esse impacto.',
      conteudo: [
        'Quando jogamos resíduos orgânicos no lixo comum, eles vão para aterros sanitários onde se decompõem sem oxigênio — um processo chamado decomposição anaeróbica.',
        'Esse processo libera metano (CH₄), um gás de efeito estufa 25 vezes mais potente que o dióxido de carbono (CO₂) no período de 100 anos.',
        'No Brasil, os aterros sanitários são responsáveis por cerca de 2% das emissões totais de gases de efeito estufa — e os resíduos orgânicos são grande parte disso.',
        'Quando compostamos ou reutilizamos resíduos orgânicos, impedimos a geração de metano e ainda criamos um produto útil — o composto. É uma solução duplamente positiva para o clima.',
      ]
    },
    {
      id: 6,
      titulo: 'A Política Nacional de Resíduos Sólidos',
      categoria: 'Legislação',
      cor: 'bg-gray-100 text-gray-700',
      tempo: '4 min',
      resumo: 'A Lei 12.305/2010 estabelece diretrizes para a gestão de resíduos no Brasil. Entenda o que ela significa para as escolas e municípios.',
      conteudo: [
        'A Política Nacional de Resíduos Sólidos (PNRS), Lei 12.305/2010, é um marco legal que estabelece princípios, objetivos e instrumentos para a gestão sustentável de resíduos no Brasil.',
        'A lei prioriza a seguinte hierarquia: não geração, redução, reutilização, reciclagem, tratamento e disposição final ambientalmente adequada.',
        'Para as escolas, a PNRS representa uma oportunidade de educação ambiental prática — ensinando alunos sobre responsabilidade com os resíduos que geram.',
        'O EcoFluxo ajuda municípios e escolas a cumprirem as diretrizes da PNRS de forma simples e tecnológica, contribuindo para metas de desvio de resíduos dos aterros.',
      ]
    },
  ]

  const [artigoAberto, setArtigoAberto] = useState(null)

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
        <span className="text-gray-500 text-sm ml-2">Conteúdo educativo</span>
      </header>

      <main className="px-8 py-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Conteúdo educativo</h1>
          <p className="text-gray-500 mt-1">Aprenda sobre sustentabilidade, compostagem e economia circular.</p>
        </div>

        {artigoAberto ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-3xl mx-auto">
            <button
              onClick={() => setArtigoAberto(null)}
              className="text-gray-400 hover:text-gray-600 text-sm mb-6 flex items-center gap-2 transition-colors"
            >
              &larr; Voltar aos artigos
            </button>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${artigoAberto.cor}`}>
              {artigoAberto.categoria}
            </span>
            <h2 className="text-2xl font-bold text-gray-800 mt-3 mb-2">{artigoAberto.titulo}</h2>
            <p className="text-xs text-gray-400 mb-6">Tempo de leitura: {artigoAberto.tempo}</p>
            <div className="space-y-4">
              {artigoAberto.conteudo.map((paragrafo, i) => (
                <p key={i} className="text-gray-600 text-sm leading-relaxed">{paragrafo}</p>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artigos.map((artigo) => (
              <div
                key={artigo.id}
                onClick={() => setArtigoAberto(artigo)}
                className="bg-white rounded-2xl border border-gray-100 p-6 cursor-pointer hover:border-green-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${artigo.cor}`}>
                    {artigo.categoria}
                  </span>
                  <span className="text-xs text-gray-400">{artigo.tempo}</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-sm leading-snug">{artigo.titulo}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{artigo.resumo}</p>
                <div className="mt-4">
                  <span className="text-xs text-green-600 font-medium">Ler artigo &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Educativo