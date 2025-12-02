const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Product = require('../models/Product')

exports.createOrder = async (request, response) => {
  try {
    const userId = request.payload.id

    const { items, totalPrice, status } = req.body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return response.status(400).json('Order must include at least one item')
    }

    for (const it of items) {
      const prod = await Product.findById(it.product);
      if (!prod) {
        return res.status(400).json(`Product not found: ${it.product}`)
      }
    }

    const order = new Order({
      user: userId,
      items,
      totalPrice,
      orderDate: new Date(),
      status: status || 'pending'
    })

    const saved = await order.save()

    // Optional: clear cart for user
    await Cart.findOneAndDelete({ user: userId })

    res.status(201).json(saved)
  } catch (err) {
    console.error('Error in createOrder:', err)
    response.status(500).json({ message: 'Server error' })
  }
}

exports.getUserOrders = async (request, response) => {
  try {
    const userId = req.payload.id
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 })
    response.json(orders)
  } catch (err) {
    console.error('Error in getUserOrders:', err)
    res.status(500).json('Server error' )
  }
}

exports.getOrderById = async (request, response) => {
  try {
    const userId = request.payload.id

    const order = await Order.findById(userId)
    if (!order) {
      return response.status(404).json({ message: 'Order not found' })
    }

    // optional: ensure user owns the order (or is admin)
    if (order.user.toString() !== userId.toString()) {
      return response.status(403).json('Forbidden')
    }

    res.json(order);
  } catch(error) {
    console.error('Order error', error)
    response.status(500).json('Server error')
  }
}