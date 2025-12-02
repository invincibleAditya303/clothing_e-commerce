import {Component} from 'react'
import {RingLoader} from 'react-spinners'
import Cookies from 'js-cookie'

import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'T-Shirt',
    categoryId: '1',
  },
  {
    name: 'Hoodie',
    categoryId: '2',
  },
  {
    name: 'Jeans',
    categoryId: '3',
  },
  {
    name: 'Jacket',
    categoryId: '4',
  },
  {
    name: 'Dress',
    categoryId: '5',
  },
  {
    name: 'Shirt',
    categoryId: '6',
  },
  {
    name: 'Shorts',
    categoryId: '7',
  },
  {
    name: 'Pants',
    categoryId: '8',
  }
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const sizesList = [
  {
    sizeId: '1',
    size: 'XS',
  },
  {
    sizeId: '2',
    size: 'S',
  },
  {
    sizeId: '3',
    size: 'M',
  },
  {
    sizeId: '4',
    size: 'L',
  },
  {
    sizeId: '5',
    size: 'XL',
  },
  {
    sizeId: '6',
    size: '30',
  },
  {
    sizeId: '7',
    size: '32',
  },
  {
    sizeId: '8',
    size: '34',
  },
  {
    sizeId: '9',
    size: '36',
  }
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortbyOptions[0].optionId,
    activeCategoryId: '',
    searchInput: '',
    activeSizeId: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('userDetails')
    const {activeOptionId, activeCategoryId, searchInput, activeSizeId} =
      this.state
    let activeSize = ''
    let activeCategory = ''
    if (activeSizeId !== '') activeSize = sizesList.filter(size => size.sizeId === activeSizeId)[0].size
    if (activeCategoryId !== '') activeCategory = categoryOptions.filter(category => category.categoryId === activeCategoryId)[0].name
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/products?sort_by=${activeOptionId}&category=${activeCategory}&search=${searchInput}&size=${activeSize}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.map(product => ({
        name: product.name,
        description: product.description,
        price: product.price,
        id: product._id,
        imageUrl: product.image,
        sizes: product.sizes,
        stock: product.stock
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <RingLoader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsListView = () => {
    const {productsList, activeOptionId} = this.state
    const shouldShowProductsList = productsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <Header />
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  clearFilters = () => {
    this.setState(
      {
        searchInput: '',
        activeCategoryId: '',
        activeSizeId: '',
      },
      this.getProducts,
    )
  }

  changeSize = activeSizeId => {
    this.setState({activeSizeId}, this.getProducts)
  }

  changeCategory = activeCategoryId => {
    this.setState({activeCategoryId}, this.getProducts)
  }

  enterSearchInput = () => {
    this.getProducts()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  render() {
    const {activeCategoryId, searchInput, activeSizeId} = this.state

    return (
      <div className="all-products-section">
        <FiltersGroup
          searchInput={searchInput}
          categoryOptions={categoryOptions}
          sizesList={sizesList}
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
          activeCategoryId={activeCategoryId}
          activeSizeId={activeSizeId}
          changeCategory={this.changeCategory}
          changeSize={this.changeSize}
          clearFilters={this.clearFilters}
        />
        {this.renderAllProducts()}
      </div>
    )
  }
}

export default AllProductsSection
