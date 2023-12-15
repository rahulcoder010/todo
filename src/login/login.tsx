import { render, screen, fireEvent } from '@testing-library/react';
import LoginSection from '../../src/login/login';

describe('LoginSection', () => {
  beforeEach(() => {
    render(<LoginSection />);
  });

  test('renders username input', () => {
    const usernameInput = screen.getByLabelText('Username');
    expect(usernameInput).toBeInTheDocument();
  });

  test('renders password input', () => {
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders login button', () => {
    const loginButton = screen.getByRole('button', { name: 'Log in' });
    expect(loginButton).toBeInTheDocument();
  });

  test('renders continue with Google button', () => {
    const continueWithGoogleButton = screen.getByRole('button', { name: 'Continue with Google' });
    expect(continueWithGoogleButton).toBeInTheDocument();
  });

  test('renders continue with Amazon button', () => {
    const continueWithAmazonButton = screen.getByRole('button', { name: 'Continue with Amazon' });
    expect(continueWithAmazonButton).toBeInTheDocument();
  });

  test('renders forgot password link', () => {
    const forgotPasswordLink = screen.getByRole('link', { name: 'Forgot password?' });
    expect(forgotPasswordLink).toBeInTheDocument();
  });

  test('clicking on forgot password link opens forgot password form', () => {
    const forgotPasswordLink = screen.getByRole('link', { name: 'Forgot password?' });
    fireEvent.click(forgotPasswordLink);

    const sendEmailForm = screen.getByLabelText('Forgot Password');
    expect(sendEmailForm).toBeInTheDocument();
  });
});