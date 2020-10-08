const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Todo = mongoose.model('todo', todoSchema)
module.exports = Todo
