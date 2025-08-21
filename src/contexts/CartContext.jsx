import { createContext, useContext } from "react";
import useCart from "../hooks/useCart";

// 1- DEFINIR EL CONTEXTO
const CartContext = createContext() // CREA UN CONTENEDOR DE DATOS

// 2- CREAR EL PROVIDER
export const CartProvider = ({ children }) => {

  const cart = useCart()

  return (
    // EXPONE EL ESTADO Y FUNCIONES A TODOS LOS COMPONENTES QUE ESTÉN ADENTRO
    <CartContext.Provider value={cart}> 
      {children}
    </CartContext.Provider>
  )
}

// 3- CREAR UN CUSTOM HOOK PARA CONSUMIR EL CONTEXTO
export function useCartContext() {
  return useContext(CartContext) // PERMITE A CUALQUIER COMPONENTE ACCEDER A LOS DATOS FÁCILMENTE
}