import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTodos } from '../../redux/actions/todo'
import TodoItem from '../todo/TodoItem'
import AddTodo from '../todo/AddTodo'

function Todos({ getTodos, todo: { todos, loading } }) {
  useEffect(() => {
    getTodos()
  }, [getTodos])

  return (
    <div className="todos container mt-100">
      <h1>Todos</h1>
      <AddTodo />
      <div className="todos-list">
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </div>
    </div>
  )
}

Todos.prototype = {
  getTodos: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  todo: state.todo,
})

export default connect(mapStateToProps, { getTodos })(Todos)
