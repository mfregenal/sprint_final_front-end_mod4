import { useState } from "react";
import NavBar from "../components/barsComponents/NavBar";
import { CategoryArea } from "../components/adminComponents/CategoryArea";
import { ProductsArea } from "../components/adminComponents/ProductsArea";
import { UsersArea } from "../components/adminComponents/UsersArea";

export const AdminPage = () => {
  const [ selectItems, setSelectItems ] = useState("Category")

  const handleButtonCategories = () => {
    setSelectItems("Category")
  }

  const handleButtonProduct = () => {
    setSelectItems("Products")
  }

  const handleButtonUser = () => {
    setSelectItems("User")
  }

  return (
    <div className="flex h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">

      <NavBar/>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex flex-1 mt-28 overflow-hidden">

        {/* BARRA VERTICAL A LA IZQUIERDA */}
        <div
          className="
            flex flex-col 
            bg-gray-300 dark:bg-gray-800
            w-40 xs:w-44 sm:w-48 md:w-56 lg:w-64 
            border-2 border-gray-300 dark:border-gray-700
            text-center font-semibold
            transition-colors duration-300
          "
        >

          {/* BOTÓN CATEGORÍAS */}
          <button
            onClick={handleButtonCategories}
            className={`
              w-full 
              p-1.5 xs:p-2 sm:p-2.5 lg:p-3
              text-xs xs:text-sm sm:text-base lg:text-lg
              hover:bg-gray-200 dark:hover:bg-gray-700 
              hover:scale-105 hover:underline 
              transition-all
              ${ selectItems === "Category" ? "bg-green-100 dark:bg-green-700" : "" }
            `}
          >
            Categorías
          </button>

          {/* BOTÓN PRODUCTOS */}
          <button
            onClick={handleButtonProduct}
            className={`
              w-full 
              p-1.5 xs:p-2 sm:p-2.5 lg:p-3
              text-xs xs:text-sm sm:text-base lg:text-lg
              hover:bg-gray-200 dark:hover:bg-gray-700 
              hover:scale-105 hover:underline 
              transition-all
              ${ selectItems === "Products" ? "bg-green-100 dark:bg-green-700" : "" }
            `}
          >
            Productos
          </button>

          {/* BOTÓN USUARIOS */}
          <button
            onClick={handleButtonUser}
            className={`
              w-full 
              p-1.5 xs:p-2 sm:p-2.5 lg:p-3
              text-xs xs:text-sm sm:text-base lg:text-lg
              hover:bg-gray-200 dark:hover:bg-gray-700 
              hover:scale-105 hover:underline 
              transition-all
              ${ selectItems === "User" ? "bg-green-100 dark:bg-green-700" : "" }
            `}
          >
            Usuarios
          </button>
        </div>

        {/* VISUALIZACIÓN A LA DERECHA SEGÚN CORRESPONDA */}
        {
          selectItems === "Category" 
            ? <CategoryArea/> 
            : selectItems === "Products" 
              ? <ProductsArea/>
              : <UsersArea/>
        }
      </div>
    </div>
  )
}