import { useEffect, useState } from "react"
import { useCategory } from "../../contexts/CategoryContext"

function FiltersBar({ action }) {
  const { categoryData } = useCategory()
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortOrder, setSortOrder] = useState("default")

  useEffect ( () => {
    if ( action.maxPrice === "" ){
      action.setMaxPrice(9999999)
    }
  }, [action.maxPrice])

  return (
    <div className="flex flex-wrap gap-6 items-center mb-10 w-full justify-center">

      {/* CATEGORÍA */}
      <div>
        <label className="font-semibold mr-2">Categoría:</label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value)
            action.setCategory(e.target.value)
          }}
          className="border px-3 py-1 rounded"
        >
          <option value="">Todas</option>
          {categoryData?.map( (category) => (
            <option key={category._id} value={category.nombre}>{category.nombre}</option>
          ))}
        </select>
      </div>

      {/* Precio mínimo */}
      <div>
        <label className="font-semibold mr-2">Precio mínimo:</label>
        <input
          type="number"
          min="0"
          value={action.minPrice === 0 ? "" : action.minPrice}
          onChange={(e) => {
            action.setMinPrice(e.target.value)
          }}
          className="border px-3 py-1 rounded w-28"
          placeholder="Ej: 1000"
        />
      </div>

      {/* Precio máximo */}
      <div>
        <label className="font-semibold mr-2">Precio máximo:</label>
        <input
          type="number"
          min="0"
          value={action.maxPrice === 9999999 ? "" : action.maxPrice}
          onChange={(e) => {
            action.setMaxPrice(e.target.value)
          }}
          className="border px-3 py-1 rounded w-28"
          placeholder="Ej: 5000"
        />
      </div>

      {/* Ordenamiento */}
      <div>
        <label className="font-semibold mr-2">Ordenar por:</label>
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value)
            action.setInOrder(e.target.value)
          }}
          className="border px-3 py-1 rounded"
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