import { useState } from 'react';

const authState = {
  firstName: '',
  lastName: '',
  orgName: '',
  title: '',
  email: '',
  username: '',
  isLoading: false,
  acceptTerms: false,
};

const useAuthState = () => {
  const [state, setState] = useState(authState);

  const setAuthState = (newState: any) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return [state, setAuthState];
};

export default useAuthState;