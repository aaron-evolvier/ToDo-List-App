import React from 'react';

const TodoItem = ({ todo, onDelete, onToggle }) => {
    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo._id)}
                className="todo-checkbox"
            />
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                {todo.text}
            </span>
            <div className="todo-actions">
                <button className="edit-button">Edit</button>
                <button 
                    className="delete-button"
                    onClick={() => onDelete(todo._id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
