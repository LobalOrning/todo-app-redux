import {
  fetchTodosAsync,
  fetchTodosAsyncRequest,
  fetchTodosAsyncFailure,
  fetchTodosAsyncSuccess
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

  test('shold dispatch fetchTodosAsyncFailure', () => {
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

// todo: add todo thunk tests
