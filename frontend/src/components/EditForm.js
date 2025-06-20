import React, { useState } from 'react';

const EditForm = ({ todo, onSave, onCancel }) => {
    const [text, setText] = useState(todo.text);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onSave(text.trim());
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onCancel();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-form">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="edit-input"
                placeholder="Update todo..."
            />
            <div className="edit-actions">
                <button 
                    type="button" 
                    onClick={onCancel}
                    className="edit-button-secondary"
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    className="edit-button-primary"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default EditForm;
