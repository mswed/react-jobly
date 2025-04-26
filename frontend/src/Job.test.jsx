import { it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Job from './Job';

it('renders without crashing', async () => {
  render(<Job />);
});

it('matches snapshot', async () => {
  const { asFragment } = render(<Job />);

  expect(asFragment()).toMatchSnapshot();
});
