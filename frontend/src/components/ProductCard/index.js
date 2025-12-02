import {Link} from 'react-router-dom'

import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {name, imageUrl, stock, price, id} = productData

  return (
    <li className="product-item">
      <Link to={`/products/${id}`} className="link-item">
        <img src={imageUrl} alt="product" className="thumbnail" />
        <h1 className="title">{name}</h1>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
          {stock > 0 && <p className='price'>Instock</p>}
          {stock===0 && <p className='price'>Nostock</p>}
        </div>
      </Link>
    </li>
  )
}
export default ProductCard