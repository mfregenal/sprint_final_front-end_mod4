import axios from "axios"

const APIRoute = import.meta.env.VITE_API_ROUTE

// OBTENER TODOS LOS PRODUCTOS
export const fetchProductsAPI = async () => {
  const url = `${APIRoute}/products`
  const response = await axios.get(url)

  return response.data
}

// OBTENER TODOS LOS PRODUCTOS CON DICHO NOMBRE
export const fetchProductsNameAPI = async (data = {}) => {
  const url = `${APIRoute}/products`
  const response = await axios.get(url, {
    params: data // Parámetros de consulta (query string)
  })

  return response.data
}

// AGREGAR UN NUEVO PRODUCTO
export const postProductAPI = async (data) => {
  const url = `${APIRoute}/products/create`
  const response = await axios.post(url, data, { withCredentials: true })

  return response.data
}

// EDITAR UN PRODUCTO
export const putProductAPI = async (data) => {

  const url = `${APIRoute}/products/edit`
  const response = await axios.put(url, data, { withCredentials: true })

  return response.data
}

// ELIMINAR UN PRODUCTO
export const deleteProductAPI = async (_id) => {
  const url = `${APIRoute}/products/${_id}`
  const response = await axios.delete(url, { withCredentials: true })
  return response.data
}