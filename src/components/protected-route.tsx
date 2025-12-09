import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/auth-context'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth()

  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/landing" />
  }

  return <>{children ? children : <Outlet />}</>
}
