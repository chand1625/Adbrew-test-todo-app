import React,{useState,useEffect,useRef} from "react";

import './App.css';
import logo from './logo.svg';

import TodoList from "./TodoList";

export function App() {
  const [todo,setTodo] = useState([]);
  const [fetchError,setFetchError] = useState(false);
  const [addError,setAddError] = useState(false);
  const todoInput = useRef();

  const getAllTodos = async()=>{
    let response;
    try {
      response =await fetch("http://localhost:8000/todos/");
      if(!response.ok){
        throw new Error("Something went wrong");
      }
    } catch (err) {
      setFetchError(true);
    }
    if(response){
      const todos = await response.json();
      setTodo(todos);
      setFetchError(false);
    }
  }

  const addNewTodo = async(e)=>{
    e.preventDefault();
    const newTodo = {
      todoText : todoInput.current.value
    }
    todoInput.current.value="";

    try {   
      const response = await fetch("http://localhost:8000/todos/",{
        method:"POST",
        body:JSON.stringify(newTodo)
      })
      if(!response.ok){
        throw new Error("Something went wrong");
      }
    } catch (err) {
      setAddError(true);
      return;
    }
    setAddError(false);
    getAllTodos();
  }

  useEffect(()=>{
    getAllTodos();
  },[]);

  return (
    <div className="App">
      {fetchError?(<p className="error">There was an error while fetching the list of Todos</p>) : <TodoList todos={todo}/>}
      <div>
        <h1>Create a ToDo</h1>
        <form onSubmit={addNewTodo}>
          <div>
            <label htmlFor="todo">ToDo: </label>
            <input type="text" name="todo_text" ref={todoInput}/>
          </div>
          <div style={{"marginTop": "5px"}}>
            <button>Add ToDo!</button>
          </div>
        </form>
        {addError?(<p className="error">An error occured. Adding the new Todo failed</p>):(null)}
      </div>
    </div>
  );
}

export default App;
