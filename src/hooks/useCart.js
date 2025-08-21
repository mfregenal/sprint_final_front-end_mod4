import { useState, useEffect } from "react";

function useCart() {
  const key = 'cartList' // KEY PARA EL LOCALSTORAGE

  const [myCartList, setMyCartList] = useState()

  useEffect(() => {
    const initialList = JSON.parse(localStorage.getItem(key)) || [] //CONVERTIR A OBJ DE JAVASCRIPT
    setMyCartList(initialList); //CARGO EL LISTADO DE PRODUCTOS GUARDADOS EN LOCALSTORAGE
  }, []);

  // AGREGAR NUEVA PELÍCULA A MYPRODCUTLIST (HANDLER)
  const addProduct = (newProduct) => {

    const producExists = myCartList.some( product => product._id === newProduct._id ) // VERIFICAMOS SI EXISTE EL PRODUCTO EN EL LISTADO
    let newCartList

    // REVISO QUE EL PRODUCTO NO ESTE REPETIDA
    if (producExists) {
      newCartList = myCartList.map( product => {
        if (product._id === newProduct._id) {
          return { ...product, cantidad: product.cantidad + 1 }
        }
        return product
      })
    } else {
      newCartList = [...myCartList, { ...newProduct, cantidad: 1 }]
    }

    // const newCartList = [...myCartList, newProduct] //(SPREAD OPERATOR)
    setMyCartList( newCartList )
    localStorage.setItem(key, JSON.stringify(newCartList)) //CONVERTIR A FORMATO JSON
  }

  // ELIMINAR UN PRODUCTO DE MYPRODUCTLIST
  const deleteProduct = (_id) => {
    const newCartList = myCartList.filter ( product => product._id !== _id )
    if (newCartList.length === 0){
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newCartList))
    }
    setMyCartList(newCartList)
  }

  // ACTUALIZAR LA CANTIDAD DE UN PRODUCTO
  const updateProductCantidad = (_id, nuevaCantidad) => {
    const newCartList = myCartList.map(product =>
      product._id === _id ? { ...product, cantidad: nuevaCantidad } : product
    )
    setMyCartList(newCartList)
    localStorage.setItem(key, JSON.stringify(newCartList))
  }

  //LIMPIAR CARRITO
  const cleanCart = () => {
    setMyCartList([])
    localStorage.removeItem(key)
  }

  // RETORNO LAS FUNCIONES PARA SU USO
  return {
    myCartList,
    addProduct,
    deleteProduct,
    updateProductCantidad,
    cleanCart
  }
}

export default useCart