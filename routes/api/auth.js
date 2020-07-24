const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
// const config = require('config')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')
const jwtSecret = process.env.JWTSecret

/**
 * @route   GET /api/auth
 * @desc    get a user by jwt token
 * @access  Public
 */
router.get('/', auth, async (request, response) => {
  try {
    const { id } = request.user
    const user = await User.findById(id).select('-password')
    response.json(user)
  } catch (error) {
    console.log(error.message)
    response.status(500).send('Server error')
  }
})

/**
 * @route   POST api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter password').exists(),
  ],
  async (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }

    try {
      const { email, password } = request.body

      const user = await User.findOne({ email })
      if (!user) throw Error('Invalid credentials')

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) throw Error('Invalid credentials')

      const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: 3600 })
      if (!token) throw Error('Couldnt sign the token')

      response.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      })
    } catch (error) {
      response.status(400).json({ errors: [{ msg: error.message }] })
    }
  }
)

module.exports = router
