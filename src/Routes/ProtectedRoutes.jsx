import { useAuth } from "../contexts/AuthContext"
import { Navigate, Outlet } from "react-router"

export default function ProtectedRoute({ requiredRole }) {
  const { user, loading } = useAuth()

  if (loading) return null // Evita la visualización de la ruta hasta que cargue datos por completo

  if (!user) return <Navigate to="/login" /> // En caso de que el usuario no haya iniciado sesión, se lo deriva al flujo de autenticación.

  if (requiredRole && user.role?.name !== requiredRole) { // Si no se cumple con el rol requerido se redirige al Home
    return <Navigate to="/" />
  }

  return <Outlet /> // Renderiza aquí la ruta hija que coincida con la URL actual.
}