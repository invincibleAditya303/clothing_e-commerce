const jwt = require('jsonwebtoken')

const authenticationToken = (request, response, next) => {
    let jwtToken
    const authHeader = request.headers['authorization']
    
    if (authHeader !== undefined) {
        jwtToken = authHeader.split(' ')[1]
    }

    if (jwtToken === undefined) {
        return response.status(401).json('Authentication Error')
    }

    jwt.verify(jwtToken, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            return response.status(401).json('Invalid JWT token')
        } else {
            request.payload = payload
            next()
        }
    })
}

module.exports = authenticationToken