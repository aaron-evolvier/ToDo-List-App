import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import api from './services/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [dark, setDark] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('darkMode', dark);
  }, [dark]);

  const loadTodos = useCallback(async () => {
    try {
      const data = await api.getTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const addTodo = useCallback(async (text) => {
    try {
      const newTodo = await api.createTodo(text);
      setTodos(prev => [newTodo, ...prev]);
      setError(null);
    } catch (err) {
      setError('Failed to add todo');
    }
  }, []);

  const deleteTodo = useCallback(async (id) => {
    try {
      await api.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo');
    }
  }, []);

  const toggleTodo = useCallback(async (id) => {
    try {
      const todo = todos.find(t => t._id === id);
      const updatedTodo = await api.updateTodo(id, { completed: !todo.completed });
      setTodos(prev => prev.map(t => t._id === id ? updatedTodo : t));
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
    }
  }, [todos]);

  const updateTodo = useCallback(async (id, updates) => {
    try {
      const updatedTodo = await api.updateTodo(id, updates);
      setTodos(prev => prev.map(t => t._id === id ? updatedTodo : t));
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
    }
  }, []);

  const clearCompleted = useCallback(async () => {
    try {
      const completedIds = todos.filter(t => t.completed).map(t => t._id);
      await Promise.all(completedIds.map(id => api.deleteTodo(id)));
      setTodos(prev => prev.filter(t => !t.completed));
      setError(null);
    } catch (err) {
      setError('Failed to clear completed todos');
    }
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return filter === 'all'
      ? todos
      : filter === 'active'
      ? todos.filter(t => !t.completed)
      : todos.filter(t => t.completed);
  }, [todos, filter]);

  return (
    <div className="App">
      <button
        className="dark-toggle"
        onClick={() => setDark(d => !d)}
        aria-label="Toggle dark mode"
      >
        {dark ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="todo-container">
        <h1>Todo List</h1>
        {error && <div className="error-message">{error}</div>}
        <TodoForm addTodo={addTodo} />
        <div className="filter-bar">
          <button 
            className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'active' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button 
            className="clear-btn"
            onClick={clearCompleted}
            disabled={todos.filter(t => t.completed).length === 0}
          >
            Clear Completed
          </button>
        </div>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <TodoList 
            todos={filteredTodos} 
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            onUpdate={updateTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
