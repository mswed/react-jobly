import { it, expect } from 'vitest';
import { render } from '@testing-library/react';
import NavBar from './NavBar';
import { MessagesProvider } from './MessageContext';
import { AuthProvider } from './AuthProvider';
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
