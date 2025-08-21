import { useEffect } from "react"
import { useCartContext } from "../../contexts/CartContext"
import useCounter from "../../hooks/useCounter"
import { toast } from "react-toastify"

function ProductCart({ product }) {
  const { deleteProduct, updateProductCantidad } = useCartContext()
  const { counter, increment, decrement } = useCounter(product.cantidad)

  useEffect(() => {
    updateProductCantidad(product._id, counter)
  }, [counter])

  const handleDelete = (_id) => {
    deleteProduct(_id)
    toast.success("Producto eliminado del carrito")
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full bg-gray-100 rounded-2xl shadow-md p-4 gap-4 transition hover:shadow-lg">
      
      {/* Nombre y precio */}
      <div className="flex flex-col items-center md:items-start text-gray-800 w-full md:w-2/4">
        <h3 className="text-lg font-semibold text-center md:text-left">{product.nombre}</h3>
        <p className="text-sm text-gray-600"><strong>Precio:</strong> ${product.precio}</p>
      </div>

      {/* Contador */}
      <div className="flex items-center justify-center gap-3 bg-white rounded-xl px-3 py-2 shadow-inner">
        <button
          onClick={decrement}
          className="text-yellow-500 hover:text-yellow-600 text-xl transition-transform hover:scale-110"
        >
          <i className="bi bi-dash-circle"></i>
        </button>

        <p className="text-base font-medium px-2">{counter}</p>

        <button
          onClick={increment}
          className="text-green-500 hover:text-green-600 text-xl transition-transform hover:scale-110"
        >
          <i className="bi bi-plus-circle"></i>
        </button>
      </div>

      {/* Botón eliminar */}
      <div className="flex justify-center md:justify-end w-full md:w-auto">
        <button
          onClick={() => handleDelete(product._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors hover:scale-105"
        >
          <i className="bi bi-cart-dash text-xl"></i>
        </button>
      </div>
    </div>
  )
}

export default ProductCart