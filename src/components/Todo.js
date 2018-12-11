import React from 'react'

const Todo = ({ text, complete }) => (
  <li>
    <input type="checkbox" defaultChecked={complete} />
    {text}
  </li>
)

export default Todo
