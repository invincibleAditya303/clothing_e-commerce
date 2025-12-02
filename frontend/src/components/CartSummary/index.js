import Popup from 'reactjs-popup'

import {MdClose} from 'react-icons/md'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        paymentMethod,
        displayMessage,
        onClickOrderButton,
      } = value

      const orderAmount = cartList.map(
        eachProduct => eachProduct.price * eachProduct.quantity,
      )

      console.log(orderAmount)

      const initialValue = 0
      const totalAmount = orderAmount.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      )


      console.log(totalAmount)

      console.log(displayMessage)
      console.log(paymentMethod)

      const onClickConfirmButton = () => onClickOrderButton()

      const orderQuantity = cartList.length
      const buttonHighlight = displayMessage ? 'highlight' : ''
      return (
        <div className="cart-summary-container">
          <h1 className="order-heading">
            Order Total:
            <span className="order-amount">Rs {totalAmount}/-</span>
          </h1>
          <p className="order-quantity">{orderQuantity} items in cart</p>
          <Popup
            modal
            trigger={
              <button className="checkout-button" type="button">
                Checkout
              </button>
            }
          >
            {close => (
              <>
                <div className="confirm-order-container">
                  <button
                    className="close-button"
                    type="button"
                    onClick={() => close()}
                  >
                    <MdClose className="close-icon" />
                  </button>
                  <div className="payment-container">
                    
                    <div className="order-summary-container">
                      <p className="confirm-order-text">
                        Total Items:
                        <span className="order-highlight">{orderQuantity}</span>
                      </p>
                      <p className="confirm-order-text">
                        Total Amount:
                        <span className="order-highlight">{totalAmount}</span>
                      </p>
                    </div>
                    <button
                      className={`confirm-button ${buttonHighlight}`}
                      onClick={onClickConfirmButton}
                    >
                      Confirm Order
                    </button>
                    {displayMessage && (
                      <p className="confirm-text">
                        Your order has been placed successfully
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
