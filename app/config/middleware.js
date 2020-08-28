require('dotenv').config()
const jwt = require('jsonwebtoken')

const authToken = (request, response, next) => {
    try {
        const authHeader = request.headers.authorization
        console.log('if exist => ', authHeader)
        if (!authHeader) {
            console.log('cek header => ', authHeader)
            return response.status(401).json({
                message: 'Empty Headers..check it first'
            })
        } else {
            console.log('header cek => ', authHeader)
            const token = authHeader.split(' ')[1]
            if (!token) return response.status(401)
            // const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
            //     if (err) {
            //         return response.status(403)
            //     }
            //     request.userData = userData
            //     next()
            // })
            const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            request.user = verifyToken.user
            console.log('request user proses middleware >> ', request.user)

            // response.status(200).json({
            //     message: request.userData.user
            // })
            next()
            // console.log('verify token => ', verifyToken)
        }

    } catch (error) {
        response.status(404).json({
            message: 'TOKEN NOT FOUND'
        })
    }
}

module.exports = {
    authToken
}