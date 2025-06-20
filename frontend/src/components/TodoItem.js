import React, { useState } from 'react';
import DeleteConfirmation from './DeleteConfirmation';
import EditForm from './EditForm';

const TodoItem = ({ todo, onDelete, onToggle, onUpdate }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        onDelete(todo._id);
        setShowDeleteModal(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = (newText) => {
        onUpdate(todo._id, { text: newText });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="todo-item editing">
                <EditForm 
                    todo={todo}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            </div>
        );
    }

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
                    <button 
                        className="edit-button"
                        onClick={handleEdit}
                        disabled={todo.completed}
                    >
                        <span className="button-text">Edit</span>
                    </button>
                    <button 
                        className="delete-button"
                        onClick={handleDelete}
                    >
                        <span className="button-text">Delete</span>
                    </button>
                </div>
            </div>
            <DeleteConfirmation
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
        </>
    );
};

export default TodoItem;
