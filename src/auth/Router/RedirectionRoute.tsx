import { Redirect, Route, useLocation } from 'react-router-dom';

export const RedirectionRoute = (
  props: React.ComponentProps<typeof Route> & {
    redirectionRules: { condition: boolean; path: string }[];
  }
) => {
  const location = useLocation();

  const { redirectionRules, ...routeProps } = props;
  if (location.pathname === props.path) {
    const needToRedirect = redirectionRules.find((rules) => rules.condition);

    if (needToRedirect) {
      return <Redirect to={needToRedirect.path} />;
    }
  }

  return <Route {...routeProps} />;
};
