import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/app/Layout'
import { ProtectedRoute } from '@/features/admin/ProtectedRoute'
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage'
import { HomePage } from '@/pages/HomePage'
import { LegalPage } from '@/pages/LegalPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Vitrine Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mentions-legales" element={<LegalPage />} />
        </Route>

        {/* Admin Authentication & Dashboard */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
