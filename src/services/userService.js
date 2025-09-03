import axios from "axios"

const userRoute = import.meta.env.VITE_USER_ROUTE

// OBTENER TODOS LOS USUARIOS
export const fetchUsers = async () => {
  const url = `${userRoute}/`
  const response = await axios.get(url, { withCredentials: true })
  return response.data
}

// OBTENER USUARIO ESPECIFICO
export const fetchUserId = async (_id) => {
  const url = `${userRoute}/${_id}`
  const response = await axios.get(url, { withCredentials: true })
  return response.data
}

// ELIMINAR UN USUARIO
export const deleteUserId = async (_id) => {
  const url = `${userRoute}/${_id}`
  const response = await axios.delete(url, { withCredentials: true })
  return response.data
}