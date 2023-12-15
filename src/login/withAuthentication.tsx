import { render } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Organization } from 'shared/types/organization';
import withAuthRedirect from './withAuthentication';

jest.mock('aws-amplify');

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}));

describe('withAuthRedirect', () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    (useHistory as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to "/welcome" if the user is authenticated and organization is not subscribed', async () => {
    (Auth.currentAuthenticatedUser as jest.Mock).mockResolvedValueOnce({});


    const OrganizationMock: Organization = {
      org_id: 123,
      is_subscribed: false,
    };

    const MockedComponent = () => <div>Mocked Component</div>;
    const ComponentWithAuthRedirect = withAuthRedirect(MockedComponent, OrganizationMock, {});

    render(<ComponentWithAuthRedirect />);

    expect(pushMock).toHaveBeenCalledWith('/welcome');
  });

  it('should redirect to "/login?activeTab=1" if there is an error checking authentication', async () => {
    (Auth.currentAuthenticatedUser as jest.Mock).mockRejectedValueOnce(new Error('Authentication failed'));

    const OrganizationMock: Organization = {
      org_id: 123,
      is_subscribed: false,
    };

    const MockedComponent = () => <div>Mocked Component</div>;
    const ComponentWithAuthRedirect = withAuthRedirect(MockedComponent, OrganizationMock, {});

    render(<ComponentWithAuthRedirect />);

    expect(pushMock).toHaveBeenCalledWith('/login?activeTab=1');
  });
});