import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const onSubmit = async (data) => {
    await registerUser(data); // Maneja toast y redirección desde el contexto
  };

  return (
    <div className="flex items-center justify-center h-screen 
      bg-gray-100 dark:bg-gray-900 
      transition-colors duration-300">
      <div className="relative w-full max-w-md">

        {/* BOTÓN SALIR */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 
            text-gray-500 dark:text-gray-300 
            hover:text-red-600 transition"
          title="Salir"
        >
          <i className="bi bi-x-lg text-xl"></i>
        </button>

        {/* FORMULARIO */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-800 
            p-8 rounded-2xl shadow-2xl 
            border border-gray-200 dark:border-gray-700 
            space-y-6 transition-colors duration-300"
        >
          <h2 className="text-3xl font-bold text-center 
            text-gray-800 dark:text-gray-100">
            Registrarse
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Completá tus datos para crear una cuenta
          </p>

          {/* USUARIO */}
          <div>
            <label htmlFor="username" className="block text-sm font-semibold 
              text-gray-800 dark:text-gray-200 mb-1">
              Usuario <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              {...register("username", {
                required: "El usuario es obligatorio",
                minLength: { value: 3, message: "Mínimo de 3 caracteres" }
              })}
              placeholder="Ej: marcelo.dev"
              className="w-full p-3 
                border border-gray-300 dark:border-gray-600 
                rounded-lg 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-indigo-400 
                transition-colors"
            />
            {errors.username && (
              <p className="text-sm text-red-500 font-medium mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold 
              text-gray-800 dark:text-gray-200 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de email inválido"
                }
              })}
              placeholder="Ej: marcelo@email.com"
              className="w-full p-3 
                border border-gray-300 dark:border-gray-600 
                rounded-lg 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-indigo-400 
                transition-colors"
            />
            {errors.email && (
              <p className="text-sm text-red-500 font-medium mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* CONTRASEÑA */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold 
              text-gray-800 dark:text-gray-200 mb-1">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: { value: 6, message: "Mínimo de 6 caracteres" }
              })}
              placeholder="••••••••"
              className="w-full p-3 
                border border-gray-300 dark:border-gray-600 
                rounded-lg 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-indigo-400 
                transition-colors"
            />
            {errors.password && (
              <p className="text-sm text-red-500 font-medium mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 
              text-white py-3 rounded-lg font-semibold 
              transition-colors"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}