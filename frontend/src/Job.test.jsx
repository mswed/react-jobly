import { it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Job from './Job';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import { MessagesProvider } from './MessageContext';

it('renders without crashing', async () => {
  render(
    <MemoryRouter>
      <MessagesProvider>
        <AuthProvider>
          <Job />
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
          <Job />
        </AuthProvider>
      </MessagesProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
