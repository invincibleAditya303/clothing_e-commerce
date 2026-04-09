import { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
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

  componentDidMount() {
    this.fetchCartDetails()
  }
  
  fetchCartDetails = async () => {
    const jwtToken = Cookies.get('userDetails')
  
    if (jwtToken) {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
         }
      }
  
      const response = await fetch(apiUrl, options)
      const data = await response.json()
  
      this.setState({cartList: data.items})
    } else {
      const savedCart = localStorage.getItem('cart')
      const cart = savedCart? JSON.parse(savedCart) : []
      this.setState({cartList: cart})
    }
  }

  decrementCartItemQuantity = async (product) => {
    const jwtToken = Cookies.get('userDetails')
    if (!jwtToken) {
      const {cartList} = this.state
      const deleteItem = cartList.filter(
        eachproduct => eachproduct.id === product.id,
      )

      if(deleteItem[0].qty > 1) {
        this.setState(prevState => ({
          cartList: prevState.cartList.map(eachproduct => {
            if (eachproduct._id === product._id) {
              const qty = eachproduct.qty - 1
              return {...eachproduct, qty}
            }
            return eachproduct
          }),
        }), () => {
              localStorage.setItem('cart', JSON.stringify(this.state.cartList))
        })
      }
    } else {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart/items/decrease`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(product)
      }
      const response = await fetch(apiUrl, options)
      const action = await response.json()
      console.log(action)
      window.location.reload()
    }
  }

  incrementCartItemQuantity = async (product) => {
    const jwtToken = Cookies.get('userDetails')
    if (!jwtToken) {
      this.setState(prevState => {
        const existing = prevState.cartList.find(p => p._id === product._id)
        let updatedCart
        if (existing) {
          updatedCart = prevState.cartList.map(p =>
            p._id === product._id ? { ...p, quantity: p.qty + 1 } : p
          );
        } else {
            updatedCart = [...prevState.cartList, { ...product }];
        }
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        return { cartList: updatedCart };
      })
    } else {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart/items/increase`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(product)
      }
      const response = await fetch(apiUrl, options)
      const action = await response.json()
      console.log(action)
      window.location.reload()
    }
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
          Authorization: `Bearer ${jwtToken}`
        },
        method: 'DELETE'
      }

      const response = await fetch(apiUrl, options)
      if (response.ok) {
        console.log('Cart item deleted')
        window.location.reload()
      }
    }
  }

  removeCartItem = async productId => {
    const jwtToken = Cookies.get('userDetails')

    if (!jwtToken) {
      this.setState(
        prevState => ({
        cartList: prevState.cartList.filter(
        eachproduct => eachproduct._id !== productId
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
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({id: productId})
      }

      const response = await fetch(apiUrl, options)
      const data = await response.json()
      console.log(data)
      window.location.reload()
    }
  }

  onChangePaymentMethod = paymentOption => {
    this.setState({paymentMethod: paymentOption})
  }

  onClickOrderButton = () => {
    const {paymentMethod} = this.state
    const jwtToken = Cookies.get('userDetails')
    if (!jwtToken) {
      console.log(this.props.history)
      this.props.history.replace('/login')
    } else {
      if (paymentMethod === 'COD') {
        this.setState({displayMessage: true})
      }
    }
  }

  addCartItem = async (product) => {
    const jwtToken = Cookies.get('userDetails')
    if (!jwtToken) {
      this.setState(prevState => {
        const existing = prevState.cartList.find(p => p._id === product._id)

        let updatedCart
        if (existing) {
          updatedCart = prevState.cartList.map(p =>
            p._id === product._id ? { ...p, qty: p.qty + (product.qty || 1) } : p
          )
        } else {
          if (prevState.cartList === undefined){
            prevState.cartList = []
          }
          updatedCart = [...prevState.cartList, { ...product, qty: (product.qty || 1) }]
        }
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        return { cartList: updatedCart }
      })
      
    } else {
      console.log(product)
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/cart/add`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(product)
      }
      const response = await fetch(apiUrl, options)
      const action = await response.json()
      console.log(action)
      window.location.reload()
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
          onClickOrderButton: this.onClickOrderButton,
          onChangePaymentMethod: this.onChangePaymentMethod
        }}
      >
        <Switch>
          <Route exact path='/' component={AllProducts} />
          <Route exact path='/products/:id' component={ProductItemDetails} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/login' component={LoginForm} />
          <Route exact path='/register' component={RegisterForm} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default withRouter(App)