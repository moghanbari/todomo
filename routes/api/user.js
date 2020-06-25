const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')

const JWTSecret = config.get('JWTSecret')

/**
 * @route   POST api/users
 * @desc    Create/Register a user
 * @access  Public
 */
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = request.body

    try {
      // See if user exists
      const user = await User.findOne({ email })
      if (user) throw Error('User already existed')

      // Encrypt password
      const salt = await bcrypt.genSalt(10)
      if (!salt) throw Error('Salt creation went wrong!')

      const hashedPassword = await bcrypt.hash(password, salt)
      if (!hashedPassword) throw Error("Couldn't hash the password")

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      })
      const savedUser = await newUser.save()
      if (!savedUser) throw Error('Something went wrong saving the user')

      const token = jwt.sign({ id: savedUser.id }, JWTSecret, {
        expiresIn: 360000,
      })

      response.json({
        token,
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email,
        },
      })
    } catch (error) {
      response.status(400).json({ errors: [{ msg: error.message }] })
    }
  }
)

module.exports = router
