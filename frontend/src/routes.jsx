import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'

import SchoolDashboard from './pages/school/Dashboard'
import CadastrarResiduo from './pages/school/CadastrarResiduo'
import AgendarColeta from './pages/school/AgendarColeta'
import Mapa from './pages/school/Mapa'
import Perfil from './pages/school/Perfil'
import Impacto from './pages/school/Impacto'
import Educativo from './pages/school/Educativo'

import ReuserDashboard from './pages/reuser/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'
import CollectorDashboard from './pages/collector/Dashboard'

import RotaProtegida from './components/RotaProtegida'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/school/dashboard" element={<RotaProtegida tipo="escola"><SchoolDashboard /></RotaProtegida>} />
        <Route path="/school/cadastrar-residuo" element={<RotaProtegida tipo="escola"><CadastrarResiduo /></RotaProtegida>} />
        <Route path="/school/agendar-coleta" element={<RotaProtegida tipo="escola"><AgendarColeta /></RotaProtegida>} />
        <Route path="/school/mapa" element={<RotaProtegida tipo="escola"><Mapa /></RotaProtegida>} />
        <Route path="/school/perfil" element={<RotaProtegida tipo="escola"><Perfil /></RotaProtegida>} />
        <Route path="/school/impacto" element={<RotaProtegida tipo="escola"><Impacto /></RotaProtegida>} />
        <Route path="/school/educativo" element={<RotaProtegida tipo="escola"><Educativo /></RotaProtegida>} />

        <Route path="/reuser/dashboard" element={<RotaProtegida tipo="reutilizador"><ReuserDashboard /></RotaProtegida>} />
        <Route path="/admin/dashboard" element={<RotaProtegida tipo="admin"><AdminDashboard /></RotaProtegida>} />
        <Route path="/collector/dashboard" element={<RotaProtegida tipo="coletor"><CollectorDashboard /></RotaProtegida>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes