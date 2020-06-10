import { Router } from 'express'
import Todo from '../../models/todo'
import auth from '../../middleware/auth'

const router = Router()

/**
 * @route   PORT api/todos
 * @desc    Create a new todo item
 * @access  Private
 */
router.post('/', auth, async (request, response) => {
  const { text, user_id } = request.body

  // validation
  if (!text || !user_id)
    return response.status(400).json({ msg: 'Please enter all fields' })

  const newTodo = new Todo({
    text,
    is_completed: false,
    user_id,
  })

  // Create salt & hash
  newTodo.save().then((todo) => {
    response.json({
      todo: {
        id: todo.id,
        text: todo.text,
      },
    })
  })
})

/**
 * @route   GET api/todos
 * @desc    Get all todos for current user
 * @access  Private
 */
router.get('/', auth, async (request, response) => {
  try {
    const todos = await Todo.find({ user_id: request.user.id })
    response.json(todos)
  } catch (error) {
    response.status(400).json({ msg: error.message })
  }
})

export default router
