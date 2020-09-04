const jwt = require('jsonwebtoken')

const authToken = (...role) => {
    return (request, response, next) => {
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
                const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
                console.log('isi verify >> ', verifyToken)
                console.log(' role >> ', role)
                // console.log('isi verify role >> ', verifyToken.user.role['admin'])
                if (!role.includes(verifyToken.user.role)) {
                    return response.json({
                        status: "error",
                        message: "role not authorized"
                    })
                }
                request.user = verifyToken.user
                console.log('request user proses middleware >> ', request.user)
                next()
            }

        } catch (error) {
            response.status(404).json({
                message: error.message
            })
        }
    }
}

module.exports = {
    authToken
}