import jwt from 'jsonwebtoken'
import config from '../config'

const { JWT_SECRET } = config

const jwtMiddleWare = (request, response, next) => {
  const token = request.header('x-auth-token')

  if (!token)
    return response.status(401).json({ msg: 'No token, authorization denied' })

  try {
    // verify token
    const decoded = jwt.verify(token, JWT_SECRET)
    request.user = decoded
    next()
  } catch (error) {
    response.status(400).json({ msg: error.message })
  }
}

export default jwtMiddleWare
