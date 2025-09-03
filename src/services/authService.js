import axios from "axios"

const authRoute = import.meta.env.VITE_AUTH_ROUTE

// HACER LOGIN DEL USUARIO
export const fetchLogin = async (data) => {
  const url = `${authRoute}/login`
  const response = await axios.post(url, data, { withCredentials: true })
  return response.data
}

// CHECK DE SI EL USUARIO AUN SIGUE LOGEADO
export const fetchCheckLogin = async () => {
  const url = `${authRoute}/check`
  const response = await axios.get(url, { withCredentials: true })
  return response.data
}

// CERRAR SESIÓN DEL USUARIO
export const fetchLogout = async () => {
  const url = `${authRoute}/logout`
  await axios.post(url, {}, { withCredentials: true })
}