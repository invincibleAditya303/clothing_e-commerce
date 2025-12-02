const Cart = require('../models/Cart')
const Product = require('../models/Product')

exports.getCart = async (request, response) => {
    try {
        const userId = request.payload.id
        const cart = await Cart.findOne({user: userId}).populate('items.product')

        if (!cart) {
            return response.json({items: []})
        }

        response.json(cart)
    } catch (error) {
        console.error('cart error', error)
        response.status(500).json('Server error')
    }
}

exports.addToCart = async (request, response) => {
    try {
        const userId = request.payload.id
        
        const {productId, size, qty} = request.body

        if (!productId || !size || !qty || qty < 1) {
            return response.status(400).json('Check cart details')
        }

        const product = await Product.findById(productId)

        if (!product) {
            return response.status(404).json('Product not found')
        }

        let cart = await Cart.findOne({user: userId})
        
        if(!cart) {
            cart = new Cart ({
                user: userId,
                items: []
            })
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId && item.size === size
        )

        if (itemIndex > -1) {
            cart.items[itemIndex].qty += qty
        } else {
            cart.items.push({
                product: productId,
                size,
                qty
            })
        }

        await cart.save()
        const populated = await cart.populate('items.product')
        response.status(200).json(populated)
    } catch (error) {
        console.error('cart add error', error)
        response.status(500).json('Server error')
    }
}

exports.removeFromCart = async (request, response) => {
    try {
        const userId = request.payload.id
        
        const {productId} = request.body

        if (!productId) {
            return response.status(400).json('Check cart details')
        }

        const cart = await Cart.findOne({user: userId})

        if (!cart) {
            return response.status(404).json('Cart not found')
        }

        cart.items = cart.items.filter(
            (item) => item.product.toString() === productId && item.size === size
        )

        if (itemIndex > -1) {
            cart.items[itemIndex].qty += qty
        } else {
            cart.items.push({
                product: productId,
                size,
                qty
            })
        }

        await cart.save()
        const populated = await cart.populate('items.product')
        response.status(200).json(populated)
    } catch (error) {
        console.error('cart add error', error)
        response.status(500).json('Server error')
    }
}

exports.clearCart = async (request, response) => {
    try {
        const userId = request.payload.id

        await Cart.findOneAndDelete({user: userId})
        response.json({items: []})
    } catch (error) {
        console.error('cart clear error', error)
        response.status(500).json('Server error')
    }
}