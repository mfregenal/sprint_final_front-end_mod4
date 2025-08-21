import { useState } from "react";
import { CategoryArea } from "./CategoryArea";
import NavBar from "../barsComponents/NavBar";

export const AdminPage = () => {
  const [ selectCategories, setSelectCategories ] = useState(true)
  const [ selectItems, setSelectItems ] = useState("Category")

  const handleButtonCategories = () => {
    setSelectCategories(true)
    setSelectItems("Category")
  }

  const handleButtonProduct = () => {
    setSelectCategories(false)
    setSelectItems("Products")
  }

  return (
    <div className="flex h-screen">

      <NavBar/>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex flex-1 mt-28 overflow-hidden">
        {/* BARRA VERTICAL A LA IZQUIERDA */}
        <div className="flex flex-col bg-gray-300 w-64 border-2 text-center font-semibold">
          <button
            onClick={ () => handleButtonCategories() } 
            className={ `w-full p-2 text-lg hover:bg-gray-200 hover:scale-105 hover:underline ${ selectItems === "Category" ? "bg-green-100" : "" }` }>
            Categorías
          </button>
          <button
            onClick={ () => handleButtonProduct() }
            className={ `w-full p-2 text-lg hover:bg-gray-200 hover:scale-105 hover:underline ${ selectItems === "Products" ? "bg-green-100" : "" }` }>
            Productos
          </button>
        </div>

        {
          selectCategories && <CategoryArea nameArea="Categorías"/>
        }
      </div>
    </div>
  )
}
