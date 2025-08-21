import { createContext, useContext, useState } from "react";
import { deleteCategoryAPI, fetchCategoriesAPI, postCategoryAPI, putCategoryAPI } from "../services/categoryAPI";

const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {

  const [categoryData, setCategoryData] = useState([])
  // const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // OBTENER TODAS LAS CATEGORÍAS
  const getCategory = async () => {
    setError(null)

    try {
      const response = await fetchCategoriesAPI ()
      setCategoryData(response)
    } catch (err) {
      setError(err.message)
      setCategoryData([])
    }
  }

  // ELIMINAR UNA CATEGORÍA
  const deleteCategory = async (id) => {
    setError(null)
    try {
      const response = await deleteCategoryAPI (id)
      return response.message
    } catch (err) {
      setError(err.message)
    }
  }

  // AGREGAR NUEVA CATEGORÍA
  const addCategory = async (data) => {
    setError(null)

    try {
      const response = await postCategoryAPI (data)
      return response.message
    } catch (err) {
      setError(err.message)
    }
  }

  // EDITAR UNA CATEGORÍA
  const editCategory = async (data) => {
    setError(null)

    try {
      const response = await putCategoryAPI (data)
      return response.message
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <CategoryContext.Provider value={{ categoryData, error, getCategory, deleteCategory, addCategory, editCategory }}>
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategory = () => useContext(CategoryContext)