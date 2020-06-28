import React from 'react'

function TodoItem({ todo: { text, completed } }) {
  return (
    <div>
      <p className={completed ? 'completed' : ''}>{text}</p>
    </div>
  )
}

export default TodoItem
