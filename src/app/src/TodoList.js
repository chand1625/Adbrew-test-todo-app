import React from 'react'

function TodoList(props) {
  return (
    <div>
    <h1>List of TODOs</h1>
    <ul>
      {props.todos.length===0?(<p>No todos are added yet, please add some!</p>) : props.todos.map((todo)=>{
        return <li key={todo._id}>{todo.todoText}</li>
      })}
    </ul>
    </div>
  )
}

export default TodoList