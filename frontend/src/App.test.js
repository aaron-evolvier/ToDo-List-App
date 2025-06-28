import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import api from './services/api';

jest.mock('./services/api');

const mockTodos = [
  { _id: '1', text: 'Test Todo 1', completed: false },
  { _id: '2', text: 'Test Todo 2', completed: true }
];

describe('Todo App', () => {
  beforeEach(() => {
    api.getTodos.mockResolvedValue(mockTodos);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders todo list app', async () => {
    render(<App />);
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    await waitFor(() => {
      expect(api.getTodos).toHaveBeenCalled();
    });
  });

  test('adds new todo', async () => {
    api.createTodo.mockResolvedValue({ _id: '3', text: 'New Todo', completed: false });
    render(<App />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByText('Add Task');
    
    await userEvent.type(input, 'New Todo');
    fireEvent.click(addButton);
    
    await waitFor(() => {
      expect(api.createTodo).toHaveBeenCalledWith('New Todo');
    });
  });

  test('toggles todo completion', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    });

    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(api.updateTodo).toHaveBeenCalledWith('1', { completed: true });
    });
  });

  test('deletes todo', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);
    
    const confirmButton = screen.getByText('Delete', { selector: '.modal-button-danger' });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(api.deleteTodo).toHaveBeenCalledWith('1');
    });
  });

  test('filters todos', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Active'));
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Todo 2')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Completed'));
    expect(screen.queryByText('Test Todo 1')).not.toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });
});
