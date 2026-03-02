import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  displayMessage: false,
  paymmentMethod: '',
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  onChangePaymentMethod: () => {},
  onClickOrderButton: () => {},
})

export default CartContext
