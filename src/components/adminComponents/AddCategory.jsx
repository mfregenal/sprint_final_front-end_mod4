import { useForm } from 'react-hook-form'
import { useCategory } from '../../contexts/CategoryContext'
import { toast } from 'react-toastify'

export const AddCategory = ({ setShowAddCategory }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { getCategory, addCategory, error } = useCategory()

  const onSubmit = async (data) => {
    const message = await addCategory(data)

    if (message) {
      setShowAddCategory(false)
      toast.success(message)
      await getCategory()
    } else {
      toast.error(error)
    }
  }

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 
      bg-white dark:bg-gray-800 
      text-gray-900 dark:text-gray-100
      rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 
      p-4 sm:p-6 w-[95%] sm:w-md max-h-[90vh] overflow-y-auto transition-colors duration-300">
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:gap-5">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
          Agregar nueva categoría
        </h2>

        {/* CAMPO NOMBRE */}
        <input
          {...register("nombre", {
            required: "El nombre es obligatorio",
            minLength: { value: 3, message: "Mínimo de 3 caracteres" }
          })}
          placeholder="Nombre de la categoría"
          className="p-2 sm:p-3 border border-gray-300 dark:border-gray-600 
            rounded-lg bg-white dark:bg-gray-700 
            text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-green-400 
            transition text-sm sm:text-base"
        />

        {errors.nombre && (
          <p className="text-xs sm:text-sm text-red-500 font-medium">{errors.nombre.message}</p>
        )}

        {/* BOTONES */}
        <div className="flex flex-wrap justify-between gap-2 mt-4">
          
          {/* BOTÓN CANCELAR */}
          <button
            type="button"
            onClick={() => { setShowAddCategory(false) }}
            className="bg-red-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-red-600 transition hover:cursor-pointer text-xs sm:text-sm lg:text-base"
          >
            Cancelar
          </button>

          {/* BOTÓN AGREGAR */}
          <button
            type="submit"
            className="bg-green-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-green-600 transition hover:cursor-pointer text-xs sm:text-sm lg:text-base"
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  )
}