import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';

describe('TodoItem', () => {
  const mockTodo = { _id: '1', text: 'Test Todo', completed: false };
  const mockProps = {
    todo: mockTodo,
    onDelete: jest.fn(),
    onToggle: jest.fn(),
    onUpdate: jest.fn()
  };

  test('renders todo item', () => {
    render(<TodoItem {...mockProps} />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('triggers toggle on checkbox click', () => {
    render(<TodoItem {...mockProps} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockProps.onToggle).toHaveBeenCalledWith('1');
  });

  test('shows delete confirmation on delete click', () => {
    render(<TodoItem {...mockProps} />);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(screen.getByText('Are you sure you want to delete this task?')).toBeInTheDocument();
  });

  test('handles edit mode correctly', () => {
    render(<TodoItem {...mockProps} />);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
  });

  test('disables edit button when todo is completed', () => {
    render(<TodoItem {...mockProps} todo={{ ...mockTodo, completed: true }} />);
    const editButton = screen.getByRole('button', { name: 'Edit' });
    expect(editButton).toBeDisabled();
  });
});
