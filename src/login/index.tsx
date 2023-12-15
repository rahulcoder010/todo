import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './index';

describe('Login', () => {
  beforeEach(() => {
    render(<Login />);
  });

  test('renders login section by default', () => {
    const loginSection = screen.getByLabelText('Login Section');
    expect(loginSection).toBeInTheDocument();
  });

  test('renders registration section when register button is clicked', () => {
    const registerButton = screen.getByText('Register');
    userEvent.click(registerButton);
    const registrationSection = screen.getByLabelText('Registration Section');
    expect(registrationSection).toBeInTheDocument();
  });

  test('renders login section after clicking on register and then login button', () => {
    const registerButton = screen.getByText('Register');
    userEvent.click(registerButton);
    const loginButton = screen.getByText('Login');
    userEvent.click(loginButton);
    const loginSection = screen.getByLabelText('Login Section');
    expect(loginSection).toBeInTheDocument();
  });

  test('renders alert after user is successfully created', () => {
    const registerButton = screen.getByText('Register');
    userEvent.click(registerButton);
    const usernameInput = screen.getByLabelText('Username');
    userEvent.type(usernameInput, 'johnDoe');
    const emailInput = screen.getByLabelText('Email');
    userEvent.type(emailInput, 'john.doe@example.com');
    const passwordInput = screen.getByLabelText('Password');
    userEvent.type(passwordInput, 'password123');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    userEvent.type(confirmPasswordInput, 'password123');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitButton);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  test('redirects to project page after authentication', () => {
    const currentAuthenticatedUserMock = jest.fn(() => Promise.resolve({ keyPrefix: 'abc' }));
    jest.spyOn(Auth, 'currentAuthenticatedUser').mockImplementation(currentAuthenticatedUserMock);
    expect(currentAuthenticatedUserMock).toHaveBeenCalled();
    // additional test steps to check authentication and redirection
  });

  // More test cases...
});