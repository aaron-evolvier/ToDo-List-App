import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete, onToggle }) => {
    if (todos.length === 0) {
        return (
            <div className="empty-list">
                No todos yet. Add one above!
            </div>
        );
    }

    return (
        <div className="todo-list">
            {todos.map((todo) => (
                <TodoItem 
                    key={todo._id} 
                    todo={todo} 
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
};

export default TodoList;
