import React, { useState } from 'react';
import DeleteConfirmation from './DeleteConfirmation';

const TodoItem = ({ todo, onDelete, onToggle }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        onDelete(todo._id);
        setShowDeleteModal(false);
    };

    return (
        <>
            <div 
                className={`todo-item ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="todo-content">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onToggle(todo._id)}
                        className="todo-checkbox"
                    />
                    <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                        {todo.text}
                    </span>
                </div>
                <div className={`todo-actions ${isHovered ? 'visible' : ''}`}>
                    <button className="edit-button">
                        <span className="button-text">Edit</span>
                    </button>
                    <button 
                        className="delete-button"
                        onClick={handleDelete}
                    >
                        <span className="button-text">Delete</span>
                    </button>
                </div>
            </div>            <DeleteConfirmation
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
        </>
    );
};

export default TodoItem;
