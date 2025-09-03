import { useEffect, useState } from "react"
import { useCategory } from "../../contexts/CategoryContext"

function FiltersBar({ action }) {
  const { categoryData } = useCategory()
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortOrder, setSortOrder] = useState("default")

  // RESET NUEVAMENTE EL PRECIO MÁXIMO
  useEffect(() => {
    if (action.maxPrice === "") {
      action.setMaxPrice(9999999)
    }
  }, [action.maxPrice])

  return (
    <div
      className="
        flex flex-wrap
        gap-4 lg:gap-6
        items-center
        mb-10
        w-full
        justify-center
        text-gray-800 dark:text-gray-100
      "
    >
      {/* CATEGORÍA */}
      <div className="flex items-center text-sm lg:text-base">
        <label className="font-semibold mr-2">Categoría:</label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value)
            action.setCategory(e.target.value)
          }}
          className="border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 
                    text-gray-800 dark:text-gray-100
                    px-2 py-1 rounded text-sm lg:text-base"
        >
          <option value="">Todas</option>
          {categoryData?.map((category) => (
            <option key={category._id} value={category.nombre}>
              {category.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Precio mínimo */}
      <div className="flex items-center text-sm lg:text-base">
        <label className="font-semibold mr-2">Precio mínimo:</label>
        <input
          type="number"
          min="0"
          value={action.minPrice === 0 ? "" : action.minPrice}
          onChange={(e) => {
            action.setMinPrice(e.target.value)
          }}
          className="border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 
                    text-gray-800 dark:text-gray-100
                    px-2 py-1 rounded w-20 lg:w-28 text-sm lg:text-base"
          placeholder="Ej: 1000"
        />
      </div>

      {/* Precio máximo */}
      <div className="flex items-center text-sm lg:text-base">
        <label className="font-semibold mr-2">Precio máximo:</label>
        <input
          type="number"
          min="0"
          value={action.maxPrice === 9999999 ? "" : action.maxPrice}
          onChange={(e) => {
            action.setMaxPrice(e.target.value)
          }}
          className="border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 
                    text-gray-800 dark:text-gray-100
                    px-2 py-1 rounded w-20 lg:w-28 text-sm lg:text-base"
          placeholder="Ej: 5000"
        />
      </div>

      {/* Ordenamiento */}
      <div className="flex items-center text-sm lg:text-base">
        <label className="font-semibold mr-2">Ordenar por:</label>
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value)
            action.setInOrder(e.target.value)
          }}
          className="border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 
                    text-gray-800 dark:text-gray-100
                    px-2 py-1 rounded text-sm lg:text-base"
        >
          <option value="default">Por defecto</option>
          <option value="smaller">Menor a mayor</option>
          <option value="largest">Mayor a menor</option>
        </select>
      </div>
    </div>
  )
}

export default FiltersBar