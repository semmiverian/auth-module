import { useAuth0 } from '@auth0/auth0-react';

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h1>Login Example</h1>
      <button onClick={() => loginWithRedirect()}>login</button>
    </div>
  );
};

export const Signup = () => {
  return <h1>Signup Example</h1>;
};

export const Onboard = () => {
  return <h1>Onboard Example</h1>;
};

export const Dashboard = () => {
  const { logout, user, isLoading } = useAuth0();

  const handleLogout = async () => {
    logout({
      logoutParams: { returnTo: window.location.origin + '/login' },
    });
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h1>Dashboard Example Welcome {JSON.stringify(user)}</h1>
      <button onClick={handleLogout}>
        {isLoading ? 'Processing' : 'Logout'}
      </button>
    </div>
  );
};

export const Transaction = () => {
  return <h1>Transaction Example</h1>;
};

export const EmptyPage = () => {
  return <h1>Empty Page Example</h1>;
};

export const Otp = () => {
  return <h1>OTP Page Example</h1>;
};

export const ResetPassword = () => {
  return <h1>Reset Password Page Example</h1>;
};
