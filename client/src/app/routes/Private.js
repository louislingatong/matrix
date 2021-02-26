import React, {Suspense, useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import Loader from '../components/common/loader/Loader';
import {authCheck, loggedInUser} from '../modules/auth/authSlice';
import {me} from '../modules/auth/authService';

function PrivateRoute({component: Component, isAuthenticated, ...rest}) {
  const dispatch = useDispatch();
  const profile = useSelector(loggedInUser);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(authCheck());
    }

    if (isAuthenticated && _.isEmpty(profile)) {
      dispatch(me())
    }
  }, [isAuthenticated, profile])

  return (
    <Route {...rest} render={props => {
      return (
        <Suspense fallback={<Loader/>}>
          {
            isAuthenticated ?
              <Component {...props} /> :
              (
                <Redirect to={{
                  pathname: '/login',
                  state: {
                    from: props.location
                  }
                }}/>
              )
          }
        </Suspense>
      )
    }}/>
  );
}

export default PrivateRoute;
