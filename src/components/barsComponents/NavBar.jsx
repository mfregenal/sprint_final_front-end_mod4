import { useNavigate } from "react-router"
import { useProduct } from "../../contexts/ProductContext"
import { useRef, useState, useEffect } from "react"
import { useCartContext } from "../../contexts/CartContext"
import { toast } from "react-toastify"
import { useAuth } from "../../contexts/AuthContext"
import ListCart from "../cartComponents/ListCart"
import { useThemeContext } from "../../contexts/ThemeContext"

function NavBar() {
  const navigate = useNavigate()
  const { getProductName, getProduct, error } = useProduct()
  const inputRef = useRef()
  const [showCart, setShowCart] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { myCartList } = useCartContext()
  const { user, logout } = useAuth()
  const profileMenuRef = useRef(null) // referencia para cerrar al hacer clic fuera
  const { isDark, toggleTheme } = useThemeContext()

  const handleSearch = async () => {
    if (inputRef.current.value) { // Obtenemos el nombre a traves de la referencia
      const response = await getProductName(inputRef.current.value)

      if (response) { // Si response es undefined sucedió un error
        if (response > 0) {
          toast.success(`Se encontraron ${response} productos`)
        } else {
          toast.info("Ups... no encontramos productos que coincidan")
          getProduct()
        }
      } else {
        toast.error(error)
      }
    }
  }

  const handleHome = () => {
    navigate("/")
    getProduct()
    inputRef.current.value = ""
  }

  const toggleProfileMenu = () => {
    setShowProfileMenu(prev => !prev)
  }

  // Cierra el menú de perfil al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

return (
  <>
    <div>
      {/* BOTÓN HAMBURGUESA SOLO EN PANTALLAS MAX-SM */}
      <button
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="lg:hidden absolute top-4 left-4 z-50 text-3xl"
      >
        <i className="bi bi-list"></i>
      </button>

      {/* BOTÓN CAMBIAR TEMA OSCURO/CLARO - MOBILE */}
      <button
        onClick={toggleTheme}
        className="lg:hidden absolute top-6 right-3 z-10
        text-sm px-2 py-2 rounded-full
        bg-white border border-gray-300 shadow-md
        dark:bg-gray-700 dark:border-gray-600 dark:shadow-lg
        text-black dark:text-white
        hover:scale-105 transition"
      >
        {isDark ? "🌙 Modo oscuro" : "☀️ Modo claro"}
      </button>
    </div>

    {/* NAVBAR ORIGINAL SOLO EN PANTALLAS SM+ */}
    <div className="grid grid-cols-3 items-center gap-40 p-2 fixed top-0 left-0 z-10 
      bg-white dark:bg-gray-900 
      border-b border-gray-200 dark:border-gray-700
      w-full hidden lg:grid">

      {/* LOGO */}
      <div className="flex justify-center">
        <img src="/logo.png" alt="logo.png" className="w-32" />
      </div>

      {/* BUSCADOR */}
      <div>
        <form
          className="space-x-4 flex border-2 p-2 rounded-2xl dark:border-gray-700"
          onSubmit={(e) => {
            e.preventDefault()
            handleSearch()
          }}
          onChange={(e) => {
            if (e.target.value === "") {
              handleHome()
            }
          }}
        >
          <input
            type="text"
            ref={inputRef}
            placeholder="Buscar producto"
            className="w-full outline-none bg-transparent text-black dark:text-white"
          />
          <button type="submit">
            <i className="bi bi-search text-2xl bg-black text-white px-4 py-1 rounded-2xl"></i>
          </button>
        </form>
      </div>

      {/* OPCIONES */}
      <div className="flex gap-10 items-center justify-center">

        {/* BOTÓN CAMBIAR TEMA OSCURO/CLARO - DESKTOP */}
        <button
          onClick={toggleTheme}
          className="px-3 py-2 rounded-full
          bg-white border border-gray-300 shadow-md
          dark:bg-gray-700 dark:border-gray-600 dark:shadow-lg
          text-black dark:text-white
          hover:scale-105 transition"
        >
          {isDark ? "🌙 Modo oscuro" : "☀️ Modo claro"}
        </button>

        {/* INICIO */}
        <button onClick={handleHome} className="hover:scale-105">
          <i className="bi bi-house text-4xl"></i>
          <p className="text-xl">Inicio</p>
        </button>

        {/* CARRITO */}
        <button onClick={() => setShowCart(true)} className="hover:scale-105">
          {myCartList?.length > 0 ? (
            <div className="relative inline-block">
              <i className="bi bi-cart text-4xl"></i>
              <p className="absolute -top-0.5 -right-2 bg-indigo-600 rounded-full px-2 text-white text-sm">
                {myCartList.length}
              </p>
            </div>
          ) : (
            <i className="bi bi-cart text-4xl"></i>
          )}
          <p className="text-xl">Mi carrito</p>
        </button>

        {/* PERFIL */}
        <div className="relative" ref={profileMenuRef}>
          <button onClick={toggleProfileMenu} className="hover:scale-105 transition-transform">
            <i className="bi bi-person text-4xl"></i>
            <p className="text-xl">{user ? user.username : "Perfil"}</p>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 
              bg-white dark:bg-gray-800
              border border-gray-300 dark:border-gray-700
              rounded-2xl shadow-2xl z-20 w-48 overflow-hidden animate-fade-in text-left">
              {user ? (
                <>
                  {user.role.name === "Admin" && (
                    <button
                      onClick={() => navigate("/admin")}
                      className="flex items-center gap-2 px-4 py-3 w-full 
                      text-gray-700 dark:text-gray-200
                      hover:bg-gray-100 dark:hover:bg-gray-700
                      hover:text-red-600 transition-colors"
                    >
                      <i className="bi bi-person-lock text-lg"></i>
                      <span className="font-medium">Ir admin</span>
                    </button>
                  )}

                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-3 w-full 
                    text-gray-700 dark:text-gray-200
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    hover:text-red-600 transition-colors"
                  >
                    <i className="bi bi-box-arrow-right text-lg"></i>
                    <span className="font-medium">Cerrar sesión</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 px-4 py-3 w-full 
                    text-gray-700 dark:text-gray-200
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    hover:text-indigo-600 transition-colors"
                  >
                    <i className="bi bi-box-arrow-in-right text-lg"></i>
                    <span className="font-medium">Iniciar sesión</span>
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="flex items-center gap-2 px-4 py-3 w-full 
                    text-gray-700 dark:text-gray-200
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    hover:text-indigo-600 transition-colors"
                  >
                    <i className="bi bi-person-plus text-lg"></i>
                    <span className="font-medium">Registrarse</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* MENÚ HAMBURGUESA SOLO EN PANTALLAS MAX-SM */}
    {showMobileMenu && (
      <div className="fixed top-0 left-0 w-full h-full 
        bg-white dark:bg-gray-900
        z-40 p-6 overflow-y-auto lg:hidden animate-fade-in">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="logo.png" className="w-24" />
        </div>

        {/* BUSCADOR */}
        <form
          className="flex gap-2 border-2 p-2 rounded-xl mb-6 dark:border-gray-700"
          onSubmit={(e) => {
            e.preventDefault()
            handleSearch()
            setShowMobileMenu(false)
          }}
          onChange={(e) => {
            if (e.target.value === "") {
              handleHome()
            }
          }}
        >
          <input
            type="text"
            ref={inputRef}
            placeholder="Buscar producto"
            className="w-full outline-none bg-transparent text-black dark:text-white"
          />
          <button type="submit">
            <i className="bi bi-search text-xl bg-black text-white px-3 py-1 rounded-xl"></i>
          </button>
        </form>

        {/* INICIO */}
        <button
          onClick={() => { handleHome(); setShowMobileMenu(false) }}
          className="flex items-center gap-3 text-lg text-black dark:text-white"
        >
          <i className="bi bi-house text-2xl"></i> Inicio
        </button>

        {/* CARRITO */}
        <button
          onClick={() => { setShowCart(true); setShowMobileMenu(false) }}
          className="flex items-center gap-3 text-lg text-black dark:text-white"
        >
          <i className="bi bi-cart text-2xl"></i> Mi carrito
          {myCartList?.length > 0 && (
            <span className="ml-2 bg-indigo-600 text-white rounded-full px-2 text-sm">
              {myCartList.length}
            </span>
          )}
        </button>

        {/* PERFIL */}
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={toggleProfileMenu}
            className="flex items-center gap-3 text-lg text-black dark:text-white"
          >
                        <i className="bi bi-person text-2xl"></i> {user ? user.username : "Perfil"}
          </button>

          {showProfileMenu && (
            <div className="mt-2 
              bg-white dark:bg-gray-800
              border border-gray-300 dark:border-gray-700
              rounded-2xl shadow-2xl z-20 w-48 overflow-hidden animate-fade-in text-left"
            >
              {user ? (
                <>
                  {user.role.name === "Admin" && (
                    <button
                      onClick={() => navigate("/admin")}
                      className="flex items-center gap-2 px-4 py-3 w-full 
                      text-gray-700 dark:text-gray-200
                      hover:bg-gray-100 dark:hover:bg-gray-700
                      hover:text-red-600 transition-colors"
                    >
                      <i className="bi bi-person-lock text-lg"></i>
                      <span className="font-medium">Ir admin</span>
                    </button>
                  )}

                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-3 w-full 
                    text-gray-700 dark:text-gray-200
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    hover:text-red-600 transition-colors"
                  >
                    <i className="bi bi-box-arrow-right text-lg"></i>
                    <span className="font-medium">Cerrar sesión</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 px-4 py-3 w-full 
                    text-gray-700 dark:text-gray-200
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    hover:text-indigo-600 transition-colors"
                  >
                    <i className="bi bi-box-arrow-in-right text-lg"></i>
                    <span className="font-medium">Iniciar sesión</span>
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="flex items-center gap-2 px-4 py-3 w-full 
                    text-gray-700 dark:text-gray-200
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    hover:text-indigo-600 transition-colors"
                  >
                    <i className="bi bi-person-plus text-lg"></i>
                    <span className="font-medium">Registrarse</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    )}

    {/* CARRITO */}
    {showCart && <ListCart setShowCart={setShowCart} />}
  </>
)
}

export default NavBar