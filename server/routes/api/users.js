import { Router } from 'express'
import User from '../../models/user'

const router = Router()

/**
 * @route GET api/users
 * @desc Get all users
 * @access Private
 */
router.get('/', async (request, response) => {
  try {
    const users = await User.find()
    if (!users) response.status(400).json({ msg: 'No users exists' })
    response.json(users)
  } catch (error) {
    throw Error(error.message)
  }
})

export default router
