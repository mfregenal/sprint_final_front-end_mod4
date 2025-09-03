import { useEffect } from "react"
import { toast } from 'react-toastify'
import { ListItems } from "./ListItems"
import { confirmAction } from "../../utils/ConfirmAction"
import { useNavigate } from "react-router"
import { useUser } from "../../contexts/UserContext"

export const UsersArea = () => {
  const { userData, getUsers, deleteUser, error  } = useUser()
  const navigate = useNavigate()

  // Obtiene todos los usuarios al cargar la pagina
  useEffect(() => {
    getUsers()
  }, [])

  const handleButtonDelete = async (id) => {
    const confirmed = await confirmAction({
      title: '¿Eliminar usuario?',
      text: 'Esta acción eliminará el usuario permanentemente.',
      confirmText: 'Sí, eliminar'
    })

    if (confirmed) {
      const message = await deleteUser(id)

      if (message) {
        await getUsers()
        toast.success(message)
      } else {
        toast.error(error)
      }
    }
  }

  const handleAddUser = () => {
    navigate("/register")
  }

  return (
    <>
      {/* BARRA DE CONTENIDO */}
      <div className="flex-1 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <div
          className="
            border-t-2 border-b-2 border-gray-300 dark:border-gray-700
            w-full 
            py-1.5 px-2 xs:px-3 sm:px-4 lg:py-2 lg:px-6
            flex flex-wrap justify-between items-center gap-2
            bg-white dark:bg-gray-800
          "
        >
          <h2 className="text-sm xs:text-base sm:text-lg lg:text-2xl font-semibold">
            Categorías
          </h2>

          {/* BOTÓN NUEVO */}
          <button
            onClick={() => handleAddUser()}
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

        {/* LISTADO DE USUARIOS */}
        <ListItems
          itemsData={userData}
          handleButtonDelete={handleButtonDelete}
          type={"3"}
        />
      </div>
    </>
  )
}