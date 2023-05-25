import { Redirect, Route } from 'react-router-dom';

export const RedirectionRoute = (
  props: React.ComponentProps<typeof Route> & {
    redirectionRules: { condition: boolean; path: string }[];
  }
) => {
  const { redirectionRules, ...routeProps } = props;
  const needToRedirect = redirectionRules.find((rules) => rules.condition);

  if (needToRedirect) {
    return <Redirect to={needToRedirect.path} />;
  }

  return <Route {...routeProps} />;
};
