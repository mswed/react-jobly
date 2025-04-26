import { it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Profile from './Profile';

it('renders without crashing', async () => {
  render(<Profile />);
});

it('matches snapshot', async () => {
  const { asFragment } = render(<Profile />);

  expect(asFragment()).toMatchSnapshot();
});
