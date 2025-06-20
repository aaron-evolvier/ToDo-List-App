import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete, onToggle, onUpdate }) => {
    const completedTodos = todos.filter(todo => todo.completed).length;
    const totalTodos = todos.length;

    if (totalTodos === 0) {
        return (
            <div className="empty-list">
                <p>No todos yet. Add one above!</p>
            </div>
        );
    }

    return (
        <div className="todo-list-container">
            <div className="todo-stats">
                <span>
                    Completed: {completedTodos}/{totalTodos}
                </span>
                <div className="progress-bar">
                    <div 
                        className="progress" 
                        style={{ 
                            width: `${(completedTodos / totalTodos) * 100}%` 
                        }}
                    />
                </div>
            </div>
            <div className="todo-list">
                {todos.map((todo) => (                <TodoItem 
                    key={todo._id} 
                    todo={todo} 
                    onDelete={onDelete}
                    onToggle={onToggle}
                    onUpdate={onUpdate}
                />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
