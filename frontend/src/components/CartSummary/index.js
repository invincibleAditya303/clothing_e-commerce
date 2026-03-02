import Cookies from 'js-cookie'

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
        onChangePaymentMethod
      } = value

      const jwtToken = Cookies.get('userDetails')

      let orderAmount

      if (jwtToken) {
         orderAmount = cartList.map(
          eachProduct => eachProduct.product.price * eachProduct.qty,
        )
      } else {
        orderAmount = cartList.map(
          eachProduct => eachProduct.price * eachProduct.qty
        )
      }

      console.log(orderAmount)

      const initialValue = 0
      const totalAmount = orderAmount.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      )

      const onChangePayment = event => onChangePaymentMethod(event.target.value)



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
                    <div className="payment-container">
                      <input
                        type="radio"
                        name="payment"
                        id="card"
                        value="CARD"
                        onChange={onChangePayment}
                      />
                      <label htmlFor="card" className="payment-label">
                        Card
                      </label>
                    </div>
                    <div className="payment-container">
                      <input
                        type="radio"
                        name="payment"
                        id="netBanking"
                        value="NETBANKING"
                        onChange={onChangePayment}
                      />
                      <label htmlFor="netBanking" className="payment-label">
                        Net Banking
                      </label>
                    </div>
                    <div className="payment-container">
                      <input
                        type="radio"
                        name="payment"
                        id="upi"
                        value="UPI"
                        onChange={onChangePayment}
                      />
                      <label htmlFor="upi" className="payment-label">
                        UPI
                      </label>
                    </div>
                    <div className="payment-container">
                      <input
                        type="radio"
                        name="payment"
                        id="wallet"
                        value="WALLET"
                        onChange={onChangePayment}
                      />
                      <label htmlFor="wallet" className="payment-label">
                        Wallet
                      </label>
                    </div>
                    <div className="payment-container">
                      <input
                        type="radio"
                        name="payment"
                        id="cod"
                        value="COD"
                        onChange={onChangePayment}
                      />
                      <label htmlFor="cod" className="payment-label">
                        Cash On Delivery
                      </label>
                    </div>
                    <div className="order-summary-container">
                      <p className="confirm-order-text">
                        Total Items:{" "}
                        <span className="order-highlight">{orderQuantity}</span>
                      </p>
                      <p className="confirm-order-text">
                        Total Amount:{" "}
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
