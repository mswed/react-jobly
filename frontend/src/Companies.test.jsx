import { it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Companies from './Companies';

it('renders without crashing', async () => {
  render(<Companies />);
});

it('matches snapshot', async () => {
  const { asFragment } = render(<Companies />);

  expect(asFragment()).toMatchSnapshot();
});
