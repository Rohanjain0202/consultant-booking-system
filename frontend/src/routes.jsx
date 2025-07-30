import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Loginpage/Login'
import Register from './pages/Registerpage/Register'
import AdminDashboard from './pages/Dashboard/AdminDashboard'
import ConsultantDashboard from './pages/Dashboard/ConsultantDashboard'
import CustomerDashboard from './pages/Dashboard/CustomerDashboard'

export default function AppRoutes({ role }) {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin-dashboard"
        element={role === 'admin' ? <AdminDashboard /> : <Navigate to="/unauthorized" />}
      />
      <Route
        path="/consultant-dashboard"
        element={role === 'consultant' ? <ConsultantDashboard /> : <Navigate to="/unauthorized" />}
      />
      <Route
        path="/customer-dashboard"
        element={role === 'customer' ? <CustomerDashboard /> : <Navigate to="/unauthorized" />}
      />

    </Routes>
  )
}
