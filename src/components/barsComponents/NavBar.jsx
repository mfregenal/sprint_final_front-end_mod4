import { useNavigate } from "react-router"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { useProduct } from "../../contexts/ProductContext"
import ListCart from "../cartComponents/ListCart"
import { useCartContext } from "../../contexts/CartContext"

function NavBar () {

  const navigate = useNavigate()
  const { getProductName, getProduct } = useProduct()
  const inputRef = useRef()
  const [showCart, setShowCart] = useState(false)
  const {myCartList} = useCartContext()

  const handleSearch = async () => {
    if ( inputRef.current.value ) {
      const response = await getProductName( inputRef.current.value )
      if (response > 0 ){
        toast.success(`Se encontraron ${response} productos`)
      } else {
        toast.info("Ups... no encontramos productos que coincidan")
        getProduct("/")
      }
    }
  }

  const handleHome = () => {
    navigate("/")
    getProduct("/")
    inputRef.current.value = ""
  }

  return (
    <div className="grid grid-cols-3 items-center gap-40 p-2 fixed top-0 left-0 z-1 bg-white w-full">
      {/* LOGO */}
      <div className="flex justify-center">
        <img src="/logo.png" alt="logo.png" className="w-32"/>
      </div>

      {/* BUSCADOR */}
      <div>
        <form 
          className="space-x-4 flex border-2 p-2 rounded-2xl"
          onSubmit={ (e) => {
            e.preventDefault() 
            handleSearch()
          }}
          onChange={ (e) => { 
            if (e.target.value === "") {
              handleHome()
            }
          }}
        >
          <input type="text" ref={inputRef} placeholder="Buscar producto" className="w-full outline-none"/>

          <button type="submit"><i className="bi bi-search text-2xl bg-black text-white px-4 py-1 rounded-2xl"></i></button>
        </form>
      </div>

      {/* OPCIONES */}
      <div className="flex gap-10 items-center justify-center">
        <button onClick={ () => handleHome() } className="hover:scale-105">
          <i className="bi bi-house text-4xl"></i>
          <p className="text-xl">Inicio</p>  
        </button>

        <button onClick={ () => setShowCart(true) } className="hover:scale-105">
          { 
            myCartList?.length > 0 ? 
              <div className="relative inline-block">
                <i className="bi bi-cart text-4xl"></i>
                <p className="absolute -top-0.5 -right-2 bg-indigo-600 rounded-full px-2 text-white text-sm">{myCartList.length}</p>
              </div>
            : <i className="bi bi-cart text-4xl"></i> 
          }
          <p className="text-xl">Mi carrito</p>  
        </button>

        <button onClick={ () => navigate("/admin") } className="hover:scale-105">
          <i className="bi bi-person text-4xl"></i>
          <p className="text-xl">Perfil</p>  
        </button>
      </div>

      { showCart && <ListCart setShowCart={setShowCart}/>}
    </div>
  )
}

export default NavBar