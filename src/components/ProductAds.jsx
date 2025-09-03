import { useEffect, useState } from "react"

function ProductAds() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=5")
        const data = await res.json()
        setProductos(data.products)
      } catch (error) {
        console.error("Error al obtener productos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProductos()
  }, [])

  if (loading) {
    return <p className="text-center text-gray-500 mt-35">Cargando anuncios...</p>
  }

  return (
    <div className="flex justify-center mt-35">
      <div className="bg-gray-50 rounded-xl shadow-lg border border-gray-200 p-6 w-full max-w-6xl">
        <h2 className="text-lg font-semibold text-gray-600 uppercase tracking-wide mb-5 text-center">
          Publicidad
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {productos.map((producto) => (
            <a
              key={producto.id}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 rounded-lg overflow-hidden bg-white hover:shadow-xl hover:scale-105 transition transform duration-300"
            >
              <img
                src={producto.thumbnail}
                alt={producto.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{producto.title}</h3>
                <p className="text-green-600 font-bold">${producto.price}</p>
                <span className="text-xs text-gray-500">{producto.category}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductAds