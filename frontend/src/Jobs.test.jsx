import { it, expect, vi, describe, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import Jobs from './Jobs';
import { MemoryRouter } from 'react-router-dom';
import { MessageContext } from './MessageContext';
import { AuthContext } from './AuthProvider';

// Mock authentication
const authValue = {
  token: 'fake-token',
  currentUser: 'testuser',
  logout: vi.fn(),
};

// Mock the api
vi.mock('./api', () => ({
  default: {
    getJobs: vi.fn().mockResolvedValue({
      jobs: [
        {
          id: 1,
          title: 'Sample job',
          company: 'A Sample company',
          salary: 100000,
          equity: 0.1,
        },
        {
          id: 2,
          title: 'Another job',
          company: 'A Silly company',
          salary: 30000,
          equity: 0.5,
        },
      ],
    }),
  },
}));

describe('Jobs', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', async () => {
    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={authValue}>
            <Jobs />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );
    // Wait for the companies to load
    await waitFor(() => {});
  });

  it('matches snapshot', async () => {
    const { asFragment } = render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={authValue}>
            <Jobs />
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
