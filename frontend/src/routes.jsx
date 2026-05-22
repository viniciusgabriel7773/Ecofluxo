import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import SchoolDashboard from './pages/school/Dashboard'
import ReuserDashboard from './pages/reuser/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'
import CollectorDashboard from './pages/collector/Dashboard'

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
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes