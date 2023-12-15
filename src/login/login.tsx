import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginSection from './LoginSection';

// Mock dependencies
jest.mock('@aws-amplify/auth', () => ({
  Auth: {
    currentAuthenticatedUser: jest.fn(),
    signIn: jest.fn(),
    setupTOTP: jest.fn(),
    confirmSignIn: jest.fn(),
    setPreferredMFA: jest.fn(),
    forgotPassword: jest.fn(),
    forgotPasswordSubmit: jest.fn(),
    resendSignUp: jest.fn(),
    federatedSignIn: jest.fn(),
  },
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('LoginSection', () => {
  test('renders login form', () => {
    render(<LoginSection />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

  test('submits login form with valid credentials', () => {
    render(<LoginSection />);
    const usernameInput = screen.getByLabelText('Username');
    userEvent.type(usernameInput, 'testuser');

    const passwordInput = screen.getByLabelText('Password');
    userEvent.type(passwordInput, 'testpassword');

    const loginButton = screen.getByText('Log in');
    userEvent.click(loginButton);

    // Assert that Auth.signIn is called with the correct parameters
    expect(Auth.signIn).toHaveBeenCalledWith('testuser', 'testpassword');
  });

  test('displays error message for invalid login', async () => {
    // Mock Auth.signIn to throw an error
    Auth.signIn.mockRejectedValueOnce({ message: 'Invalid credentials' });

    render(<LoginSection />);
    const usernameInput = screen.getByLabelText('Username');
    userEvent.type(usernameInput, 'testuser');

    const passwordInput = screen.getByLabelText('Password');
    userEvent.type(passwordInput, 'testpassword');

    const loginButton = screen.getByText('Log in');
    userEvent.click(loginButton);

    // Wait for error message to be displayed
    const errorMessage = await screen.findByText('Invalid credentials');
    expect(errorMessage).toBeInTheDocument();
  });

  // More test cases...
});