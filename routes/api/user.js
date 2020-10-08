const express = require('express')
const router = express.Router()

const config = require('../../config')

const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = require('../../middleware/auth')

const User = require('../../models/User')

const { JWT_SECRET } = config

/**
 * @route   POST api/user
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
      if (user) res.status(401).json({ msg: 'User already existed' })

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

      const token = jwt.sign({ id: savedUser.id }, JWT_SECRET, {
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

/**
 * @route   PUT api/user
 * @desc    Update a user info except password
 * @access  Private
 */
router.put(
  '/',
  [auth, check('name', 'Name is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id)
      if (!user) res.status(404).json({ msg: 'User not found' })

      const { name } = req.body

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          name,
        },
        { new: true }
      ).select('-password')

      res.json(updatedUser)
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

/**
 * @route   PUT api/user
 * @desc    Update a user password
 * @access  Private
 */
router.put(
  '/password',
  [
    auth,
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id)
      if (!user) res.status(404).json({ msg: 'User not found' })

      const { password } = req.body

      // Encrypt password
      const salt = await bcrypt.genSalt(10)
      if (!salt) throw Error('Salt creation went wrong!')

      const hashedPassword = await bcrypt.hash(password, salt)
      if (!hashedPassword) throw Error("Couldn't hash the password")

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          password: hashedPassword,
        },
        { new: true }
      ).select('-password')

      res.json(updatedUser)
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
