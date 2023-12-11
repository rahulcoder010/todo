import { Alert, Col, Row } from 'antd';
import { Auth } from 'aws-amplify';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { setKeyPrefix } from 'shared/utils/authToken';
import Carousel from './Carousel';
import LoginSection from './Login';
import RegistrationSection from './Registration';
import { Container } from './Styles';

const AuthState = () => {
  const history = useHistory();
  const [newUserInfo, setNewUserInfo] = useState<any>();
  const [showNewUserInfo, setShowNewUserInfo] = useState(false);
  const [activeTab, setActiveTab] = useState('2');
  const isMounted = useRef(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeTabQueryParam = queryParams.get('activeTab');
  const usernameParam = queryParams.get('username');
  const [afterMFASetup, setAfterMFASetup] = useState(false);
  console.log('afterMFASetup', afterMFASetup);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const currentCognitoUser = await Auth.currentAuthenticatedUser();
        if (isMounted.current && !afterMFASetup) {
          setKeyPrefix(currentCognitoUser.keyPrefix);
          console.log('redirecting after setting isAuthenticated true in AuthState')
          history.push('/project');
        }
      } catch (err) {
        if (isMounted.current) {
          
        }
      }
    }
    checkAuthStatus();

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (activeTabQueryParam) {
      setActiveTab(activeTabQueryParam);
    }
  }, [activeTabQueryParam]);

  const handleSetNewUserInfo = (userInfo: any) => {
    setNewUserInfo(userInfo);
    setShowNewUserInfo(true);
    history.push(`/login?activeTab=1${usernameParam ? `&username=${usernameParam}`: ''}`);
  };

  const items = [
    {
      key: '1',
      label: `Login`,
      children: <LoginSection />,
    },
    {
      key: '2',
      label: `Registration`,
      children: <RegistrationSection handleSetNewUserInfo={handleSetNewUserInfo} />,
      disabled: showNewUserInfo,
    },
  ];

  return (
    <Container>
      <Row gutter={24}>
        <Col span={12}>
          {activeTab === '1' && (
            <>
              <LoginSection afterMFASetup={afterMFASetup} setAfterMFASetup={setAfterMFASetup}>
                {showNewUserInfo && !afterMFASetup && (
                  <Alert
                    style={{ marginBottom: 16 }}
                    message="User Successfully Created"
                    description={
                      <>
                        <p style={{ marginBottom: 15 }}>Username: {newUserInfo.username}</p>
                        <p>
                          Please check your email for a verification link.
                        </p>
                        <p>
                          <a href={`/verify-email?username=${newUserInfo.username}`}>Click here</a> to verify your email.
                        </p>
                      </>
                    }
                    type="success"
                    showIcon
                  />
                )}
              </LoginSection>
              <p
                className="sign-in"
                onClick={() => {
                  setActiveTab('2');
                  history.push('/login?activeTab=2');
                }}
              >
                Don't have an account? <span className="login">Register</span>
              </p>
            </>
          )}
          {activeTab === '2' && (
            <>
              <RegistrationSection handleSetNewUserInfo={handleSetNewUserInfo} />{' '}
              <p
                className="sign-in"
                onClick={() => {
                  setActiveTab('1');
                  history.push('/login?activeTab=1');
                }}
              >
                Have an account? <span className="login">Login</span>
              </p>
            </>
          )}
        </Col>
        <Col span={12}>
          <Carousel />
        </Col>
      </Row>
    </Container>
  );
};

export default AuthState;