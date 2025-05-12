import { it, expect, vi, describe, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Company from './Company';
import { MemoryRouter } from 'react-router-dom';
import { MessageContext } from './MessageContext';
import { AuthContext } from './AuthProvider';

// Mock authentication
const authValue = {
  token: 'fake-token',
  currentUser: 'testuser',
  logout: vi.fn(),
  applyToJob: vi.fn(),
  alreadyApplied: vi.fn().mockImplementation((jobId) => {
    // Mock that job with ID 1 has been applied to
    return jobId === 1;
  }),
};

// Mock the api
vi.mock('./api', () => ({
  default: {
    getCompany: vi.fn().mockResolvedValue({
      handle: 'test-company',
      name: 'Fancy Company',
      description: 'Just a test company',
      numEmployees: 10,
      logoUrl: 'http://www.test.com',
      jobs: [
        { id: 1, title: 'Test Job', salary: 100, equity: 0.15 },
        { id: 2, title: 'Another job', salary: 60000, equity: 0.3 },
      ],
    }),
  },
}));

// Mock job functions
vi.mock('.Job.alreadyApplied', () => vi.fn().mockResolvedValue(False));

describe('Company', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', async () => {
    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={authValue}>
            <Company />
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
            <Company />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );
    // Wait for the companies to load
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
  it('displays expected content', async () => {
    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={authValue}>
            <Company />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );
    // Wait for the companies to load
    await waitFor(() => {
      expect(screen.getByText('Fancy Company')).toBeInTheDocument();
      expect(screen.getByText('Just a test company')).toBeInTheDocument();
      expect(screen.getByText('Test Job')).toBeInTheDocument();

      const apply_buttons = screen.getAllByText('Apply');
      // If we applied to a job the button should be blue
      expect(apply_buttons[0].className).toEqual('btn btn-primary');

      // If we did not apply for the job the button should be yellow
      expect(apply_buttons[1].className).toEqual('btn btn-warning');
    });
  });
});
