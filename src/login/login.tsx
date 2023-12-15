import { render, screen, fireEvent } from '@testing-library/react';
import LoginSection from './login';

describe('LoginSection', () => {
  beforeEach(() => {
    render(<LoginSection />);
  });

  test('renders login form', () => {
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Log in' });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('displays error message for invalid username', () => {
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Log in' });

    fireEvent.change(usernameInput, { target: { value: 'invalid.username' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    const errorMessage = screen.getByText('Please enter valid a username');
    expect(errorMessage).toBeInTheDocument();
  });

  test('displays error message for empty password field', () => {
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Log in' });

    fireEvent.change(usernameInput, { target: { value: 'valid.username' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(loginButton);

    const errorMessage = screen.getByText('Please enter your password.');
    expect(errorMessage).toBeInTheDocument();
  });

  test('displays success message after successful login', () => {
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Log in' });

    fireEvent.change(usernameInput, { target: { value: 'valid.username' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    const successMessage = screen.getByText('Logged in successfully.');
    expect(successMessage).toBeInTheDocument();
  });

  test('displays error message after failed login', () => {
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Log in' });

    fireEvent.change(usernameInput, { target: { value: 'invalid.username' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    const errorMessage = screen.getByText('Invalid username or password');
    expect(errorMessage).toBeInTheDocument();
  });
});