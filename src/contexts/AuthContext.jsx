import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import { fetchCheckLogin, fetchLogin, fetchLogout, fetchRegister } from "../services/authService"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null) // null si no está logueado
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    checkLogin()
  }, [])



  // VERIFICAR SESIÓN
  const checkLogin = async () => {
    try {
      const res = await fetchCheckLogin()

      if (res.loggedIn) {
        setUser(res.user)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }



  // LOGIN
  const login = async (credentials) => {
    try {
      const response = await fetchLogin(credentials)
      await checkLogin()
      toast.success("Inicio de sesión exitoso")
      if (response.role.name === "Admin"){
        navigate("/Admin")
      } else {
        navigate("/")
      }
    } catch {
      toast.error("Credenciales inválidas")
    }
  }



  // REGISTRO
  const register = async (data) => {
    try {
      await fetchRegister(data)
      await checkLogin()
      toast.success("Registro exitoso")
      navigate("/")
    } catch {
      toast.error("Error al registrar usuario")
    }
  }



  // LOGOUT
  const logout = async () => {
    try {
      await fetchLogout()
      setUser(null)
      toast.info("Sesión cerrada")
      navigate("/")
    } catch {
      toast.error("Error al cerrar sesión")
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)