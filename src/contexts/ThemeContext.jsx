import { createContext, useContext } from "react";
import useTheme from "../hooks/useTheme";

// 1- DEFINIR EL CONTEXTO
const ThemeContext = createContext() // CREA UN CONTENEDOR DE DATOS

// 2- CREAR EL PROVIDER
export const ThemeProvider = ({ children }) => {

  const theme = useTheme()

  return (
    // EXPONE EL ESTADO Y FUNCIONES A TODOS LOS COMPONENTES QUE ESTÉN ADENTRO
    <ThemeContext.Provider value={theme}> 
      {children}
    </ThemeContext.Provider>
  )
}

// 3- CREAR UN CUSTOM HOOK PARA CONSUMIR EL CONTEXTO
export function useThemeContext() {
  return useContext(ThemeContext) // PERMITE A CUALQUIER COMPONENTE ACCEDER A LOS DATOS FÁCILMENTE
}