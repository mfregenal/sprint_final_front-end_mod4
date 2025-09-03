import { useEffect, useState } from "react"
import { useProduct } from "../contexts/ProductContext"
import ProductCard from "./ProductCard"
import FiltersBar from "./barsComponents/FiltersBar"
import { useCategory } from "../contexts/CategoryContext"

function ProductsList () {
  const [ inOrder, setInOrder ] = useState("default")
  const [ minPrice, setMinPrice ] = useState(0)
  const [ maxPrice, setMaxPrice ] = useState(9999999)
  const [ category, setCategory ] = useState(null)
  const { productData, getProduct, error, loading } = useProduct()
  const { getCategory } = useCategory()

  // Agrupo las acciones para enviar una sola vez
  const filterActions = {
    setCategory,
    setInOrder,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice
  }

  let filteredProducts = [...productData]

  if (inOrder === "smaller") {
    filteredProducts.sort((a, b) => a.precio - b.precio) // Ordena de menor a mayor
  } else if (inOrder === "largest") {
    filteredProducts.sort((a, b) => b.precio - a.precio) // Ordena de mayor a menor
  }

  // Filtra los productos por el rango de precio indicado
  filteredProducts = filteredProducts.filter(
    product => product.precio >= minPrice && product.precio <= maxPrice
  )

  // Filtra los productos por la categoría seleccionada
  if (category) {
    filteredProducts = filteredProducts.filter(
      product => product.categoria.nombre === category
    )
  }

  // Obtiene las categorías y productos cuando se carga el componente
  useEffect(() => {
    getCategory()
    getProduct()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center mt-10 mx-4 sm:mx-8 md:mx-12 lg:mx-40 p-2 
      text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-10 text-center">
        Nuestros Productos
      </h1>

      {/* Barra de filtros */}
      <FiltersBar action={filterActions} />
      
      {
        // Muestra el error en caso de que ocurra uno
        error ? (
          <p className="text-red-600 dark:text-red-400 flex items-center gap-2 mt-3">
            <i className="bi bi-exclamation-circle-fill"></i>
            {error}
          </p>
        )
        // Muestra un mensaje de cargando en lo que se obtiene los productos
        : loading ? (
          <p className="text-blue-600 dark:text-blue-400 flex items-center gap-2 mt-3">
            <i className="bi bi-arrow-repeat fs-4 spin"></i>
            Cargando productos...
          </p>
        )
        // Muestra los productos si los hay
        : productData.length > 0 ? (
          // Muestra los productos si los hay después de los filtros
          filteredProducts.length > 0 ? (
            <div
              className="grid
                grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6
                gap-6 sm:gap-8 md:gap-14 lg:gap-10
                justify-items-center
                w-full
              "
            >
              {filteredProducts?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="italic font-semibold text-center text-lg sm:text-xl mt-6 text-gray-700 dark:text-gray-300">
              ... Actualmente no contamos con productos con tus parámetros de búsqueda ...
            </p>
          )
        ) : (
          <p className="italic font-semibold text-center text-lg sm:text-xl mt-6 text-gray-700 dark:text-gray-300">
            ... Nuestro catálogo está en preparación. Pronto encontrarás productos increíbles aquí ...
          </p>
        )
      }
    </div>
  )
}

export default ProductsList