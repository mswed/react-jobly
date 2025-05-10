import { it, expect, vi, describe, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import { MemoryRouter } from 'react-router-dom';
import { MessageContext } from './MessageContext';
import { AuthContext } from './AuthProvider';

// Mock hook from react-router-dom. First we create a mock version of useNavigate
const mockNavigate = vi.fn();
// Then tell vite to intercept the import of react-router-dom and replace the hook with
// our mocked version
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginForm', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={{ login: vi.fn() }}>
            <LoginForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );
  });

  it('has username and password inputs and a submit button', () => {
    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={{ login: vi.fn() }}>
            <LoginForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );

    // Check for form elements
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('updates form state when typing', () => {
    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={{ login: vi.fn() }}>
            <LoginForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );

    // Get form inputs
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    // Type in inputs
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Check values were updated
    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('password123');
  });

  it('calls login with form data on submit', async () => {
    // Mock functions
    const mockLogin = vi.fn().mockResolvedValue({ success: true });
    const mockShowMessage = vi.fn();

    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: mockShowMessage }}>
          <AuthContext.Provider value={{ login: mockLogin }}>
            <LoginForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );

    // Fill form
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Check login was called with correct data
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser', 'password123');
    });
  });

  it('navigates and shows success message on successful login', async () => {
    // Mock functions for successful login
    const mockLogin = vi.fn().mockResolvedValue({ success: true });
    const mockShowMessage = vi.fn();

    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: mockShowMessage }}>
          <AuthContext.Provider value={{ login: mockLogin }}>
            <LoginForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );

    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Check results
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
      expect(mockShowMessage).toHaveBeenCalledWith('Login Successfull', 'success');
    });
  });

  it('shows error message on failed login', async () => {
    // Mock functions for failed login
    const mockLogin = vi.fn().mockResolvedValue({ success: false });
    const mockShowMessage = vi.fn();

    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: mockShowMessage }}>
          <AuthContext.Provider value={{ login: mockLogin }}>
            <LoginForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );

    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'baduser' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Check error handling
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
      expect(mockShowMessage).toHaveBeenCalledWith('Login Failed! Incorrect username or password!', 'danger');
    });
  });
});
