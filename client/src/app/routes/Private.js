import React, {Suspense, useEffect} from 'react';
import {Redirect, Route, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import Loader from '../components/loader/Loader';
import {loggedInStatus, loggedInUser} from '../store/authSlice';
import {me} from '../services/authService';

function PrivateRoute({component: Component, ...rest}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(loggedInStatus);
  const profile = useSelector(loggedInUser);

  useEffect(() => {
    if (isAuthenticated && _.isEmpty(profile)) {
      dispatch(me())
    }
  }, [isAuthenticated, profile]);

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
