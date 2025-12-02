const express = require('express')
const router = express.Router()

const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')

// Create new order
router.post('/', authMiddleware, orderController.createOrder)

// Get user orders
router.get('/', authMiddleware, orderController.getUserOrders)

// Get specific order
router.get('/:id', authMiddleware, orderController.getOrderById)

module.exports = router