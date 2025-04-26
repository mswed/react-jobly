import { it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Login from './Login';

it('renders without crashing', async () => {
  render(<Login />);
});

it('matches snapshot', async () => {
  const { asFragment } = render(<Login />);

  expect(asFragment()).toMatchSnapshot();
});
