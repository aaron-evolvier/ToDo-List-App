import React from 'react';

const DeleteConfirmation = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Delete Todo</h2>
                <p className="modal-message">Are you sure you want to delete this task?</p>
                <div className="modal-actions">
                    <button 
                        className="modal-button-secondary" 
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className="modal-button-danger" 
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
