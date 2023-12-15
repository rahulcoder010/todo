import { render, fireEvent, waitFor } from '@testing-library/react';
import RegistrationSection from './register';

test('should submit form successfully', async () => {
  // Create a mock function for handleSetNewUserInfo
  const handleSetNewUserInfo = jest.fn();

  // Render the RegistrationSection component
  const { getByLabelText, getByText } = render(
    <RegistrationSection handleSetNewUserInfo={handleSetNewUserInfo} />
  );

  // Fill in the form inputs
  fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
  fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
  fireEvent.change(getByLabelText('Organization Name'), { target: { value: 'ABC Company' } });
  fireEvent.change(getByLabelText('Job Title'), { target: { value: 'Developer' } });
  fireEvent.change(getByLabelText('Email Address'), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(getByLabelText('Username'), { target: { value: 'johndoe' } });
  fireEvent.change(getByLabelText('User Password'), { target: { value: 'Password123!' } });
  fireEvent.click(getByText('I have read and agree to the Terms of Use and Privacy Policy'));
  fireEvent.click(getByText('Sign Up'));

  // Wait for the form submission to complete
  await waitFor(() => {});
  
  // Check if handleSetNewUserInfo was called with the expected arguments
  expect(handleSetNewUserInfo).toHaveBeenCalledWith({
    organization: {
      orgName: 'ABC Company',
      orgEmail: 'john.doe@example.com',
    },
    user: {
      fullName: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      jobTitle: 'Developer',
      userEmail: 'john.doe@example.com',
      userName: 'johndoe',
      userPassword: 'U2FsdGVkX1+7140ZQkkiKPnekPpCfE7comt+ykLlXqw=',
      isSSO: false,
    },
  });
});

test('should display error message when form submission fails', async () => {
  // Create a mock function for handleSetNewUserInfo
  const handleSetNewUserInfo = jest.fn();

  // Create a mock function for the api.post method that always throws an error
  const mockedApiPost = jest.fn().mockRejectedValue('Error creating organization');

  // Mock the api.post method
  jest.mock('shared/utils/api', () => ({
    default: {
      post: mockedApiPost,
    },
  }));

  // Render the RegistrationSection component
  const { getByLabelText, getByText } = render(
    <RegistrationSection handleSetNewUserInfo={handleSetNewUserInfo} />
  );

  // Fill in the form inputs
  fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
  fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
  fireEvent.change(getByLabelText('Organization Name'), { target: { value: 'ABC Company' } });
  fireEvent.change(getByLabelText('Job Title'), { target: { value: 'Developer' } });
  fireEvent.change(getByLabelText('Email Address'), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(getByLabelText('Username'), { target: { value: 'johndoe' } });
  fireEvent.change(getByLabelText('User Password'), { target: { value: 'Password123!' } });
  fireEvent.click(getByText('I have read and agree to the Terms of Use and Privacy Policy'));
  fireEvent.click(getByText('Sign Up'));

  // Wait for the form submission to complete
  await waitFor(() => {});
  
  // Check if handleSetNewUserInfo was not called
  expect(handleSetNewUserInfo).not.toHaveBeenCalled();

  // Check if the error message is displayed
  expect(getByText('Error creating organization: Error creating organization'));
});

test('should display error message when a required field is empty', async () => {
  // Create a mock function for handleSetNewUserInfo
  const handleSetNewUserInfo = jest.fn();

  // Render the RegistrationSection component
  const { getByText } = render(
    <RegistrationSection handleSetNewUserInfo={handleSetNewUserInfo} />
  );

  // Click the Sign Up button without filling in the form
  fireEvent.click(getByText('Sign Up'));

  // Wait for the form submission to complete
  await waitFor(() => {});
  
  // Check if handleSetNewUserInfo was not called
  expect(handleSetNewUserInfo).not.toHaveBeenCalled();

  // Check if the error messages are displayed
  expect(getByText('Please enter your first name.')).toBeInTheDocument();
  expect(getByText('Please enter your last name.')).toBeInTheDocument();
  expect(getByText('Please enter your organization name.')).toBeInTheDocument();
  expect(getByText('Please enter your email address')).toBeInTheDocument();
  expect(getByText('Please enter your username')).toBeInTheDocument();
  expect(getByText('Please enter a password.')).toBeInTheDocument();
});

test('should display error message when a field contains spaces', async () => {
  // Create a mock function for handleSetNewUserInfo
  const handleSetNewUserInfo = jest.fn();

  // Render the RegistrationSection component
  const { getByLabelText, getByText } = render(
    <RegistrationSection handleSetNewUserInfo={handleSetNewUserInfo} />
  );

  // Fill in the form inputs with values containing spaces
  fireEvent.change(getByLabelText('First Name'), { target: { value: 'John ' } });
  fireEvent.change(getByLabelText('Last Name'), { target: { value: ' Doe' } });
  fireEvent.change(getByLabelText('Organization Name'), { target: { value: 'ABC Company' } });
  fireEvent.change(getByLabelText('Job Title'), { target: { value: 'Developer ' } });
  fireEvent.change(getByLabelText('Email Address'), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(getByLabelText('Username'), { target: { value: ' johndoe ' } });
  fireEvent.change(getByLabelText('User Password'), { target: { value: ' Password123! ' } });
  fireEvent.click(getByText('I have read and agree to the Terms of Use and Privacy Policy'));
  fireEvent.click(getByText('Sign Up'));

  // Wait for the form submission to complete
  await waitFor(() => {});
  
  // Check if handleSetNewUserInfo was not called
  expect(handleSetNewUserInfo).not.toHaveBeenCalled();

  // Check if the error messages are displayed
  expect(getByText('Spaces are not allowed. Please enter a valid input.')).toBeInTheDocument();
  expect(getByText('Please enter valid a username')).toBeInTheDocument();
  expect(getByText('Password must be at least 11 characters long.')).toBeInTheDocument();
  expect(getByText('Password must contain at least 1 number.')).toBeInTheDocument();
  expect(getByText('Password must contain at least 1 special character.')).toBeInTheDocument();
  expect(getByText('Password must contain at least 1 uppercase letter.')).toBeInTheDocument();
  expect(getByText('Password must contain at least 1 lowercase letter.')).toBeInTheDocument();
});