import { BrowserRouter, Route } from 'react-router-dom';
import { PublicRouter } from './auth/Router/PublicRouter';
import { OnboardingRouter } from './auth/Router/OnboardingRouter';
import { AuthenticatedRouter } from './auth/Router/AuthenticatedRouter';
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
import AuthContext from './auth/context/AuthContext';
import { useUser } from './auth/hooks/useAuth';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { user } = useUser();
  const { isAuthenticated } = useAuth0();
  const needToVerifyOtp = false;
  const needToResetPassword = false;
  const loggedIn = false;

  return (
    <AuthContext.Provider value={{ user }}>
      <BrowserRouter>
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
                condition: loggedIn,
                path: '/',
              },
              {
                condition: needToResetPassword,
                path: '/resetPassword',
              },
            ]}
          />
          <Route path={'/signup'} component={Signup} />
        </PublicRouter>

        <OnboardingRouter active={user?.finishOnboarding} redirectTo="/404">
          <Route path={'/onboard/v1'} component={Onboard} />
          <Route path={'/onboard/v2'} component={Onboard} />
        </OnboardingRouter>

        {/* Check Boolean(user) it's not working */}
        <AuthenticatedRouter active={isAuthenticated} redirectTo="/login">
          <Route path={'/transactions'} component={Transaction} />
          <Route path={'/otp'} component={Otp} />
          <Route path={'/resetPassword'} component={ResetPassword} />
          <Route path={'/'} component={Dashboard} exact />
        </AuthenticatedRouter>

        <Route path={'/404'} component={EmptyPage} />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
