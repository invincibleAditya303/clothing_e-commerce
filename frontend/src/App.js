import { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Cookies from 'js-cookie'

import AllProducts from './components/AllProducts'
import ProductItemDetails from './components/ProductItemDetails'
import CartContext from './context/CartContext'
import Cart from './components/Cart'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

class App extends Component {
  state = {
    cartList: [],
    paymentMethod: '',
    displayMessage: false,
  }

  decrementCartItemQuantity = productId => {
    const {cartList} = this.state
    const deleteItem = cartList.filter(
      eachproduct => eachproduct.id === productId,
    )
    console.log(deleteItem[0])

    if (deleteItem[0].quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachproduct => {
          if (eachproduct.id === productId) {
            const quantity = eachproduct.quantity - 1
            return {...eachproduct, quantity}
          }
          return eachproduct
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.filter(
          eachproduct => eachproduct.id !== productId,
        ),
      }))
    }
  }

  incrementCartItemQuantity = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachproduct => {
        if (eachproduct.id === productId) {
          const quantity = eachproduct.quantity + 1
          return {...eachproduct, quantity}
        }
        return eachproduct
      }),
    }))
  }

  removeAllCartItems = async () => {
    const jwtToken = Cookies.get('userDetails')
    if (!jwtToken) {
      this.setState({ cartList: [] }, () => {
        localStorage.removeItem('cart')
      })
    } else {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart/clear`
      const options = {
        headers: {
          Authorization: `Bearee ${jwtToken}`
        },
        method: 'DELETE'
      }

      const response = await fetch(apiUrl, options)
      if (response.ok) {
        console.log('Cart item deleted')
      }
    }
  }

  removeCartItem = async productId => {
    const jwtToken = Cookies.get('userDetails')

    if (!jwtToken) {
      this.setState(
  prevState => ({
    cartList: prevState.cartList.filter(
      eachproduct => eachproduct.id !== productId
    ),
  }),
  () => {
    localStorage.setItem('cart', JSON.stringify(this.state.cartList))
    }
  )
    } else {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart/remove`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        method: 'POST',
        body: JSON.stringify(productId)
      }

      const response = await fetch(apiUrl, options)
      const action = await response.json()
      console.log(action)
    }
  }

  onClickOrderButton = () => {
    const {paymentMethod} = this.state
    if (paymentMethod === 'COD') {
      this.setState({displayMessage: true})
    }
  }

  addCartItem = async product => {
    const jwtToken = Cookies.get('userDetails')
    if (!jwtToken) {
      this.setState(prevState => {
      const existing = prevState.cartList.find(p => p.id === product.id)
      let updatedCart
      if (existing) {
        updatedCart = prevState.cartList.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        updatedCart = [...prevState.cartList, { ...product, quantity: 1 }]
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return { cartList: updatedCart };
    })
      
    } else {
      const apiUrl = fetch(`${process.env.REACT_APP_API_URL}/api/cart/add`)
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        method: 'POST',
        body: JSON.stringify(product)
      }
      const response = await fetch(apiUrl, options)
      const action = await response.json()
      console.log(action)
    }
  }

  render() {
    const {cartList, paymentMethod, displayMessage} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          paymentMethod,
          displayMessage,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          onChangePaymentMethod: this.onChangePaymentMethod,
          onClickOrderButton: this.onClickOrderButton,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={AllProducts} />
            <Route exact path='/products/:id' component={ProductItemDetails} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/register' component={RegisterForm} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App