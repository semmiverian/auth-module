import { useHistory, useLocation, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useContext, useState } from 'react';
import { Cookies } from 'react-cookie';

type User = {
  id: number;
  email: string;
  finishOnboarding: boolean;
  otpVerified: true;
  passwordReset: true;
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
        finishOnboarding: true,
        otpVerified: true,
        passwordReset: true,
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
  const user = cookies.get('user') as User;
  const team = [{ id: 1, teamName: 'Netflix' }];

  return { user, team };
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

export const useAuthContext: () => AuthContext = () => useContext(AuthContext);
