import { toast } from "react-toastify"
import { useCartContext } from "../../contexts/CartContext"
import ProductCart from "./ProductCart"
import { confirmAction } from "../../utils/ConfirmAction"
import { useThemeContext } from "../../contexts/ThemeContext"

function ListCart({ setShowCart }) {

  const { myCartList, cleanCart } = useCartContext()
  const { isDark } = useThemeContext()

  const total = myCartList.reduce(
    (acc, product) => acc + product.precio * product.cantidad,
    0
  )

  const handleCleanCart = async () => {
    const confirmed = await confirmAction({
      title: '¿Estás seguro?',
      text: 'Una vez realizada esta acción no se puede deshacer',
      confirmText: 'Sí, limpiar',
      isDark
    })

    if (confirmed) {
      cleanCart()
      toast.success("Carrito limpiado con éxito")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-10 flex items-end lg:items-start justify-center lg:justify-end">
      <div
        className="
          w-full max-w-md lg:max-w-2xl
          h-full lg:h-screen
          bg-white dark:bg-gray-900
          shadow-2xl shadow-black
          rounded-t-2xl lg:rounded-none
          flex flex-col
        "
      >
        {/* BOTÓN "X" DE EXIT */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => { setShowCart(false) }}
            className="relative text-xl lg:text-2xl text-gray-800 dark:text-gray-200 hover:text-red-600 transition-colors"
          >
            <i className="bi bi-x-circle"></i>
          </button>
        </div>

        {/* CONTENIDO SCROLLABLE */}
        <div className="flex-1 overflow-y-auto px-4 space-y-4">
          {/* TITULO DEL CARRITO */}
          <h1 className="text-lg lg:text-xl font-bold text-center text-gray-800 dark:text-gray-100">
            Productos del Carrito
          </h1>

          {/* LISTA DE PRODUCTOS */}
          <div className="flex flex-col items-center space-y-4">
            {myCartList.length > 0 ? (
              myCartList.map((product) => (
                <ProductCart key={product._id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic text-base lg:text-lg">
                Tu carrito está vacío.
              </p>
            )}
          </div>
        </div>

        {/* FOOTER FIJO */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 space-y-4">
          {/* MONTO TOTAL + BOTÓN LIMPIAR */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 text-lg lg:text-xl">
              <i className="bi bi-cash text-green-600"></i>
              <strong>Monto Total:</strong> ${total}
            </div>

            <button
              onClick={() => handleCleanCart()}
              className="text-red-600 dark:text-red-400 text-sm lg:text-lg px-3 py-1 lg:px-4 lg:py-2 rounded-full border border-red-300 dark:border-red-500 hover:bg-red-600 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-red-400"
            >
              Limpiar Carrito
            </button>
          </div>

          {/* BOTÓN COMPRAR */}
          <div className="flex justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-base lg:text-xl px-4 lg:px-6 py-2 lg:py-3 rounded-full shadow-md hover:scale-105 transition-transform w-full">
              Comprar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListCart