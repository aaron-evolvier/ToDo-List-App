import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import api from './services/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await api.getTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text) => {
    try {
      const newTodo = await api.createTodo(text);
      setTodos([newTodo, ...todos]);
      setError(null);
    } catch (err) {
      setError('Failed to add todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t._id === id);
      const updatedTodo = await api.updateTodo(id, { completed: !todo.completed });
      setTodos(todos.map(t => t._id === id ? updatedTodo : t));
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1>Todo List</h1>
        {error && <div className="error-message">{error}</div>}
        <TodoForm addTodo={addTodo} />
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <TodoList 
            todos={todos} 
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
