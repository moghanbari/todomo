import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../../redux/actions/todo'
import PropTypes from 'prop-types'

function AddTodo({ addTodo }) {
  const [text, setText] = useState('')

  const handleTodoTextChange = (e) => {
    e.preventDefault()
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.length > 2) {
      addTodo(text)
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="add-todo two-column-wrapper">
        <div className="col1">
          <span className="plus">+</span>
        </div>
        <div className="col2">
          <input
            className="add-todo-text input-field"
            type="text"
            name="text"
            placeholder="Add Todo ..."
            value={text}
            onChange={handleTodoTextChange}
          />
          <input type="submit" value="Add Todo" className="" />
        </div>
      </div>
    </form>
  )
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
}

export default connect(null, { addTodo })(AddTodo)
