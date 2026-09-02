import { Navigate, Outlet } from 'react-router-dom'
import { useAdminStore } from './useAdminStore'

export function ProtectedRoute() {
  const isAuthenticated = useAdminStore((s) => s.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
