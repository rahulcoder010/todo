import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationSection from './register';

describe('Registration Section', () => {
  it('should render the registration section', () => {
    render(<RegistrationSection handleSetNewUserInfo={() => {}} />);
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const handleSetNewUserInfo = jest.fn();

    render(<RegistrationSection handleSetNewUserInfo={handleSetNewUserInfo} />);

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Organization Name'), { target: { value: 'Acme Corp' } });
    fireEvent.change(screen.getByLabelText('Job Title'), { target: { value: 'Developer' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByLabelText('User Password'), { target: { value: 'Password123!' } });

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await screen.findByText('Organization successfully created');

    expect(handleSetNewUserInfo).toHaveBeenCalled();
  });
});