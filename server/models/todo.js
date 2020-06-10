import { Schema, model } from 'mongoose'

const TodoSchema = new Schema({
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

const Todo = model('todo', TodoSchema)

export default Todo
