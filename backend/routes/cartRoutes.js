const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cartController')
const authOptional = require('../middleware/authOptional')

// Get cart items
router.get('/', authOptional, cartController.getCart)

// Add to cart
router.post('/add', authOptional, cartController.addToCart)

// Increase qty of Item
router.put('/items/increase', authOptional, cartController.increaseItem)

// Decrease qty of Item
router.put('/items/decrease', authOptional, cartController.decreaseItem)

//Remove from cart
router.post('/remove', authOptional, cartController.removeFromCart)

//Clear cart
router.delete('/clear', authOptional, cartController.clearCart)

module.exports = router