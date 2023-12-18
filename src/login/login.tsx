import { QuestionCircleOutlined } from '@ant-design/icons';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Button, Col, Divider, Form, Input, Row, Tooltip, message } from 'antd';
import { Auth } from 'aws-amplify';
import QRCode from 'qrcode.react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { setKeyPrefix, storeAuthToken } from 'shared/utils/authToken';
import Amazon from '../App/assets/images/amazon.png';
import Google from '../App/assets/images/google.png';
import { loginFailedLog, loginSuccessLog, signUpSuccessLog } from '../shared/helpers/ga4';
import { setCurrentUser, setSelectedProject } from '../shared/reducers/projectUsersSlice';
import api from '../shared/utils/api';
import { login, login as loginUser } from './authSlice';

function setCookie(name: string, value?: string, days?: number) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

const useLoginSection = ({ children, afterMFASetup, setAfterMFASetup }: any) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const isMounted = useRef(true); // Add this line to keep track of the mounted status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMfaRequired, setIsMfaRequired] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordResetRequired, setIsPasswordResetRequired] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [userData, setUserData] = useState<any>({});
  const [qrCodeURL, setQrCodeURL] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const usernameParam = queryParams.get('username');
  const [username, setUsername] = useState(usernameParam || '');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordCode, setForgotPasswordCode] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [isAmazonLogin, setIsAmazonLogin] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [userPassword, setUserPassword] = useState('');
  const [appMessage, setAppMessage] = useState(null);

  const setUserInfo = async () => {
    try {
      const currentCognitoUser = await Auth.currentAuthenticatedUser();
      if (currentCognitoUser) {
        await api
          .get(`/user?userName=${currentCognitoUser.username}`)
          .then(user => {
            dispatch(setSelectedProject(user.selected_project));
            dispatch(
              setCurrentUser({
                currentUser: user,
                currentUserId: user?.user_id,
              }),
            );
            dispatch(loginUser(currentCognitoUser.username));
          })
          .catch(e => {
            console.log(e);
          });

      }
    } catch (e) {
      console.log({ e });
    }
  };

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const { keyPrefix } = await Auth.currentAuthenticatedUser();
        if (isMounted.current) {
          // Only update state if the component is mounted
          setKeyPrefix(keyPrefix);
          setIsAuthenticated(true);
        }
      } catch (err) {
        if (isMounted.current) {
          // Only update state if the component is mounted
          setIsAuthenticated(false);
        }
      }
    }
    checkAuthStatus();

    return () => {
      // Clean up function
      isMounted.current = false; // Set isMounted to false when the component unmounts
    };
  }, []);

  const getAppStatusMessage = async () => {
    const appData = await api.get('/get_application_status_message');
    setAppMessage(appData.length > 0 ? appData[0]?.content : null);
  };

  useEffect(() => {
    getAppStatusMessage();
  }, []);

  const generateQrCodeURL = (username: string, secret: string) => {
    const issuer = 'ProdigyBuild';
    return `otpauth://totp/${issuer}:${username}?secret=${secret}&issuer=${issuer}`;
  };

  // Add function for Google Login
  const handleGoogleLogin = async () => {
    if (isMounted.current) setIsGoogleLogin(true); // Only update state if the component is mounted
    try {
      const userData = await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
    } catch (error: any) {
      if (isMounted.current && error) message.error(error.message); // Only update state if the component is mounted
    } finally {
      if (isMounted.current) setIsGoogleLogin(false); // Only update state if the component is mounted
      await setUserInfo();
    }
  };

  // Add function for Amazon Login
  const handleAmazonLogin = async () => {
    if (isMounted.current) setIsAmazonLogin(true); // Only update state if the component is mounted
    try {
     const userData =  await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Amazon });
    } catch (error: any) {
      if (isMounted.current && error) message.error(error.message); // Only update state if the component is mounted
    } finally {
      if (isMounted.current) setIsAmazonLogin(false); // Only update state if the component is mounted
      await setUserInfo();
    }
  };

  const handleLogin = async (values: {username: string, password: string}) => {
    setIsLoading(true);
    try {
      const username = values?.username?.trim();
      const password = values?.password?.trim();
      // Check user status in database
      const data = afterMFASetup
        ? { disabled: false }
        : await api.get('/user_state', {
            username,
          });
      if (data?.disabled) {
        message.error('This account is disabled. Please contact your administrator.');
      } else {
        const user = await Auth.signIn(username, password);
        setUserData(user);
        if (
          user.challengeName === 'SMS_MFA' ||
          (user.challengeName === 'SOFTWARE_TOKEN_MFA' && !afterMFASetup)
        ) {
          setIsMfaRequired(true);
        } else if (user.challengeName === 'MFA_SETUP' && !afterMFASetup) {
          const totpCode = await Auth.setupTOTP(user);
          const qrURL = generateQrCodeURL(user.username, totpCode);
          setQrCodeURL(qrURL);
          setIsMfaRequired(true);
          message.success('Please set up MFA and enter the MFA code from your device.');
        } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          setIsPasswordResetRequired(true);
          message.success('Please enter a new password.');
        } else {
          if (afterMFASetup) {
            // skip steps after first MFA setup
            return;
          }
          message.success('Logged in successfully.');
          dispatch(login(user));
          storeAuthToken(user.signInUserSession.idToken.jwtToken);
          loginSuccessLog({ username });
          await setUserInfo();
          await api
            .post(
              `/update-user-activity`,
              JSON.stringify({
                user: user?.attributes?.email,
              }),
            )
            .catch(e => {
              console.log({ e });
            });
          console.log('user login successful, redirecting to project');
          history.push('/project');
        }
      }
    } catch (error: any) {
      if (error.code === 'UserNotConfirmedException') {
        message.error(
          <span>
            Please verify your email address.{' '}
            <a style={{ color: '#1677ff' }} href="#" onClick={handleResendVerification}>
              Resend verification email
            </a>
            .
          </span>,
        );
      } else {
        console.log({ error });
        message.error(error.message);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  const handleResendVerification = async () => {
    try {
      await Auth.resendSignUp(username);
      message.success('Verification email sent successfully.');
    } catch (error) {
      message.error('Failed to resend verification email.');
    }
  };

  const handleMFASuccess = async (userData: any) => {
    await Auth.confirmSignIn(userData, mfaCode, 'SOFTWARE_TOKEN_MFA');
    setAfterMFASetup(false);
    message.success('Logged in successfully.');
    setCookie('authorization', `Bearer ${userData.signInUserSession.accessToken.jwtToken}`, 7);
    setCookie('stage', process.env.STAGE, 7);
    storeAuthToken(userData.signInUserSession.idToken.jwtToken);
    loginSuccessLog({ username: userData.username });
    dispatch(login(userData.username));
    await api
      .post(
        `/update-user-activity`,
        JSON.stringify({
          user: userData?.attributes?.email,
        }),
      )
      .catch(e => {
        console.log({ e });
      });
    await setUserInfo();
    if (afterMFASetup) {
      history.push('/subscribed');
    } else {
      console.log('afterMFA false, redirecting user to /project in handleMFASuccess')
      history.push('/project');
    }
  };

  const handleMfa = async () => {
    setIsLoading(true);
    try {
      console.log({ userData });
      if (userData.challengeName === 'MFA_SETUP') {
        const verified = await Auth.verifyTotpToken(userData, mfaCode);
        if (verified) {
          await Auth.setPreferredMFA(userData, 'TOTP');

          messageApi.open({
            type: 'success',
            content:
              'MFA registered successfully! Only one last step. Please enter a new MFA code from your authenticator to start using ProdigyBuild.',
            duration: 60,
          });
          signUpSuccessLog({ username: userData.username });
          // await setUserInfo();
          setAfterMFASetup(true);
          form.setFieldValue(['mfaCode'], '');

          await handleLogin({
            username,
            password: userPassword,
          });
          // const user = await Auth.signIn(username, userPassword);
          // setUserData(user);
          // handleMFASuccess(userData);
        } else {
          loginFailedLog({ username: userData.username });
          message.error('Invalid MFA code. Please try again.');
        }
      } else {
        await handleMFASuccess(userData);
        setIsLoading(false);
      }
    } catch (error: any) {
      message.error(error.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handlePasswordReset = async () => {
    setIsLoading(true);
    try {
      await Auth.completeNewPassword(userData, newPassword);
      message.success('Password reset successfully.');
      await setUserInfo();
      history.replace('/project');
    } catch (error: any) {
      message.error(error.message);
    }
    setIsLoading(false);
  };

  if (isAuthenticated && !afterMFASetup) {
    console.log('isAuthenticated && !afterMFASetup, redirecting to /project');
    return <Redirect to="/project" />;
  }

  if (forgotPassword) {
    return (
      <div className="forgot-password">
        <Form
          layout="vertical"
          name={forgotPasswordCode ? 'sendCode' : 'forgotPassword'}
          onFinish={
            !forgotPasswordCode
              ? async ({ username }) => {
                  try {
                    await Auth.forgotPassword(username);

                    setForgotPasswordCode(true);
                  } catch (error: any) {
                    message.error(error.message);
                  }
                }
              : async ({ code, newPassword, confirmPassword }) => {
                  try {
                    if (newPassword !== confirmPassword)
                      throw new Error('Password confirmation is invalid.');

                    await Auth.forgotPasswordSubmit(username, code, newPassword);

                    setForgotPassword(false);
                    setForgotPasswordCode(false);
                  } catch (error: any) {
                    message.error(error.message);
                  }
                }
          }
        >
          <div style={{ fontSize: '32px', marginBottom: '30px', textAlign: 'center' }}>
            {forgotPasswordCode ? 'Reset Password' : 'Forgot Password'}
            <p style={{ fontSize: 16, marginTop: 8 }}>
              {forgotPasswordCode
                ? 'Please enter the code which was sent to your registered email address.'
                : 'Please, enter your username so we can send you a link to reset your password'}
            </p>
          </div>
          {forgotPasswordCode ? (
            <>
              <Form.Item
                name="code"
                label={
                  <>
                    Code&nbsp;
                    <Tooltip title="Please enter the code which was sent to your registered email address.">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </>
                }
                rules={[{ required: true, message: 'Please enter code.' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="newPassword"
                label="New password"
                rules={[{ required: true, message: 'Please enter new password.' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Confirm password"
                rules={[{ required: true, message: 'Please confirm the new password.' }]}
              >
                <Input.Password />
              </Form.Item>
            </>
          ) : (
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please enter your username.' }]}
            >
              <Input defaultValue={username} onChange={event => setUsername(event.target.value)} />
            </Form.Item>
          )}

          <Button
            style={{ width: '50%' }}
            type="link"
            onClick={() => {
              if (forgotPasswordCode) {
                setForgotPasswordCode(false);
              } else {
                setForgotPassword(false);
              }
            }}
          >
            Back
          </Button>
          <Button
            type="primary"
            style={{ width: '50%', background: 'var(--primary-6, #1890FF)', color: '#FFF' }}
            htmlType="submit"
            loading={isLoading}
          >
            {forgotPasswordCode ? 'Update Password' : 'Send Email'}
          </Button>
        </Form>
      </div>
    );
  }

  return (
    <div className="login-section">
      {contextHolder}
      {appMessage != null && (
        <h6 style={{ fontSize: 16, textAlign: 'center', marginBottom: '20px' }}>{appMessage}</h6>
      )}
      <h1 style={{ fontSize: 32, textAlign: 'center', color: '#002766' }}>Login</h1>
      {children}
      <Form
        form={form}
        name="login"
        layout="vertical"
        onFinish={
          isMfaRequired ? handleMfa : isPasswordResetRequired ? handlePasswordReset : handleLogin
        }
        initialValues={{ username }}
      >
        {!afterMFASetup && (
          <>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: 'Please enter your username' },
                {
                  validator: (_, value) => {
                    const name = value?.trim();
                    const regex = /^[a-zA-Z0-9\-_]+$/;
                    if (!regex.test(name) && value.length > 0) {
                      return Promise.reject('Please enter valid a username');
                    }
                    return Promise.resolve();
                  },
                }
              ]}
            >
              <Input onChange={event => setUsername(event.target.value)} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter your password.' }]}
            >
              <Input.Password onChange={event => setUserPassword(event.target.value)} />
            </Form.Item>
          </>
        )}

        {isMfaRequired && (
          <>
            <Form.Item
              name="mfaCode"
              label="MFA Code"
              rules={[{ required: true, message: 'Please enter the MFA code.' }]}
            >
              <Input onChange={e => setMfaCode(e.target.value)} />
            </Form.Item>
            {qrCodeURL && !afterMFASetup && (
              <div style={{ textAlign: 'center', margin: '0 auto 20px', maxWidth: '390px' }}>
                <p style={{ marginBottom: '10px' }}>
                  To set up your Multi-Factor Authentication (MFA) account, you can choose between
                  Duo and Google Authenticator. Both options offer an extra layer of security to
                  your account.
                </p>
                <p style={{ marginBottom: '10px' }}>
                  To install <a href="https://duo.com/download">Duo</a> or{' '}
                  <a href="https://support.google.com/accounts/answer/1066447">
                    Google Authenticator
                  </a>
                  , follow the instructions to download and set up the app on your device.
                </p>
                <p style={{ marginBottom: '30px' }}>
                  After finishing the download, scan the QR code with your authentication app to set
                  up your MFA.
                </p>
                <div style={{ margin: '0 auto' }}>
                  <QRCode value={qrCodeURL} />
                </div>
              </div>
            )}
          </>
        )}
        {isPasswordResetRequired && (
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true, message: 'Please enter a new password.' }]}
          >
            <Input.Password onChange={e => setNewPassword(e.target.value)} />
          </Form.Item>
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ width: '100%', background: 'var(--primary-6, #1890FF)', color: '#FFF' }}
          >
            {isMfaRequired
              ? 'Submit MFA Code'
              : isPasswordResetRequired
              ? 'Submit New Password'
              : 'Log in'}
          </Button>
        </Form.Item>
        <Divider>OR</Divider>
        <Row gutter={8}>
          <Col className="gutter-row" span={12}>
            <Form.Item>
              <Button
                style={{ width: '100%' }}
                icon={<img style={{ height: '11px' }} src={Google} alt="google" />}
                onClick={handleGoogleLogin}
                loading={isGoogleLogin}
              >
                Continue with Google
              </Button>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item>
              <Button
                style={{ width: '100%' }}
                icon={<img style={{ height: '11px' }} src={Amazon} alt="amazon" />}
                onClick={handleAmazonLogin}
                loading={isAmazonLogin}
              >
                Continue with Amazon
              </Button>
            </Form.Item>
          </Col>
        </Row>

        <div style={{ textAlign: 'right', marginBottom: 20 }}>
          <Link style={{ color: '#1677ff' }} to="#" onClick={() => setForgotPassword(true)}>
            Forgot password?
          </Link>
        </div>
        <div style={{ marginTop: '15px', fontSize: '12px', textAlign: 'center' }}>
          By logging in, you agree to our{' '}
          <a
            style={{ color: '#1677ff' }}
            href="https://prodigybuild.com/prodigybuild-legal/terms-of-use/"
            target="_blank"
            rel="noreferrer"
          >
            Terms of Use
          </a>{' '}
          and{' '}
          <a
            style={{ color: '#1677ff' }}
            href="https://prodigybuild.com/prodigybuild-legal/privacy-policy/"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
          .
        </div>
      </Form>
    </div>
  );
};

export default useLoginSection;