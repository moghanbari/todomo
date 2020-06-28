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
    addTodo(text)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="text"
        placeholder="Add Todo ..."
        value={text}
        onChange={handleTodoTextChange}
      />
      <input type="submit" value="Add Todo" className="" />
    </form>
  )
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
}

export default connect(null, { addTodo })(AddTodo)
