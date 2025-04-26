import { it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Homepage from './Homepage';

it('renders without crashing', async () => {
  render(<Homepage />);
});

it('matches snapshot', async () => {
  const { asFragment } = render(<Homepage />);

  expect(asFragment()).toMatchSnapshot();
});
