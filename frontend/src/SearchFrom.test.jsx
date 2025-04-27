import { it, expect } from 'vitest';
import { render } from '@testing-library/react';
import SearchForm from './SearchForm';

it('renders without crashing', async () => {
  render(<SearchForm />);
});

it('matches snapshot', async () => {
  const { asFragment } = render(<SearchForm />);

  expect(asFragment()).toMatchSnapshot();
});
