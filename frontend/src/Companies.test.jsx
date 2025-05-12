import { it, expect, vi, describe, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Companies from './Companies';
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
    getCompanies: vi.fn().mockResolvedValue({
      companies: [
        {
          handle: 'test-co',
          name: 'Test Company',
          description: 'A test company',
        },
        {
          handle: 'another-co',
          name: 'Another Company',
          description: 'Another test company',
        },
      ],
    }),
  },
}));

describe('Companies', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', async () => {
    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={authValue}>
            <Companies />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );
    // Wait for the companies to load
    await waitFor(() => {
      expect(screen.getByText('Test Company')).toBeInTheDocument();
    });
  });

  it('matches snapshot', async () => {
    const { asFragment } = render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={authValue}>
            <Companies />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );
    // Wait for the companies to load
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
