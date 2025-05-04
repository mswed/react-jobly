import { it, expect } from 'vitest';
import { render } from '@testing-library/react';
import SignupForm from './SignupForm';
import { MemoryRouter } from 'react-router-dom';
import { MessagesProvider } from './MessageContext';
import { AuthProvider } from './AuthProvider';
import FormContainer from './FormContainer';

it('renders without crashing', async () => {
  render(
    <MemoryRouter>
      <MessagesProvider>
        <AuthProvider>
          <FormContainer title={'Login'} FormComponent={SignupForm} />
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
          <FormContainer title={'Login'} FormComponent={SignupForm} />
        </AuthProvider>
      </MessagesProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
