import Cookies from 'js-cookie'

import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      console.log(cartList)
      const jwtToken = Cookies.get('userDetails')
      console.log(jwtToken)

      return (
        <ul className="cart-list">
          {jwtToken &&
            cartList.length > 0 && cartList.map(eachCartItem => (
              <CartItem key={eachCartItem._id} cartItemDetails={eachCartItem} />
            ))
          } 
          {!jwtToken && 
            cartList.length > 0 && cartList.map(eachCartItem => (
              <CartItem key={eachCartItem._id} cartItemDetails={eachCartItem} />
            ))
          }
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView