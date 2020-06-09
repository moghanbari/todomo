const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  is_completed: {
    type: Boolean,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  issued_date: {
    type: Date,
    default: Date.now,
  },
})

const Todo = mongoose.model('todo', TodoSchema)

module.exports = Todo
