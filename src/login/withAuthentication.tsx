import { Auth } from 'aws-amplify';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Organization } from 'shared/types/organization';

const withAuthentication = (
  WrappedComponent: any,
  organization: Organization,
  componentProps: any,
) => {
  const AuthHandler = (props: any) => {
    const history = useHistory();

    useEffect(() => {
      async function checkAuth() {
        try {
          await Auth.currentAuthenticatedUser();

          if (organization.org_id && !organization.is_subscribed) {
            history.push('/welcome');
          }
        } catch (err) {
          history.push('/login?activeTab=1');
        }
      }

      checkAuth();
    }, [history, organization]);

    return <WrappedComponent {...props} {...(componentProps || {})} />;
  };

  return AuthHandler;
};

export default withAuthentication;