import { Route } from 'react-router-dom';
import { PublicRouter } from './auth/Router/PublicRouter';
import { OnboardingRouter } from './auth/Router/OnboardingRouter';
import { AuthenticatedRouter } from './auth/Router/AuthenticatedRouter';
import { useAuth0 } from '@auth0/auth0-react';

import {
  Dashboard,
  EmptyPage,
  Login,
  Onboard,
  Otp,
  ResetPassword,
  Signup,
  Transaction,
} from './component';
import { RedirectionRoute } from './auth/Router/RedirectionRoute';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  const needToVerifyOtp = false;
  const needToResetPassword = false;
  const loggedIn = isAuthenticated;
  const finishOnboarding = true;

  const checkAuth = () => {
    if (isLoading) {
      return true;
    }
    return isAuthenticated;
  };

  return (
    <>
      <PublicRouter>
        <RedirectionRoute
          path={'/login'}
          component={Login}
          redirectionRules={[
            {
              condition: needToVerifyOtp,
              path: '/otp',
            },
            {
              condition: !finishOnboarding,
              path: '/onboard/v1',
            },
            {
              condition: needToResetPassword,
              path: '/resetPassword',
            },
            {
              condition: loggedIn,
              path: '/',
            },
          ]}
        />
        <Route path={'/signup'} component={Signup} />
      </PublicRouter>
      <OnboardingRouter active={finishOnboarding} redirectTo="/404">
        <Route path={'/onboard/v1'} component={Onboard} />
        <Route path={'/onboard/v2'} component={Onboard} />
      </OnboardingRouter>
      <AuthenticatedRouter active={checkAuth()} redirectTo="/login">
        <Route path={'/transactions'} component={Transaction} />
        <Route path={'/otp'} component={Otp} />
        <Route path={'/resetPassword'} component={ResetPassword} />
        <Route path={'/'} component={Dashboard} exact />
      </AuthenticatedRouter>
      <Route path={'/404'} component={EmptyPage} />
    </>
  );
}

export default App;
