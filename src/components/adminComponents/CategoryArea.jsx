import { useEffect, useState } from "react"
import { toast } from 'react-toastify'
import { useCategory } from "../../contexts/CategoryContext"
import { AddCategory } from "./AddCategory"
import { ListItems } from "./ListItems"
import { confirmAction } from "../../utils/ConfirmAction"

export const CategoryArea = ( { nameArea } ) => {
  const { categoryData, getCategory, deleteCategory } = useCategory()
  const [ showAddCategory, setShowAddCategory ] = useState(false)


  useEffect(() => {
    getCategory()
  }, [])

  const handleButtonDelete = async (id) => {
    const confirmed = await confirmAction({
      title: '¿Eliminar categoría?',
      text: 'Esta acción eliminará la categoría permanentemente.',
      confirmText: 'Sí, eliminar'
    })

    if (confirmed) {
      const message = await deleteCategory(id);
      await getCategory();
      toast.success(message);
    }
  }

  return (
    <>
      {/* BARRA DE CONTENIDO */}
      <div className="flex-1">
        <div className="border-t-2 border-b-2 w-full py-2 px-6 flex justify-between items-center">
          <h2 className="text-2xl">{nameArea}</h2>

          <button
          onClick={ () => setShowAddCategory(true) } 
            className="bg-green-500 py-2 px-4 font-semibold rounded-lg hover:scale-105 hover:bg-green-600 hover:text-white cursor-pointer"
          >
            Nuevo
          </button>
        </div>

        <ListItems itemsData={categoryData} handleButtonDelete={handleButtonDelete} />

        {
          showAddCategory && (
            <>
              <div className="fixed inset-0 bg-black/40 z-4 pointer-events-auto"/>
              <AddCategory setShowAddCategory={setShowAddCategory}/> 
            </>
          )
        }
      </div>
    </>
  )
}