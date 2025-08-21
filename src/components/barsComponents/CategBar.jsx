import { useEffect, useRef, useState } from "react"
import { useCategory } from "../../contexts/CategoryContext"
import { useProduct } from "../../contexts/ProductContext"

function CategBar() {
  const { categoryData, getCategory, error } = useCategory()
  const { getProduct } = useProduct()
  const [ showDropdown, setShowDropdown ] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    getCategory()
  }, [])

  // Cierra el dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("pointerdown", handleClickOutside)
    return () => document.removeEventListener("pointerdown", handleClickOutside)
  }, [])

  const visibleCategories = categoryData?.slice(0, 6)
  const hiddenCategories = categoryData?.slice(6, 10)

  return (
    <div className="flex items-center justify-center space-x-4 mt-35 text-xl relative">
      { error ? console.log(error)
        : <>
          {/* CATEGORÍAS VISIBLES */}
          {
            visibleCategories?.map( (category) => (
              <button
                key={category._id}
                onClick={ () => { getProduct(`/${category.nombre}`) } }
                className="bg-gray-200 px-4 py-1 rounded-2xl hover:bg-gray-400 transition"
              >
                {category.nombre}
              </button>
            ))
          }

          {/* BOTÓN "MAS" */}
          {
            hiddenCategories?.length > 0 && (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={ () => setShowDropdown(!showDropdown) }
                  className="bg-gray-300 px-4 py-1 rounded-2xl hover:bg-gray-600 hover:text-white transition"
                >
                  Más
                </button>

                {/* CATEGORÍA OCULTA */}
                {
                  showDropdown && (
                    <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-xl p-2 z-10 w-48">
                      {
                        hiddenCategories.map( (category) => (
                          <button
                            key={category._id}
                            onClick={ () => { getProduct(`/${category.nombre}`) } }
                            className="block px-4 py-1 text-left hover:bg-gray-200 rounded-md w-full"
                          >
                            {category.nombre}
                          </button>
                        ))
                      }
                    </div>
                  )
                }
              </div>
            )
          }
        </>
      }
    </div>
  )
}

export default CategBar