import { it, expect, vi, describe, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import CompanyItem from './CompanyItem';
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

describe('CompanyItem', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', async () => {
    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={authValue}>
            <CompanyItem name={'Sample Company'} description={'Sample Company Description'} logo={'https://www.logo.com'} />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );
  });

  it('matches snapshot', async () => {
    const { asFragment } = render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={authValue}>
            <CompanyItem name={'Sample Company'} description={'Sample Company Description'} logo={'https://www.logo.com'} />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays expected content', async () => {
    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={authValue}>
            <CompanyItem name={'Sample Company'} description={'Sample Company Description'} logo={'https://www.logo.com'} />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );
    // Wait for the companies to load
    await waitFor(() => {
      expect(screen.getByText('Sample Company')).toBeInTheDocument();
      expect(screen.getByText('Sample Company Description')).toBeInTheDocument();
      expect(screen.getByAltText('Logo for Sample Company')).toBeInTheDocument();
    });
  });
});
