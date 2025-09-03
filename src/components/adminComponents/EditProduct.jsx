import { useForm } from "react-hook-form"
import { useCategory } from "../../contexts/CategoryContext"
import { toast } from "react-toastify"
import { confirmAction } from "../../utils/ConfirmAction"
import { useProduct } from "../../contexts/ProductContext"

export const EditProduct = ({ setShowEditProduct, showEditProduct }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const { categoryData } = useCategory()
  const { getProduct, editProduct, error } = useProduct()
  const pathImage = import.meta.env.VITE_PATH_IMAGE // Obtiene la ruta de donde están almacenadas las imágenes
  const imagenSeleccionada = watch('imagen')?.[0] // Observar en tiempo real los valores del campo imagen
  const previewURL = imagenSeleccionada ? URL.createObjectURL(imagenSeleccionada) : null // Genera una URL temporal que apunta al archivo local en memoria

  const onSubmit = async (data) => {
    const confirmed = await confirmAction({
      title: '¿Estás seguro?',
      text: 'Una vez realizada esta acción no se puede deshacer',
      confirmText: 'Sí, editar'
    })

    if (confirmed) {
      const formData = new FormData() // Crea una instancia vacía de FormData

      // Creamos un array de pares [clave, valor]. Se envía como multipart/form-data
      formData.append('_id', showEditProduct._id)
      formData.append('nombre', data.nombre)
      formData.append('categoria', data.categoria)
      formData.append('precio', parseFloat(data.precio))

      // Si se seleccionó una nueva imagen, la agregamos
      if (data.imagen && data.imagen[0]) {
        formData.append('imagen', data.imagen[0])
      }

      const message = await editProduct(formData)

      if (message) {
        setShowEditProduct(null)
        toast.success(message)
        await getProduct()
      } else {
        toast.error(error)
      }
    }
  }

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 
      bg-white dark:bg-gray-800 
      text-gray-900 dark:text-gray-100
      rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 
      p-4 sm:p-6 w-[95%] sm:w-md max-h-[90vh] overflow-y-auto transition-colors duration-300">
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:gap-5">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-2">
          Editar producto
        </h2>

        {/* NOMBRE DEL PRODUCTO */}
        <div>
          <label htmlFor="nombre" className="block text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 mb-1">
            <i className="bi bi-person-vcard ml-1 mr-2"></i>
              Nombre del producto
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="nombre"
            {...register("nombre", {
              required: "El nombre es obligatorio",
              minLength: { value: 3, message: "Mínimo de 3 caracteres" }
            })}
            defaultValue={showEditProduct.nombre}
            className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 
              rounded-lg bg-white dark:bg-gray-700 
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm sm:text-base"
          />
          {errors.nombre && (
            <p className="text-xs sm:text-sm text-red-500 font-medium mt-1">
              {errors.nombre.message}
            </p>
          )}
        </div>

        {/* CATEGORÍA DEL PRODUCTO */}
        <div>
          <label htmlFor="categoria" className="block text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 mb-1">
            <i className='bi bi-box-seam ml-1 mr-2'></i>
              Categoría
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="categoria"
            {...register("categoria", {
              required: "La categoría es obligatoria"
            })}
            defaultValue={showEditProduct.categoria}
            className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 
              rounded-lg bg-white dark:bg-gray-700 
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm sm:text-base"
          >
            <option value="" disabled>Selecciona una categoría</option>
            {categoryData?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.nombre}
              </option>
            ))}
          </select>
          {errors.categoria && (
            <p className="text-xs sm:text-sm text-red-500 font-medium mt-1">
              {errors.categoria.message}
            </p>
          )}
        </div>

        {/* PRECIO DEL PRODUCTO */}
        <div>
          <label htmlFor="precio" className="block text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 mb-1">
            <i className='bi bi-cash-coin ml-1 mr-2'></i>
              Precio
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="precio"
            type="number"
            step="0.01"
            {...register("precio", {
              required: "El precio es obligatorio",
              valueAsNumber: true,
              validate: value => value > 0 || "El precio debe ser mayor a cero"
            })}
            defaultValue={showEditProduct.precio}
            className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 
              rounded-lg bg-white dark:bg-gray-700 
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-green-400 transition text-sm sm:text-base"
          />
          {errors.precio && (
            <p className="text-xs sm:text-sm text-red-500 font-medium mt-1">
              {errors.precio.message}
            </p>
          )}
        </div>

        {/* IMAGEN DEL PRODUCTO */}
        <div>
          <label htmlFor="imagen" className="block text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 mb-1">
            <i className="bi bi-file-earmark-image ml-1 mr-2"></i>
              Imagen del producto
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="imagen"
            type="file"
            accept="image/*"
            {...register('imagen')}
            className="block w-full text-xs sm:text-sm text-gray-700 dark:text-gray-200
                      file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4
                      file:rounded-lg file:border-0
                      file:text-xs sm:file:text-sm file:font-semibold
                      file:bg-sky-700 file:text-white
                      hover:file:bg-sky-600
                      transition mb-3"
          />

          {/* VISUALIZACIÓN PREVIA DE LA IMAGEN */}
          <div className="w-full flex justify-center">
            {
              imagenSeleccionada ?
                watch('imagen')?.[0] && (
                  <img
                    src={previewURL}
                    alt="Vista previa"
                    className="rounded-2xl h-40 sm:h-64 object-cover"
                  />
                )
                :
                <img
                  src={`${pathImage}/${showEditProduct.imagen}`}
                  alt={showEditProduct.imagen}
                  className="rounded-2xl h-40 sm:h-64 object-cover"
                />
            }
          </div>
        </div>

        {/* BOTONES */}
        <div className="flex flex-wrap justify-between gap-2 mt-4">
          {/* BOTON CANCELAR */}
          <button
            type="button"
            onClick={() => { setShowEditProduct(null) }}
            className="bg-red-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-red-600 transition hover:cursor-pointer text-xs sm:text-sm lg:text-base"
          >
            Cancelar
          </button>

          {/* BOTÓN GUARDAR */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-blue-600 transition hover:cursor-pointer text-xs sm:text-sm lg:text-base"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}