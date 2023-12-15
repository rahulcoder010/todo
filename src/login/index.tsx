import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login', () => {
  it('renders Login component', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBe(true);
  });

  it('updates activeTab state based on query parameter', () => {
    const mockHistory = { push: jest.fn() };
    const mockLocation = { search: '?activeTab=2' };
    const wrapper = shallow(<Login history={mockHistory} location={mockLocation} />);
    expect(wrapper.state('activeTab')).toBe('2');
  });

  it('sets newUserInfo and showNewUserInfo state when handleSetNewUserInfo is called', () => {
    const mockHistory = { push: jest.fn() };
    const wrapper = shallow(<Login history={mockHistory} />);
    const instance = wrapper.instance();
    const userInfo = { username: 'testuser' };
    instance.handleSetNewUserInfo(userInfo);
    expect(wrapper.state('newUserInfo')).toBe(userInfo);
    expect(wrapper.state('showNewUserInfo')).toBe(true);
  });

  it('redirects to /project when current user is authenticated and afterMFASetup is false', () => {
    const mockHistory = { push: jest.fn() };
    const mockAuth = { currentAuthenticatedUser: jest.fn() };
    const wrapper = shallow(<Login history={mockHistory} auth={mockAuth} />);
    const instance = wrapper.instance();
    instance.checkAuthStatus();
    expect(mockHistory.push).toHaveBeenCalledWith('/project');
  });
});