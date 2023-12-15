import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import withAuthRedirect from './withAuthentication';

// Mock the useHistory hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn()
}));

// Mock the Auth.currentAuthenticatedUser function
jest.mock('aws-amplify', () => ({
  Auth: {
    currentAuthenticatedUser: jest.fn()
  }
}));

describe('withAuthRedirect', () => {
  // Mock the WrappedComponent
  const MockComponent = () => <div>Mock Component</div>;

  beforeEach(() => {
    // Clear all mock calls
    jest.clearAllMocks();

    // Reset the history mock implementation
    (useHistory as jest.Mock).mockReset();
  });

  it('should render the WrappedComponent if user is authenticated and organization is subscribed', async () => {
    // Mock the Auth.currentAuthenticatedUser to resolve successfully
    (Auth.currentAuthenticatedUser as jest.Mock).mockResolvedValue({});

    // Create a mock organization
    const mockOrganization = {
      org_id: '1',
      is_subscribed: true
    };

    // Render the component with the withAuthRedirect HOC
    render(
      <Router>
        <Switch>
          <Route exact path="/">
            {withAuthRedirect(MockComponent, mockOrganization)}
          </Route>
        </Switch>
      </Router>
    );

    // Assert that the WrappedComponent is rendered
    expect(screen.getByText('Mock Component')).toBeInTheDocument();
  });

  it('should redirect to "/welcome" if user is authenticated and organization is not subscribed', async () => {
    // Mock the Auth.currentAuthenticatedUser to resolve successfully
    (Auth.currentAuthenticatedUser as jest.Mock).mockResolvedValue({});

    // Create a mock organization
    const mockOrganization = {
      org_id: '1',
      is_subscribed: false
    };

    // Mock the useHistory hook to return a mock history object
    (useHistory as jest.Mock).mockReturnValue({
      push: jest.fn()
    });

    // Render the component with the withAuthRedirect HOC
    render(
      <Router>
        <Switch>
          <Route exact path="/">
            {withAuthRedirect(MockComponent, mockOrganization)}
          </Route>
        </Switch>
      </Router>
    );

    // Assert that the history.push function is called with "/welcome"
    expect((useHistory as jest.Mock).mock.calls[0][0]).toBe('/welcome');
  });

  it('should redirect to "/login?activeTab=1" if user is not authenticated', async () => {
    // Mock the Auth.currentAuthenticatedUser to throw an error
    (Auth.currentAuthenticatedUser as jest.Mock).mockRejectedValue(new Error());

    // Mock the useHistory hook to return a mock history object
    (useHistory as jest.Mock).mockReturnValue({
      push: jest.fn()
    });

    // Render the component with the withAuthRedirect HOC
    render(
      <Router>
        <Switch>
          <Route exact path="/">
            {withAuthRedirect(MockComponent, {}, {})}
          </Route>
        </Switch>
      </Router>
    );

    // Assert that the history.push function is called with "/login?activeTab=1"
    expect((useHistory as jest.Mock).mock.calls[0][0]).toBe('/login?activeTab=1');
  });
});