import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchTodosAsync } from '../reducers/todo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons/faSync'
import Todo from './Todo'

class TodoList extends Component {
  componentDidMount = () => {
    this.props.fetchTodosAsync()
  }
  render() {
    const { todos, loading } = this.props
    return (
      <div
        style={{
          display: 'inline-block',
          textAlign: 'left'
        }}
      >
        {loading && (
          <div style={{ marginTop: '20px' }}>
            <FontAwesomeIcon icon={faSync} color="#ccc" spin />
          </div>
        )}
        <ul
          style={{
            listStyle: 'none'
          }}
        >
          {todos.map(t => (
            <Todo key={t.id} text={t.text} complete={t.complete} />
          ))}
        </ul>
      </div>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  fetchTodosAsync: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  todos: state.todos,
  loading: state.loading,
  error: state.error
})

export default connect(
  mapStateToProps,
  { fetchTodosAsync }
)(TodoList)
