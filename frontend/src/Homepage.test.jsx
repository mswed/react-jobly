import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Homepage from './Homepage';

it('renders without crashing', async () => {
  render(<Homepage />);
});

it('matches snapshot', async () => {
  const { asFragment } = render(<Homepage />);

  expect(asFragment()).toMatchSnapshot();
});

it('displays the correct text', async () => {
  render(<Homepage />);
  expect(screen.getByText('All the jobs in one, convenient place.')).toBeInTheDocument();
});
