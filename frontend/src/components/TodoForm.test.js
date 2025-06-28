import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from './TodoForm';

describe('TodoForm', () => {
  const mockAddTodo = jest.fn();

  beforeEach(() => {
    mockAddTodo.mockClear();
  });

  test('renders input and button', () => {
    render(<TodoForm addTodo={mockAddTodo} />);
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  test('handles input change', async () => {
    render(<TodoForm addTodo={mockAddTodo} />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    await userEvent.type(input, 'New Todo');
    expect(input.value).toBe('New Todo');
  });

  test('calls addTodo on form submit', async () => {
    render(<TodoForm addTodo={mockAddTodo} />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByText('Add Task');

    await userEvent.type(input, 'New Todo');
    fireEvent.click(button);

    expect(mockAddTodo).toHaveBeenCalledWith('New Todo');
    expect(input.value).toBe('');
  });

  test('does not call addTodo with empty input', () => {
    render(<TodoForm addTodo={mockAddTodo} />);
    const button = screen.getByText('Add Task');
    fireEvent.click(button);
    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});
