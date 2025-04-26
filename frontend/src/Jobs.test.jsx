import { it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Jobs from './Jobs';

it('renders without crashing', async () => {
  render(<Jobs />);
});

it('matches snapshot', async () => {
  const { asFragment } = render(<Jobs />);

  expect(asFragment()).toMatchSnapshot();
});
