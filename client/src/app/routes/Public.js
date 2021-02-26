import React, {lazy, Suspense} from 'react';
import {Redirect, Route} from 'react-router-dom';
import Loader from '../components/common/loader/Loader';

function PublicRoutes({component: Component, isAuthenticated, ...rest}) {
  return (
    <Route {...rest} render={props => {
      return (
        <Suspense fallback={<Loader/>}>
          {
            isAuthenticated ?
              (
                  <Redirect to={{
                    pathname: '/',
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
