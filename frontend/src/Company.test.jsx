import { it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Company from './Company';

it('renders without crashing', async () => {
  render(<Company />);
});

it('matches snapshot', async () => {
  const { asFragment } = render(<Company />);

  expect(asFragment()).toMatchSnapshot();
});
