import { render, screen } from '@testing-library/react';
import { App } from './App';
import { TestProvider } from './providers/testProvider';

test('renders decrement and incrment btn', () => {
  render(
    <TestProvider>
      <App />
    </TestProvider>,
  );
  const dec = screen.getByText(/Decrement/i);
  const inc = screen.getByText(/Increment/i);

  expect(dec).toBeInTheDocument();
  expect(inc).toBeInTheDocument();
});
