import React, {Suspense} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Loader from '../components/loader/Loader';
import {loggedInStatus} from '../store/authSlice';

function PublicRoutes({component: Component, ...rest}) {
  const isAuthenticated = useSelector(loggedInStatus);

  if (isAuthenticated) {
    return (
      <Route {...rest} render={() =>
        <Redirect to={{
          pathname: '/',
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

export default PublicRoutes;
