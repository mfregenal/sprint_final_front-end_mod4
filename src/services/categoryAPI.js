import axios from "axios"

const APIRoute = import.meta.env.VITE_API_ROUTE

// OBTENER TODAS LAS CATEGORÍAS
export const fetchCategoriesAPI = async () => {
  const url = `${APIRoute}/categories`
  const response = await axios.get(url)
  return response.data
}

// ELIMINAR UNA CATEGORÍA
export const deleteCategoryAPI = async (id) => {
  const url = `${APIRoute}/categories/${id}`
  const response = await axios.delete(url, { withCredentials: true })
  return response.data
}

// AGREGAR NUEVA CATEGORÍA
export const postCategoryAPI = async (data) => {
  const url = `${APIRoute}/categories/create`
  const response = await axios.post(url, data, { withCredentials: true })
  return response.data
}

// EDITAR UNA CATEGORÍA
export const putCategoryAPI = async (data) => {
  const url = `${APIRoute}/categories/edit`
  const response = await axios.put(url, data, { withCredentials: true })
  return response.data
}