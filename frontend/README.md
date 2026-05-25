# 🌱 EcoFluxo

> Plataforma de tecnologia sustentável que conecta escolas a reutilizadores de resíduos orgânicos.

[![Deploy](https://img.shields.io/badge/deploy-vercel-black)](https://ecofluxo.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📌 Sobre o projeto

O EcoFluxo nasceu da observação de um problema muito comum no ambiente escolar: o descarte inadequado de restos de alimentos, como sobras de merenda, cascas de frutas e outros resíduos orgânicos que normalmente acabam indo para aterros sanitários.

A plataforma conecta **instituições geradoras de resíduos** (escolas, creches, cantinas) a **reutilizadores** (hortas urbanas, composteiras, fazendas urbanas e iniciativas ecológicas).

> 🏆 5º lugar na 31ª edição da Ciência Jovem — uma das maiores feiras científicas estudantis do Brasil.

---

## 🎯 Objetivos

- Reduzir o desperdício de resíduos orgânicos
- Incentivar a economia circular
- Promover educação ambiental
- Diminuir emissões de gases poluentes
- Fortalecer iniciativas sustentáveis locais
- Unir tecnologia e sustentabilidade

---

## 🚀 Funcionalidades

### Para escolas
- Cadastro de resíduos orgânicos
- Agendamento de coletas
- Dashboard com métricas de impacto
- Mapa interativo com pontos de coleta
- Conteúdo educativo sobre sustentabilidade
- Cálculo de CO₂ evitado

### Para reutilizadores
- Visualização de resíduos disponíveis
- Aceite de coletas com um clique
- Mapa com escolas próximas

### Para administradores
- Painel de controle global
- Métricas do sistema em tempo real
- Gerenciamento de usuários e coletas

---

## 🛠️ Stack tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React + Vite + Tailwind CSS |
| Roteamento | React Router v6 |
| Backend/Auth | Supabase (PostgreSQL) |
| Mapas | Leaflet.js + OpenStreetMap |
| Gráficos | Recharts |
| Deploy | Vercel |

---

## 📦 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/viniciusgabriel7773/Ecofluxo.git

# Entre na pasta do frontend
cd Ecofluxo/frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Preencha com suas credenciais do Supabase

# Rode o projeto
npm run dev
```

---

## 🌍 Demo

Acesse a plataforma em produção: **[ecofluxo.vercel.app](https://ecofluxo.vercel.app)**

---

## 👨‍💻 Autor

**Vinícius Soares**
Estudante de Desenvolvimento de Sistemas
Apaixonado por tecnologia, inovação e sustentabilidade.

---

## 📄 Licença

Este projeto está sob a licença MIT.