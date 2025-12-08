const express = require('express')
const app = express()
app.use(express.json())
const {ObjectId} = require('mongoose').Types
const Cart = require('../models/Cart')
const Product = require('../models/Product')

exports.getCart = async (request, response) => {
    try {
        const userId = request.payload.id
        const cart = await Cart.findOne({user: userId}).populate('items.product')

        if (!cart) {
            return response.json({items: []})
        }

        response.status(200).json(cart)
    } catch (error) {
        console.error('cart error', error)
        response.status(500).json('Server error')
    }
}

exports.addToCart = async (request, response) => {
    try {
        const userId = request.payload.id
        
        const {product, size, qty} = request.body
        const {_id} = product
        console.log(request.body)
        
        if (request.payload && request.payload.id) {

            if (!_id || !size || !qty || qty < 1) {
                return response.status(400).json('Check cart details')
            }

            const product = await Product.findById(_id)

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
                (item) => item.product._id.toString() === _id && item.size === size
            )

            if (itemIndex > -1) {
                cart.items[itemIndex].qty += qty
            } else {
                cart.items.push({
                    product,
                    size,
                    qty
                })
            }

            await cart.save()
            const populated = await cart.populate('items.product')
            response.status(200).json(populated)
        }
    } catch (error) {
        console.error('cart add error', error)
        response.status(500).json('Server error')
    }
}

exports.decreaseItem = async (request, response) => {
    try {
        const userId = request.payload.id
        const {product, qty, size} = request.body
        const {_id} = product
        const idObj = new ObjectId(_id)

        const cart = await Cart.findOne({user: userId})

        if (!cart) {
            return response.status(400).json('Cart not found')
        }

        const itemIndex = cart.items.findIndex(item => 
            item.product._id.toString() === _id && item.size === size
        )

        if (itemIndex > -1) {
            if (cart.items[itemIndex].qty > 1) {
                cart.items[itemIndex].qty += qty
            } else {
                cart.items = cart.items.filter(eachItem => !eachItem.product._id.equals(idObj))
            }
        }
    } catch (error) {
        console.error('Item decrement error', error)
        response.status(500).json('Servor error')
    }
}

exports.removeFromCart = async (request, response) => {
    try {
        const userId = request.payload.id
        
        const {id} = request.body
        const idObj = new ObjectId(id)

        const cart = await Cart.findOne({user: userId})

        if (!cart) {
            return response.status(404).json('Cart not found')
        }

        cart.items = cart.items.filter(eachItem => !eachItem.product._id.equals(idObj))
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