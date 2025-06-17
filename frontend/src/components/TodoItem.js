import React from 'react';

const TodoItem = ({ todo }) => {
    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                className="todo-checkbox"
            />
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                {todo.text}
            </span>
            <div className="todo-actions">
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
            </div>
        </div>
    );
};

export default TodoItem;
