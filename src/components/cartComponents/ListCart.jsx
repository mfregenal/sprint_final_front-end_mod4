import { toast } from "react-toastify"
import { useCartContext } from "../../contexts/CartContext"
import ProductCart from "./ProductCart"
import { confirmAction } from "../../utils/ConfirmAction"

function ListCart( {setShowCart}) {

  const {myCartList, cleanCart} = useCartContext()

  const total = myCartList.reduce( (acc, product) => acc + product.precio * product.cantidad, 0 )

  const handleCleanCart = async () => {
    const confirmed = await confirmAction({
      title: '¿Estás seguro?',
      text: 'Una vez realizada esta acción no se puede deshacer',
      confirmText: 'Sí, limpiar'
    })

    if (confirmed) {
      cleanCart()
      toast.success("Carrito limpiado con éxito")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-10">
      <div className="absolute top-0 right-0 w-2xl h-screen p-4 space-y-4 bg-white shadow-2xl shadow-black">
        {/* BOTÓN "X" DE EXIT */}
        <div className="flex justify-end">
          <button onClick={ () => { setShowCart(false) } } className="relative text-2xl">
            <i className="bi bi-x-circle"></i>
          </button>
        </div>

        <div className="space-y-4 h-3/4">
          {/* TITULO DEL CARRITO */}
          <h1 className="text-xl font-bold text-center">Productos del Carrito</h1>

          {/* LISTA DE PRODUCTOS */}
          <div className="flex flex-col items-center space-y-4">
            {myCartList.length > 0 ? (
              myCartList.map((product) => (
                <ProductCart key={product._id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 italic text-lg">Tu carrito está vacío.</p>
            )}
          </div>
        </div>

        {/* BOTÓN LIMPIAR */}
        <div className="flex justify-end">
          <button
            onClick={ () => handleCleanCart()}
            className="text-red-600 text-lg px-4 py-2 rounded-full border border-red-300 hover:bg-red-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-500">
            Limpiar Carrito
          </button>
        </div>

        {/* MONTO TOTAL */}
        <div className="flex items-center w-full text-xl p-4 bg-gray-100 rounded-xl">
          <p className="flex items-center justify-center gap-2 text-gray-700">
            <i className="bi bi-cash text-green-600"></i>
            <strong>Monto Total:</strong> ${total}
          </p>
        </div>

        {/* BOTÓN COMPRAR */}
        <div className="flex justify-center">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xl px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform">
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListCart