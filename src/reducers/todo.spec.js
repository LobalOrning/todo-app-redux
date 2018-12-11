import {
  fetchTodosAsync,
  fetchTodosAsyncRequest,
  fetchTodosAsyncFailure,
  fetchTodosAsyncSuccess,
  addTodoAsync,
  addTodoAsyncRequest,
  addTodoAsyncSuccess,
  addTodoAsyncFailure,
  toggleTodoAsync,
  toggleTodoAsyncRequest,
  toggleTodoAsyncSuccess,
  toggleTodoAsyncFailure
} from './todo'

import reducer from './todo'

import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
afterEach(() => {
  fetchMock.restore()
})

describe('reducer', () => {
  test('should return state', () => {
    const state = reducer(undefined, {})
    const expectedState = {
      todos: [],
      loading: false,
      server: false,
      error: ''
    }

    expect(state).toEqual(expectedState)
  })

  test('fetch todos async request should set server loading to true', () => {
    const init = {
      todos: [],
      server: false,
      loading: false,
      error: ''
    }
    const expectedState = {
      todos: [],
      server: false,
      loading: true,
      error: ''
    }
    const state = reducer(init, { type: 'FETCH_TODOS_ASYNC_REQUEST' })

    expect(state).toEqual(expectedState)
  })

  test('fetch todos async success should return array with new todo', () => {
    const init = {
      todos: [],
      server: false,
      loading: false,
      error: ''
    }
    const expectedState = {
      todos: [{ id: 1, text: 'Get milk', complete: false }],
      server: false,
      loading: false,
      error: ''
    }
    const state = reducer(init, {
      type: 'FETCH_TODOS_ASYNC_SUCCESS',
      payload: [{ id: 1, text: 'Get milk', complete: false }]
    })

    expect(state).toEqual(expectedState)
  })

  test('fetch todos async failure should return error message', () => {
    const init = {
      todos: [],
      loading: false,
      server: false,
      error: ''
    }
    const expectedState = {
      todos: [],
      loading: false,
      server: false,
      error: 'Error retrieving Todos'
    }
    const state = reducer(init, { type: 'FETCH_TODOS_ASYNC_FAILURE' })

    expect(state).toEqual(expectedState)
  })
  test('add todos async request should return server true', () => {
    const init = {
      todos: [],
      loading: false,
      server: false,
      error: ''
    }
    const expectedState = {
      todos: [],
      loading: false,
      server: true,
      error: ''
    }
    const state = reducer(init, { type: 'ADD_TODO_ASYNC_REQUEST' })

    expect(state).toEqual(expectedState)
  })

  test('add todos async success should return array with new todo', () => {
    const init = {
      todos: [{ id: 1, text: 'Get milk', complete: false }],
      server: false,
      loading: false,
      error: ''
    }
    const expectedState = {
      todos: [
        { id: 1, text: 'Get milk', complete: false },
        { id: 2, text: 'Drink milk', complete: false }
      ],
      server: false,
      loading: false,
      error: ''
    }
    const state = reducer(init, {
      type: 'ADD_TODO_ASYNC_SUCCESS',
      payload: { id: 2, text: 'Drink milk', complete: false }
    })

    expect(state).toEqual(expectedState)
  })

  test('add todo async failure should return error message', () => {
    const init = {
      todos: [],
      loading: false,
      server: false,
      error: ''
    }
    const expectedState = {
      todos: [],
      loading: false,
      server: false,
      error: 'Error adding Todo'
    }
    const state = reducer(init, { type: 'ADD_TODO_ASYNC_FAILURE' })

    expect(state).toEqual(expectedState)
  })

  test('toggle todo async request should return server true', () => {
    const init = {
      todos: [
        { id: 1, text: 'Get milk', complete: false }
      ],
      server: false,
      loading: false,
      error: ''
    }
    const expectedState = {
      todos: [
        { id: 1, text: 'Get milk', complete: false }
      ],
      server: true,
      loading: false,
      error: ''
    }
    const state = reducer(
      init,
      { type: 'TOGGLE_TODO_ASYNC_REQUEST' }
    )

    expect(state).toEqual(expectedState)
  })

  test('toggle todo async success should return todo with complete toggled', () => {
    const init = {
      todos: [
        { id: 1, text: 'Get milk', complete: false }
      ],
      server: false,
      loading: false,
      error: ''
    }
    const expectedState = {
      todos: [
        { id: 1, text: 'Get milk', complete: true }
      ],
      server: false,
      loading: false,
      error: ''
    }
    const state = reducer(
      init,
      { type: 'TOGGLE_TODO_ASYNC_SUCCESS', payload: { id: 1, text: 'Get milk', complete: true } }
    )

    expect(state).toEqual(expectedState)
  })

  test('toggle todo async failure should return error message', () => {
    const init = {
      todos: [
        { id: 1, text: 'Get milk', complete: false }
      ],
      server: false,
      loading: false,
      error: ''
    }
    const expectedState = {
      todos: [
        { id: 1, text: 'Get milk', complete: false }
      ],
      server: false,
      loading: false,
      error: 'Error toggling Todo'
    }
    const state = reducer(
      init,
      { type: 'TOGGLE_TODO_ASYNC_FAILURE' }
    )

    expect(state).toEqual(expectedState)
  })

})

