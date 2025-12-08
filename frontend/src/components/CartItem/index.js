import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const jwtToken = Cookies.get('userDetails')

      const {cartItemDetails} = props

      let product = {}
      let _id, name, price, image, size, qty

      if (jwtToken) {
        ({product, size, qty} = cartItemDetails ?? {});
        ({_id, name, price, image} = product ?? {});
      } else {
        ({_id, name, price, image, size, qty} = cartItemDetails ?? {});
      }

      console.log(_id)

      const onRemoveCartItem = () => {
        removeCartItem(_id)
      }

      const onIncrementItemQuantity = () => incrementCartItemQuantity(cartItemDetails)
      const onDecrementItemQuantity = () => decrementCartItemQuantity(cartItemDetails)

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={image} alt={name} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{name}</p>
              <p className="cart-product-brand">size: {size}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onDecrementItemQuantity}
                data-testid="minus"
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="cart-quantity">{qty}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onIncrementItemQuantity}
                data-testid="plus"
              >
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">Rs {price * qty}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
                testid="remove"
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
            data-testid="remove"
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
