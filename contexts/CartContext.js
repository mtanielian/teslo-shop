import { createContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'

export const CartContext = createContext()

const INITIAL_VALUES = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0
}

export const CartContextProvider = ({ children }) => {
  const [cartState, setCartState] = useState(INITIAL_VALUES)

  useEffect(() => {
    const cart = Cookies.get('cartState') ? JSON.parse(Cookies.get('cartState')) : INITIAL_VALUES
    setCartState(cart)
  }, [])

  const calcSummary = (cartState) => {
    const numberOfItems = cartState.cart.reduce( ( prev, current ) => current.qty + prev , 0 );
    const subTotal = cartState.cart.reduce( ( prev, current ) => (current.price * current.qty) + prev, 0 );
    const taxRate =  Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const summary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * ( taxRate + 1 )
    }

    setCartState({...cartState, ...summary})
    Cookies.set('cartState', JSON.stringify({...cartState, ...summary}))
  }


  const addItem = (item) => {

    if (cartState.cart.length > 0) {
      if (!cartState.cart.some( p => p._id === item._id )) {
        calcSummary({ cart: [...cartState.cart, item] })
        return
      }

      let itemToUpdate = cartState.cart.find( cartItem => cartItem._id === item._id && cartItem.size === item.size) 
      let itemsInCart = cartState.cart.filter( (cartItem) => (cartItem._id !== item._id && cartItem.size !== item.size) || (cartItem._id === item._id && cartItem.size !== item.size) ) 

      if (itemToUpdate) {
        itemToUpdate.qty += item.qty
      } else {
        itemToUpdate = item
      }
      
      calcSummary({ cart: [...itemsInCart, itemToUpdate] })
    } else {
      calcSummary({ cart: [item] })
    }
  }

  const updateCartQty = (product) => {
    const cart = cartState.cart.map( cartItem => {
      if (cartItem._id === product._id && cartItem.size === product.size) {
        return product
      }
      return cartItem
    })

    calcSummary({ cart })
  }

  const removeCartProduct = (product) => {
    const cart = cartState.cart.filter( (cartItem) => !(cartItem._id === product._id && cartItem.size === product.size) )
    calcSummary({ cart })
  }



  return (
    <CartContext.Provider value={{ ...cartState, setCartState, addItem, updateCartQty, removeCartProduct }}>
      {children}
    </CartContext.Provider>
  )
}