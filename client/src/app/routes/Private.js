import React, {Suspense} from 'react';
import {Redirect, Route} from 'react-router-dom';
import Loader from '../components/common/loader/Loader';

function PrivateRoute({component: Component, isAuthenticated, ...rest}) {
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
