import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useLoginTokenQuery } from '../generated/types-and-hooks';

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { data } = useLoginTokenQuery();
  return (
    <Route>
      {localStorage.getItem('loggedIn') === 'true' || !!data?.token ? (
        <Route {...rest}>{children}</Route>
      ) : (
        <Redirect to="/login" />
      )}
    </Route>
  );
};
