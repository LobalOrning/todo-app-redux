import React from 'react'

const Todo = ({ id, text, complete, toggleTodo }) => (
  <li>
    <input type="checkbox" checked={complete} onChange={() => toggleTodo(id)} />
    {text}
  </li>
)

export default Todo
