import { createContext, useContext, useState } from "react"
import { fetchUserId, fetchUsers, deleteUserId } from "../services/userService"

const UserContext = createContext()

export const UserProvider = ({ children }) => {

  const [userData, setUserData] = useState([])
  const [error, setError] = useState(null)

  // OBTENER TODOS LOS USUARIOS
  const getUsers = async () => {
    setError(null)

    try {
      const response = await fetchUsers()

      setUserData(response)
    } catch (error) {
      const msg = error.response?.data?.message || "Error inesperado"

      setError(msg)
      setUserData([])
    }
  }



  // OBTENER USUARIO ESPECIFICO
  const getUserId = async (_id) => {
    try {
      const response = await fetchUserId (_id)

      return response
    } catch (error) {
      const msg = error.response?.data?.message || "Error inesperado"

      setError(msg)
    }
  }



  // ELIMINAR UN USUARIO
  const deleteUser = async (_id) => {
    setError(null)

    try {
      const response = await deleteUserId (_id)

      return response
    } catch (error) {
      const msg = error.response?.data?.message || "Error inesperado"

      setError(msg)
    }
  }

  return (
    <UserContext.Provider value={{ userData, error, getUsers, getUserId, deleteUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)