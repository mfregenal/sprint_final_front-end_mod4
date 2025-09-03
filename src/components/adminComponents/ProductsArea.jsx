import { useEffect, useState } from "react"
import { toast } from 'react-toastify'
import { ListItems } from "./ListItems"
import { confirmAction } from "../../utils/ConfirmAction"
import { useProduct } from "../../contexts/ProductContext"
import { AddProduct } from "./AddProduct"

export const ProductsArea = () => {
  const { productData, getProduct, deleteProduct, error } = useProduct()
  const [ showAddProduct, setShowAddProduct ] = useState(false)

  // Obtienes los productos cada vez que se carga la pagina
  useEffect(() => {
    getProduct("/")
  }, [])

  const handleButtonDelete = async (_id) => {
    const confirmed = await confirmAction({
      title: '¿Eliminar producto?',
      text: 'Esta acción eliminará el producto permanentemente.',
      confirmText: 'Sí, eliminar'
    })

    if (confirmed) {
      const message = await deleteProduct(_id)

      if (message){
        await getProduct()
        toast.success(message)
      } else {
        toast.error(error)
      }
    }
  }

  return (
    <>
      {/* BARRA DE CONTENIDO */}
      <div className="flex-1 text-gray-900 dark:text-gray-100">
        <div
          className="
            border-t-2 border-b-2 border-gray-300 dark:border-gray-700
            w-full 
            py-1.5 px-2 xs:px-3 sm:px-4 lg:py-2 lg:px-6
            flex flex-wrap justify-between items-center gap-2
            bg-white dark:bg-gray-800
            transition-colors duration-300
          "
        >
          <h2 className="text-sm xs:text-base sm:text-lg lg:text-2xl font-semibold">
            Productos
          </h2>

          {/* BOTÓN NUEVO */}
          <button
            onClick={() => setShowAddProduct(true)}
            className="
              bg-green-500 
              py-1 px-2 xs:py-1.5 xs:px-3 sm:py-2 sm:px-4
              text-xs xs:text-sm sm:text-base font-semibold 
              rounded-lg 
              hover:scale-105 hover:bg-green-600 hover:text-white 
              cursor-pointer 
              transition-all
              max-w-fit
            "
          >
            Nuevo
          </button>
        </div>

        {/* LISTADO DE LOS PRODUCTOS */}
        <ListItems itemsData={productData} handleButtonDelete={handleButtonDelete} type={"2"} />

        {/* SI SE HIZO CLIC EN EL BOTÓN NUEVO, MUESTRA LA VENTANA PARA AÑADIR UN PRODUCTO NUEVO */}
        {
          showAddProduct && (
            <>
              <div className="fixed inset-0 bg-black/40 z-4 pointer-events-auto"/>
              <AddProduct setShowAddProduct={setShowAddProduct}/> 
            </>
          )
        }
      </div>
    </>
  )
}