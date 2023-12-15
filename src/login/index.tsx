import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './index';

test('renders Login component', () => {
  render(<Login />);
  const loginElement = screen.getByText(/Don't have an account?/i);
  expect(loginElement).toBeInTheDocument();
});