import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import SchoolDashboard from './pages/school/Dashboard'
import ReuserDashboard from './pages/reuser/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'
import CollectorDashboard from './pages/collector/Dashboard'
import CadastrarResiduo from './pages/school/CadastrarResiduo'
import AgendarColeta from './pages/school/AgendarColeta'
import Mapa from './pages/school/Mapa'
import Perfil from './pages/school/Perfil'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/school/dashboard" element={<SchoolDashboard />} />
        <Route path="/reuser/dashboard" element={<ReuserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/collector/dashboard" element={<CollectorDashboard />} />
        <Route path="/school/cadastrar-residuo" element={<CadastrarResiduo />} />
        <Route path="/school/agendar-coleta" element={<AgendarColeta />} />
        <Route path="/school/mapa" element={<Mapa />} />
        <Route path="/school/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes