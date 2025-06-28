import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';

const mockTodos = [
  { _id: '1', text: 'Test Todo 1', completed: false },
  { _id: '2', text: 'Test Todo 2', completed: true }
];

describe('TodoList', () => {
  const mockProps = {
    todos: mockTodos,
    onDelete: jest.fn(),
    onToggle: jest.fn(),
    onUpdate: jest.fn()
  };

  test('renders todo list with items', () => {
    render(<TodoList {...mockProps} />);
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  test('renders empty state when no todos', () => {
    render(<TodoList {...mockProps} todos={[]} />);
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
  });

  test('displays correct completion count', () => {
    render(<TodoList {...mockProps} />);
    expect(screen.getByText('Completed: 1/2')).toBeInTheDocument();
  });
});
