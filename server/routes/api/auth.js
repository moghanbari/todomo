import { Router } from 'express'
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import auth from '../../middleware/auth'
import config from '../../config'

import User from '../../models/user'

const { JWT_SECRET } = config

const router = Router()

/**
 * @route   POST api/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post('/register', async (request, response) => {
  const { name, email, password } = request.body

  // Simple validation
  if (!name || !email || !password) {
    return response.status(400).json({ msg: 'Please enter all fields' })
  }

  try {
    const user = await User.findOne({ email })
    if (user) throw Error('User already existed')

    const salt = await bycrypt.genSalt(10)
    if (!salt)
      throw Error('Something went wrong when creating of salt for bycrypt')

    const hash = await bycrypt.hash(password, salt)
    if (!hash) throw Error('Something went wrong hashing the password')

    const newUser = new User({
      name,
      email,
      password: hash,
    })
    const savedUser = await newUser.save()
    if (!savedUser) throw Error('Something went wrong saving the user')

    const token = jwt.sign({ id: savedUser.id }, JWT_SECRET, {
      expiresIn: 3600,
    })

    response.status(200).json({
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      },
    })
  } catch (error) {
    response.status(400).json({ msg: error.message })
  }
})

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */
router.get('/user', auth, async (request, response) => {
  try {
    const user = await User.findById(request.user.id).select('-password')
    if (!user) throw Error('User Does not exist')

    response.json(user)
  } catch (e) {
    response.status(400).json({ msg: e.message })
  }
})

export default router
