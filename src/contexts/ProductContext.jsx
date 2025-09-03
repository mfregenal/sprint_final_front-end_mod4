import { createContext, useContext, useState } from "react"
import { deleteProductAPI, fetchProductsAPI, fetchProductsNameAPI, postProductAPI, putProductAPI } from "../services/productsAPI"

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {

  const [productData, setProductData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // OBTENER TODOS LOS PRODUCTOS
  const getProduct = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetchProductsAPI ()

      setProductData(response)
    } catch (error) {
      const msg = error.response?.data?.message || "Error inesperado"

      setError(msg)
      setProductData([])
    } finally {
      setLoading(false)
    }
  }



  // OBTENER TODOS LOS PRODUCTOS CON DICHO NOMBRE
  const getProductName = async (name) => {
    try {
      const response = await fetchProductsNameAPI ({ nombre: name })
      const cantidad = response.length

      if ( cantidad > 0 ) {
        setProductData(response)
      }

      return cantidad
    } catch (error) {
      const msg = error.response?.data?.message || "Error inesperado"

      setError(msg)
      setProductData([])
    }
  }



  // AGREGAR PRODUCTO NUEVO
  const addProduct = async (data) => {
    setError(null)

    try {
      const response = await postProductAPI(data)

      return response
    } catch (error) {
      const msg = error.response?.data?.message || "Error inesperado"

      setError(msg)
    }
  }



  // EDITAR PRODUCTO
    const editProduct = async (data) => {
      setError(null)
  
      try {
        const response = await putProductAPI (data)

        return response
      } catch (error) {
        const msg = error.response?.data?.message || "Error inesperado"

        setError(msg)
      }
    }



  // ELIMINAR UN PRODUCTO
  const deleteProduct = async (_id) => {
    setError(null)

    try {
      const response = await deleteProductAPI (_id)

      return response
    } catch (error) {
      const msg = error.response?.data?.message || "Error inesperado"

      setError(msg)
    }
  }

  return (
    <ProductContext.Provider value={{ productData, loading, error, getProduct, getProductName, addProduct, editProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => useContext(ProductContext)