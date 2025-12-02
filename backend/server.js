const express = require('express')

const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

require('dotenv').config()

const PORT = process.env.PORT || 5000

const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)

//Listenting on the port
app.listen(PORT, () => {
    console.log('Server listening on http://localhost:5000')
})