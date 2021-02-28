import React, {Suspense} from 'react';
import {Redirect, Route, useLocation} from 'react-router-dom';
import Loader from '../components/loader/Loader';

function PublicRoutes({component: Component, isAuthenticated, ...rest}) {
  const location = useLocation();
  return (
    <Route {...rest} render={props => {
      return (
        <Suspense fallback={<Loader/>}>
          {
            isAuthenticated ?
              (
                  <Redirect to={{
                    pathname: location.state ? location.state.from : '/',
                    state: {
                      from: props.location
                    }
                  }}/>
                ) :
              <Component {...props} />
          }
        </Suspense>
      )
    }}/>
  );
}

export default PublicRoutes;
