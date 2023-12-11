import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row, Tooltip, message } from 'antd';
import React, { useState } from 'react';

import ReCAPTCHA from 'react-google-recaptcha';
import { useHistory } from 'react-router-dom';
import { encrypt } from 'shared/helpers/base64Helper';
import api from 'shared/utils/api';

import { useAuth } from './authContext';

const initialValues = {
  firstName: '',
  lastName: '',
  orgName: '',
  title: '',
  email: '',
  username: '',
};

const RegistrationSection: React.FC<any> = () => {
  const recaptchaRef = React.createRef<any>();
  const history = useHistory();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { handleSetNewUserInfo } = useAuth();

  const handleSubmit = async (values: any) => {
    const token = await recaptchaRef.current.executeAsync();
    setIsLoading(true);
    const organization = {
      orgName: values.orgName.trim(),
      orgEmail: values.email,
    };
    const user = {
      fullName: values.firstName.trim() + ' ' + values.lastName.trim(),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      jobTitle: values.title.trim(),
      userEmail: values.email.trim(),
      userName: values.username.trim(),
      userPassword: encrypt(values.password),
      isSSO: false,
    };

    await api
      .post(
        `/create_organization`,
        JSON.stringify({
          organization,
          user,
        }),
      )
      .then(async (data: any) => {
        console.log(data);
        handleSetNewUserInfo(JSON.parse(data.body));
        setIsLoading(false);
        message.success('Organization successfully created');
      })
      .catch((error: any) => {
        message.error(`Error creating organization: ${error}`);
        setIsLoading(false);
      });
  };

  const spaceValidator = (_: any, value: string) => {
    if (value && value.trim() === '') {
      return Promise.reject(new Error('Spaces are not allowed. Please enter a valid input.'));
    }
    return Promise.resolve();
  };

  const handleAcceptTerms = (e: any) => {
    setAcceptTerms(e.target.checked);
  };

  const validatePassword = (_: any, value: any) => {
    if (!value || value.trim().length === 0) {
      return Promise.reject('Please enter a password.');
    }

    if (value.length < 11) {
      return Promise.reject('Password must be at least 11 characters long.');
    }

    if (!/\d/.test(value)) {
      return Promise.reject('Password must contain at least 1 number.');
    }

    if (!/[!@#$%^&*]/.test(value)) {
      return Promise.reject('Password must contain at least 1 special character.');
    }

    if (!/[A-Z]/.test(value)) {
      return Promise.reject('Password must contain at least 1 uppercase letter.');
    }

    if (!/[a-z]/.test(value)) {
      return Promise.reject('Password must contain at least 1 lowercase letter.');
    }

    return Promise.resolve();
  };

  return (
    <div className="registration-section">
      <h1 style={{ fontSize: 32, textAlign: 'center', color: '#002766' }}>Sign up</h1>
      <p style={{ textAlign: 'center', marginTop: 8 }}>
        Get started building your product with AI.
      </p>
      <Form
        style={{ marginTop: 32 }}
        form={form}
        name="registration"
        initialValues={initialValues}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: 'Please enter your first name.' },
                { validator: spaceValidator },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: 'Please enter your last name.' },
                { validator: spaceValidator },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="orgName"
              label={
                <span>
                  Organization Name&nbsp;
                  <Tooltip title="Company name, project name or a name that corresponds to your account">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[
                { required: true, message: 'Please enter your organization name.' },
                { validator: spaceValidator },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="title" label="Job Title">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            {
              required: true,
              message: 'Please enter your email address',
            },
            {
              type: 'email',
              message: 'Please a enter valid email address',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: 'Please enter your username' },
                {
                  validator: (_, value) => {
                    const name = value?.trim();
                    const regex = /^[a-z0-9\-_]+$/;
                    if (!regex.test(name) && value.length > 0) {
                      return Promise.reject('Please enter valid a username');
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="password"
              label="User Password"
              rules={[
                { validator: validatePassword },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Checkbox onChange={handleAcceptTerms}>
            I have read and agree to the{' '}
            <a
              style={{ color: '#1677ff' }}
              target="_blank"
              href="https://prodigybuild.com/prodigybuild-legal/terms-of-use/"
            >
              Terms of Use
            </a>{' '}
            and{' '}
            <a
              style={{ color: '#1677ff' }}
              target="_blank"
              href="https://prodigybuild.com/prodigybuild-legal/privacy-policy/"
            >
              Privacy Policy
            </a>
          </Checkbox>
        </Form.Item>
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey="6LeYXDkmAAAAAPyJf9pDQxly2HjtpLZAZ0B65c0E"
        />
        <Form.Item>
          <Button
            style={{ width: '100%', background: 'var(--primary-6, #1890FF)', color: '#FFF' }}
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={!acceptTerms}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default RegistrationSection;