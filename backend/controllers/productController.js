const Product = require('../models/Product')

exports.getAllProducts = async (request, response) => {
    try {
        const {category, size, minPrice, maxPrice, page, limit, search} = request.query
        let query = {}

        if (search) {
            query.$or = [
                {name: new RegExp(search, 'i')},
                {description: new RegExp(search, 'i')}
            ]
        }

        if (category && category !== 'All') query.category = category
        if (size) query.sizes = size
        if (minPrice || maxPrice) {
            query.price = {}
            if (minPrice) query.price.$gte = minPrice
            if (maxPrice) query.price.$lte = maxPrice
        }

        const products = await Product.find(query).skip((page-1) * limit).limit(limit)
        response.status(200).json(products)
    } catch (error) {
        response.status(400).json(`${error.message}`)
    }
}

exports.getProductById = async (request, response) => {
    try {
        const {id} = request.params
        const product = await Product.findById(id)

        if (!product) {
            response.status(404).json('Product not found')
        }

        response.status(200).json(product)
    } catch(error) {
        response.status(500).json(`${error.message}`)
    }
}