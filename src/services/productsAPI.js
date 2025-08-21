import axios from "axios"

const APIRoute = import.meta.env.VITE_API_ROUTE

// OBTENER TODOS LOS PRODUCTOS
export const fetchProductsAPI = async (data) => {
  const url = `${APIRoute}${data}`
  const response = await axios.get(url)
  return response.data
}

// OBTENER TODOS LOS PRODUCTOS CON OPCIONES
export const fetchProductsNameAPI = async (endpoint, options = {}) => {
  const url = `${APIRoute}${endpoint}`;
  const response = await axios.get(url, {
    params: options // Parámetros de consulta (query string)
  });
  return response.data;
};