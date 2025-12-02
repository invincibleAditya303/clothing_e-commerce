const jwt = require('jsonwebtoken')

const optionalAuthenticationToken = async (request, response, next) => {
    try {
        const authHeader = request.headers['authorization']

        if (authHeader === undefined) {
            request.payload = null
            return next()
        }

        const jwtToken = authHeader.split(' ')[1]

        if (jwtToken === undefined) {
            request.payload = null
            return next()
        }

        jwt.verify(jwtToken, process.env.JWT_SECRET, (error, payload) => {
            if (error) {
                request.payload = null
            } else {
                request.payload = payload
            }

            next()
        })
    } catch (error) {
        response.status(500).json('Internal server error')
    }
}

module.exports = optionalAuthenticationToken