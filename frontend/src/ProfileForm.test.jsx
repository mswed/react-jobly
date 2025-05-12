import { it, expect, vi, describe, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileForm from './ProfileForm';
import { MemoryRouter } from 'react-router-dom';
import { MessageContext } from './MessageContext';
import { AuthContext } from './AuthProvider';
import JoblyApi from './api';

// Mock authentication
const authValue = {
  token: 'fake-token',
  currentUser: 'testuser',
  logout: vi.fn(),
};

// Mock the api
vi.mock('./api', () => ({
  default: {
    getUser: vi.fn().mockResolvedValue({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
    }),
    updateUser: vi.fn().mockResolvedValue({}),
  },
}));

describe('ProfileForm', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={authValue}>
            <ProfileForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={authValue}>
            <ProfileForm />
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
          <AuthContext.Provider value={authValue}>
            <ProfileForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );

    // Check for form elements
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
  });

  it('updates form state when typing', () => {
    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={authValue}>
            <ProfileForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );

    // Get form inputs
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);

    // Type in inputs
    fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    fireEvent.change(lastNameInput, { target: { value: 'User' } });
    fireEvent.change(emailInput, { target: { value: 'test.user@test.com' } });

    // Check values were updated
    expect(firstNameInput).toHaveValue('Test');
    expect(lastNameInput).toHaveValue('User');
    expect(emailInput).toHaveValue('test.user@test.com');
  });

  it('calls updateUser with form data on submit', async () => {
    // Mock functions
    const mockSubmit = vi.fn().mockResolvedValue({ success: true });
    const mockShowMessage = vi.fn();

    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: mockShowMessage }}>
          <AuthContext.Provider value={authValue}>
            <ProfileForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );

    // Get form inputs
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);

    // Fill form
    fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    fireEvent.change(lastNameInput, { target: { value: 'User' } });
    fireEvent.change(emailInput, { target: { value: 'test.user@test.com' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Save Changes/i }));

    // Check login was called with correct data
    await waitFor(() => {
      expect(JoblyApi.updateUser).toHaveBeenCalledWith('testuser', 'Test', 'User', 'test.user@test.com');
    });
  });

  it('shows success message on successful update', async () => {
    // Mock functions for successful login
    const mockSubmit = vi.fn().mockResolvedValue({ success: true });
    const mockShowMessage = vi.fn();

    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: mockShowMessage }}>
          <AuthContext.Provider value={authValue}>
            <ProfileForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );

    // Get form inputs
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);

    // Fill form
    fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    fireEvent.change(lastNameInput, { target: { value: 'User' } });
    fireEvent.change(emailInput, { target: { value: 'test.user@test.com' } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Save Changes/i }));

    // Check results
    await waitFor(() => {
      expect(mockShowMessage).toHaveBeenCalledWith('Updated user profile!', 'success');
    });
  });

  it('shows error message on failed update', async () => {
    // Mock functions for failed login
    const mockSubmit = vi.fn().mockResolvedValue({ success: false });
    const mockShowMessage = vi.fn();

    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: mockShowMessage }}>
          <AuthContext.Provider value={authValue}>
            <ProfileForm />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Save Changes/i }));

    // Check error handling
    await waitFor(() => {
      expect(mockShowMessage).toHaveBeenCalledWith(['firstName can not be empty', 'lastName can not be empty', 'email can not be empty'], 'warning');
    });
  });
});
