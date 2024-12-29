import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoList from './TodoList';
import CompletedTodos from './CompletedTodos';
import { useState } from 'react';
import './App.css';
import './index.css';

function App() {

  // fill initial state with 10 todos
  let todoArray = [];
  let i = 1;
  while (i <= 10) {
    todoArray.push({
      id: i,
      title: 'Pay cable bill',
      description: 'Pay the cable bill by the 15th of the month',
      due: `${i+1}/15/2024`,
      completed: false
    });
    i++;
  }

  // use state hook
  const [todos, setTodos] = useState(todoArray);

  // remove a todo object from the array of todo objects in state
  const deleteTodo = (id) => {
    //alert(`Todo with id of ${id} has been deleted`);
    return setTodos(todos.filter((todo) => todo.id !== id));
  }

  // toggle the completed boolean for the todo passed into it
  const toggleCompleted = (todo) => {
    //alert(`Todo with id of ${todo.id} has been toggled`);
    let updatedTodos = [];
    todos.forEach((object) => {
      if (object.id === todo.id) {
        if (object.completed === true) {
          object.completed = false;
        } else {
          object.completed = true;
        }
      }
      updatedTodos.push(object);
    })
    return setTodos(updatedTodos);
  }

  // render both todolist and completed todos
  return (
    <div>
      <h1>ToDo List:</h1>
      <TodoList
        todos={todos.filter(todo => todo.completed === false)}
        handleDel={deleteTodo}
        handleTog={toggleCompleted}
      />
      <h1>Completed:</h1>
      <CompletedTodos
        todos={todos.filter(todo => todo.completed === true)}
        handleTog={toggleCompleted}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
