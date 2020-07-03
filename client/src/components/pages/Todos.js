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
    <main>
      <section className="todos container mt-100">
        <h1 className="header-h1 mb-40">Todos</h1>
        <AddTodo />
        <div className="todos-list">
          {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </div>
      </section>
    </main>
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
