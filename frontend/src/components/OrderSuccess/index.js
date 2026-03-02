import './index.css'

const OrderSuccess = () => {
    return (
        <div className='order-success-container'>
            <h2 className='order-success-text'>Order successfully placed</h2>
            <p className='odrer-text'>
                Order-Id:{" "}
                <span className='order-id-text'></span>
            </p>
            <p className='thankyou-text'>Thank You for your order</p>
        </div>
    )
}

export default OrderSuccess