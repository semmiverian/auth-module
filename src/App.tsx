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

function App() {
  const needToVerifyOtp = false;
  const needToResetPassword = false;
  const finishOnboarding = false;
  const loggedIn = true;

  return (
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

      <OnboardingRouter active={finishOnboarding} redirectTo="/404">
        <Route path={'/onboard/v1'} component={Onboard} />
        <Route path={'/onboard/v2'} component={Onboard} />
      </OnboardingRouter>

      <AuthenticatedRouter active={loggedIn} redirectTo="/login">
        <Route path={'/transactions'} component={Transaction} />
        <Route path={'/otp'} component={Otp} />
        <Route path={'/resetPassword'} component={ResetPassword} />
        <Route path={'/'} component={Dashboard} exact />
      </AuthenticatedRouter>

      <Route path={'/404'} component={EmptyPage} />
    </BrowserRouter>
  );
}

export default App;
