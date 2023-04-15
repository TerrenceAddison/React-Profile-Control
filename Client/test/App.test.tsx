import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import '@testing-library/jest-dom'

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Profile Page/i);
  expect(linkElement).toBeInTheDocument();
});
