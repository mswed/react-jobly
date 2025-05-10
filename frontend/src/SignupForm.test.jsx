import { it, expect, vi, describe, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from './SignupForm';
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

describe('SignupForm', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={{ register: vi.fn() }}>
            <SignupForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={{ register: vi.fn() }}>
            <SignupForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('has all the expected fields and a submit button', () => {
    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={{ register: vi.fn() }}>
            <SignupForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );

    // Check for form elements
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Signup/i })).toBeInTheDocument();
  });

  it('updates form state when typing', () => {
    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={{ register: vi.fn() }}>
            <SignupForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );

    // Get form inputs
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);

    // Type in inputs
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    fireEvent.change(lastNameInput, { target: { value: 'User' } });
    fireEvent.change(emailInput, { target: { value: 'test.user@test.com' } });

    // Check values were updated
    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('password123');
    expect(firstNameInput).toHaveValue('Test');
    expect(lastNameInput).toHaveValue('User');
    expect(emailInput).toHaveValue('test.user@test.com');
  });

  it('calls login with form data on submit', async () => {
    // Mock functions
    const mockRegister = vi.fn().mockResolvedValue({ success: true });
    const mockShowMessage = vi.fn();

    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: mockShowMessage }}>
          <AuthContext.Provider value={{ register: mockRegister }}>
            <SignupForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );

    // Get form inputs
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);

    // Fill form
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    fireEvent.change(lastNameInput, { target: { value: 'User' } });
    fireEvent.change(emailInput, { target: { value: 'test.user@test.com' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Signup/i }));

    // Check login was called with correct data
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('testuser', 'password123', 'Test', 'User', 'test.user@test.com');
    });
  });

  it('navigates and shows success message on successful registstratoin', async () => {
    // Mock functions for successful login
    const mockRegister = vi.fn().mockResolvedValue({ success: true });
    const mockShowMessage = vi.fn();

    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: mockShowMessage }}>
          <AuthContext.Provider value={{ register: mockRegister }}>
            <SignupForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );

    // Get form inputs
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);

    // Fill form
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    fireEvent.change(lastNameInput, { target: { value: 'User' } });
    fireEvent.change(emailInput, { target: { value: 'test.user@test.com' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Signup/i }));

    // Check results
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
      expect(mockShowMessage).toHaveBeenCalledWith('You are now registered! Please login!', 'success');
    });
  });

  it('shows error message on failed login', async () => {
    // Mock functions for failed login
    const mockRegister = vi.fn().mockResolvedValue({ success: false });
    const mockShowMessage = vi.fn();

    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: mockShowMessage }}>
          <AuthContext.Provider value={{ register: mockRegister }}>
            <SignupForm />
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
    fireEvent.click(screen.getByRole('button', { name: /Signup/i }));

    // Check error handling
    await waitFor(() => {
      expect(mockShowMessage).toHaveBeenCalledWith(['firstName can not be empty', 'lastName can not be empty', 'email can not be empty'], 'warning');
    });
  });
});
