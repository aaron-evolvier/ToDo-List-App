import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = {
      _id: Date.now(),
      text,
      completed: false
    };
    setTodos([newTodo, ...todos]);
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1>Todo List</h1>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default App;
