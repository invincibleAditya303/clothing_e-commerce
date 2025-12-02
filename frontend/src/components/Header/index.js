import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import { MdLogin } from "react-icons/md"
import { IoMdPower } from "react-icons/io"

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('userDetails')
  }

  const jwtToken = Cookies.get('userDetails')

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dtrjr55q7/image/upload/v1744568132/shopping-cart-3d-render-icon_gmd4xd.jpg"
              alt="website logo"
            />
          </Link>

          {jwtToken && 
            <button
              type="button"
              className="nav-mobile-btn"
              onClick={onClickLogout}
            >
              <IoMdPower size={26} />
            </button>}
            {!jwtToken && 
            <Link to='/login'>
              <button
                type="button"
                className="nav-mobile-btn"
              >
                <MdLogin size={26} />
              </button>
            </Link>}
        </div>

        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dtrjr55q7/image/upload/v1744568132/shopping-cart-3d-render-icon_gmd4xd.jpg"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Products
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/cart" className="nav-link">
                Cart
                {renderCartItemsCount()}
              </Link>
            </li>
          </ul>
          {jwtToken && <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>}
          {!jwtToken && 
            <Link to='/login'>
              <button
                type="button"
                className="logout-desktop-btn"
              >
                Login
              </button>
          </Link>}
        </div>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="nav-bar-img"
              />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/products" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="nav products"
                className="nav-bar-img"
              />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link to="/cart" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className="nav-bar-img"
              />
              {renderCartItemsCount()}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
