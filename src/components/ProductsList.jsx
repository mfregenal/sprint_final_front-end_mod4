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
    filteredProducts.sort((a, b) => a.precio - b.precio)
  } else if (inOrder === "largest") {
    filteredProducts.sort((a, b) => b.precio - a.precio)
  }

  filteredProducts = filteredProducts.filter( product => product.precio >= minPrice && product.precio <= maxPrice )

  if (category) {
    filteredProducts = filteredProducts.filter( product => product.categoria === category)
  }

  useEffect( () => {
    getCategory()
    getProduct("/")
  }, [])

  return (
    <div className="flex flex-col justify-center items-center mt-10 mx-40 p-2 mt-35">
      <h1 className="text-5xl font-extrabold mb-10">Nuestros Productos</h1>

      <FiltersBar action={filterActions} />
      
        {
          error ? console.log(error)
            : loading ? <p>cargando.. </p>
            : productData.length > 0 ?
              filteredProducts.length > 0 ?
                <div className="grid grid-cols-6 gap-10">
                  {
                    filteredProducts?.map( (product) => (
                      <ProductCard key={product._id} product={product} />
                    ))
                  }
                </div>
              : <p className="italic font-semibold text-xl">... Actualmente no contamos con productos con tus parámetros de búsqueda ...</p>
            : <p className="italic font-semibold text-xl">... Nuestro catálogo está en preparación. Pronto encontrarás productos increíbles aquí ...</p>
        }
      </div>
  )
}

export default ProductsList