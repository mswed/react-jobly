import { it, expect, vi, describe, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Job from './Job';
import { MemoryRouter } from 'react-router-dom';
import { MessageContext } from './MessageContext';
import { AuthContext } from './AuthProvider';

// Mock authentication
const authValue = {
  token: 'fake-token',
  currentUser: 'testuser',
  logout: vi.fn(),
  applyToJob: vi.fn(),
  alreadyApplied: vi.fn(),
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

describe('Job', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', async () => {
    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={authValue}>
            <Job title={'A job'} company={'A company'} salary={150000} equity={0.1} jobId={1} />
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
            <Job title={'A job'} company={'A company'} salary={150000} equity={0.1} jobId={1} />
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
            <Job title={'A job'} company={'A company'} salary={150000} equity={0.1} jobId={1} />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );
    // Wait for the companies to load
    await waitFor(() => {
      expect(screen.getByText('A job')).toBeInTheDocument();
      expect(screen.getByText('A company')).toBeInTheDocument();
      expect(screen.getByText('Salary: 150000')).toBeInTheDocument();
      expect(screen.getByText('Equity: 0.1')).toBeInTheDocument();
      expect(screen.getByText('Apply')).toBeInTheDocument();
    });
  });
  it('lets us apply for a job', async () => {
    authValue.alreadyApplied.mockReturnValue(false);
    render(
      <MemoryRouter>
        <MessageContext.Provider value={{ showMessage: vi.fn() }}>
          <AuthContext.Provider value={authValue}>
            <Job title={'A job'} company={'A company'} salary={150000} equity={0.1} jobId={1} />
          </AuthContext.Provider>
        </MessageContext.Provider>
      </MemoryRouter>
    );
    const apply = screen.getByText('Apply');
    expect(apply.className).toEqual('btn btn-warning');

    fireEvent.click(apply);

    await waitFor(() => {
      expect(apply.className).toEqual('btn btn-primary');
    });

    // Also verify the applyToJob function was called
    expect(authValue.applyToJob).toHaveBeenCalledWith(1);
  });
});
