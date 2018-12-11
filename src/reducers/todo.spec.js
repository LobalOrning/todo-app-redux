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
  it('should return state', () => {
    const state = reducer(undefined, {})
    const expectedState = {
      todos: [],
      loading: false,
      server: false,
      error: ''
    }
    expect(state).toEqual(expectedState)
  })

  // fetch async req
  // fetch async success
  // fetch async failure

  // add async req
  // add async success
  // add async failure
})

describe('fetchTodosAsync action', () => {
  it('should dispatch fetchTodosAsyncSuccess ', async () => {
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

  it('shold dispatch fetchTodosAsyncFailure', () => {
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
