import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

export const OnboardingRouter = ({
  children,
  active,
  redirectTo,
}: {
  children: React.ReactNode[];
  active: boolean;
  redirectTo: string;
}) => {
  const location = useLocation();

  if (
    !active &&
    React.Children.map(children, (route) => {
      if (React.isValidElement(route)) {
        return route.props.path;
      }
    })?.find((path) => path === location.pathname)
  ) {
    return <Redirect to={redirectTo} />;
  }

  return <>{children}</>;
};
