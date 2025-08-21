import { toast } from "react-toastify"
import { useCartContext } from "../contexts/CartContext"

function ProductCard ( { product } ) {

  const { addProduct } = useCartContext()

  const handleCart = () => {
    toast.success("Producto agregado al carrito")
    addProduct(product)
  }

  return (
    <div className="flex flex-col items-center bg-gray-200 shadow-2xl rounded-2xl w-64 p-2 gap-2 hover:scale-110">

      {/* IMAGEN DEL PRODUCTO */}
      <img src={`/${product.imagen}.png`} alt={product.imagen} className="rounded-2xl h-64"/>

      {/* BOTÓN PARA AÑADIR AL CARRITO */}
      <button onClick={ () => {handleCart()} } className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-lg text-sm hover:bg-black/80">
        <i className="bi bi-cart-plus"></i>
      </button>

      {/* NOMBRE DEL PRODUCTO */}
      <h2 className="truncate w-60 text-center">{product.nombre}</h2>

      {/* PRECIO DEL PRODUCTO */}
      <p><strong>Precio:</strong> ${product.precio}</p>

      {/* BOTÓN DE COMPRAR PRODUCTO */}
      <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:cursor-pointer hover:scale-105">Comprar</button>
    </div>
  )
}

export default ProductCard