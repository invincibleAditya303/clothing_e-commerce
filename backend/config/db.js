const mongoose = require('mongoose')
require('dotenv').config()

//Connecting to Server
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')
    } catch(error) {
        console.error('Connection Falied', error)
    }  
}

module.exports = connectDB