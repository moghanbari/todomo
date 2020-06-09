const router = require('express').Router()
const Todo = require('../../models/todo')

/**
 * @route   PORT api/todos
 * @desc    Create a new todo item
 * @access  Private
 */
router.post('/', (request, response) => {
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

module.exports = router
