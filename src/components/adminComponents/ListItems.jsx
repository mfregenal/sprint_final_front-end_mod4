import { useState } from "react"
import { EditCategory } from "./EditCategory"

export const ListItems = ( { itemsData, handleButtonDelete } ) => {
  const [ selectCategory, setSelectCategory ] = useState(null)
  const [ showEditCategory, setShowEditCategory ] = useState(null)

  return (
    <>
      {/* CONTENEDOR DE LAS CATEGORÍAS */}
      <div className="h-screen-minus-28 overflow-y-auto">
        {
          itemsData?.map( (item) => (
            <div
              key={item._id}
              onClick={ () => { setSelectCategory(item._id) } }
              className={`flex justify-between py-2 px-6 items-center cursor-pointer ${ selectCategory === item._id ? "bg-gray-300" : " hover:bg-gray-200" }`}
            >
              <p className="text-xl">{item.nombre}</p>

              <div className="flex space-x-6">
                <button
                  onClick={ () => { setShowEditCategory(item) } }
                  className="bg-yellow-500 py-2 px-4 font-semibold rounded-lg hover:scale-105 hover:bg-amber-600 hover:text-white cursor-pointer">
                  Editar
                </button>

                <button
                  onClick={ () => { handleButtonDelete(item._id) } } 
                  className="bg-red-500 py-2 px-4 font-semibold rounded-lg hover:scale-105 hover:bg-red-600 hover:text-white cursor-pointer">
                  Eliminar
                </button>
              </div>
            </div>
          ))
        }

        {
          showEditCategory && (
            <>
              <div className="fixed inset-0 bg-black/40 z-4 pointer-events-auto"/>
              <EditCategory setShowEditCategory={setShowEditCategory} showEditCategory={showEditCategory} /> 
            </>
          )
        }
      </div>
    </>
  )
}
