import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RegistrationSection from './register';

test('renders registration section', () => {
  render(<RegistrationSection />);

  // Assert that the registration section is rendered
  expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
});

test('form submits successfully', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <RegistrationSection />
    </Router>
  );

  // Fill in form fields
  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText(/Organization Name/i), { target: { value: 'ABC Company' } });
  fireEvent.change(screen.getByLabelText(/Job Title/i), { target: { value: 'Developer' } });
  fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'johndoe' } });
  fireEvent.change(screen.getByLabelText(/User Password/i), { target: { value: 'Password123!' } });
  fireEvent.click(screen.getByText(/I have read and agree/i));

  // Submit the form
  fireEvent.click(screen.getByText(/Sign Up/i));

  // Assert that the form is submitted successfully
  expect(screen.getByText(/Organization successfully created/i)).toBeInTheDocument();

  // Assert that the user is redirected to the correct page
  expect(history.location.pathname).toBe('/dashboard');
});
