import { Route } from 'react-router-dom';
import { PublicRouter } from './auth/Router/PublicRouter';
import { OnboardingRouter } from './auth/Router/OnboardingRouter';
import { AuthenticatedRouter } from './auth/Router/AuthenticatedRouter';
import { User, useRouter, useUser } from './auth/hooks/useAuth';
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
  const { user = {} as User } = useUser();
  const { location } = useRouter();
  const needToVerifyOtp = user.needVerifiedOtp;
  const needToResetPassword = user.needResetpassword;
  const needToOnboard = user.needFinishOnboard;
  const loggedIn = Boolean(user.id) || (location.state as any)?.authenticated;

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
              condition: loggedIn,
              path: '/',
            },
            {
              condition: needToResetPassword,
              path: '/resetPassword',
            },
            {
              condition: needToOnboard,
              path: '/onboard/v1',
            },
          ]}
        />
        <Route path={'/signup'} component={Signup} />
      </PublicRouter>
      <OnboardingRouter active={needToOnboard} redirectTo="/404">
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
    </>
  );
}

export default App;
