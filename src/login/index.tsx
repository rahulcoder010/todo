import { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { setKeyPrefix } from 'shared/utils/authToken';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { updateAuthState } from 'store/authSlice';

const useAuthState = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const history = useHistory();
  const isMounted = useRef(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeTabQueryParam = queryParams.get('activeTab');
  const usernameParam = queryParams.get('username');
  const [afterMFASetup, setAfterMFASetup] = useState(false);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const currentCognitoUser = await Auth.currentAuthenticatedUser();
        if (isMounted.current && !afterMFASetup) {
          setKeyPrefix(currentCognitoUser.keyPrefix);
          dispatch(updateAuthState(true));
          history.push('/project');
        }
      } catch (err) {
        if (isMounted.current) {
          dispatch(updateAuthState(false));
        }
      }
    }
    checkAuthStatus();

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Update the activeTab state based on the query parameter
    if (activeTabQueryParam) {
      // setActiveTab(activeTabQueryParam);
    }
  }, [activeTabQueryParam]);

  const handleSetNewUserInfo = (userInfo: any) => {
    // setNewUserInfo(userInfo);
    // setShowNewUserInfo(true);
    history.push(`/login?activeTab=1${usernameParam ? `&username=${usernameParam}` : ''}`);
  };

  return {
    authState,
    handleSetNewUserInfo,
    afterMFASetup,
    setAfterMFASetup,
  };
};
export default useAuthState;