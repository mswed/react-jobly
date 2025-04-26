import { it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Signup from './Signup';

it('renders without crashing', async () => {
  render(<Signup />);
});

it('matches snapshot', async () => {
  const { asFragment } = render(<Signup />);

  expect(asFragment()).toMatchSnapshot();
});
