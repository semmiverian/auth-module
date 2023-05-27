import { useHistory, useLocation, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useContext, useState } from 'react';
import { Cookies } from 'react-cookie';

export type User = {
  id: number;
  email: string;
  needFinishOnboard: boolean;
  needVerifiedOtp: true;
  needResetpassword: true;
};

const cookies = new Cookies();

const sleep = async (timer = 500) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timer);
  });
};

export const useAuth = () => {
  const [isIdle, setIsIdle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const login = async () => {
    // Handle login process
    try {
      setIsLoading(true);
      const user = {
        id: 1,
        email: 'admin@netflix.com',
        needFinishOnboard: false,
        needVerifiedOtp: false,
        needResetpassword: false,
      };
      cookies.set('user', user);
      await sleep();
      setIsSuccess(true);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsIdle(true);
    }
  };

  const logout = async () => {
    // Handle logout process
    try {
      setIsLoading(true);
      cookies.remove('user');
      await sleep();
      setIsSuccess(true);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsIdle(true);
    }
  };

  const verifyOtp = () => {
    // Handle verify otp process
  };

  const resetPassword = () => {
    // Handle reset password
  };

  return {
    login,
    logout,
    verifyOtp,
    resetPassword,
    isIdle,
    isLoading,
    isSuccess,
    isError,
  };
};

export const useUser = () => {
  const user = getUser();
  const team = [{ id: 1, teamName: 'Netflix' }];

  return { user, team, getUser };
};

export const useRouter = () => {
  const location = useLocation();
  const history = useHistory();
  const params = useParams();

  const customFunction = () => {
    // Handle custom process to handle routing / redirect process
  };

  return { location, history, params, customFunction };
};

export const getUser = () => {
  return cookies.get('user') as User;
};

export const useAuthContext: () => AuthContext = () => useContext(AuthContext);