describe('fetchTodosAsync action', () => {
  test('should dispatch fetchTodosAsyncSuccess ', async () => {
    fetchMock.get('*', {
      todos: [{ id: 1, text: 'Get milk', complete: false }]
    })
    const store = mockStore()
    store.dispatch(fetchTodosAsync()).then(() => {
      expect(store.getActions()).toEqual([
        fetchTodosAsyncRequest(),
        fetchTodosAsyncSuccess({
          todos: [{ id: 1, text: 'Get milk', complete: false }]
        })
      ])
    })
  })

  test('should dispatch fetchTodosAsyncFailure', () => {
    fetchMock.get('*', 500)
    const store = mockStore()
    store.dispatch(fetchTodosAsync()).then(() => {
      expect(store.getActions()).toEqual([
        fetchTodosAsyncRequest(),
        fetchTodosAsyncFailure({ error: 'Error retrieving Todos' })
      ])
    })
  })
})

describe('addTodosAsync action', () => {
  test('should dispatch addTodosAsyncSuccess', async () => {
    fetchMock.post('*', { id: 1, text: 'Get milk', complete: false })
    const store = mockStore()
    store.dispatch(addTodoAsync('Get milk')).then(() => {
      expect(store.getActions()).toEqual([
        addTodoAsyncRequest(),
        addTodoAsyncSuccess({ id: 1, text: 'Get milk', complete: false })
      ])
    })
  })

  test('should dispatch addTodosAsyncFailure', async () => {
    fetchMock.post('*', 500)
    const store = mockStore()
    store.dispatch(addTodoAsync()).then(() => {
      expect(store.getActions()).toEqual([
        addTodoAsyncRequest(),
        addTodoAsyncFailure({ error: 'Error adding Todo' })
      ])
    })
  })
})

describe('toggleTodoAsync action', () => {
  test('should dispatch toggleTodoAsyncSuccess', () => {
    fetchMock.put('*', { id: 1, text: 'Get milk', complete: true })
    const store = mockStore({
      todo: {
        todos: [{ id: 1, text: 'Get milk', complete: false }]
      }
    })

    store.dispatch(toggleTodoAsync(1)).then(() => {
      expect(store.getActions()).toEqual([
        toggleTodoAsyncRequest(),
        toggleTodoAsyncSuccess({ id: 1, text: 'Get milk', complete: true })
      ])
    })
  })

  test('should dispatch toggleTodoAsyncFailure', () => {
    fetchMock.put('*', 500)
    const store = mockStore({
      todo: {
        todos: [{ id: 1, text: 'Get milk', complete: false }]
      }
    })

    store.dispatch(toggleTodoAsync(1)).then(() => {
      expect(store.getActions()).toEqual([
        toggleTodoAsyncRequest(),
        toggleTodoAsyncFailure({ error: 'Error toggling Todo' })
      ])
    })
  })
})
