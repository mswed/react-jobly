import { it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

it('renders without crashing', async () => {
  render(<App />);
});

it('matches snapshot', async () => {
  const { asFragment } = render(<App />);

  expect(asFragment()).toMatchSnapshot();
});
