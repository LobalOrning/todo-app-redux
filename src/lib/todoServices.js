import 'isomorphic-fetch'

export const getTodosAsync = async () => {
  const resp = await fetch('http://localhost:8080/todos')
  const todos = await resp.json()

  return todos
}

export const createTodoAsync = async (text) => {
  const resp = await fetch('http://localhost:8080/todos', {
    method: 'POST',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: text, complete: false })
  })

  return await resp.json()
}
