import {
  getTodosAsync,
  createTodoAsync
} from '../lib/todoServices'

const initState = {
  todos: [],
  loading: false,
  server: false,
  error: ''
}

// types
const ADD_TODO_ASYNC_REQUEST = 'ADD_TODO_ASYNC_REQUEST'
const ADD_TODO_ASYNC_SUCCESS = 'ADD_TODO_ASYNC_SUCCESS'
const ADD_TODO_ASYNC_FAILURE = 'ADD_TODO_ASYNC_FAILURE'

const FETCH_TODOS_ASYNC_REQUEST = 'FETCH_TODOS_ASYNC_REQUEST'
const FETCH_TODOS_ASYNC_SUCCESS = 'FETCH_TODOS_ASYNC_SUCCESS'
const FETCH_TODOS_ASYNC_FAILURE = 'FETCH_TODOS_ASYNC_FAILURE'

// actions: Add Todo
export const addTodoAsyncRequest = () => ({
  type: ADD_TODO_ASYNC_REQUEST
})
export const addTodoAsyncSuccess = todo => ({
  type: ADD_TODO_ASYNC_SUCCESS,
  payload: todo
})
export const addTodoAsyncFailure = () => ({
  type: ADD_TODO_ASYNC_FAILURE
})

// actions: Fetch Todo
export const fetchTodosAsyncRequest = () => ({
  type: FETCH_TODOS_ASYNC_REQUEST
})
export const fetchTodosAsyncSuccess = todos => ({
  type: FETCH_TODOS_ASYNC_SUCCESS,
  payload: todos
})
export const fetchTodosAsyncFailure = () => ({
  type: FETCH_TODOS_ASYNC_FAILURE
})

// thunks (async actions)

// Fetch Todos thunk
export const fetchTodosAsync = () => dispatch => {
  dispatch(fetchTodosAsyncRequest())
  return getTodosAsync()
    .then(todos => {
      dispatch(fetchTodosAsyncSuccess(todos))
    })
    .catch(error => {
      dispatch(fetchTodosAsyncFailure())
    })
}

// Add Todo thunk
export const addTodoAsync = text => dispatch => {
  dispatch(addTodoAsyncRequest())
  return createTodoAsync(text)
    .then(todo => {
      dispatch(addTodoAsyncSuccess(todo))
    })
    .catch(error => {
      dispatch(addTodoAsyncFailure(error))
    })
}

// reducer
const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TODO_ASYNC_REQUEST:
      return {
        ...state,
        server: true
      }
    case ADD_TODO_ASYNC_SUCCESS:
      return {
        ...state,
        server: false,
        todos: state.todos.concat(action.payload)
      }
    case ADD_TODO_ASYNC_FAILURE:
      return {
        ...state,
        server: false,
        error: 'Error adding Tood'
      }
    case FETCH_TODOS_ASYNC_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_TODOS_ASYNC_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload
      }
    case FETCH_TODOS_ASYNC_FAILURE:
      return {
        ...state,
        loading: false,
        error: 'Error retrieving Todos'
      }
    default:
      return state
  }
}

export default reducer
