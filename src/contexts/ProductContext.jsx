import { createContext, useContext, useState } from "react";
import { fetchProductsAPI, fetchProductsNameAPI } from "../services/productsAPI";

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {

  const [productData, setProductData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // OBTENER TODOS LOS PRODUCTOS
  const getProduct = async (data) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetchProductsAPI (data)
      setProductData(response)
    } catch (err) {
      setError(err.message)
      setProductData([])
    } finally {
      setLoading(false)
    }
  }

  // OBTENER TODOS LOS PRODUCTOS CON DICHO NOMBRE
  const getProductName = async (data) => {
    try {
      const response = await fetchProductsNameAPI ('/search', { value: data })
      const cantidad = response.length
      if ( cantidad > 0 ) {
        setProductData(response)
      }
      return cantidad
    } catch (err) {
      setError(err.message)
      setProductData([])
    }
  }

  return (
    <ProductContext.Provider value={{ productData, loading, error, getProduct, getProductName }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => useContext(ProductContext)