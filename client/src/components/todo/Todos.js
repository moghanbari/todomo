import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTodos } from '../../redux/actions/todo'
import TodoItem from './TodoItem'

function Todos({ getTodos, todo: { todos, loading } }) {
  useEffect(() => {
    getTodos()
  }, [getTodos])

  return (
    <div className="todos">
      <h1>Todos</h1>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  )
}

Todos.prototype = {
  getTodos: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  todo: state.todo,
})

export default connect(mapStateToProps, { getTodos })(Todos)
