import {
  getTodosAsync,
  createTodoAsync,
  updateTodoAsync
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

const TOGGLE_TODO_ASYNC_REQUEST = 'TOGGLE_TODO_ASYNC_REQUEST'
const TOGGLE_TODO_ASYNC_SUCCESS = 'TOGGLE_TODO_ASYNC_SUCCESS'
const TOGGLE_TODO_ASYNC_FAILURE = 'TOGGLE_TODO_ASYNC_FAILURE'

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

// actions: Toggle todo
export const toggleTodoAsyncRequest = () => ({
  type: TOGGLE_TODO_ASYNC_REQUEST
})

export const toggleTodoAsyncSuccess = todo => ({
  type: TOGGLE_TODO_ASYNC_SUCCESS,
  payload: todo
})

export const toggleTodoAsyncFailure = () => ({
  type: TOGGLE_TODO_ASYNC_FAILURE
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

// Toggle Todo thunk
export const toggleTodoAsync = id => (dispatch, getState) => {
  dispatch(toggleTodoAsyncRequest())
  const { todos } = getState().todo
  const todo = todos.find(t => t.id === id)
  const toggled = { ...todo, complete: !todo.complete }
  return updateTodoAsync(toggled)
    .then(todo => {
      dispatch(toggleTodoAsyncSuccess(todo))
    })
    .catch(error => {
      dispatch(toggleTodoAsyncFailure())
    })
}

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
        todos: [...state.todos, action.payload]
      }
    case ADD_TODO_ASYNC_FAILURE:
      return {
        ...state,
        server: false,
        error: 'Error adding Todo'
      }
    case TOGGLE_TODO_ASYNC_REQUEST:
      return {
        ...state,
        server: true
      }
    case TOGGLE_TODO_ASYNC_SUCCESS:
      return {
        ...state,
        server: false,
        todos: state.todos.map(t =>
          t.id === action.payload.id ? action.payload : t
        )
      }
    case TOGGLE_TODO_ASYNC_FAILURE:
      return {
        ...state,
        server: false,
        error: 'Error toggling Todo'
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
