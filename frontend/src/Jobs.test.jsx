import { it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Jobs from './Jobs';
import { MemoryRouter } from 'react-router-dom';
import { MessagesProvider } from './MessageContext';
import { AuthProvider } from './AuthProvider';

it('renders without crashing', async () => {
  render(
    <MemoryRouter>
      <MessagesProvider>
        <AuthProvider>
          <Jobs />
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
          <Jobs />
        </AuthProvider>
      </MessagesProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
