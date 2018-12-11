import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodoAsync } from '../reducers/todo'

class TodoForm extends Component {
  handleSubmit = evt => {
    evt.preventDefault()
    this.props.addTodoAsync(evt.target.todoInput.value)
    evt.target.todoInput.value = ''
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="todoInput" />
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { addTodoAsync }
)(TodoForm)
