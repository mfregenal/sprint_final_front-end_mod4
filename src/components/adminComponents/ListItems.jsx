import { useState } from "react"
import { EditProduct } from "./EditProduct"
import { EditCategory } from "./EditCategory"

export const ListItems = ({ itemsData, handleButtonDelete, type }) => {
  const [selectItem, setSelectItem] = useState(null)
  const [showEditItem, setShowEditItem] = useState(null)

  return (
    <>
      {/* CONTENEDOR DE LAS CATEGORÍAS */}
      <div className="h-screen-minus-28 overflow-y-auto text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {itemsData?.map((item) => (
          <div
            key={item._id}
            onClick={() => {
              setSelectItem(item._id)
            }}
            className={`
              flex justify-between items-center cursor-pointer
              py-1.5 px-2 xs:px-3 sm:px-4 lg:py-2 lg:px-6
              ${
                selectItem === item._id
                  ? "bg-gray-300 dark:bg-gray-600"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }
              transition-colors
            `}
          >
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl truncate">
              { type === "3" ? item.username : item.nombre}
            </p>

            {/* BOTONES */}
            <div className="flex flex-wrap gap-2 sm:gap-4">
              { type === "3"
                ? "" 
                : <>
                    {/* BOTÓN EDITAR */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowEditItem(item)
                      }}
                      className="
                        bg-yellow-500 
                        py-1 px-2 xs:py-1.5 xs:px-3 sm:py-2 sm:px-4
                        text-xs xs:text-sm sm:text-base font-semibold 
                        rounded-lg 
                        hover:scale-105 hover:bg-amber-600 hover:text-white 
                        cursor-pointer 
                        transition-all
                      "
                    >
                      Editar
                    </button>
                  </>
              }

              {/* BOTÓN ELIMINAR */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleButtonDelete(item._id)
                }}
                className="
                  bg-red-500 
                  py-1 px-2 xs:py-1.5 xs:px-3 sm:py-2 sm:px-4
                  text-xs xs:text-sm sm:text-base font-semibold 
                  rounded-lg 
                  hover:scale-105 hover:bg-red-600 hover:text-white 
                  cursor-pointer 
                  transition-all
                "
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        {/* SI SE HIZO CLIC EN EL BOTÓN EDITAR */}
        {showEditItem &&
          (type === "1" ? (
            <>
              <div className="fixed inset-0 bg-black/40 z-4 pointer-events-auto" />
              <EditCategory
                setShowEditCategory={setShowEditItem}
                showEditCategory={showEditItem}
              />
            </>
          ) : (
            <>
              <div className="fixed inset-0 bg-black/40 z-4 pointer-events-auto" />
              <EditProduct
                setShowEditProduct={setShowEditItem}
                showEditProduct={showEditItem}
              />
            </>
          ))}
      </div>
    </>
  )
}