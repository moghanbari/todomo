import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateTodo, removeTodo } from '../../redux/actions/todo'

function TodoItem({ todo: { _id, text, completed }, updateTodo, removeTodo }) {
  const [todoText, setTodoText] = useState(text)
  const [doneTypingTimer, setDoneTypingTimer] = useState(null)

  const updateAfterFinishTyping = (inputTextValue) => {
    if (doneTypingTimer != null) {
      setDoneTypingTimer(null)
      clearTimeout(doneTypingTimer)
    }
    setDoneTypingTimer(
      setTimeout(function () {
        updateTodo(_id, inputTextValue, completed)
      }, 1000)
    )
  }

  return (
    <div className="todo-item two-column-wrapper">
      <div className="col1"> </div>
      <div className={`col2 ${completed ? 'completed' : ''}`}>
        <input
          type="checkbox"
          name="markAsComplete"
          className="complete-todo"
          checked={completed === true ? 'checked' : ''}
          onChange={(e) =>
            e.target.checked
              ? updateTodo(_id, text, true)
              : updateTodo(_id, text, false)
          }
        />
        <input
          type="text"
          className="todo-text"
          value={todoText}
          onChange={(e) => {
            setTodoText(e.target.value)
            updateAfterFinishTyping(e.target.value)
          }}
        />
        <span
          className="material-icons float-right icon-button"
          onClick={() => removeTodo(_id)}
          title="delete"
        >
          delete_forever
        </span>
      </div>
    </div>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  updateTodo: PropTypes.func.isRequired,
}

export default connect(null, { updateTodo, removeTodo })(TodoItem)
