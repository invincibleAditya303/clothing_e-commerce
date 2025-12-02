const express = require('express')

const app = express()
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://clothing-e-commerce-two.vercel.app', // Production domain
]

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions))
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