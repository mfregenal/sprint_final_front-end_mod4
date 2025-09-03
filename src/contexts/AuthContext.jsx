import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import { fetchCheckLogin, fetchLogin, fetchLogout } from "../services/authService"

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
      { response.role.name === "Admin" ? navigate("/Admin") : navigate("/") }
    } catch {
      toast.error("Credenciales inválidas")
    }
  }



  // REGISTRO
  const register = async (data) => {
    try {
      await axios.post("http://localhost:3000/auth/register", data, {
        withCredentials: true
      })
      toast.success("Registro exitoso")
      await checkLogin()
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