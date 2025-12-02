const express = require('express')
const router = express.Router()

const productController = require('../controllers/productController')
const authOptional = require('../middleware/authOptional')

// Get all products
router.get('/',authOptional, productController.getAllProducts)

// Get product details
router.get('/:id', authOptional, productController.getProductById)

module.exports = router
