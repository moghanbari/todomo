const express = require('express')
const router = express.Router()

const { check, validationResult } = require('express-validator')

const auth = require('../../middleware/auth')
const checkObjectId = require('../../middleware/checkObjectId')

const Todo = require('../../models/Todos')
const User = require('../../models/User')

/**
 * @route   GET api/todo
 * @desc    Get all todos of a user
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) res.status(401).json({ msg: 'User not found' })

    const todos = await Todo.find({ user: req.user.id }).sort('-date')

    res.json(todos)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }
})

/**
 * @route   POST api/todo
 * @desc    Create a todo
 * @access  Private
 */
router.post(
  '/',
  [
    auth,
    check('text', 'Todo content is required').not().isEmpty(),
    check('text', 'Todo text should at least be 3 characters long').isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { text } = req.body

    try {
      const user = await User.findById(req.user.id)
      if (!user) res.status(401).json({ msg: 'User not found' })

      const newTodo = new Todo({
        user: req.user.id,
        text,
      })

      const todo = await newTodo.save()

      res.json(todo)
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

/**
 * @route   DELETE api/todo/:id
 * @desc    Delete a post
 * @access  Private
 */
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' })
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' })
    }

    await todo.remove()

    res.json({ msg: 'Todo deleted' })
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }
})

/**
 * @route   PUT api/todo/:id
 * @desc    Update todo
 * @access  Private
 */
router.put(
  '/:id',
  [
    auth,
    checkObjectId('id'),
    check('text', 'Todo text should at least be 3 characters long')
      .optional()
      .isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const todo = await Todo.findById(req.params.id)
      if (!todo) {
        return res.status(404).json({ msg: 'Todo not found' })
      }

      if (todo.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' })
      }

      const { text, completed } = req.body
      if (text) {
        todo.text = text
      }
      todo.completed = completed
      await todo.save()

      res.json(todo)
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
