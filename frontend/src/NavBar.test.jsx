import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
import { MessagesProvider } from './MessageContext';
import { AuthProvider, AuthContext } from './AuthProvider';
import { MemoryRouter } from 'react-router-dom';

it('renders without crashing', async () => {
  render(
    <MemoryRouter>
      <MessagesProvider>
        <AuthProvider>
          <NavBar />
        </AuthProvider>
      </MessagesProvider>
    </MemoryRouter>
  );
});

it('matches snapshot', async () => {
  const { asFragment } = render(
    <MemoryRouter>
      <MessagesProvider>
        <AuthProvider>
          <NavBar />
        </AuthProvider>
      </MessagesProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

it('shows login/signup when not logged in', async () => {
  render(
    <MemoryRouter>
      <MessagesProvider>
        <AuthProvider>
          <NavBar />
        </AuthProvider>
      </MessagesProvider>
    </MemoryRouter>
  );

  expect(screen.getByText('Login')).toBeInTheDocument();
  expect(screen.getByText('Signup')).toBeInTheDocument();
});

it('shows companies/jobs/profile/logout when logged in', async () => {
  // Create minimal mock for AuthContext
  const authValue = {
    token: 'fake-token',
    currentUser: 'testuser',
    logout: vi.fn(),
  };

  // Render with mocked context value
  render(
    <MemoryRouter>
      <MessagesProvider>
        <AuthContext.Provider value={authValue}>
          <NavBar />
        </AuthContext.Provider>
      </MessagesProvider>
    </MemoryRouter>
  );

  // Check logged-in menu items are present
  expect(screen.getByText('Companies')).toBeInTheDocument();
  expect(screen.getByText('Jobs')).toBeInTheDocument();
  expect(screen.getByText('Profile')).toBeInTheDocument();
  expect(screen.getByText(/Logout/)).toBeInTheDocument();
  expect(screen.getByText(/testuser/)).toBeInTheDocument();

  // Verify logged-out items are not present
  expect(screen.queryByText('Login')).not.toBeInTheDocument();
  expect(screen.queryByText('Signup')).not.toBeInTheDocument();
});
