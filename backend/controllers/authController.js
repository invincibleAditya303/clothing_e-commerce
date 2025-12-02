const User = require('../models/User')
const Cart = require('../models/Cart')
const express = require('express')
const app = express()
app.use(express.json())
express
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateToken = user => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'})
}

exports.register = async (request, response) => {
    try {
        const {name, email, password} = request.body
        console.log(request.body)

        const isExistingUser = await User.findOne({email})

        if (isExistingUser) {
            return response.status(400).json('User already exists')
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            password: hashedpassword,
            role: 'user'
        })

        await user.save()
        response.status(200).json('User regsitered successfully')
    } catch (error) {
        console.error('Error while Registration', error)
        response.status(500).json('Server error')
    }  
}

exports.login = async (request, response) => {
    try {
        const {email, password, guestCart} = request.body

        const user = await User.findOne({email})
        console.log(user)

        if (!user) {
            return response.status(401).json('Invalid User')
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return response.status(401).json('Invalid password')
        }

        const userCart = await Cart.findOne({ userId: user._id })

        let mergedCartItems = []

        if (userCart && Array.isArray(userCart.items)) {
            mergedCartItems = [...userCart.items]
        }

        const guestItems = (guestCart && Array.isArray(guestCart.items)) ? guestCart.items : []
        guestItems.forEach(gItem => {
            const existing = mergedCartItems.find(
                uItem => uItem.productId === gItem.productId
            )
            if (existing) {
                existing.quantity += gItem.quantity
            } else {
            mergedCartItems.push({ productId: gItem.productId, quantity: gItem.quantity })
            }
        })
        const token = generateToken()
        response.status(200).json(token)
    } catch (error) {
        console.error('Login error', error)
        response.status(500).json('Server error')
    }
}