import { useForm } from 'react-hook-form'
import { useCategory } from '../../contexts/CategoryContext'
import { toast } from 'react-toastify'

export const AddCategory = ( {setShowAddCategory} ) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { getCategory, addCategory } = useCategory()

  const onSubmit = async (data) => {
    const message = await addCategory(data)
    setShowAddCategory(false)
    toast.success(message)
    await getCategory()
  }

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 w-md">
      <form onSubmit={ handleSubmit(onSubmit) } className="flex flex-col gap-5">

        <h2 className="text-2xl font-bold text-gray-800 text-center">Agregar nueva categoría</h2>

        <input
          {...register("nombre", {
            required: "El nombre es obligatorio",
            minLength: { value: 3, message: "Mínimo de 3 caracteres" }
          })}
          placeholder="Nombre de la categoría"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />

        {errors.nombre && (
          <p className="text-sm text-red-500 font-medium">{errors.nombre.message}</p>
        )}

        <div className="flex justify-between mt-4">
          {/* BOTÓN CANCELAR */}
          <button
            type="button"
            onClick={ () => { setShowAddCategory( false ) } }
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition hover:cursor-pointer"
          >
            Cancelar
          </button>

          {/* BOTÓN AGREGAR */}
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition hover:cursor-pointer"
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  )
}
