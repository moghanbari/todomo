const jwt = require('jsonwebtoken')
// const config = require('config')
const config = require('../config')

// const jwtSecret = process.env.JWTSecret
const { JWTSecret } = config

const authMiddleware = (request, response, next) => {
  const token = request.header('x-auth-token')

  if (!token)
    return response.status(401).json({ msg: 'No token, authorization denied' })

  try {
    const decoded = jwt.verify(token, JWTSecret)
    request.user = decoded
    next()
  } catch (error) {
    console.log(error.message)
    response.status(401).send('Not authorized')
  }
}

module.exports = authMiddleware
