import React, {Suspense} from 'react';
import {Redirect, Route, useLocation} from 'react-router-dom';
import Loader from '../components/loader/Loader';

function PrivateRoute({component: Component, isAuthenticated, ...rest}) {
  const location = useLocation();
  if (!isAuthenticated) {
    return (
      <Route {...rest} render={() =>
        <Redirect to={{
          pathname: '/login',
          state: {
            from: location.pathname
          }
        }}/>
      }/>
    )
  }

  return (
    <Route {...rest} render={props => {
      return (
        <Suspense fallback={<Loader/>}>
          <Component {...props} />
        </Suspense>
      )
    }}/>
  );
}

export default PrivateRoute;
